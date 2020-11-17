import React, { useState } from "react";
import { Editor, Modifier } from "draft-js";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import { assertStyleMatch } from "../../../__spec_helper__/test-utils";
import mintTheme from "../../../style/themes/mint";
import TextEditor, {
  TextEditorContentState,
  TextEditorState,
} from "./text-editor.component";
import EditorLink from "./editor-link/editor-link.component";
import {
  StyledEditorOutline,
  StyledEditorContainer,
} from "./text-editor.style";
import ToolbarButton from "./toolbar/toolbar-button/toolbar-button.component";
import Counter from "./editor-counter";
import Toolbar from "./toolbar";
import guid from "../../../utils/helpers/guid";
import Label from "../../../__experimental__/components/label";
import LabelWrapper from "./label-wrapper";
import ValidationIcon from "../../validations";
import { isSafari } from "../../../utils/helpers/browser-type-check";

jest.mock("../../../utils/helpers/browser-type-check");
isSafari.mockImplementation(() => false);

jest.mock("../../../utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

const createContent = (text) => {
  if (text) {
    return TextEditorState.createWithContent(
      TextEditorContentState.createFromText(text)
    );
  }
  return TextEditorState.createEmpty();
};

const addToEditorState = (text, { editorState }) => {
  const contentState = editorState.getCurrentContent();
  const selection = contentState.getSelectionAfter();

  return TextEditorState.push(
    editorState,
    Modifier.insertText(contentState, selection, text),
    "insert-fragment"
  );
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
    data: {},
  });

  const newContentState = contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: blockType.length,
      focusOffset: 0,
    }),
  });

  return TextEditorState.push(value, newContentState, "change-block-type");
};

const MockComponent = (props) => {
  const [value, setValue] = useState(createContent());

  return (
    <ThemeProvider theme={mintTheme}>
      <TextEditor
        value={value}
        onChange={(val) => setValue(val)}
        labelText="Text Editor Label"
        labelId="foo"
        {...props}
      />
    </ThemeProvider>
  );
};

const render = (props = {}, renderer = mount) =>
  renderer(<MockComponent {...props} />, {
    attachTo: document.getElementById("enzymeContainer"),
  });

