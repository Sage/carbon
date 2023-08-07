import React from "react";
import TestRenderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import MultiActionButton from "./multi-action-button.component";
import {
  StyledMultiActionButton,
  StyledButtonChildrenContainer,
} from "./multi-action-button.style";
import Button from "../button";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  assertStyleMatch,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import StyledButton from "../button/button.style";
import StyledIcon from "../icon/icon.style";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function render(props = {}, renderer: any = shallow) {
  return renderer(
    <MultiActionButton text="Test" {...props}>
      <Button>Test</Button>
    </MultiActionButton>
  );
}

function openAdditionalButtons(container: ShallowWrapper | ReactWrapper) {
  const toggleButton = container.find('[data-element="toggle-button"]').at(0);

  toggleButton.simulate("focus");

  toggleButton?.simulate("keydown", { key: "ArrowDown" });
}

function simulateBlur(container: ShallowWrapper | ReactWrapper) {
  const toggleButton = container.find('[data-element="toggle-button"]').at(0);

  act(() => {
    toggleButton.simulate("blur");
  });
}

const escapeKeyUpEvent = new KeyboardEvent("keyup", {
  key: "Escape",
  bubbles: true,
});

describe("MultiActionButton", () => {
  let wrapper: ShallowWrapper | ReactWrapper;

  jest.useFakeTimers();

  testStyledSystemMargin((props) => (
    <MultiActionButton text="Test" {...props}>
      <Button>Test</Button>
    </MultiActionButton>
  ));

  describe("when focused", () => {
    const additionalButtonsSelector = '[data-element="additional-buttons"]';
    let container: HTMLDivElement | null;
    let mainButton: ReactWrapper;
    const onClick = jest.fn();

    beforeEach(() => {
      onClick.mockClear();
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);
      wrapper = mount(
        <MultiActionButton text="Main Button" onClick={onClick}>
          <Button>First</Button>
          <Button>Second</Button>
        </MultiActionButton>,
        { attachTo: document.getElementById("enzymeContainer") }
      );
      mainButton = wrapper.find(StyledMultiActionButton).find(Button).first();
      openAdditionalButtons(mainButton);
      jest.runAllTimers();
    });

    afterEach(() => {
      container?.parentNode?.removeChild(container);

      wrapper.unmount();

      container = null;
    });

    describe("when the main button is clicked", () => {
      it("the additional buttons are shown", () => {
        mainButton.simulate("click");

        expect(wrapper.find(Button).at(0).getDOMNode()).toBeVisible();
      });

      it("the passed onClick handler is called", () => {
        mainButton.simulate("click");

        expect(onClick).toHaveBeenCalledTimes(1);
      });
    });

    describe("using keyboard to open children container", () => {
      it.each([
        ["Enter", "Enter"],
        ["Space", " "],
        ["ArrowDown", "ArrowDown"],
        ["ArrowUp", "ArrowUp"],
      ])(
        "the first additional button should be focused when %s key is pressed",
        (name, key) => {
          simulateBlur(mainButton);
          wrapper.find(StyledMultiActionButton).simulate("mouseleave");
          wrapper.update();
          mainButton.simulate("keydown", { key });
          jest.runAllTimers();

          const firstButton = wrapper
            .find(additionalButtonsSelector)
            .find(Button)
            .at(0)
            .getDOMNode();
          expect(firstButton).toStrictEqual(document.activeElement);
        }
      );

      it("does not open additional buttons if opened already - coverage", () => {
        mainButton.simulate("keydown", { key: "Enter" });
        jest.runAllTimers();
      });

      it("does not call preventDefault if key is not Enter, Space or ArrowDown", () => {
        const preventDefault = jest.fn();
        mainButton.simulate("keydown", { key: "1", preventDefault });

        expect(preventDefault).not.toHaveBeenCalled();
      });
    });

    describe('when "down" key is pressed', () => {
      it("the additional buttons should be stepped through in sequence and should not loop", () => {
        const additionalButtons = wrapper
          .find(additionalButtonsSelector)
          .find(Button);

        expect(additionalButtons.first().getDOMNode()).toStrictEqual(
          document.activeElement
        );
        wrapper
          .find(StyledButtonChildrenContainer)
          .simulate("keydown", { key: "ArrowDown" });
        expect(additionalButtons.last().getDOMNode()).toStrictEqual(
          document.activeElement
        );
        wrapper
          .find(StyledButtonChildrenContainer)
          .simulate("keydown", { key: "ArrowDown" });
        // focus should not loop back to start of button list
        expect(additionalButtons.last().getDOMNode()).toStrictEqual(
          document.activeElement
        );
      });
    });

    describe('when "up" key is pressed', () => {
      it("the additional buttons should be stepped through in sequence and should not loop", () => {
        const additionalButtons = wrapper
          .find(additionalButtonsSelector)
          .find(Button);

        wrapper
          .find(StyledButtonChildrenContainer)
          .simulate("keydown", { key: "ArrowDown" });
        expect(additionalButtons.last().getDOMNode()).toStrictEqual(
          document.activeElement
        );
        wrapper
          .find(StyledButtonChildrenContainer)
          .simulate("keydown", { key: "ArrowUp" });
        expect(additionalButtons.first().getDOMNode()).toStrictEqual(
          document.activeElement
        );
        wrapper
          .find(StyledButtonChildrenContainer)
          .simulate("keydown", { key: "ArrowUp" });
        // focus should not loop back to end of button list
        expect(additionalButtons.first().getDOMNode()).toStrictEqual(
          document.activeElement
        );
      });
    });

    describe.each([
      ["Home", "Home", ""],
      ["Ctrl + ArrowUp", "ArrowUp", "ctrlKey"],
      ["Meta + ArrowUp", "ArrowUp", "metaKey"],
    ])("when %s key is pressed", (_, key, modifier) => {
      it("focuses the first button", () => {
        const additionalButtons = wrapper
          .find(additionalButtonsSelector)
          .find(Button);

        wrapper.find(StyledButtonChildrenContainer).simulate("keydown", {
          key,
          ctrlKey: modifier === "ctrlKey",
          metaKey: modifier === "metaKey",
        });
        expect(additionalButtons.first().getDOMNode()).toStrictEqual(
          document.activeElement
        );
      });
    });

    describe.each([
      ["End", "End", ""],
      ["Ctrl + ArrowDown", "ArrowDown", "ctrlKey"],
      ["Meta + ArrowDown", "ArrowDown", "metaKey"],
      // eslint-disable-next-line
    ])("when %s key is pressed", (_, key, modifier) => {
      it("focuses the last button", () => {
        const additionalButtons = wrapper
          .find(additionalButtonsSelector)
          .find(Button);

        wrapper.find(StyledButtonChildrenContainer).simulate("keydown", {
          key,
          ctrlKey: modifier === "ctrlKey",
          metaKey: modifier === "metaKey",
        });
        expect(additionalButtons.last().getDOMNode()).toStrictEqual(
          document.activeElement
        );
      });
    });

    describe("the tab key is pressed", () => {
      it("moves focus down the button children and closes container when the last one is focused", () => {
        const additionalButtons = wrapper
          .find(additionalButtonsSelector)
          .find(Button);

        additionalButtons.first().simulate("keydown", { key: "Tab" });

        expect(additionalButtons.last().getDOMNode()).toStrictEqual(
          document.activeElement
        );

        act(() => {
          additionalButtons.last().simulate("keydown", { key: "Tab" });
          jest.runAllTimers();
        });

        expect(
          wrapper.update().find(StyledButtonChildrenContainer).exists()
        ).toBeFalsy();
      });
    });

    describe("shift and tab keys are pressed", () => {
      it("moves focus up the button children, closes container when the first one is focused and sets focus on the main button", () => {
        const additionalButtons = wrapper
          .find(additionalButtonsSelector)
          .find(Button);

        additionalButtons.first().simulate("keydown", { key: "Tab" });
        additionalButtons
          .last()
          .simulate("keydown", { key: "Tab", shiftKey: true });

        expect(additionalButtons.first().getDOMNode()).toStrictEqual(
          document.activeElement
        );

        act(() => {
          additionalButtons
            .first()
            .simulate("keydown", { key: "Tab", shiftKey: true });
          jest.runAllTimers();
        });

        expect(
          wrapper.update().find(StyledButtonChildrenContainer).exists()
        ).toBeFalsy();

        expect(mainButton.getDOMNode()).toStrictEqual(document.activeElement);
      });
    });

    describe("and mouse leaves the main Button", () => {
      it("then the additional buttons menu should remain open", () => {
        const additionalButtons = wrapper
          .find(additionalButtonsSelector)
          .find(Button);

        additionalButtons
          .first()
          .simulate("keydown", { key: "Tab", shiftKey: true });
        jest.runAllTimers();

        mainButton.simulate("mouseenter");

        wrapper.find(StyledMultiActionButton).simulate("mouseleave");

        expect(wrapper.find(additionalButtonsSelector).exists()).toStrictEqual(
          true
        );
      });
    });
  });

  describe("when the esc key is pressed", () => {
    let container: HTMLDivElement | null;
    beforeEach(() => {
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);
      wrapper = mount(
        <MultiActionButton text="Main Button">
          <Button>First</Button>
          <Button>Second</Button>
        </MultiActionButton>,
        { attachTo: document.getElementById("enzymeContainer") }
      );
    });

    afterEach(() => {
      container?.parentNode?.removeChild(container);
      wrapper.unmount();
      container = null;
    });

    it("hides the additional children buttons when key pressed and one is focused", () => {
      openAdditionalButtons(
        wrapper.find(StyledMultiActionButton).find(Button).first()
      );
      expect(
        wrapper.update().find(StyledButtonChildrenContainer).exists()
      ).toBeTruthy();
      act(() => {
        container?.dispatchEvent(escapeKeyUpEvent);
      });
      expect(
        wrapper.update().find(StyledButtonChildrenContainer).exists()
      ).toBeFalsy();
      expect(
        wrapper.find(StyledMultiActionButton).find(Button).first().getDOMNode()
      ).toStrictEqual(document.activeElement);
    });

    it("hides the additional children buttons when key pressed and focus is not on the list buttons", () => {
      const mainButton = wrapper
        .find(StyledMultiActionButton)
        .find(Button)
        .first();
      mainButton.simulate("mouseenter");
      expect(
        wrapper.update().find(StyledButtonChildrenContainer).exists()
      ).toBeTruthy();
      act(() => {
        container?.dispatchEvent(escapeKeyUpEvent);
      });
      expect(
        wrapper.update().find(StyledButtonChildrenContainer).exists()
      ).toBeFalsy();
    });
  });

  describe("tags", () => {
    describe("on component", () => {
      it("include correct component, element and role data tags", () => {
        const multiActionButtonSelector =
          '[data-component="multi-action-button"]';
        wrapper = render({
          "data-element": "bar",
          "data-role": "baz",
          text: "Test",
        });

        rootTagTest(
          wrapper.find(multiActionButtonSelector),
          "multi-action-button",
          "bar",
          "baz"
        );
      });
    });
  });

  describe("when rendered", () => {
    it("should match the snapshot", () => {
      expect(render({}, TestRenderer.create)).toMatchSnapshot();
    });

    describe("when id passed", () => {
      it("the id is passed to the main button", () => {
        wrapper = render({ id: "customId" });

        expect(
          wrapper.find({ "data-element": "toggle-button" }).prop("id")
        ).toBe("customId");
      });
    });

    describe("when children are Button components", () => {
      it("then they should change to Buttons with forwarded refs", () => {
        wrapper = render({}, mount);
        openAdditionalButtons(wrapper);

        expect(wrapper.find(Button).exists()).toBe(true);
      });

      afterEach(() => {
        wrapper.unmount();
      });
    });

    describe("when children are not Button components", () => {
      it("then child elements should be rendered as they are", () => {
        wrapper = mount(
          <MultiActionButton text="Test">
            <span className="span-element" />
          </MultiActionButton>
        );
        openAdditionalButtons(wrapper);

        const element = wrapper
          .find(StyledButtonChildrenContainer)
          .find(".span-element");
        expect(element.exists()).toBe(true);
      });

      describe("buttonType", () => {
        it.each(["primary", "secondary", "tertiary"] as const)(
          "sets the parent button type as expected when buttonType is %s",
          (type) => {
            wrapper = mount(
              <MultiActionButton buttonType={type} text="Test">
                <span className="span-element" />
              </MultiActionButton>
            );
            expect(wrapper.find(Button).first().prop("buttonType")).toEqual(
              type
            );
          }
        );
      });

      afterEach(() => {
        wrapper.unmount();
      });
    });

    describe("with the Menu open", () => {
      beforeEach(() => {
        wrapper = render({}, mount);
        openAdditionalButtons(wrapper);
      });

      it("should have expected colors for the main Button", () => {
        assertStyleMatch(
          {
            backgroundColor: "var(--colorsActionMajor700)",
            borderColor: "var(--colorsActionMajor700)",
          },
          wrapper,
          { modifier: `& > ${StyledButton}` }
        );
      });

      it("should have expected border color and margin for the main Button when focused", () => {
        assertStyleMatch(
          {
            borderColor: "var(--colorsSemanticFocus500)",
            margin: "0 -1px",
          },
          wrapper,
          { modifier: `& > ${StyledButton}:focus` }
        );
      });

      it("should have expected colors for the Button Icon", () => {
        assertStyleMatch(
          {
            color: "var(--colorsActionMajorYang100)",
          },
          wrapper,
          { modifier: `& > ${StyledButton} ${StyledIcon}` }
        );
      });
    });

    describe("when the component is disabled", () => {
      it("does not set the mouse enter handler", () => {
        wrapper = render({ disabled: true }, mount);

        expect(
          wrapper.find(StyledMultiActionButton).find(Button).props()
            .onMouseEnter
        ).toEqual(undefined);
      });
    });

    describe("clicking a button", () => {
      const handleMainButton = jest.fn();
      const handleSecondButton = jest.fn();
      let mainButton: ReactWrapper;

      beforeEach(() => {
        wrapper = mount(
          <MultiActionButton text="Test" onClick={handleMainButton}>
            <Button onClick={handleSecondButton}>Test</Button>
            <Button>Test 2</Button>
          </MultiActionButton>
        );

        mainButton = wrapper.find(StyledMultiActionButton).find(Button).first();
      });

      afterEach(() => {
        wrapper.unmount();
      });

      it("the handler should be called on the clicked button", () => {
        mainButton.simulate("mouseenter");
        const button = wrapper
          .find('[data-element="additional-buttons"]')
          .find(Button);
        button.at(0).simulate("click");
        expect(handleSecondButton).toHaveBeenCalled();
      });

      it("the menu should close", () => {
        mainButton.simulate("mouseenter");
        const button = wrapper
          .find('[data-element="additional-buttons"]')
          .find(Button);
        button.at(0).simulate("click");

        wrapper.update();

        expect(
          wrapper.update().find(StyledButtonChildrenContainer).exists()
        ).toBe(false);
        openAdditionalButtons(mainButton);
      });

      it("does not throw error when button does not have an onclick prop", () => {
        expect(() => {
          mainButton.simulate("mouseenter");

          const button = wrapper
            .find('[data-element="additional-buttons"]')
            .find(Button);

          act(() => {
            button.at(1).simulate("click");
          });
        }).not.toThrow();
      });
    });

    describe("when the outside click event is triggered with menu open", () => {
      const nativeInputEvent = new Event("click", {
        bubbles: true,
        cancelable: true,
      });
      let container: HTMLDivElement | null;

      beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        wrapper = mount(
          <MultiActionButton text="Main button">
            <Button>Foo</Button>
          </MultiActionButton>,
          { attachTo: container }
        );

        openAdditionalButtons(wrapper);
      });

      afterEach(() => {
        (wrapper as ReactWrapper).detach();
        (wrapper as ReactWrapper).unmount();
        container?.parentNode?.removeChild(container);

        container = null;
      });

      describe("on the Menu element", () => {
        it("then the Menu should not be closed", () => {
          expect(wrapper.find(StyledButtonChildrenContainer).exists()).toBe(
            true
          );

          wrapper
            .find('button[data-element="toggle-button"]')
            .getDOMNode()
            .dispatchEvent(nativeInputEvent);

          jest.runAllTimers();
          wrapper.update();
          expect(wrapper.find(StyledButtonChildrenContainer).exists()).toBe(
            true
          );
        });
      });

      describe("on an external element", () => {
        it("then the Menu should be closed", () => {
          expect(wrapper.find(StyledButtonChildrenContainer).exists()).toBe(
            true
          );

          act(() => {
            simulateBlur(wrapper);
            container?.dispatchEvent(nativeInputEvent);
          });

          expect(
            wrapper.update().find(StyledButtonChildrenContainer).exists()
          ).toBe(false);
        });
      });
    });
  });

  describe("the main button", () => {
    it("has the correct icon and position", () => {
      wrapper = render();
      expect(wrapper.find(Button).first().props().iconType).toEqual("dropdown");
      expect(wrapper.find(Button).first().props().iconPosition).toEqual(
        "after"
      );
    });
  });

  describe('with align prop set to "right"', () => {
    beforeEach(() => {
      wrapper = render({ align: "right" }, mount);
      openAdditionalButtons(wrapper);
    });

    it("text inside child buttons should be aligned right", () => {
      assertStyleMatch(
        {
          textAlign: "right",
        },
        wrapper.find(StyledButtonChildrenContainer),
        { modifier: `${StyledButton}` }
      );
    });
  });

  it("should set proper width of ButtonContainer", () => {
    const getBoundingClientRectMock = jest
      .spyOn(Element.prototype, "getBoundingClientRect")
      .mockImplementation(() => ({ width: 200 } as DOMRect));

    wrapper = render({}, mount);

    openAdditionalButtons(wrapper);

    assertStyleMatch(
      { minWidth: "200px" },
      wrapper.find(StyledButtonChildrenContainer)
    );

    getBoundingClientRectMock.mockClear();

    wrapper.unmount();
  });

  describe("coverage", () => {
    it("renders a string when passed as a child", () => {
      const tempWrapper = mount(
        <MultiActionButton text="text">
          <Button>Click</Button>
          Some string
        </MultiActionButton>
      );
      const mainButton = tempWrapper
        .find(StyledMultiActionButton)
        .find(Button)
        .first();

      openAdditionalButtons(mainButton);

      expect(tempWrapper.contains("Some string")).toBe(true);
    });
  });

  describe("when width is passed", () => {
    it("justify-content on StyledButton set to space-between", () => {
      wrapper = render({ width: "100%" }, mount);

      assertStyleMatch(
        {
          justifyContent: "space-between",
        },
        wrapper.find(StyledMultiActionButton),
        { modifier: `${StyledButton}` }
      );
    });

    it("width on StyledButton set to 100%", () => {
      wrapper = render({ width: "100%" }, mount);

      assertStyleMatch(
        {
          width: "100%",
        },
        wrapper.find(StyledMultiActionButton),
        { modifier: `${StyledButton}` }
      );
    });
  });

  describe("rounded corner styling", () => {
    it("renders the main button with expected border radius styling", () => {
      wrapper = mount(
        <MultiActionButton text="foo">
          <Button>bar</Button>
        </MultiActionButton>
      );

      assertStyleMatch(
        {
          borderRadius: "var(--borderRadius400)",
        },
        wrapper.find(StyledMultiActionButton).find(StyledButton)
      );
    });
  });
});
