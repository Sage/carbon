import React from "react";
import { shallow, mount } from "enzyme";
import TestRenderer from "react-test-renderer";
import { act } from "react-dom/test-utils";

import { ThemeProvider } from "styled-components";
import SplitButton from "./split-button.component";
import StyledSplitButtonToggle from "./split-button-toggle.style";
import StyledSplitButtonChildrenContainer from "./split-button-children.style";
import Icon from "../icon";
import Button, { ButtonWithForwardRef } from "../button";
import StyledButton from "../button/button.style";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import SmallTheme from "../../style/themes/small";
import MediumTheme from "../../style/themes/medium";
import {
  assertStyleMatch,
  keyboard,
  testStyledSystemMargin,
} from "../../__spec_helper__/test-utils";
import guid from "../../__internal__/utils/helpers/guid";

jest.mock("../../__internal__/utils/helpers/guid");
guid.mockImplementation(() => "guid-12345");

const sizes = ["small", "medium", "large"];

const themes = [
  ["small", SmallTheme],
  ["medium", MediumTheme],
];

const singleButton = <Button key="testKey">Single Button</Button>;
const multipleButtons = [
  <Button key="testKey1">Extra Button</Button>,
  <Button key="testKey2">Extra Button</Button>,
  <Button key="testKey3">Extra Button</Button>,
];

const render = (
  mainProps = {},
  childButtons = singleButton,
  renderer = shallow
) => {
  return renderer(
    <SplitButton
      {...mainProps}
      text="Split button"
      data-element="bar"
      data-role="baz"
    >
      {childButtons}
    </SplitButton>
  );
};

const renderAttached = (
  mainProps = {},
  childButtons = singleButton,
  renderer = mount
) => {
  return renderer(
    <SplitButton
      {...mainProps}
      text="Split button"
      data-element="bar"
      data-role="baz"
    >
      {childButtons}
    </SplitButton>,
    { attachTo: document.getElementById("enzymeContainer") }
  );
};

const renderWithTheme = (
  mainProps = {},
  childButtons = singleButton,
  renderer = shallow
) => {
  return renderer(
    <ThemeProvider theme={mainProps.carbonTheme}>
      <SplitButton
        {...mainProps}
        text="Split button"
        data-element="bar"
        data-role="baz"
      >
        {childButtons}
      </SplitButton>
    </ThemeProvider>
  );
};

const renderWithNoChildren = (mainProps = {}, renderer = shallow) => {
  return renderer(
    <SplitButton
      {...mainProps}
      text="Split button"
      data-element="bar"
      data-role="baz"
    >
      {singleButton}
    </SplitButton>
  );
};

const buildSizeConfig = (name, size) => {
  const sizeObj = {};
  sizeObj.fontSizze = size === "large" ? "16px" : "14px";
  if (size === "small") {
    sizeObj.height = "32px";
    sizeObj.padding = "16px";
  } else if (size === "medium") {
    sizeObj.height = "40px";
    sizeObj.padding = "24px";
  } else if (size === "large") {
    sizeObj.height = "48px";
    sizeObj.padding = "32px";
  }
  return sizeObj;
};

