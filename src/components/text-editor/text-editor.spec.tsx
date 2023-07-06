/* eslint-disable jest/no-conditional-expect */
import React, { SyntheticEvent, useState } from "react";
import {
  Editor,
  EditorState,
  Modifier,
  ContentBlock,
  ContentState,
  EditorProps,
} from "draft-js";
import { act } from "react-dom/test-utils";
import { mount, ReactWrapper } from "enzyme";
import { ThemeProvider } from "styled-components";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import TextEditor, {
  TextEditorContentState,
  TextEditorProps,
  TextEditorState,
} from "./text-editor.component";
import EditorLink from "./__internal__/editor-link/editor-link.component";
import {
  StyledEditorOutline,
  StyledEditorContainer,
} from "./text-editor.style";
import ToolbarButton, {
  ToolbarButtonProps,
} from "./__internal__/toolbar/toolbar-button/toolbar-button.component";
import Counter from "./__internal__/editor-counter";
import Toolbar from "./__internal__/toolbar";
import guid from "../../__internal__/utils/helpers/guid";
import Label from "../../__internal__/label";
import LabelWrapper from "./__internal__/label-wrapper";
import EditorLinkPreview from "../link-preview";
import ValidationIcon from "../../__internal__/validations";
import { isSafari } from "../../__internal__/utils/helpers/browser-type-check";
import IconButton from "../icon-button";
import { BlockType, InlineStyleType } from "./types";

jest.mock("../../__internal__/utils/helpers/browser-type-check");
(isSafari as jest.MockedFunction<typeof isSafari>).mockImplementation(
  () => false
);

jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(
  () => "guid-12345"
);

const createContent = (text?: string) => {
  if (text) {
    return TextEditorState.createWithContent(
      TextEditorContentState.createFromText(text)
    );
  }
  return TextEditorState.createEmpty();
};

const addToEditorState = (
  text: string,
  { editorState }: { editorState: EditorState }
) => {
  const contentState = editorState.getCurrentContent();
  const selection = contentState.getSelectionAfter();

  return TextEditorState.push(
    editorState,
    Modifier.insertText(contentState, selection, text),
    "insert-fragment"
  );
};

const injectContentBlock = (value: EditorState, blockType: BlockType) => {
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
    blockMap: blockMap.set(key, newBlock as ContentBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: blockType.length,
      focusOffset: 0,
    }),
  });

  return TextEditorState.push(
    value,
    newContentState as ContentState,
    "change-block-type"
  );
};

