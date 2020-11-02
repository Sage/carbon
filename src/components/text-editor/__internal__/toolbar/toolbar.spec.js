import React from "react";
import { act } from "react-dom/test-utils";
import { mount } from "enzyme";
import { ThemeProvider } from "styled-components";
import {
  simulate,
  assertStyleMatch,
} from "../../../../__spec_helper__/test-utils";
import baseTheme from "../../../../style/themes/base";
import Toolbar from "./toolbar.component";
import {
  StyledEditorStyleControls,
  StyledEditorActionControls,
} from "./toolbar.style";
import StyledButton from "../../../button/button.style";
import Button from "../../../button/button.component";
import StyledToolbarButton from "./toolbar-button/toolbar-button.style";
import ToolbarButton from "./toolbar-button/toolbar-button.component";
import Tooltip from "../../../tooltip";

const setInlineStyle = jest.fn();
const setBlockStyle = jest.fn();

const render = (props = {}, theme = baseTheme, renderer = mount) => {
  const defaultProps = {
    setInlineStyle,
    setBlockStyle,
    activeControls: {},
  };

  return renderer(
    <ThemeProvider theme={theme}>
      <Toolbar {...defaultProps} {...props} />
    </ThemeProvider>,
    { attachTo: document.getElementById("enzymeContainer") }
  );
};