describe("TextEditor", () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  let wrapper;
  describe("Styles", () => {
    it("match the expected as default", () => {
      wrapper = render();

      assertStyleMatch(
        {
          minHeight: "220px",
          minWidth: "320px",
          backgroundColor: mintTheme.colors.white,
          outline: `1px solid ${mintTheme.editor.border}`,
        },
        wrapper.find(StyledEditorContainer)
      );

      assertStyleMatch(
        {
          minHeight: "inherit",
          height: "100%",
          minWidth: "290px",
          margin: "4px",
        },
        wrapper.find(StyledEditorContainer),
        { modifier: "div.DraftEditor-root" }
      );

      assertStyleMatch(
        {
          minHeight: "inherit",
          height: "100%",
          minWidth: "290px",
          padding: "14px 8px",
        },
        wrapper.find(StyledEditorContainer),
        { modifier: "div.public-DraftEditor-content" }
      );
    });

    it("add gold outline when focused removes outline on blur", () => {
      wrapper = render({ value: createContent("foo") });
      act(() => {
        wrapper.find(Editor).props().onFocus();
      });
      act(() => {
        wrapper.update();
      });

      assertStyleMatch(
        {
          outline: `3px solid ${mintTheme.colors.focus}`,
          outlineOffset: "1px",
        },
        wrapper.find(StyledEditorOutline)
      );

      act(() => {
        wrapper.find(Editor).props().onBlur();
      });
      act(() => {
        wrapper.update();
      });

      assertStyleMatch(
        {
          outline: "none",
        },
        wrapper.find(StyledEditorOutline)
      );
    });
  });

  describe("Modifying the Editor state", () => {
    let buttons, getEditorParent, getEditor;

    const hasInlineStyle = (style) =>
      wrapper
        .find(Editor)
        .props()
        .editorState.getCurrentInlineStyle()
        .has(style);

    const hasBlockStyle = (style) => {
      const { editorState } = wrapper.find(Editor).props();
      const selection = editorState.getSelection();
      const content = editorState.getCurrentContent();
      const currentBlock = content.getBlockForKey(selection.getStartKey());
      const blockType = currentBlock.getType();

      return blockType === style;
    };

    const fireMouseDown = (props) =>
      props.onMouseDown({ preventDefault: jest.fn() });

    const addOrderedBlockViaKeyboard = () => {
      act(() => {
        getEditorParent()
          .props()
          .onChange(addToEditorState("1", getEditor().props()));
      });
      act(() => {
        wrapper.update();
      });
      act(() => {
        getEditor().props().handleBeforeInput(".");
      });
    };

    beforeEach(() => {
      wrapper = render();
      getEditorParent = () => wrapper.find(TextEditor);
      getEditor = () => wrapper.find(Editor);
    });

    describe("Clicking the controls", () => {
      it.each([
        [["BOLD"], [0]],
        [["ITALIC"], [1]],
        [
          ["BOLD", "ITALIC"],
          [0, 1],
        ],
      ])("%s button toggles the inline formatting", (styles, indexArray) => {
        buttons = () => wrapper.find(ToolbarButton);
        indexArray.forEach((i) => {
          act(() => {
            fireMouseDown(buttons().at(i).props());
          });
          act(() => {
            wrapper.update();
          });
        });
        styles.forEach((style) => expect(hasInlineStyle(style)).toBeTruthy());
        indexArray.forEach((i) => {
          act(() => {
            fireMouseDown(buttons().at(i).props());
          });
          act(() => {
            wrapper.update();
          });
        });
        styles.forEach((style) => expect(hasInlineStyle(style)).toBeFalsy());
      });

      it("persists inline styles even when the editor loses focus and has selection", () => {
        const value = createContent("foo");
        const selection = value
          .getSelection()
          .merge({ anchorOffset: "0", focusOffset: "1" });
        act(() => {
          wrapper
            .find(TextEditor)
            .props()
            .onChange(TextEditorState.forceSelection(value, selection));
        });
        act(() => {
          wrapper.update();
        });

        const button = wrapper.find(ToolbarButton).at(0);

        act(() => {
          fireMouseDown(button.props());
        });
        act(() => {
          wrapper.update();
        });
        act(() => {
          wrapper.find(Editor).props().onBlur();
        });
        act(() => {
          wrapper.update();
        });
        act(() => {
          wrapper.find(Editor).props().onFocus();
        });
        expect(hasInlineStyle("BOLD")).toBeTruthy();
      });

      it("persists inline styles even when the editor loses focus and no selection", () => {
        act(() => {
          wrapper.find(TextEditor).props().onChange(createContent("foo"));
        });
        act(() => {
          wrapper.update();
        });

        const button = wrapper.find(ToolbarButton).at(0);

        act(() => {
          fireMouseDown(button.props());
        });
        act(() => {
          wrapper.update();
        });
        act(() => {
          wrapper.find(Editor).props().onBlur();
        });
        act(() => {
          wrapper.update();
        });
        act(() => {
          wrapper.find(Editor).props().onFocus();
        });
        expect(hasInlineStyle("BOLD")).toBeTruthy();
      });

      it("persists inline styles applied straight before a block type is added", () => {
        act(() => {
          wrapper.find(TextEditor).props().onChange(createContent("foo"));
        });
        act(() => {
          wrapper.update();
        });
        act(() => {
          fireMouseDown(wrapper.find(ToolbarButton).at(0).props());
        });
        act(() => {
          wrapper.update();
        });
        act(() => {
          fireMouseDown(wrapper.find(ToolbarButton).at(2).props());
        });
        act(() => {
          wrapper.update();
        });
        expect(hasInlineStyle("BOLD")).toBeTruthy();
      });

      it.each([
        ["unordered-list-item", 2],
        ["ordered-list-item", 3],
      ])("%s button toggles the block type", (block, index) => {
        const getButton = () => wrapper.find(ToolbarButton).at(index);
        act(() => {
          fireMouseDown(getButton().props());
        });
        act(() => {
          wrapper.update();
        });
        expect(hasBlockStyle(block)).toBeTruthy();
        act(() => {
          fireMouseDown(getButton().props());
        });
        act(() => {
          wrapper.update();
        });
        expect(hasBlockStyle(block)).toBeFalsy();
        expect(hasBlockStyle("unstyled")).toBeTruthy();
      });

      it.each([
        ["unordered-list-item", "ordered-list-item"],
        ["ordered-list-item", "unordered-list-item"],
      ])(
        "%s button adds expected block formatting and removes %s",
        (first, second) => {
          buttons = [
            wrapper.find(ToolbarButton).at(2),
            wrapper.find(ToolbarButton).at(3),
          ];
          const array =
            first === "ordered-list-item" ? buttons.reverse() : buttons;
          let activeStyle = "unstyled";

          array.forEach((button, i) => {
            expect(hasBlockStyle(activeStyle)).toBeTruthy();
            act(() => {
              fireMouseDown(button.props());
            });
            act(() => {
              wrapper.update();
            });
            const assertedStyle = i === 0 ? first : second;
            expect(hasBlockStyle(assertedStyle)).toBeTruthy();
            expect(hasBlockStyle(activeStyle)).toBeFalsy();
            activeStyle = assertedStyle;
          });
        }
      );

      it.each([
        ["unordered-list-item", 2],
        ["ordered-list-item", 3],
      ])(
        "BOLD, ITALIC and %s buttons add the expected formatting to the editor state",
        (block, index) => {
          buttons = () => wrapper.find(ToolbarButton);
          act(() => {
            fireMouseDown(buttons().at(index).props());
          });
          act(() => {
            fireMouseDown(buttons().at(0).props());
          });
          act(() => {
            fireMouseDown(buttons().at(1).props());
          });
          act(() => {
            wrapper.update();
          });
          ["BOLD", "ITALIC"].forEach((style) =>
            expect(hasInlineStyle(style)).toBeTruthy()
          );
          expect(hasBlockStyle(block)).toBeTruthy();
        }
      );
    });

    describe("Adding inline styling through keyboard shortcuts", () => {
      it.each([
        ["BOLD", "cmd + b"],
        ["ITALIC", "cmd + i"],
      ])('%s toggles when "%s" pressed', (style) => {
        act(() => {
          getEditor().props().handleKeyCommand(style.toLowerCase());
        });
        act(() => {
          wrapper.update();
        });
        expect(hasInlineStyle(style)).toBeTruthy();
        act(() => {
          getEditor().props().handleKeyCommand(style.toLowerCase());
        });
        act(() => {
          wrapper.update();
        });
        expect(hasInlineStyle(style)).toBeFalsy();
      });

      it("does nothing when an invalid command received", () => {
        act(() => {
          expect(getEditor().props().handleKeyCommand("foo")).toEqual(false);
        });
        act(() => {
          wrapper.update();
        });
        expect(hasInlineStyle("BOLD")).toBeFalsy();
        expect(hasInlineStyle("ITALIC")).toBeFalsy();
      });
    });

    describe("Adding block styling through keyboard shortcuts", () => {
      beforeEach(() => {
        wrapper = render();
        getEditorParent = () => wrapper.find(TextEditor);
      });

      it.each([
        ["unordered-list-item", "*"],
        ["ordered-list-item", "1."],
        ["unstyled", "@"],
      ])('%s is rendered when "%s" is inputted', (block, key) => {
        if (block === "ordered-list-item") {
          addOrderedBlockViaKeyboard();
        } else {
          act(() => {
            getEditor().props().handleBeforeInput(key);
          });
        }
        act(() => {
          wrapper.update();
        });
        expect(hasBlockStyle(block)).toBeTruthy();
      });

      it.each([
        ["unordered-list-item", "*"],
        ["ordered-list-item", "1."],
      ])(
        '%s is not rendered when "%s" is inputted and there is already content before',
        (block) => {
          if (block === "ordered-list-item") {
            addOrderedBlockViaKeyboard();
            expect(hasBlockStyle(block)).toBeFalsy();
            expect(hasBlockStyle("unstyled")).toBeTruthy();
          } else {
            act(() => {
              getEditorParent()
                .props()
                .onChange(addToEditorState("foo", getEditor().props()));
            });
            act(() => {
              wrapper.update();
            });
            act(() => {
              getEditor().props().handleBeforeInput("*");
            });
            expect(hasBlockStyle(block)).toBeFalsy();
            expect(hasBlockStyle("unstyled")).toBeTruthy();
          }
        }
      );

      it.each([
        ["unordered-list-item", "*"],
        ["ordered-list-item", "1."],
      ])('%s is not rendered when "%s" is inputted consecutively', (block) => {
        if (block === "ordered-list-item") {
          addOrderedBlockViaKeyboard();
          act(() => {
            wrapper.update();
          });
          expect(hasBlockStyle(block)).toBeTruthy();
          act(() => {
            getEditorParent()
              .props()
              .onChange(addToEditorState("1", getEditor().props()));
          });
          act(() => {
            wrapper.update();
          });
          act(() => {
            expect(getEditor().props().handleBeforeInput(".")).toEqual(false);
          });
        } else {
          act(() => {
            getEditor().props().handleBeforeInput("*");
          });
          act(() => {
            wrapper.update();
          });
          expect(hasBlockStyle(block)).toBeTruthy();
          act(() => {
            expect(getEditor().props().handleBeforeInput("*")).toEqual(false);
          });
        }
      });
    });

    describe("Double space key press", () => {
      it("does not trigger macOS feature and render a `.` if space key pressed twice", () => {
        wrapper = render();
        const editor = wrapper.find(Editor);
        const { editorState, handleBeforeInput } = editor.props();
        act(() => {
          handleBeforeInput(" ", editorState, 0);
          wrapper.update();
        });
        act(() => {
          expect(handleBeforeInput(" ", editorState)).toEqual("handled");
        });
      });
    });

    describe("Pressing Tab key", () => {
      let container;
      beforeEach(() => {
        container = document.createElement("div");
        container.id = "enzymeContainer";
        document.body.appendChild(container);
      });

      afterEach(() => {
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }

        container = null;
      });

      it("passes focus to the Toolbar first button", () => {
        wrapper = render();
        const editor = wrapper.find(Editor);
        act(() => {
          editor.props().keyBindingFn({ key: "tab", which: 9 });
        });
        act(() => {
          wrapper.update();
        });
        expect(wrapper.find(Toolbar).props().canFocus).toEqual(true);
        setTimeout(() =>
          expect(wrapper.find(ToolbarButton).at(0).getDOMNode()).toBeFocused()
        );
      });
    });

    describe("Mouse click on Label", () => {
      let container;
      beforeEach(() => {
        container = document.createElement("div");
        container.id = "enzymeContainer";
        document.body.appendChild(container);
      });

      afterEach(() => {
        if (container && container.parentNode) {
          container.parentNode.removeChild(container);
        }

        container = null;
      });

      it("set focus to TextEditor component", () => {
        act(() => {
          wrapper.find(LabelWrapper).props().onClick();
        });

        act(() => {
          wrapper.update();
        });

        setTimeout(() => expect(wrapper.find(Editor)).toBeFocused());
      });
    });

    describe("Pressing Tab and Shift keys", () => {
      it("does not pass focus to the Toolbar", () => {
        wrapper = render();
        const editor = wrapper.find(Editor);
        act(() => {
          editor.props().keyBindingFn({ key: "tab", which: 9, shiftKey: true });
        });
        act(() => {
          wrapper.update();
        });
        expect(wrapper.find(Toolbar).props().canFocus).toEqual(false);
      });
    });

    describe("Deleting block styling via keyboard", () => {
      it.each([
        ["unordered-list-item", "backspace"],
        ["ordered-list-item", "backspace"],
        ["unordered-list-item", "split-block"],
        ["ordered-list-item", "split-block"],
      ])("%s deleted when %s pressed", (style, command) => {
        if (style === "ordered-list-item") {
          addOrderedBlockViaKeyboard();
        } else {
          act(() => {
            getEditor().props().handleBeforeInput("*");
          });
        }
        act(() => {
          wrapper.update();
        });
        expect(hasBlockStyle(style)).toBeTruthy();
        act(() => {
          getEditor().props().handleKeyCommand(command);
        });
        act(() => {
          wrapper.update();
        });
        expect(hasBlockStyle(style)).toBeFalsy();
      });

      it.each([
        ["unordered-list-item", "backspace"],
        ["ordered-list-item", "backspace"],
        ["unordered-list-item", "split-block"],
        ["ordered-list-item", "split-block"],
      ])(
        "%s not deleted when %s pressed and has content in block",
        (style, command) => {
          act(() => {
            getEditorParent()
              .props()
              .onChange(
                injectContentBlock(getEditorParent().props().value, style)
              );
          });
          act(() => {
            wrapper.update();
          });
          expect(hasBlockStyle(style)).toBeTruthy();
          act(() => {
            expect(getEditor().props().handleKeyCommand(command)).toEqual(
              false
            );
          });
          act(() => {
            wrapper.update();
          });
          expect(hasBlockStyle(style)).toBeTruthy();
        }
      );

      it.each([["unordered-list-item"], ["ordered-list-item"]])(
        "adds styling to %s control when currentBlock has a a given type",
        (style) => {
          const index = style === "unordered-list-item" ? 2 : 3;
          act(() => {
            getEditorParent()
              .props()
              .onChange(
                injectContentBlock(getEditorParent().props().value, style)
              );
          });
          act(() => {
            wrapper.update();
          });
          expect(hasBlockStyle(style)).toBeTruthy();
          assertStyleMatch(
            {
              backgroundColor: mintTheme.editor.button.hover,
            },
            wrapper.find(ToolbarButton).at(index)
          );
        }
      );
    });

    describe("Decorators", () => {
      it.each(["http://foo.com ", "https://bar.co.uk/ ", "www.wiz.org "])(
        "renders an EditorLink when the regex pattern is matched by %s",
        (url) => {
          wrapper = render();
          act(() => {
            getEditorParent()
              .props()
              .onChange(addToEditorState(url, getEditor().props()));
          });
          act(() => {
            wrapper.update();
          });
          expect(getEditor().find(EditorLink).exists()).toBeTruthy();
        }
      );

      it.each([
        ["foo www.foo.com foo ", 1],
        [" foo https://foo.com   http://foo.com ", 2],
        [
          "  www.foo.com foo    https://foo.com         http://foo.com/foo#  foo ",
          3,
        ],
      ])(
        "renders the expected number of EditorLink when %s is input",
        (urlString, count) => {
          wrapper = render();
          act(() => {
            getEditorParent().props().onChange(createContent(urlString));
          });
          act(() => {
            wrapper.update();
          });
          expect(getEditor().find(EditorLink)).toHaveLength(count);
        }
      );

      it.each([
        "foo://foo.com",
        "https://bar.",
        "wwww..s",
        "http://f..o",
        ".ca",
        " _ ",
      ])(
        "does not render an EditorLink when the regex pattern is not matched by %s",
        (url) => {
          wrapper = render();
          act(() => {
            getEditorParent()
              .props()
              .onChange(addToEditorState(url, getEditor().props()));
          });
          act(() => {
            wrapper.update();
          });
          expect(getEditor().find(EditorLink).exists()).toBeFalsy();
        }
      );
    });

    describe("Character Limit", () => {
      describe("Counter", () => {
        it("displays the default text when no prop value passed", () => {
          wrapper = render();
          expect(wrapper.find(Counter).text()).toEqual("3000");
        });

        it("overrides the text when `characterLimit` prop passed", () => {
          wrapper = render({ characterLimit: 200 });
          expect(wrapper.find(Counter).text()).toEqual("200");
        });

        it("the text updates as content is added to the editor", () => {
          wrapper = render({ characterLimit: 10 });
          const textEditor = wrapper.find(TextEditor);
          const editor = wrapper.find(Editor);
          act(() => {
            textEditor
              .props()
              .onChange(addToEditorState("foo foo", editor.props()));
          });
          expect(wrapper.find(Counter).text()).toEqual("3");
        });
      });

      it("prevents enter key press when the limit has been reached", () => {
        wrapper = render({ characterLimit: 0 });
        const editor = wrapper.find(Editor);
        act(() => {
          expect(editor.props().handleKeyCommand("split-block")).toEqual(
            "handled"
          );
        });
      });

      it("allows pasting into input that would not exceed the limit", () => {
        wrapper = render({ characterLimit: 2 });
        const editor = wrapper.find(Editor);
        act(() => {
          expect(editor.props().handlePastedText("ab")).toEqual("not-handled");
        });
      });

      it("prevents pasting into input that would exceed the limit", () => {
        wrapper = render({ characterLimit: 2 });
        const editor = wrapper.find(Editor);
        act(() => {
          expect(editor.props().handlePastedText("abc")).toEqual("handled");
        });
      });

      it("allows input when content does not exceed limit", () => {
        wrapper = render({ characterLimit: 1 });
        const editor = wrapper.find(Editor);
        act(() => {
          expect(editor.props().handleBeforeInput("*")).toEqual(true);
        });
      });

      it("prevents input when content would exceed limit", () => {
        wrapper = render({ characterLimit: 0 });
        const editor = wrapper.find(Editor);
        act(() => {
          expect(editor.props().handleBeforeInput("*")).toEqual("handled");
        });
      });
    });
  });

  describe("required", () => {
    it("the isRequired prop is passed to the label", () => {
      wrapper = render({ label: "required", required: true });

      const label = wrapper.find(Label);
      expect(label.prop("isRequired")).toBe(true);
    });
  });

  describe("validation", () => {
    it.each([{ error: "error" }, { warning: "warning" }, { info: "info" }])(
      "passes the validation props to the counter and renders the icon",
      (msg) => {
        expect(
          render({ ...msg })
            .find(ValidationIcon)
            .exists()
        ).toEqual(true);
      }
    );

    it("applies the expected outline when an error message is passed", () => {
      assertStyleMatch(
        {
          outline: `2px solid ${mintTheme.colors.error}`,
        },
        render({ error: "error" }).find(StyledEditorContainer)
      );
    });

    it("applies the correct outline-offset when there is an error and the editor is focused", () => {
      wrapper = render({ error: "error" });
      act(() => {
        wrapper.find(Editor).props().onFocus();
      });
      act(() => {
        wrapper.update();
      });

      assertStyleMatch(
        {
          outline: `3px solid ${mintTheme.colors.focus}`,
          outlineOffset: "2px",
        },
        wrapper.find(StyledEditorOutline)
      );
    });
  });

  afterAll(() => {
    // Clear Mock
    window.scrollTo.mockRestore();
  });
});
