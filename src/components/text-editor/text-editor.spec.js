import React, { useState } from 'react';
import {
  Editor, ContentState, EditorState, Modifier
} from 'draft-js';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { assertStyleMatch } from '../../__spec_helper__/test-utils';
import baseTheme from '../../style/themes/base';
import TextEditor from './text-editor.component';
import EditorLink from './editor-link/editor-link.component';
import { StyledEditorContainer } from './text-editor.style';
import ToolbarButton from './toolbar/toolbar-button/toolbar-button.component';

const createContent = (text) => {
  if (text) {
    return EditorState.createWithContent(ContentState.createFromText(text));
  }
  return EditorState.createEmpty();
};

const appendToEditorState = (text, { editorState }) => {
  const selection = editorState.getCurrentContent().getSelectionAfter();
  const contentState = editorState.getCurrentContent();

  return EditorState.push(editorState, Modifier.insertText(contentState, selection, text), 'insert-fragment');
};

const MockComponent = (props) => {
  const [value, setValue] = useState(createContent());

  return (
    <ThemeProvider theme={ baseTheme }>
      <TextEditor
        value={ value }
        onChange={ val => setValue(val) }
        { ...props }
      />
    </ThemeProvider>
  );
};

const render = (props = {}, renderer = mount) => renderer(<MockComponent { ...props } />);