describe("SplitButton", () => {
  let wrapper, toggle;

  testStyledSystemMargin((props) => (
    <SplitButton text="Test" {...props}>
      <Button>Test</Button>
    </SplitButton>
  ));

  describe("render with custom className", () => {
    beforeEach(() => {
      wrapper = render();
      toggle = wrapper.find('[data-element="toggle-button"]');
    });

    it("does not render additional buttons", () => {
      expect(wrapper.find("[data-element='additional-buttons']").exists()).toBe(
        false
      );
    });

    it("renders dropdown icon", () => {
      expect(
        toggle.contains(
          <Icon
            type="dropdown"
            color="#008200"
            disabled={false}
            bgSize="extra-small"
            fontSize="small"
            bg="transparent"
          />
        )
      ).toBeTruthy();
    });
  });

  describe("when there are no children", () => {
    it("does not throw an error", () => {
      expect(() => renderWithNoChildren()).not.toThrow();
    });
  });

  describe("when children are Button Components", () => {
    it("then they should change to Buttons with forwarded refs", () => {
      wrapper = render({}, singleButton, mount);
      simulateFocusOnToggle(wrapper);

      expect(wrapper.find(ButtonWithForwardRef).exists()).toBe(true);
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });

  describe("when children are not Button Components", () => {
    it("then child elements should be redered as they are", () => {
      const spanElement = <span className="span-element" />;
      wrapper = render({}, spanElement, mount);
      simulateFocusOnToggle(wrapper);

      const element = wrapper
        .find(StyledSplitButtonChildrenContainer)
        .find(".span-element");
      expect(element.exists()).toBe(true);
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });

  describe.each(themes)('when the theme is set to "%s"', (name, theme) => {
    let themedWrapper;

    beforeEach(() => {
      themedWrapper = mount(
        <StyledSplitButtonChildrenContainer theme={theme}>
          <StyledButton>Foo</StyledButton>
        </StyledSplitButtonChildrenContainer>
      );
    });

    it("has the expected style", () => {
      const themeColors = {
        small: "#006046",
        medium: "#005C9A",
      };

      assertStyleMatch(
        {
          backgroundColor: themeColors[name],
          border: `1px solid ${themeColors[name]}`,
        },
        themedWrapper,
        { modifier: `${StyledButton}` }
      );
    });

    it('matches the expected style for the focused "additional button"', () => {
      const themeColors = {
        small: "#00402E",
        medium: "#004472",
      };

      themedWrapper.find("button").simulate("focus");
      assertStyleMatch(
        {
          backgroundColor: themeColors[name],
        },
        themedWrapper,
        { modifier: `${StyledButton}:focus` }
      );
    });

    afterEach(() => {
      themedWrapper.unmount();
    });
  });

  describe("for business themes", () => {
    it("renders styles correctly", () => {
      wrapper = render({}, singleButton, TestRenderer.create);
      expect(wrapper).toMatchSnapshot();
    });

    describe.each(themes)('when the theme is set to "%s"', (name, theme) => {
      const mockProps = { carbonTheme: theme, buttonType: "primary" };

      it("renders Toggle Button left border as expected", () => {
        wrapper = renderWithTheme(mockProps, singleButton, mount);
        assertStyleMatch(
          {
            borderLeftColor: theme.colors.secondary,
          },
          wrapper.find(StyledSplitButtonToggle)
        );
      });
    });
  });

  describe.each(sizes)('when the "%s" size prop is passed', (size) => {
    describe.each(themes)('with the "%s" business theme', (name, theme) => {
      it("has the expected styling", () => {
        const children = [
          <StyledButton size={size} key={name}>
            Foo
          </StyledButton>,
        ];

        const themedWrapper = mount(
          <StyledSplitButtonChildrenContainer theme={theme}>
            {children}
          </StyledSplitButtonChildrenContainer>
        );

        const expectedStyle = buildSizeConfig(name, size);

        for (let index = 0; index < children.length - 1; index++) {
          assertStyleMatch(
            {
              fontSize: expectedStyle.fontSize,
            },
            themedWrapper,
            { modifier: `${StyledButton}` }
          );

          assertStyleMatch(
            {
              height: expectedStyle.height,
              paddingLeft: expectedStyle.padding,
              paddingRight: expectedStyle.padding,
            },
            TestRenderer.create(children[index]).toJSON()
          );
        }
      });
    });
  });

  describe("toggle button with mouse events", () => {
    describe("mouse enter dropdown toggle", () => {
      beforeEach(() => {
        wrapper = render(
          {
            text: "mainButton",
          },
          <Button>Second Button</Button>,
          mount
        );
        toggle = wrapper.find(StyledSplitButtonToggle);
      });

      it("renders additional buttons", () => {
        toggle.simulate("mouseenter");

        expect(
          wrapper.find("[data-element='additional-buttons']").exists()
        ).toBe(true);
      });

      it("when disabled it does not render additional buttons", () => {
        wrapper = render({ disabled: true }, singleButton, mount);
        toggle = wrapper.find(StyledSplitButtonToggle);
        toggle.simulate("mouseenter");

        expect(
          wrapper.find("[data-element='additional-buttons']").exists()
        ).toBe(false);
      });

      it("when disabled it has the expected styling", () => {
        wrapper = render({ disabled: true }, singleButton, mount);

        toggle = wrapper.find(StyledSplitButtonToggle);
        assertStyleMatch(
          {
            background: "transparent",
            color: "rgba(0,0,0,0.3)",
          },
          toggle
        );
      });

      afterEach(() => {
        wrapper.unmount();
      });
    });

    describe("mouse leave split-button", () => {
      let mainButton;

      beforeEach(() => {
        wrapper = render({}, singleButton, mount);
        mainButton = wrapper.find(Button);
        toggle = wrapper.find(StyledSplitButtonToggle);
      });

      it("hides additional buttons", () => {
        toggle.simulate("mouseenter");

        expect(
          wrapper.find("[data-element='additional-buttons']").exists()
        ).toBe(true);

        mainButton.simulate("mouseenter");
        wrapper.update();

        expect(
          wrapper.find("[data-element='additional-buttons']").exists()
        ).toBe(false);
      });

      afterEach(() => {
        wrapper.unmount();
      });
    });

    describe("clicking a button", () => {
      const handleMainButton = jasmine.createSpy("main");
      const handleSecondButton = jasmine.createSpy("second");
      beforeEach(() => {
        wrapper = render(
          {
            onClick: handleMainButton,
          },
          [
            <Button onClick={handleSecondButton} key="testKey">
              Second Button
            </Button>,
          ],
          mount
        );
        toggle = wrapper.find(StyledSplitButtonToggle);
      });

      it("the handler should be called on the main button", () => {
        toggle.simulate("mouseenter");

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
          <SplitButton text="Split button">{singleButton}</SplitButton>,
          { attachTo: domWrapper }
        );

        act(() => {
          simulateFocusOnToggle(wrapper);
        });
      });

      describe("on the Menu element", () => {
        it("then the Menu should not be closed", () => {
          expect(
            wrapper.update().find(StyledSplitButtonChildrenContainer).exists()
          ).toBe(true);

          act(() => {
            wrapper
              .find(StyledSplitButtonChildrenContainer)
              .find(Button)
              .getDOMNode()
              .dispatchEvent(nativeInputEvent);
          });

          expect(
            wrapper.update().find(StyledSplitButtonChildrenContainer).exists()
          ).toBe(true);
        });
      });

      describe("on an external element", () => {
        describe("and focus is still on the toggle button", () => {
          it("then the Menu should not be closed", () => {
            expect(
              wrapper.update().find(StyledSplitButtonChildrenContainer).exists()
            ).toBe(true);

            act(() => {
              domWrapper.dispatchEvent(nativeInputEvent);
            });

            expect(
              wrapper.update().find(StyledSplitButtonChildrenContainer).exists()
            ).toBe(true);
          });
        });

        describe("and focus is on a button in the menu", () => {
          it("then the Menu should be closed", () => {
            expect(
              wrapper.update().find(StyledSplitButtonChildrenContainer).exists()
            ).toBe(true);
            simulateBlurOnToggle(wrapper);

            act(() => {
              domWrapper.dispatchEvent(nativeInputEvent);
            });

            expect(
              wrapper.update().find(StyledSplitButtonChildrenContainer).exists()
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

  describe("tags", () => {
    describe("on component", () => {
      beforeEach(() => {
        wrapper = render();
        toggle = wrapper.find('[data-element="toggle-button"]');
      });

      it("include correct component, element and role data tags", () => {
        rootTagTest(wrapper, "split-button", "bar", "baz");
      });
    });

    describe.each(["additional-buttons", "main-button", "toggle-button"])(
      "%s element is tagged",
      (element) => {
        wrapper = render({}, multipleButtons, mount);

        toggle = wrapper.find(StyledSplitButtonToggle);
        toggle.simulate("mouseenter");

        expect(wrapper.find({ "data-element": element }).exists()).toBe(true);
      }
    );
  });

  describe("when focused on the toggle button", () => {
    const additionalButtonsSelector = '[data-element="additional-buttons"]';
    let container;

    beforeEach(() => {
      container = document.createElement("div");
      container.id = "enzymeContainer";
      document.body.appendChild(container);
      wrapper = renderAttached({}, multipleButtons);
      toggle = wrapper.find(StyledSplitButtonToggle);
      toggle.simulate("focus");
    });

    afterEach(() => {
      if (container && container.parentNode) {
        container.parentNode.removeChild(container);
      }

      container = null;
    });

    describe.each([
      ["enter", 13],
      ["space", 32],
    ])("the %s key is pressed", (name, keyCode) => {
      it("then the first additional button should be focused", () => {
        toggle.simulate("keydown", { which: keyCode });
        const firstButton = wrapper
          .find(additionalButtonsSelector)
          .find("button")
          .at(0);
        expect(firstButton.getDOMNode()).toBe(document.activeElement);
      });
    });

    describe('when "up" key is pressed', () => {
      it("the additonal buttons should be stepped through in sequence", () => {
        const additionalButtons = wrapper
          .find(additionalButtonsSelector)
          .find(ButtonWithForwardRef);

        keyboard.pressUpArrow();
        expect(
          additionalButtons.at(additionalButtons.length - 1).getDOMNode()
        ).toBe(document.activeElement);
        keyboard.pressUpArrow();
        expect(
          additionalButtons.at(additionalButtons.length - 2).getDOMNode()
        ).toBe(document.activeElement);
        keyboard.pressUpArrow();
        expect(additionalButtons.at(0).getDOMNode()).toBe(
          document.activeElement
        );
      });
    });

    describe('when "down" key is pressed', () => {
      it("the additonal buttons should be stepped through in sequence", () => {
        const additionalButtons = wrapper
          .find(additionalButtonsSelector)
          .find(ButtonWithForwardRef);

        keyboard.pressDownArrow();
        expect(additionalButtons.at(0).getDOMNode()).toBe(
          document.activeElement
        );
        keyboard.pressDownArrow();
        expect(
          additionalButtons.at(additionalButtons.length - 2).getDOMNode()
        ).toBe(document.activeElement);
        keyboard.pressDownArrow();
        expect(
          additionalButtons.at(additionalButtons.length - 1).getDOMNode()
        ).toBe(document.activeElement);
        keyboard.pressDownArrow();
        expect(additionalButtons.at(0).getDOMNode()).toBe(
          document.activeElement
        );
      });
    });

    describe("the tab key is pressed", () => {
      it("it calls the expected timeout function", () => {
        const timeoutSpy = spyOn(window, "setTimeout");
        keyboard.pressTab();

        expect(timeoutSpy).toHaveBeenCalled();
      });

      it("it does not pass focus to the first additonal button", () => {
        toggle.simulate("keydown", { which: 9 });
        const firstButton = wrapper
          .find(additionalButtonsSelector)
          .find("button")
          .at(0);

        expect(firstButton.getDOMNode()).not.toBe(document.activeElement);
      });
    });

    describe("and mouse leaves the Split Button", () => {
      it("then the additional buttons menu should remain open", () => {
        wrapper.simulate("mouseLeave");

        expect(wrapper.find(additionalButtonsSelector).exists()).toBe(true);
      });
    });

    describe("and mouse leaves the Split Button after focus is out of toggle", () => {
      it("then the additional buttons menu should be closed", () => {
        toggle.simulate("blur");
        wrapper.simulate("mouseLeave");

        expect(wrapper.find(additionalButtonsSelector).exists()).toBe(false);
      });
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });

  it("should set proper width of ButtonContainer", () => {
    spyOn(Element.prototype, "getBoundingClientRect");
    Element.prototype.getBoundingClientRect = jest
      .fn()
      .mockImplementation(() => ({ width: 200 }));

    wrapper = render({}, singleButton, mount);
    simulateFocusOnToggle(wrapper);

    assertStyleMatch(
      { minWidth: `${0.75 * 200}px` },
      wrapper.find(StyledSplitButtonChildrenContainer)
    );

    jest.clearAllMocks();

    wrapper.unmount();
  });
});

function simulateFocusOnToggle(container) {
  const toggleButton = container.find('[data-element="toggle-button"]').at(0);

  toggleButton.simulate("focus");
}

function simulateBlurOnToggle(container) {
  const toggleButton = container.find('[data-element="toggle-button"]').at(0);

  toggleButton.simulate("blur");
}