const MockComponent = (props: Partial<TextEditorProps>) => {
  const [value, setValue] = useState(createContent());

  return (
    <TextEditor
      value={value}
      onChange={(val) => setValue(val)}
      labelText="Text Editor Label"
      {...props}
    />
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const render = (props: Partial<TextEditorProps> = {}, renderer: any = mount) =>
  renderer(<MockComponent {...props} />, {
    attachTo: document.getElementById("enzymeContainer"),
  });

describe("TextEditor", () => {
  beforeAll(() => {
    window.scrollTo = jest.fn();
  });

  let wrapper: ReactWrapper;
  describe("Styles", () => {
    testStyledSystemMargin((props) => (
      <TextEditor
        value={createContent()}
        labelText="Text Editor Label"
        onChange={jest.fn}
        {...props}
      />
    ));

    it("match the expected as default", () => {
      wrapper = render();

      assertStyleMatch(
        {
          minHeight: "220px",
          minWidth: "320px",
          backgroundColor: "var(--colorsUtilityYang100)",
          outline: "1px solid var(--colorsUtilityMajor200)",
          borderRadius: "var(--borderRadius050)",
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

    it.each([2, 3, 4])(
      "match the expected min-height when the a value of %s is passed to rows",
      (rows) => {
        wrapper = render({ rows });

        assertStyleMatch(
          {
            minHeight: `${rows * 21}px`,
          },
          wrapper.find(StyledEditorContainer)
        );
      }
    );
  });

  describe("Modifying the Editor state", () => {
    let buttons: () => ReactWrapper<ToolbarButtonProps>;
    let getEditorParent: () => ReactWrapper<TextEditorProps>;
    let getEditor: () => ReactWrapper<EditorProps>;
    let getEditorState: () => EditorState;

    const hasInlineStyle = (style: InlineStyleType | BlockType) =>
      wrapper
        .find(Editor)
        .props()
        .editorState.getCurrentInlineStyle()
        .has(style);

    const hasBlockStyle = (style: InlineStyleType | BlockType | "unstyled") => {
      const { editorState } = wrapper.find(Editor).props();
      const selection = editorState.getSelection();
      const content = editorState.getCurrentContent();
      const currentBlock = content.getBlockForKey(selection.getStartKey());
      const blockType = currentBlock.getType();

      return blockType === style;
    };

    const fireMouseDown = (props: ToolbarButtonProps) =>
      props.onMouseDown({
        preventDefault: () => {},
      } as React.MouseEvent<HTMLButtonElement>);

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
        getEditor().props().handleBeforeInput?.(".", getEditorState(), 0);
      });
    };

    beforeEach(() => {
      wrapper = render();
      getEditorParent = () => wrapper.find(TextEditor);
      getEditor = () => wrapper.find(Editor);
      getEditorState = () => getEditor().props().editorState;
    });

    describe("Clicking the controls", () => {
      it.each([
        [["BOLD"], [0]],
        [["ITALIC"], [1]],
        [
          ["BOLD", "ITALIC"],
          [0, 1],
        ],
      ] as const)(
        "%s button toggles the inline formatting",
        (styles, indexArray) => {
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
        }
      );

      it("persists inline styles even when the editor loses focus and has selection", () => {
        const value = createContent("foo");
        const selection = value.getSelection().merge({
          anchorOffset: 1,
          focusOffset: 1,
        });
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
          wrapper
            .find(Editor)
            .props()
            .onBlur?.({} as SyntheticEvent);
        });
        act(() => {
          wrapper.update();
        });
        act(() => {
          wrapper
            .find(Editor)
            .props()
            .onFocus?.({} as SyntheticEvent);
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
          wrapper
            .find(Editor)
            .props()
            .onBlur?.({} as SyntheticEvent);
        });
        act(() => {
          wrapper.update();
        });
        act(() => {
          wrapper
            .find(Editor)
            .props()
            .onFocus?.({} as SyntheticEvent);
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

      it("applies styles when a value is typed and highlighted", () => {
        const value = createContent("foo");
        const selection = value.getSelection().merge({
          anchorOffset: 0,
          focusOffset: 1,
          hasFocus: true,
        });
        act(() => {
          wrapper.find(TextEditor).props().onChange(value);
        });
        act(() => {
          wrapper
            .find(TextEditor)
            .props()
            .onChange(TextEditorState.forceSelection(value, selection));
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
        expect(hasInlineStyle("BOLD")).toBeTruthy();
      });

      it.each([
        ["unordered-list-item", 2],
        ["ordered-list-item", 3],
      ] as const)("%s button toggles the block type", (block, index) => {
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
      ] as const)(
        "%s button adds expected block formatting and removes %s",
        (first, second) => {
          const buttonsArray = [
            wrapper.find(ToolbarButton).at(2),
            wrapper.find(ToolbarButton).at(3),
          ];
          const array =
            first === "ordered-list-item"
              ? buttonsArray.reverse()
              : buttonsArray;
          let activeStyle: BlockType | InlineStyleType | "unstyled" =
            "unstyled";

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
      ] as const)(
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
          (["BOLD", "ITALIC"] as const).forEach((style) =>
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
      ] as const)('%s toggles when "%s" pressed', (style) => {
        act(() => {
          getEditor()
            .props()
            .handleKeyCommand?.(style.toLowerCase(), getEditorState(), 0);
        });
        act(() => {
          wrapper.update();
        });
        expect(hasInlineStyle(style)).toBeTruthy();
        act(() => {
          getEditor()
            .props()
            .handleKeyCommand?.(style.toLowerCase(), getEditorState(), 0);
        });
        act(() => {
          wrapper.update();
        });
        expect(hasInlineStyle(style)).toBeFalsy();
      });

      it("does nothing when an invalid command received", () => {
        act(() => {
          expect(
            getEditor().props().handleKeyCommand?.("foo", getEditorState(), 0)
          ).toEqual("not-handled");
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
      ] as const)('%s is rendered when "%s" is inputted', (block, key) => {
        if (block === "ordered-list-item") {
          addOrderedBlockViaKeyboard();
        } else {
          act(() => {
            getEditor().props().handleBeforeInput?.(key, getEditorState(), 0);
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
      ] as const)(
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
              getEditor().props().handleBeforeInput?.("*", getEditorState(), 0);
            });
            expect(hasBlockStyle(block)).toBeFalsy();
            expect(hasBlockStyle("unstyled")).toBeTruthy();
          }
        }
      );

      it.each([
        ["unordered-list-item", "*"],
        ["ordered-list-item", "1."],
      ] as const)(
        '%s is not rendered when "%s" is inputted consecutively',
        (block) => {
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
              expect(
                getEditor()
                  .props()
                  .handleBeforeInput?.(".", getEditorState(), 0)
              ).toEqual("not-handled");
            });
          } else {
            act(() => {
              getEditor().props().handleBeforeInput?.("*", getEditorState(), 0);
            });
            act(() => {
              wrapper.update();
            });
            expect(hasBlockStyle(block)).toBeTruthy();
            act(() => {
              expect(
                getEditor()
                  .props()
                  .handleBeforeInput?.("*", getEditorState(), 0)
              ).toEqual("not-handled");
            });
          }
        }
      );
    });

    describe("Double space key press", () => {
      it("does not trigger macOS feature and render a `.` if space key pressed twice", () => {
        wrapper = render();
        const editor = wrapper.find(Editor);
        const { editorState, handleBeforeInput } = editor.props();
        act(() => {
          handleBeforeInput?.(" ", editorState, 0);
          wrapper.update();
        });
        act(() => {
          expect(handleBeforeInput?.(" ", editorState, 0)).toEqual("handled");
        });
      });
    });

    describe("Pressing Tab key", () => {
      let container: HTMLDivElement | null;
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
          editor.props().keyBindingFn?.({ key: "Tab" } as React.KeyboardEvent);
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
      let container: HTMLDivElement | null;
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
          wrapper
            .find(LabelWrapper)
            .props()
            .onClick({} as React.MouseEvent<HTMLSpanElement>);
        });

        act(() => {
          wrapper.update();
        });
        expect(wrapper.find(Toolbar).props().canFocus).toEqual(false);
        setTimeout(() => expect(wrapper.find(Editor)).toBeFocused());
      });
    });

    describe("Pressing Tab and Shift keys", () => {
      it("does not pass focus to the Toolbar", () => {
        wrapper = render();
        const editor = wrapper.find(Editor);
        act(() => {
          editor.props().keyBindingFn?.({
            key: "tab",
            shiftKey: true,
          } as React.KeyboardEvent);
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
      ] as const)("%s deleted when %s pressed", (style, command) => {
        if (style === "ordered-list-item") {
          addOrderedBlockViaKeyboard();
        } else {
          act(() => {
            getEditor().props().handleBeforeInput?.("*", getEditorState(), 0);
          });
        }
        act(() => {
          wrapper.update();
        });
        expect(hasBlockStyle(style)).toBeTruthy();
        act(() => {
          getEditor().props().handleKeyCommand?.(command, getEditorState(), 0);
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
      ] as const)(
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
            expect(
              getEditor()
                .props()
                .handleKeyCommand?.(command, getEditorState(), 0)
            ).toEqual("not-handled");
          });
          act(() => {
            wrapper.update();
          });
          expect(hasBlockStyle(style)).toBeTruthy();
        }
      );

      it.each([["unordered-list-item"], ["ordered-list-item"]] as const)(
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
              backgroundColor: "var(--colorsActionMinor200)",
            },
            wrapper.find(ToolbarButton).at(index)
          );
        }
      );
    });

    describe("Decorators", () => {
      it.each([
        "http://foo.com ",
        "https://bar.co.uk/ ",
        "www.wiz.org ",
        "https://user:pwd@foo.com",
        "https://foo.com:3000",
        "https://foo.com/path/file-name.suffix",
        "https://foo.com",
        "https://foo.com/file.suffix?query=value&query2=value2",
        "https://foo.com/file.suffix#hash",
        "https://user:pwd@foo.com:3000/path/file-name.suffix?query-string#hash",
      ])(
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
        ":1rrr",
        "https://user@foo.com",
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
          expect(
            editor
              .props()
              .handleKeyCommand?.("split-block", getEditorState(), 0)
          ).toEqual("handled");
        });
      });

      it("allows pasting into input that would not exceed the limit", () => {
        wrapper = render({ characterLimit: 2 });
        const editor = wrapper.find(Editor);
        act(() => {
          expect(
            editor.props().handlePastedText?.("ab", undefined, getEditorState())
          ).toEqual("not-handled");
        });
      });

      it("prevents pasting into input that would exceed the limit", () => {
        wrapper = render({ characterLimit: 2 });
        const editor = wrapper.find(Editor);
        act(() => {
          expect(
            editor
              .props()
              .handlePastedText?.("abc", undefined, getEditorState())
          ).toEqual("handled");
        });
      });

      it("allows input when content does not exceed limit", () => {
        wrapper = render({ characterLimit: 1 });
        const editor = wrapper.find(Editor);
        act(() => {
          expect(
            editor.props().handleBeforeInput?.("*", getEditorState(), 0)
          ).toEqual("handled");
        });
      });

      it("prevents input when content would exceed limit", () => {
        wrapper = render({ characterLimit: 0 });
        const editor = wrapper.find(Editor);
        act(() => {
          expect(
            editor.props().handleBeforeInput?.("*", getEditorState(), 0)
          ).toEqual("handled");
        });
      });
    });
  });

  describe("required", () => {
    it("the isRequired prop is passed to the label", () => {
      wrapper = render({ labelText: "required", required: true });

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
          outline: "2px solid var(--colorsSemanticNegative500)",
        },
        render({ error: "error" }).find(StyledEditorContainer)
      );
    });

    it("applies the correct outline-offset when there is an error and the editor is focused", () => {
      wrapper = render({ error: "error" });
      act(() => {
        wrapper
          .find(Editor)
          .props()
          .onFocus?.({} as SyntheticEvent);
      });
      act(() => {
        wrapper.update();
      });

      assertStyleMatch(
        {
          boxShadow:
            "0px 0px 0px var(--borderWidth300) var(--colorsSemanticFocus500),0px 0px 0px var(--borderWidth600) var(--colorsUtilityYin090)",
        },
        wrapper.find(StyledEditorOutline)
      );
    });
  });

  describe("custom row prop type", () => {
    let consoleSpy: jest.SpyInstance<
      void,
      [message?: unknown, ...optionalParams: unknown[]]
    >;
    beforeEach(() => {
      consoleSpy = jest
        .spyOn(global.console, "warn")
        .mockImplementation(() => undefined);
    });

    afterEach(() => {
      consoleSpy.mockRestore();
    });

    afterAll(() => {
      consoleSpy.mockClear();
    });

    describe("when value is number less than 2", () => {
      it("throws an error", () => {
        TextEditor.displayName = "EditorWithRowsError";
        render({ rows: 1 });

        expect(consoleSpy).toHaveBeenCalledWith(
          "Prop rows must be a number value that is 2 or greater to override the min-height of the `EditorWithRowsError`"
        );
      });
    });
  });

  describe("Link previews", () => {
    const onLinkAdded = jest.fn();

    it("reports the url when a valid one is added and enter is pressed", () => {
      const url = "http://foo.com";
      wrapper = render({ onLinkAdded });

      act(() => {
        wrapper
          .find(TextEditor)
          .props()
          .onChange(addToEditorState(url, wrapper.find(Editor).props()));
      });
      act(() => {
        wrapper.update();
      });
      act(() => {
        const { handleKeyCommand, editorState } = wrapper.find(Editor).props();
        handleKeyCommand?.("split-block", editorState, 0);
      });

      expect(onLinkAdded).toHaveBeenCalledWith(url);
    });

    it("reports the url when a valid one is inputted and space is pressed", () => {
      const url = "http://foo.com";
      wrapper = render({ onLinkAdded });

      act(() => {
        wrapper
          .find(TextEditor)
          .props()
          .onChange(addToEditorState(url, wrapper.find(Editor).props()));
      });
      act(() => {
        wrapper.update();
      });
      act(() => {
        const { handleBeforeInput, editorState } = wrapper.find(Editor).props();

        handleBeforeInput?.(" ", editorState, 0);
      });

      expect(onLinkAdded).toHaveBeenCalledWith(url);
    });

    it("renders any EditorLinkPreviews passed in via the `previews` prop", () => {
      const previews = [
        <EditorLinkPreview key="1" />,
        <EditorLinkPreview key="2" />,
        <EditorLinkPreview key="3" />,
      ];
      wrapper = render({ onLinkAdded, previews });
      expect(wrapper.find(EditorLinkPreview).length).toEqual(3);
    });

    it("does not render anything that is a number or string", () => {
      const previews = [123, "foo", 456];
      wrapper = render({ onLinkAdded, previews });
      expect(wrapper.find(EditorLinkPreview).length).toEqual(0);
    });

    it("calls the onClose callback if one is passed when the close icon is clicked", () => {
      const onClose = jest.fn();
      const previews = [
        <EditorLinkPreview onClose={onClose} url="foo" key="1" />,
        <EditorLinkPreview key="2" />,
        <EditorLinkPreview key="3" />,
      ];
      wrapper = render({ onLinkAdded, previews });
      wrapper.find(EditorLinkPreview).find(IconButton).simulate("click");
      expect(onClose).toHaveBeenCalledWith("foo");
    });
  });

  afterAll(() => {
    // Clear Mock
    (window.scrollTo as jest.Mock).mockRestore();
  });

  /* These next two tests can be removed when we remove the focusRedesignOptOut prop */
  it("does not apply focus styling when isFocused is true and focusRedesignOptOut is true", () => {
    const focusRedesignWrapper = mount(
      <ThemeProvider theme={{ focusRedesignOptOut: true }}>
        <StyledEditorOutline isFocused />
      </ThemeProvider>
    );

    assertStyleMatch(
      {
        outline: "3px solid var(--colorsSemanticFocus500)",
      },
      focusRedesignWrapper
    );

    assertStyleMatch(
      {
        outlineOffset: "1px",
      },
      focusRedesignWrapper.find("div")
    );
  });

  it("applies error styling when hasError is true and focusRedesignOptOut and isForcused are also true", () => {
    const focusRedesignWrapper = mount(
      <ThemeProvider theme={{ focusRedesignOptOut: true }}>
        <StyledEditorOutline isFocused hasError />
      </ThemeProvider>
    );

    assertStyleMatch(
      {
        outline: "3px solid var(--colorsSemanticFocus500)",
      },
      focusRedesignWrapper
    );

    assertStyleMatch(
      {
        outlineOffset: "2px",
      },
      focusRedesignWrapper.find("div")
    );
  });
});