describe('TextEditor', () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  let wrapper;
  describe('Styles', () => {
    it('match the expected as default', () => {
      wrapper = render();

      assertStyleMatch({
        padding: '4px'
      }, wrapper);

      assertStyleMatch({
        minHeight: '220px',
        minWidth: '450px',
        backgroundColor: baseTheme.colors.white,
        border: `1px solid ${baseTheme.editor.border}`
      }, wrapper.find(StyledEditorContainer));

      assertStyleMatch({
        minHeight: 'inherit',
        height: '100%',
        minWidth: '444px'
      }, wrapper.find(StyledEditorContainer), { modifier: 'div.DraftEditor-root' });

      assertStyleMatch({
        minHeight: 'inherit',
        height: '100%',
        minWidth: '420px',
        padding: '12px'
      }, wrapper.find(StyledEditorContainer), { modifier: 'div.public-DraftEditor-content' });
    });

    it('add gold outline when focused removes outline on blur', () => {
      wrapper = render();
      act(() => { wrapper.find(Editor).props().onFocus(); });
      act(() => { wrapper.update(); });

      assertStyleMatch({
        outline: `3px solid ${baseTheme.colors.focus}`
      }, wrapper.find(StyledEditorContainer));

      act(() => { wrapper.find(Editor).props().onBlur(); });
      act(() => { wrapper.update(); });

      assertStyleMatch({
        outline: undefined
      }, wrapper.find(StyledEditorContainer));
    });

    it('add gold outline when the component is clicked', () => {
      wrapper = render();
      act(() => { wrapper.find(StyledEditorContainer).props().onClick(); });
      act(() => { wrapper.update(); });

      assertStyleMatch({
        outline: `3px solid ${baseTheme.colors.focus}`
      }, wrapper.find(StyledEditorContainer));
    });
  });

  describe('Modifying the Editor state', () => {
    let buttons, getEditorParent, getEditor;

    const hasInlineStyle = style => wrapper.find(Editor).props().editorState.getCurrentInlineStyle().has(style);

    const hasBlockStyle = (style) => {
      const { editorState } = wrapper.find(Editor).props();
      const selection = editorState.getSelection();
      const content = editorState.getCurrentContent();
      const currentBlock = content.getBlockForKey(selection.getStartKey());
      const blockType = currentBlock.getType();

      return blockType === style;
    };

    const fireMouseDown = el => el.onMouseDown({ preventDefault: jest.fn() });

    const addOrderedBlockViaKeyboard = () => {
      act(() => {
        getEditorParent().props().onChange(appendToEditorState('1', getEditor().props()));
      });
      act(() => { wrapper.update(); });
      act(() => { getEditor().props().handleBeforeInput('.'); });
    };

    const injectContentBlock = (value, blockType) => {
      const contentState = value.getCurrentContent();
      const selectionState = value.getSelection();
      const key = selectionState.getStartKey();
      const blockMap = contentState.getBlockMap();
      const block = blockMap.get(key);

      const newBlock = block.merge({
        text: blockType,
        type: blockType,
        data: {}
      });

      const newContentState = contentState.merge({
        blockMap: blockMap.set(key, newBlock),
        selectionAfter: selectionState.merge({
          anchorOffset: 0,
          focusOffset: 0
        })
      });

      return EditorState.push(value, newContentState, 'change-block-type');
    };

    beforeEach(() => {
      wrapper = render();
      getEditorParent = () => wrapper.find(TextEditor);
      getEditor = () => wrapper.find(Editor);
    });

    describe('Clicking the controls', () => {
      it.each([[['BOLD'], 0], [['ITALIC'], 1], [['BOLD', 'ITALIC'], 2]])(
        '%s button toggles the inline formatting', (styles, index) => {
          if (index < 2) {
            buttons = () => [wrapper.find(ToolbarButton).at(index)];
          } else {
            buttons = () => [wrapper.find(ToolbarButton).at(0), wrapper.find(ToolbarButton).at(1)];
          }

          buttons().forEach(button => act(() => { fireMouseDown(button.props()); }));
          act(() => { wrapper.update(); });

          styles.forEach(style => expect(hasInlineStyle(style)).toBeTruthy());

          buttons().forEach(button => act(() => { fireMouseDown(button.props()); }));
          act(() => { wrapper.update(); });

          styles.forEach(style => expect(hasInlineStyle(style)).toBeFalsy());
        }
      );

      it.each([[['unordered-list-item'], 2], [['ordered-list-item'], 3]])(
        '%s button toggles the block type', (styles, index) => {
          const getButton = () => wrapper.find(ToolbarButton).at(index);

          // add block style
          act(() => { fireMouseDown(getButton().props()); });
          act(() => { wrapper.update(); });

          styles.forEach(style => expect(hasBlockStyle(style)).toBeTruthy());

          // remove block style
          act(() => { fireMouseDown(getButton().props()); });
          act(() => { wrapper.update(); });

          styles.forEach(style => expect(hasBlockStyle(style)).toBeFalsy());
          expect(hasBlockStyle('unstyled')).toBeTruthy();
        }
      );

      it.each([['unordered-list-item', 'ordered-list-item'], ['ordered-list-item', 'unordered-list-item']])(
        '%s button adds expected block formatting and removes %s', (first, second) => {
          buttons = [wrapper.find(ToolbarButton).at(2), wrapper.find(ToolbarButton).at(3)];
          const array = first === 'ordered-list-item' ? buttons.reverse() : buttons;
          let activeStyle = 'unstyled';

          array.forEach((button, i) => {
          // last block style still active
            expect(hasBlockStyle(activeStyle)).toBeTruthy();

            // update block style
            act(() => { fireMouseDown(button.props()); });
            act(() => { wrapper.update(); });

            const assertedStyle = i === 0 ? first : second;
            expect(hasBlockStyle(assertedStyle)).toBeTruthy();

            // last block style now inactive
            expect(hasBlockStyle(activeStyle)).toBeFalsy();

            activeStyle = assertedStyle;
          });
        }
      );

      it.each([
        [['BOLD', 'ITALIC'], ['unordered-list-item'], [0, 1, 2]],
        [['BOLD', 'ITALIC'], ['ordered-list-item'], [0, 1, 3]]
      ])(
        '%s and %s buttons add the expected formatting to the editor state', (inlines, blocks, indexArray) => {
          buttons = () => wrapper.find(ToolbarButton);
          indexArray.forEach(i => act(() => { fireMouseDown(buttons().at(i).props()); }));
          act(() => { wrapper.update(); });
          act(() => { getEditorParent().props().onChange(appendToEditorState('foo', getEditor().props())); });

          inlines.forEach(style => expect(hasInlineStyle(style)).toBeTruthy());
          blocks.forEach(style => expect(hasBlockStyle(style)).toBeTruthy());
        }
      );
    });

    // illustrating that the handleKeyCommand handler supports formatting shortcuts
    describe('Adding inline styling through keyboard shortcuts', () => {
      it.each([['BOLD', 'cmd + b'], ['ITALIC', 'cmd + i']])(
        '%s toggles when "%s" pressed', (style) => {
          // add inline style
          act(() => { getEditor().props().handleKeyCommand(style.toLowerCase()); });
          act(() => { wrapper.update(); });

          expect(hasInlineStyle(style)).toBeTruthy();

          // remove inline style
          act(() => { getEditor().props().handleKeyCommand(style.toLowerCase()); });
          act(() => { wrapper.update(); });

          expect(hasInlineStyle(style)).toBeFalsy();
        }
      );

      it('does nothing when an invalid command received', () => {
        // pass in invalid command
        act(() => { expect(getEditor().props().handleKeyCommand('foo')).toEqual(false); });
        act(() => { wrapper.update(); });

        expect(hasInlineStyle('BOLD')).toBeFalsy();
        expect(hasInlineStyle('ITALIC')).toBeFalsy();
      });
    });

    describe('Adding block styling through keyboard shortcuts', () => {
      beforeEach(() => {
        wrapper = render();
        getEditorParent = () => wrapper.find(TextEditor);
      });

      it.each([
        [['unordered-list-item'], ['*']],
        [['ordered-list-item'], ['1.']],
        [['unstyled'], ['@']]
      ])(
        '%s is rendered when "%s" is inputted', (block, inputKeys) => {
          inputKeys.forEach((keypress) => {
            if (block.includes('ordered-list-item')) {
              addOrderedBlockViaKeyboard();
            } else {
              act(() => { getEditor().props().handleBeforeInput(keypress); });
            }
          });
          act(() => { wrapper.update(); });

          block.forEach(style => expect(hasBlockStyle(style)).toBeTruthy());
        }
      );

      it.each([
        [['unordered-list-item'], ['*']],
        [['ordered-list-item'], ['1.']]
      ])(
        '%s is not rendered when "%s" is inputted and there is already content before', (block, inputKeys) => {
          inputKeys.forEach((keypress) => {
            if (block.includes('ordered-list-item')) {
              addOrderedBlockViaKeyboard();
              block.forEach(style => expect(hasBlockStyle(style)).toBeFalsy());
              expect(hasBlockStyle('unstyled')).toBeTruthy();
            } else {
              act(() => {
                getEditorParent().props().onChange(appendToEditorState('foo', getEditor().props()));
              });
              act(() => { wrapper.update(); });
              act(() => { getEditor().props().handleBeforeInput(keypress); });
              block.forEach(style => expect(hasBlockStyle(style)).toBeFalsy());
              expect(hasBlockStyle('unstyled')).toBeTruthy();
            }
          });
        }
      );

      it.each([
        [['unordered-list-item'], ['*']],
        [['ordered-list-item'], ['1.']]
      ])(
        '%s is not rendered when "%s" is inputted consecutively', (block, inputKeys) => {
          inputKeys.forEach((keypress) => {
            if (block.includes('ordered-list-item')) {
              addOrderedBlockViaKeyboard();

              act(() => { wrapper.update(); });

              block.forEach(style => expect(hasBlockStyle(style)).toBeTruthy());

              act(() => {
                getEditorParent().props().onChange(appendToEditorState('1', getEditor().props()));
              });
              act(() => { wrapper.update(); });

              // returns false as block already added
              act(() => { expect(getEditor().props().handleBeforeInput('.')).toEqual(false); });
            } else {
              act(() => { getEditor().props().handleBeforeInput(keypress); });
              act(() => { wrapper.update(); });

              block.forEach(style => expect(hasBlockStyle(style)).toBeTruthy());

              // returns false as block already added
              act(() => { expect(getEditor().props().handleBeforeInput(keypress)).toEqual(false); });
            }
          });
        }
      );
    });

    describe('Deleting block styling via keyboard', () => {
      it.each([
        ['unordered-list-item', 'backspace'], ['ordered-list-item', 'backspace'],
        ['unordered-list-item', 'split-block'], ['ordered-list-item', 'split-block']])(
        '%s deleted when %s pressed', (style, command) => {
          // add block
          if (style === 'ordered-list-item') {
            addOrderedBlockViaKeyboard();
          } else {
            act(() => { getEditor().props().handleBeforeInput('*'); });
          }
          act(() => { wrapper.update(); });

          expect(hasBlockStyle(style)).toBeTruthy();

          // remove block
          act(() => { getEditor().props().handleKeyCommand(command); });
          act(() => { wrapper.update(); });

          expect(hasBlockStyle(style)).toBeFalsy();
        }
      );

      it.each([
        ['unordered-list-item', 'backspace'], ['ordered-list-item', 'backspace'],
        ['unordered-list-item', 'split-block'], ['ordered-list-item', 'split-block']])(
        '%s not deleted when %s pressed and has content in block', (style, command) => {
          // add block
          act(() => {
            getEditorParent().props().onChange(injectContentBlock(getEditorParent().props().value, style));
          });
          act(() => { wrapper.update(); });

          expect(hasBlockStyle(style)).toBeTruthy();

          // try to remove block
          act(() => { expect(getEditor().props().handleKeyCommand(command)).toEqual(false); });
          act(() => { wrapper.update(); });

          // block not removed
          expect(hasBlockStyle(style)).toBeTruthy();
        }
      );

      it.each([['unordered-list-item'], ['ordered-list-item']])(
        'adds styling to %s control when currentBlock has a a given type', (style) => {
          const index = style === 'unordered-list-item' ? 2 : 3;
          act(() => {
            getEditorParent().props().onChange(injectContentBlock(getEditorParent().props().value, style));
          });
          act(() => { wrapper.update(); });

          expect(hasBlockStyle(style)).toBeTruthy();

          assertStyleMatch({
            backgroundColor: baseTheme.editor.button.hover
          }, wrapper.find(ToolbarButton).at(index));
        }
      );
    });

    describe('Decorators', () => {
      it.each(['http://foo.com', 'https://bar.co.uk', 'www.wiz.org'])(
        'renders an EditorLink when the regex pattern is matched by %s', (url) => {
          wrapper = render();
          act(() => { getEditorParent().props().onChange(appendToEditorState(url, getEditor().props())); });
          act(() => { wrapper.update(); });
          expect(getEditor().find(EditorLink).exists()).toBeTruthy();
        }
      );

      it.each(['foo://foo.com', 'https://bar.', 'wwww..s', 'http://f..o', '.ca', ' _ '])(
        'does not render an EditorLink when the regex pattern is not matched by %s', (url) => {
          wrapper = render();
          act(() => { getEditorParent().props().onChange(appendToEditorState(url, getEditor().props())); });
          act(() => { wrapper.update(); });
          expect(getEditor().find(EditorLink).exists()).toBeFalsy();
        }
      );
    });
  });

  afterAll(() => {
    // Clear Mock
    window.scrollTo.mockRestore();
  });
});
