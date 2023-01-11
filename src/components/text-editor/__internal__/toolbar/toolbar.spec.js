import React from "react";
import { act } from "react-test-renderer";
import { mount } from "enzyme";
import {
  simulate,
  assertStyleMatch,
} from "../../../../__spec_helper__/test-utils";
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
import I18nProvider from "../../../i18n-provider";

const setInlineStyle = jest.fn();
const setBlockStyle = jest.fn();

const render = (props = {}, renderer = mount, locale) => {
  const defaultProps = {
    setInlineStyle,
    setBlockStyle,
    activeControls: {},
  };

  return renderer(
    <I18nProvider locale={locale}>
      <Toolbar {...defaultProps} {...props} />
    </I18nProvider>,
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
          backgroundColor: "var(--colorsUtilityMajor025)",
          borderTop: "1px solid var(--colorsUtilityMajor200)",
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
        render({ toolbarElements: <Button>foo</Button> }).find(
          StyledEditorActionControls
        )
      );

      assertStyleMatch(
        {
          width: "62px",
          minHeight: "33px",
        },
        render({ toolbarElements: <Button>foo</Button> }).find(
          StyledEditorActionControls
        ),
        { modifier: `${StyledButton}` }
      );
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
        simulate.keydown.pressArrowRight(wrapper.find(ToolbarButton).at(index));
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
        simulate.keydown.pressArrowLeft(wrapper.find(ToolbarButton).at(index));
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
          backgroundColor: "var(--colorsActionMinor200)",
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
        wrapper.find(StyledToolbarButton).at(index).simulate("focus");
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
        wrapper.find(StyledToolbarButton).at(index).simulate("focus");
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
        wrapper.find(StyledToolbarButton).at(index).simulate("focus");
      });
      act(() => {
        simulate.keydown.pressD(wrapper.find(StyledToolbarButton).at(index));
      });

      expect(setBlockStyle).not.toHaveBeenCalled();
      expect(setInlineStyle).not.toHaveBeenCalled();
    });
  });

  describe("tooltip", () => {
    beforeEach(() => {
      wrapper = render({});
    });

    it.each([0, 1, 2, 3])(
      "shows when the style control at position %s on mouse enter and hides on leave",
      (i) => {
        act(() => {
          wrapper.find(ToolbarButton).at(i).simulate("mouseover");
        });
        expect(wrapper.find(Tooltip).at(i).props().isVisible).toEqual(true);

        act(() => {
          wrapper.find(ToolbarButton).at(i).simulate("mouseleave");
        });
        expect(wrapper.find(Tooltip).at(i).props().isVisible).toEqual(false);
      }
    );

    it.each([0, 1, 2, 3])(
      "shows when the style control at position %s on focus and hides on blur",
      (i) => {
        act(() => {
          wrapper.find(ToolbarButton).at(i).simulate("focus");
        });
        expect(wrapper.find(Tooltip).at(i).props().isVisible).toEqual(true);

        act(() => {
          wrapper.find(ToolbarButton).at(i).simulate("blur");
        });
        expect(wrapper.find(Tooltip).at(i).props().isVisible).toEqual(false);
      }
    );
  });

  describe("when an element has been passed in the toolbarElements prop", () => {
    const exampleButton = <Button data-element="toolbar-button">foo</Button>;

    it("then that element should be rendered", () => {
      wrapper = render({ toolbarElements: exampleButton });

      expect(wrapper.find("[data-element='toolbar-button']").exists()).toBe(
        true
      );
    });
  });

  describe("locale translations", () => {
    const localeMock = {
      locale: () => "mock-Locale",
      textEditor: {
        tooltipMessages: {
          bold: () => "Foo Bold",
          italic: () => "Foo Italic",
          bulletList: () => "Foo Bulleted List",
          numberList: () => "Foo Numbered List",
        },
        ariaLabels: {
          bold: () => "foo-bold",
          italic: () => "foo-italic",
          bulletList: () => "foo-bullet-list",
          numberList: () => "foo-number-list",
        },
      },
    };
    it.each([
      ["bold", 0],
      ["italic", 1],
      ["bulletList", 2],
      ["numberList", 3],
    ])(
      "override the tooltip message text and aria label for the controls",
      (id, index) => {
        wrapper = render({}, undefined, localeMock);

        const { message } = wrapper.find(Tooltip).at(index).props();
        const { ariaLabel } = wrapper.find(ToolbarButton).at(index).props();
        const translatedMessage = localeMock.textEditor.tooltipMessages[id]();
        const translatedAriaLabel = localeMock.textEditor.ariaLabels[id]();

        expect(message).toEqual(translatedMessage);
        expect(ariaLabel).toEqual(translatedAriaLabel);
      }
    );
  });
});
