import React from "react";
import TestRenderer from "react-test-renderer";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import MultiActionButton from "./multi-action-button.component";
import {
  StyledMultiActionButton,
  StyledButtonChildrenContainer,
} from "./multi-action-button.style";
import Button, { ButtonWithForwardRef } from "../button";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import {
  assertStyleMatch,
  keyboard,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import StyledButton from "../button/button.style";
import StyledIcon from "../icon/icon.style";
import baseTheme from "../../style/themes/base";

describe("MultiActionButton", () => {
  let wrapper;

  testStyledSystemMargin((props) => (
    <MultiActionButton text="Test" {...props}>
      <Button>Test</Button>
    </MultiActionButton>
  ));

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

    describe("when children are Button components", () => {
      it("then they should change to Buttons with forwarded refs", () => {
        wrapper = render({}, mount);
        simulateFocus(wrapper);

        expect(wrapper.find(ButtonWithForwardRef).exists()).toBe(true);
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
        simulateFocus(wrapper);

        const element = wrapper
          .find(StyledButtonChildrenContainer)
          .find(".span-element");
        expect(element.exists()).toBe(true);
      });

      describe("buttonType", () => {
        it.each(["primary", "secondary", "tertiary"])(
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
        simulateFocus(wrapper);
      });

      it("should have expected colors for the main Button", () => {
        assertStyleMatch(
          {
            backgroundColor: baseTheme.colors.secondary,
            borderColor: baseTheme.colors.secondary,
          },
          wrapper,
          { modifier: `& > ${StyledButton}` }
        );
      });

      it("should have expected border color and margin for the main Button when focused", () => {
        assertStyleMatch(
          {
            borderColor: baseTheme.colors.focus,
            margin: "0 -1px",
          },
          wrapper,
          { modifier: `& > ${StyledButton}:focus` }
        );
      });

      it("should have expected colors for the Button Icon", () => {
        assertStyleMatch(
          {
            color: baseTheme.colors.white,
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
          wrapper.find(StyledMultiActionButton).find(Button).onMouseEnter
        ).toEqual(undefined);
      });
    });

    describe("clicking a button", () => {
      const handleMainButton = jest.fn();
      const handleSecondButton = jest.fn();
      let mainButton;

      beforeEach(() => {
        wrapper = render(
          {
            onClick: handleMainButton,
            childOnClick: handleSecondButton,
          },
          mount
        );
        mainButton = wrapper.find(StyledMultiActionButton).find(Button).first();
      });

      it("the handler should be called on the main button", () => {
        mainButton.simulate("mouseenter");
        const button = wrapper
          .find('[data-element="additional-buttons"]')
          .find(ButtonWithForwardRef);
        button.simulate("click");
        expect(handleSecondButton).toHaveBeenCalled();
      });

      afterEach(() => {
        wrapper.unmount();
      });
    });

    describe.each(["click", "touchstart"])(
      'when the "%s" event is triggered with menu open',
      (eventType) => {
        const nativeInputEvent = new Event(eventType, {
          bubbles: true,
          cancelable: true,
        });
        let domWrapper;

        beforeAll(() => {
          if (eventType === "touchstart") {
            document.documentElement.ontouchstart = () => {};
          }
        });

        beforeEach(() => {
          domWrapper = document.createElement("div");
          document.body.appendChild(domWrapper);
          wrapper = mount(
            <MultiActionButton text="Main button">
              <Button>Foo</Button>
            </MultiActionButton>,
            { attachTo: domWrapper }
          );
          simulateFocus(wrapper);
        });

        describe("on the Menu element", () => {
          it("then the Menu should not be closed", () => {
            expect(wrapper.find(StyledButtonChildrenContainer).exists()).toBe(
              true
            );
            wrapper
              .find(StyledButtonChildrenContainer)
              .find(Button)
              .getDOMNode()
              .dispatchEvent(nativeInputEvent);
            expect(wrapper.find(StyledButtonChildrenContainer).exists()).toBe(
              true
            );
          });
        });

        describe("on an external element", () => {
          describe("and focus is still on the toggle button", () => {
            it("then the Menu should not be closed", () => {
              expect(wrapper.find(StyledButtonChildrenContainer).exists()).toBe(
                true
              );
              domWrapper.dispatchEvent(nativeInputEvent);
              expect(wrapper.find(StyledButtonChildrenContainer).exists()).toBe(
                true
              );
            });
          });

          describe("and focus is on a button in the menu", () => {
            it("then the Menu should be closed", () => {
              expect(wrapper.find(StyledButtonChildrenContainer).exists()).toBe(
                true
              );

              act(() => {
                simulateBlur(wrapper);
                domWrapper.dispatchEvent(nativeInputEvent);
              });

              expect(
                wrapper.update().find(StyledButtonChildrenContainer).exists()
              ).toBe(false);
            });
          });
        });

        afterEach(() => {
          wrapper.detach();
          document.body.removeChild(domWrapper);
        });

        afterAll(() => {
          if (eventType === "touchstart") {
            document.documentElement.ontouchstart = undefined;
          }
        });
      }
    );
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
      simulateFocus(wrapper);
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
    spyOn(Element.prototype, "getBoundingClientRect");
    Element.prototype.getBoundingClientRect = jest
      .fn()
      .mockImplementation(() => ({ width: 200 }));
    wrapper = render({}, mount);

    simulateFocus(wrapper);

    assertStyleMatch(
      { minWidth: "200px" },
      wrapper.find(StyledButtonChildrenContainer)
    );

    jest.clearAllMocks();

    wrapper.unmount();
  });

  describe("when focused", () => {
    const additionalButtonsSelector = '[data-element="additional-buttons"]';
    let container;
    let mainButton;

    beforeEach(() => {
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);
      wrapper = mount(
        <MultiActionButton text="Main Button">
          <Button>Foo</Button>
          <Button>Foo</Button>
        </MultiActionButton>,
        { attachTo: document.getElementById("enzymeContainer") }
      );
      mainButton = wrapper.find(StyledMultiActionButton).find(Button).first();
      simulateFocus(mainButton);
    });

    afterEach(() => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }
      wrapper.unmount();

      container = null;
    });

    describe.each([
      ["enter", 13],
      ["space", 32],
    ])("the %s key is pressed", (name, keyCode) => {
      it("then the first additional button should be focused", () => {
        mainButton.simulate("keydown", { which: keyCode });
        const firstButton = wrapper
          .find(additionalButtonsSelector)
          .find(Button)
          .at(0)
          .getDOMNode();
        expect(firstButton).toStrictEqual(document.activeElement);
      });
    });

    describe('when "down" key is pressed', () => {
      it("the additional buttons should be stepped through in sequence", () => {
        const additionalButtons = wrapper
          .find(additionalButtonsSelector)
          .find(ButtonWithForwardRef);

        keyboard.pressDownArrow();
        expect(additionalButtons.at(0).getDOMNode()).toStrictEqual(
          document.activeElement
        );
        keyboard.pressDownArrow();
        expect(
          additionalButtons.at(additionalButtons.length - 1).getDOMNode()
        ).toStrictEqual(document.activeElement);
        keyboard.pressDownArrow();
        expect(additionalButtons.at(0).getDOMNode()).toStrictEqual(
          document.activeElement
        );
      });
    });

    describe('when "up" key is pressed', () => {
      it("the additional buttons should be stepped through in sequence", () => {
        const additionalButtons = wrapper
          .find(additionalButtonsSelector)
          .find(ButtonWithForwardRef);

        keyboard.pressUpArrow();
        expect(
          additionalButtons.at(additionalButtons.length - 1).getDOMNode()
        ).toStrictEqual(document.activeElement);
        keyboard.pressUpArrow();
        expect(additionalButtons.at(0).getDOMNode()).toStrictEqual(
          document.activeElement
        );
        keyboard.pressUpArrow();
        expect(
          additionalButtons.at(additionalButtons.length - 1).getDOMNode()
        ).toStrictEqual(document.activeElement);
      });
    });

    describe("the tab key is pressed", () => {
      it("it calls the expected timeout function", () => {
        const timeoutSpy = spyOn(window, "setTimeout");
        keyboard.pressTab();

        expect(timeoutSpy).toHaveBeenCalled();
      });

      it("it does not pass focus to the first additional button", () => {
        mainButton.simulate("keydown", { which: 9 });
        const firstButton = wrapper
          .find(additionalButtonsSelector)
          .find(Button)
          .at(0)
          .getDOMNode();

        expect(firstButton).not.toStrictEqual(document.activeElement);
      });
    });

    describe("and mouse leaves the main Button", () => {
      it("then the additional buttons menu should remain open", () => {
        wrapper.simulate("mouseLeave");

        expect(wrapper.find(additionalButtonsSelector).exists()).toStrictEqual(
          true
        );
      });
    });
  });
});

function render(props = {}, renderer = shallow) {
  const { childOnClick } = props;
  return renderer(
    <MultiActionButton text="Test" {...props}>
      <Button onClick={childOnClick}>Test</Button>
    </MultiActionButton>
  );
}

function simulateFocus(container) {
  const toggleButton = container.find('[data-element="toggle-button"]').at(0);

  toggleButton.simulate("focus");
}

function simulateBlur(container) {
  const toggleButton = container.find('[data-element="toggle-button"]').at(0);

  toggleButton.simulate("blur");
}