describe("Toolbar", () => {
  let wrapper;
  let container;
  describe("styling", () => {
    it("matches the expected for the main container", () => {
      assertStyleMatch(
        {
          padding: "8px",
          display: "flex",
          justifyContent: "flex-start",
          background: "white",
          flexWrap: "wrap",
          fontSize: "14px",
          userSelect: "none",
          order: "2",
          border: "none",
          backgroundColor: baseTheme.editor.toolbar.background,
          borderTop: `1px solid ${baseTheme.editor.border}`,
          minWidth: "290px",
        },
        render()
      );
    });

    it("matches the expected for the format styles controls container", () => {
      assertStyleMatch(
        {
          display: "inline-block",
          textAlign: "left",
          width: "50%",
          minWidth: "60px",
          marginLeft: "-2px",
        },
        render().find(StyledEditorStyleControls)
      );
    });

    it("matches the expected for the action controls container", () => {
      assertStyleMatch(
        {
          display: "inline-block",
          textAlign: "right",
          width: "50%",
          minWidth: "60px",
        },
        render({ onSave: () => {} }).find(StyledEditorActionControls)
      );

      assertStyleMatch(
        {
          width: "62px",
          minHeight: "33px",
        },
        render({ onSave: () => {} }).find(StyledEditorActionControls),
        { modifier: `${StyledButton}` }
      );

      assertStyleMatch(
        {
          fontSize: "16px",
        },
        render({ onSave: () => {} }).find(StyledEditorActionControls),
        { modifier: `${StyledButton}:first-of-type` }
      );
    });
  });

  describe("Tooltip", () => {
    describe.each([
      [0, "Bold"],
      [1, "Italic"],
      [2, "Bulleted List"],
      [3, "Numbered List"],
    ])("is displayed", (index, text) => {
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
    });

    describe.each([0, 1, 2, 3])("is hidden", (index) => {
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
    });
    describe("Keyboard accessibility", () => {
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

      describe("Pressing the right arrow key when the controls are focused", () => {
        wrapper = render({ canFocus: true });
        it.each([0, 1, 2, 3])("moves focus to the next button", (index) => {
          simulate.keydown.pressRightArrow(
            wrapper.find(ToolbarButton).at(index)
          );
          const newIndex = index < 3 ? index + 1 : 0;
          setTimeout(() =>
            expect(
              wrapper.find(ToolbarButton).at(newIndex).getDOMNode()
            ).toBeFocused()
          );
        });
      });

      describe("Pressing the left arrow key when the controls are focused", () => {
        wrapper = render({ canFocus: true });
        it.each([0, 3, 2, 1])("moves focus to the previous button", (index) => {
          simulate.keydown.pressLeftArrow(
            wrapper.find(ToolbarButton).at(index)
          );
          const newIndex = index === 0 ? 3 : index - 1;
          setTimeout(() =>
            expect(
              wrapper.find(ToolbarButton).at(newIndex).getDOMNode()
            ).toBeFocused()
          );
        });
      });

      describe("Pressing the tab key when the controls are focused", () => {
        wrapper = render({ canFocus: true });
        const buttons = wrapper.find(StyledToolbarButton);
        act(() => {
          simulate.keydown.pressTab(wrapper.find(Toolbar));
        });

        it.each([1, 2, 3])("does not move focus to next control", (index) => {
          act(() => {
            wrapper.update();
          });
          simulate.keydown.pressTab(buttons.at(index));
          expect(buttons.at(index).getDOMNode()).not.toBeFocused();
        });
      });
    });

    it("only displays one at a time", () => {
      wrapper = render();
      const getButton = (index) => wrapper.find(StyledToolbarButton).at(index);
      const getButtonWrapper = (index) => wrapper.find(ToolbarButton).at(index);

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

    describe.each([
      [0, "BOLD"],
      [1, "ITALIC"],
      [2, "unordered-list-item"],
      [3, "ordered-list-item"],
    ])("Style Formatting Buttons", (index, id) => {
      beforeEach(() => {
        wrapper = render({ activeControls: { [id]: true } });
      });

      afterEach(() => {
        jest.clearAllMocks();
      });

      it(`sets expected background-color when '${id.toLowerCase()}' is active`, () => {
        assertStyleMatch(
          {
            backgroundColor: baseTheme.editor.button.hover,
          },
          wrapper.find(ToolbarButton).at(index)
        );
      });

      it(`calls expected callback when the '${id.toLowerCase()}' button is clicked`, () => {
        wrapper
          .find(ToolbarButton)
          .at(index)
          .props()
          .onMouseDown({ preventDefault: () => {} });
        if (index < 2) {
          expect(setInlineStyle).toHaveBeenCalledWith(expect.anything(), id);
          expect(setBlockStyle).not.toHaveBeenCalled();
        } else {
          expect(setBlockStyle).toHaveBeenCalledWith(expect.anything(), id);
          expect(setInlineStyle).not.toHaveBeenCalled();
        }
      });

      it(`calls expected callback when 'enter' key is pressed and '${id.toLowerCase()}' button is focused`, () => {
        act(() => {
          wrapper.find(StyledToolbarButton).at(index).props().onFocus();
        });
        simulate.keydown.pressEnter(wrapper.find(ToolbarButton).at(index));

        if (index < 2) {
          expect(setInlineStyle).toHaveBeenCalledWith(expect.anything(), id);
          expect(setBlockStyle).not.toHaveBeenCalled();
        } else {
          expect(setBlockStyle).toHaveBeenCalledWith(expect.anything(), id);
          expect(setInlineStyle).not.toHaveBeenCalled();
        }
      });

      it(`calls expected callback when 'space' key is pressed and '${id.toLowerCase()}' button is focused`, () => {
        act(() => {
          wrapper.find(StyledToolbarButton).at(index).props().onFocus();
        });
        simulate.keydown.pressSpace(wrapper.find(ToolbarButton).at(index));

        if (index < 2) {
          expect(setInlineStyle).toHaveBeenCalledWith(expect.anything(), id);
          expect(setBlockStyle).not.toHaveBeenCalled();
        } else {
          expect(setBlockStyle).toHaveBeenCalledWith(expect.anything(), id);
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
    });

    describe("Action Buttons", () => {
      let saveButton, cancelButton;
      describe("with no `onSave` prop", () => {
        it("will not render", () => {
          wrapper = render();
          saveButton = wrapper
            .find(Button)
            .findWhere((n) => n.text() === "Save");
          cancelButton = wrapper
            .find(Button)
            .findWhere((n) => n.text() === "Cancel");
          expect(saveButton.exists()).toBeFalsy();
          expect(cancelButton.exists()).toBeFalsy();
        });
      });

      describe("with `onSave` prop", () => {
        const onSave = jest.fn();
        const onCancel = jest.fn();

        beforeEach(() => {
          wrapper = render({ onSave, onCancel });
          saveButton = wrapper
            .find(Button)
            .findWhere((n) => n.text() === "Save");
          cancelButton = wrapper
            .find(Button)
            .findWhere((n) => n.text() === "Cancel");
        });

        it("will render", () => {
          expect(saveButton.exists()).toBeTruthy();
          expect(cancelButton.exists()).toBeTruthy();
        });

        it("calls the `onSave` callback when the `Save` button is clicked", () => {
          saveButton.hostNodes().first().props().onClick();
          expect(onSave).toHaveBeenCalled();
        });

        it("calls the `onCancel` callback when the `Cancel` button is clicked", () => {
          cancelButton.hostNodes().first().props().onClick();
          expect(onCancel).toHaveBeenCalled();
        });
      });
    });
  });
});
