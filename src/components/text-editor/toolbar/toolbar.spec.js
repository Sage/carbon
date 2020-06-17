import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { simulate, assertStyleMatch } from '../../../__spec_helper__/test-utils';
import baseTheme from '../../../style/themes/base';
import Toolbar from './toolbar.component';
import { StyledEditorStyleControls, StyledEditorActionControls } from './toolbar.style';
import StyledButton from '../../button/button.style';
import Button from '../../button/button.component';
import StyledToolbarButton from './toolbar-button/toolbar-button.style';
import ToolbarButton from './toolbar-button/toolbar-button.component';
import Tooltip from '../../tooltip';

const setInlineStyle = jest.fn();
const setBlockStyle = jest.fn();

const render = (props = {}, theme = baseTheme, renderer = mount) => {
  const defaultProps = {
    setInlineStyle,
    setBlockStyle
  };

  return renderer(
    <ThemeProvider theme={ theme }><Toolbar { ...defaultProps } { ...props } /></ThemeProvider>
  );
};

describe('Toolbar', () => {
  let wrapper;
  describe('styling', () => {
    it('matches the expected for the main container', () => {
      assertStyleMatch({
        padding: '8px',
        display: 'flex',
        justifyContent: 'flex-start',
        background: 'white',
        flexWrap: 'wrap',
        fontSize: '14px',
        userSelect: 'none',
        order: '2',
        border: 'none',
        backgroundColor: baseTheme.editor.toolbar.background,
        borderTop: `1px solid ${baseTheme.editor.border}`,
        minWidth: '432px'
      }, render());
    });

    it('matches the expected for the format styles controls container', () => {
      assertStyleMatch({
        display: 'inline-block',
        textAlign: 'left',
        width: '50%',
        minWidth: '60px',
        marginLeft: '-2px'
      }, render().find(StyledEditorStyleControls));
    });

    it('matches the expected for the action controls container', () => {
      assertStyleMatch({
        display: 'inline-block',
        textAlign: 'right',
        width: '50%',
        minWidth: '60px'
      }, render({ onSubmit: () => {} }).find(StyledEditorActionControls));

      assertStyleMatch({
        width: '62px',
        height: '33px'
      }, render({ onSubmit: () => {} }).find(StyledEditorActionControls), { modifier: `${StyledButton}` });

      assertStyleMatch({
        fontSize: '16px'
      }, render({ onSubmit: () => {} }).find(StyledEditorActionControls),
      { modifier: `${StyledButton}:first-of-type` });
    });
  });

  describe('Tooltip', () => {
    describe.each([[0, 'Bold'], [1, 'Italic'], [2, 'Bulleted List'], [3, 'Numbered List']])(
      'is displayed', (index, text) => {
        function checkOtherTooltipState(buttons) {
          buttons.forEach((btn, i) => {
            if (i !== index) {
              expect(btn.find(Tooltip).exists()).toBeFalsy();
            }
          });
        }

        it(`with ${text} when the button at position ${index} is focused`, () => {
          wrapper = render();
          const button = wrapper.find(StyledToolbarButton).at(index);

          act(() => {
            button.props().onFocus();
          });

          act(() => {
            wrapper.update();
          });

          act(() => {
            const buttonWrapper = wrapper.find(ToolbarButton).at(index);
            const toolTip = buttonWrapper.find(Tooltip);
            expect(toolTip.exists()).toBeTruthy();
            expect(toolTip.text()).toEqual(text);
            checkOtherTooltipState(wrapper.find(ToolbarButton));
          });
        });

        it(`with ${text} when the button at position ${index} has a 'mouseOver' event`, () => {
          wrapper = render();
          const getButton = () => wrapper.find(ToolbarButton).at(index);

          act(() => {
            getButton().props().onMouseOver();
          });

          act(() => {
            wrapper.update();
          });

          act(() => {
            const toolTip = getButton().find(Tooltip);
            expect(toolTip.exists()).toBeTruthy();
            expect(toolTip.text()).toEqual(text);
            checkOtherTooltipState(wrapper.find(ToolbarButton));
          });
        });
      }
    );

    describe.each([0, 1, 2, 3])(
      'is hidden', (index) => {
        it(`when the button at position ${index} is blurred`, () => {
          wrapper = render();
          const button = wrapper.find(StyledToolbarButton).at(index);

          act(() => {
            button.props().onFocus();
          });

          act(() => {
            wrapper.update();
          });

          act(() => {
            button.props().onBlur();
          });

          act(() => {
            wrapper.update();
          });

          act(() => {
            const buttonWrapper = wrapper.find(ToolbarButton).at(index);
            const toolTip = buttonWrapper.find(Tooltip);
            expect(toolTip.exists()).toBeFalsy();
          });
        });

        it(`when the button at position ${index} has a 'mouseLeave' event`, () => {
          wrapper = render();
          const getButton = () => wrapper.find(ToolbarButton).at(index);

          act(() => {
            getButton().props().onMouseLeave();
          });

          act(() => {
            wrapper.update();
          });

          act(() => {
            const toolTip = getButton().find(Tooltip);
            expect(toolTip.exists()).toBeFalsy();
          });
        });
      }
    );

    it('only displays one at a time', () => {
      wrapper = render();
      const getButton = index => wrapper.find(StyledToolbarButton).at(index);
      const getButtonWrapper = index => wrapper.find(ToolbarButton).at(index);

      act(() => {
        getButton(0).props().onFocus();
      });

      act(() => {
        wrapper.update();
      });

      act(() => {
        getButton(1).props().onFocus();
      });

      act(() => {
        wrapper.update();
      });

      act(() => {
        let toolTip = getButtonWrapper(0).find(Tooltip);
        expect(toolTip.exists()).toBeFalsy();

        toolTip = getButtonWrapper(1).find(Tooltip);
        expect(toolTip.exists()).toBeTruthy();
      });
    });

    describe.each([[0, 'BOLD'], [1, 'ITALIC'], [2, 'unordered-list-item'], [3, 'ordered-list-item']])(
      'Style Formatting Buttons', (index, id) => {
        beforeEach(() => { wrapper = render({ activeControls: { [id]: true } }); });

        afterEach(() => {
          jest.clearAllMocks();
        });

        it(`sets expected background-color when '${id.toLowerCase()}' is active`, () => {
          assertStyleMatch({
            backgroundColor: baseTheme.editor.button.hover
          }, wrapper.find(ToolbarButton).at(index));
        });

        it(`calls expected callback when the '${id.toLowerCase()}' button is clicked`, () => {
          wrapper.find(ToolbarButton).at(index).props().onMouseDown({ preventDefault: () => {} });
          if (index < 2) {
            expect(setInlineStyle).toHaveBeenCalledWith(id);
            expect(setBlockStyle).not.toHaveBeenCalled();
          } else {
            expect(setBlockStyle).toHaveBeenCalledWith(id);
            expect(setInlineStyle).not.toHaveBeenCalled();
          }
        });

        it(`calls expected callback when 'enter' key is pressed and '${id.toLowerCase()}' button is focused`, () => {
          act(() => {
            wrapper.find(StyledToolbarButton).at(index).props().onFocus();
          });
          simulate.keydown.pressEnter(wrapper.find(ToolbarButton).at(index));

          if (index < 2) {
            expect(setInlineStyle).toHaveBeenCalledWith(id);
            expect(setBlockStyle).not.toHaveBeenCalled();
          } else {
            expect(setBlockStyle).toHaveBeenCalledWith(id);
            expect(setInlineStyle).not.toHaveBeenCalled();
          }
        });

        it(`calls expected callback when 'space' key is pressed and '${id.toLowerCase()}' button is focused`, () => {
          act(() => {
            wrapper.find(StyledToolbarButton).at(index).props().onFocus();
          });
          simulate.keydown.pressSpace(wrapper.find(ToolbarButton).at(index));

          if (index < 2) {
            expect(setInlineStyle).toHaveBeenCalledWith(id);
            expect(setBlockStyle).not.toHaveBeenCalled();
          } else {
            expect(setBlockStyle).toHaveBeenCalledWith(id);
            expect(setInlineStyle).not.toHaveBeenCalled();
          }
        });

        it(`does nothing when key is not 'space' or 'enter' and '${id.toLowerCase()}' button is focused`, () => {
          act(() => {
            wrapper.find(StyledToolbarButton).at(index).props().onFocus();
          });
          simulate.keydown.pressD(wrapper.find(ToolbarButton).at(index));

          expect(setBlockStyle).not.toHaveBeenCalled();
          expect(setInlineStyle).not.toHaveBeenCalled();
        });
      }
    );

    describe('Action Buttons', () => {
      let saveButton, cancelButton;
      describe('with no `onSubmit` prop', () => {
        it('will not render', () => {
          wrapper = render();
          saveButton = wrapper.find(Button).findWhere(n => n.text() === 'Save');
          cancelButton = wrapper.find(Button).findWhere(n => n.text() === 'Cancel');
          expect(saveButton.exists()).toBeFalsy();
          expect(cancelButton.exists()).toBeFalsy();
        });
      });

      describe('with `onSubmit` prop', () => {
        const onSubmit = jest.fn();
        const onCancel = jest.fn();

        beforeEach(() => {
          wrapper = render({ onSubmit, onCancel });
          saveButton = wrapper.find(Button).findWhere(n => n.text() === 'Save');
          cancelButton = wrapper.find(Button).findWhere(n => n.text() === 'Cancel');
        });

        it('will render', () => {
          expect(saveButton.exists()).toBeTruthy();
          expect(cancelButton.exists()).toBeTruthy();
        });

        it('calls the `onSubmit` callback when the `Save` button is clicked', () => {
          saveButton.hostNodes().first().props().onSubmit();
          expect(onSubmit).toHaveBeenCalled();
        });

        it('calls the `onCancel` callback when the `Cancel` button is clicked', () => {
          cancelButton.hostNodes().first().props().onClick();
          expect(onCancel).toHaveBeenCalled();
        });
      });
    });
  });
});
