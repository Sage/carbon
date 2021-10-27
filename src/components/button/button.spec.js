import React from "react";
import { shallow, mount } from "enzyme";
import { act } from "react-dom/test-utils";
import TestRenderer from "react-test-renderer";

import Icon from "components/icon";
import Button from "./button.component";
import StyledButton from "./button.style";
import BaseTheme from "../../style/themes/base";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
  expectError,
} from "../../__spec_helper__/test-utils";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import StyledIcon from "../icon/icon.style";
import { BUTTON_VARIANTS } from "./button.config";

const render = (props, renderer = shallow) => {
  return renderer(<Button {...props} />);
};

const variants = [
  "primary",
  "secondary",
  "tertiary",
  "dashed",
  "darkBackground",
];
const sizesPadding = { small: "16px", medium: "24px", large: "32px" };
const sizesHeights = { small: "32px", medium: "40px", large: "48px" };
describe("Button", () => {
  describe("when no props other than children are passed into the component", () => {
    it("renders the default props and children", () => {
      const wrapper = render({ children: "foo" });
      expect(wrapper.contains(<Icon type="filter" />)).toBeFalsy();
      expect(wrapper.props().buttonType).toEqual("secondary");
      expect(wrapper.props().size).toEqual("medium");
      expect(wrapper.props().disabled).toEqual(false);
    });
  });

  describe.each(variants)("spacing for %s button", (variant) => {
    testStyledSystemSpacing(
      (props) => (
        <Button variant={variant} {...props}>
          Test
        </Button>
      ),
      { px: "24px", m: "0" }
    );
  });

  describe("when iconType specified with no children", () => {
    it("icon matches the style for an icon only button", () => {
      const wrapper = mount(<Button iconType="bin" />);
      assertStyleMatch(
        {
          marginBottom: "1px",
        },
        wrapper,
        { modifier: `${StyledIcon}` }
      );
      assertStyleMatch({ width: "40px" }, wrapper);
    });
    it("width matches the style for 'small' button", () => {
      const wrapper = mount(<Button iconType="bin" size="small" />);
      assertStyleMatch({ width: "32px" }, wrapper);
    });
    it("width matches the style for 'large' button", () => {
      const wrapper = mount(<Button iconType="bin" size="large" />);
      assertStyleMatch({ width: "48px" }, wrapper);
    });
  });

  describe.each(Object.entries(sizesPadding))(
    "spacing for %s button",
    (size, px) => {
      testStyledSystemSpacing(
        (props) => (
          <Button size={size} {...props}>
            Test
          </Button>
        ),
        { px, m: "0" }
      );
    }
  );

  describe('when only the "iconPosition" and "iconType" props are passed into the component', () => {
    it("renders the default props and children to match the snapshot with the Icon before children", () => {
      const wrapper = render(
        { children: "foo", iconType: "filter", iconPosition: "before" },
        TestRenderer.create
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("renders the default props and children to match the snapshot with the Icon after children", () => {
      const wrapper = render(
        { children: "foo", iconType: "filter", iconPosition: "after" },
        TestRenderer.create
      );
      expect(wrapper).toMatchSnapshot();
    });

    describe.each(["before", "after"])(
      'when position is set to "%s"',
      (position) => {
        describe.each(BUTTON_VARIANTS)(
          "and the button type is %s",
          (buttonType) => {
            let wrapper;
            beforeEach(() => {
              wrapper = render({
                children: "foo",
                iconType: "filter",
                iconPosition: position,
                buttonType,
              }).dive();
            });

            it("contains an Icon", () => {
              const assertion =
                wrapper.find(Icon).exists() &&
                wrapper.find(Icon).props().type === "filter";
              expect(assertion).toEqual(true);
            });
          }
        );
      }
    );
  });

  describe("When icon type is specified and button has no children", () => {
    describe.each(BUTTON_VARIANTS)(
      "and the button type is %s",
      (buttonType) => {
        let wrapper;
        beforeEach(() => {
          wrapper = render({
            iconType: "filter",
            buttonType,
          }).dive();
        });

        it("contains an Icon", () => {
          const assertion =
            wrapper.find(Icon).exists() &&
            wrapper.find(Icon).props().type === "filter";
          expect(assertion).toEqual(true);
        });
      }
    );
  });

  describe("when there are no props passed except children", () => {
    it('matches the expect styles for a default button with variants "secondary" and "medium"', () => {
      const wrapper = render({ children: "foo" }, TestRenderer.create).toJSON();
      assertStyleMatch(
        {
          background: "transparent",
          borderColor: BaseTheme.colors.primary,
          color: BaseTheme.colors.primary,
          fontSize: "14px",
          minHeight: sizesHeights.medium,
        },
        wrapper
      );
    });
  });

  describe("when there are no iconType or children passed", () => {
    it("throws an error", () => {
      const errorMessage =
        "Warning: Failed prop type: Either prop `iconType` must be defined or this node must have children.";
      const assert = expectError(errorMessage);

      render({}, mount);
      assert();
    });
  });

  describe.each(variants)(
    'when setting the "buttonType" prop to "%s"',
    (variant) => {
      it("matches the expected style", () => {
        const wrapper = render(
          {
            children: "foo",
            disabled: true,
            buttonType: variant,
          },
          TestRenderer.create
        ).toJSON();
        assertStyleMatch(
          {
            background:
              variant === "secondary" ||
              variant === "tertiary" ||
              variant === "dashed"
                ? "transparent"
                : BaseTheme.disabled.button,
            borderColor:
              variant === "secondary" || variant === "dashed"
                ? BaseTheme.disabled.button
                : "transparent",
            color: BaseTheme.disabled.text,
          },
          wrapper
        );
      });
    }
  );

  describe("when the destructive prop is passed", () => {
    it("matches the expected destructive style for primary buttons", () => {
      const wrapper = render(
        {
          children: "foo",
          destructive: true,
          buttonType: "primary",
        },
        TestRenderer.create
      ).toJSON();

      assertStyleMatch(
        {
          background: BaseTheme.colors.error,
          borderColor: "transparent",
          color: BaseTheme.colors.white,
        },
        wrapper
      );
    });

    it("matches the expected destructive style for secondary buttons", () => {
      const wrapper = render(
        {
          children: "foo",
          destructive: true,
        },
        TestRenderer.create
      ).toJSON();

      assertStyleMatch(
        {
          background: "transparent",
          borderColor: BaseTheme.colors.error,
          color: BaseTheme.colors.error,
        },
        wrapper
      );

      assertStyleMatch(
        {
          color: BaseTheme.colors.error,
        },
        wrapper,
        { modifier: `${StyledIcon}` }
      );

      assertStyleMatch(
        {
          background: BaseTheme.colors.destructive.hover,
          color: BaseTheme.colors.white,
        },
        wrapper,
        { modifier: ":focus" }
      );

      assertStyleMatch(
        {
          color: BaseTheme.colors.white,
        },
        wrapper,
        { modifier: `:focus ${StyledIcon}` }
      );

      assertStyleMatch(
        {
          background: BaseTheme.colors.destructive.hover,
          borderColor: BaseTheme.colors.destructive.hover,
          color: BaseTheme.colors.white,
        },
        wrapper,
        { modifier: ":hover" }
      );

      assertStyleMatch(
        {
          color: BaseTheme.colors.white,
        },
        wrapper,
        { modifier: `:hover ${StyledIcon}` }
      );
    });
  });

  it("matches the expected destructive style for tertiary buttons", () => {
    const wrapper = render(
      {
        children: "foo",
        destructive: true,
        buttonType: "tertiary",
      },
      TestRenderer.create
    ).toJSON();

    assertStyleMatch(
      {
        background: "transparent",
        borderColor: "transparent",
        color: BaseTheme.colors.error,
      },
      wrapper
    );

    assertStyleMatch(
      {
        color: BaseTheme.colors.error,
      },
      wrapper,
      { modifier: `${StyledIcon}` }
    );

    assertStyleMatch(
      {
        color: BaseTheme.colors.destructive.hover,
      },
      wrapper,
      { modifier: ":hover" }
    );

    assertStyleMatch(
      {
        color: BaseTheme.colors.destructive.hover,
      },
      wrapper,
      { modifier: `:hover ${StyledIcon}` }
    );
  });

  describe('when "noWrap" prop is passed', () => {
    it("renders with property whiteSpace: nowrap set", () => {
      const wrapper = mount(<Button noWrap>Button</Button>);
      assertStyleMatch({ whiteSpace: "nowrap" }, wrapper);
    });
  });

  describe('when the "disabled" prop is passed', () => {
    it('matches the style for the default Button when no "as" and "size" props are passed', () => {
      const wrapper = render(
        { children: "foo", disabled: true },
        TestRenderer.create
      ).toJSON();
      assertStyleMatch(
        {
          background: "transparent",
          borderColor: BaseTheme.disabled.button,
          color: BaseTheme.disabled.text,
          fontSize: "14px",
          minHeight: sizesHeights.medium,
        },
        wrapper
      );
    });

    describe.each(Object.entries(sizesHeights))(
      'when a "%s"',
      (size, height) => {
        describe.each(variants)(' "%s" button is rendered', (variant) => {
          it("matches the expected style", () => {
            const wrapper = render(
              {
                children: "foo",
                disabled: true,
                buttonType: variant,
                size,
              },
              TestRenderer.create
            ).toJSON();

            assertStyleMatch(
              {
                background:
                  variant === "secondary" ||
                  variant === "tertiary" ||
                  variant === "dashed"
                    ? "transparent"
                    : BaseTheme.disabled.button,
                borderColor:
                  variant === "secondary" || variant === "dashed"
                    ? BaseTheme.disabled.button
                    : "transparent",
                color: BaseTheme.disabled.text,
                fontSize: size === "large" ? "16px" : "14px",
                minHeight: height,
              },
              wrapper
            );
          });

          it("matches the expected disabled style even if destructive", () => {
            const wrapper = render(
              {
                children: "foo",
                destructive: true,
                disabled: true,
                buttonType: variant,
                size,
              },
              TestRenderer.create
            ).toJSON();

            assertStyleMatch(
              {
                background:
                  variant === "secondary" ||
                  variant === "tertiary" ||
                  variant === "dashed"
                    ? "transparent"
                    : BaseTheme.disabled.button,
                borderColor:
                  variant === "secondary" || variant === "dashed"
                    ? BaseTheme.disabled.button
                    : "transparent",
                color: BaseTheme.disabled.text,
                fontSize: size === "large" ? "16px" : "14px",
                minHeight: height,
              },
              wrapper
            );
          });
        });
      }
    );
  });

  it("matches the applies the expected style to the icon", () => {
    const wrapper = TestRenderer.create(
      <StyledButton iconType="plus">Test</StyledButton>
    );
    assertStyleMatch(
      {
        height: "16px",
      },
      wrapper.toJSON(),
      { modifier: `${StyledIcon}` }
    );
  });

  describe("A primary button", () => {
    const primary = render({
      name: "Primary Button",
      as: "primary",
      onClick: jest.fn(),
      children: "Primary",
    }).dive();

    it("renders a primary button", () => {
      expect(primary.props().name).toEqual("Primary Button");
      expect(primary.props().buttonType).toEqual("primary");
      expect(
        primary.containsMatchingElement(<span>Primary</span>)
      ).toBeTruthy();
    });
  });

  describe("A secondary button", () => {
    const secondary = render({
      name: "Secondary Button",
      className: "customClass",
      theme: "red",
      children: "Secondary",
    }).dive();

    it("renders a secondary button", () => {
      expect(secondary.props().name).toEqual("Secondary Button");
      expect(secondary.props().buttonType).toEqual("secondary");
      expect(
        secondary.containsMatchingElement(<span>Secondary</span>)
      ).toBeTruthy();
    });
  });

  describe("A small button", () => {
    const small = render({
      name: "Small Button",
      size: "small",
      children: "Small",
    }).dive();

    it("renders a small button", () => {
      expect(small.props().name).toEqual("Small Button");
      expect(small.props().size).toEqual("small");
      expect(small.containsMatchingElement(<span>Small</span>)).toBeTruthy();
    });
  });

  describe("A large button", () => {
    const large = render({
      name: "Large Button",
      size: "large",
      children: "Large",
    }).dive();

    it("renders a large button", () => {
      expect(large.props().name).toEqual("Large Button");
      expect(large.props().size).toEqual("large");
      expect(large.containsMatchingElement(<span>Large</span>)).toBeTruthy();
    });
  });

  describe("A disabled button", () => {
    const disabled = render({
      name: "Disabled Button",
      disabled: true,
      children: "Disabled",
    }).dive();

    it("renders a disabled button", () => {
      expect(disabled.props().name).toEqual("Disabled Button");
      expect(disabled.props().buttonType).toEqual("secondary");
      expect(
        disabled.containsMatchingElement(<span>Disabled</span>)
      ).toBeTruthy();
      expect(disabled.props().disabled).toEqual(true);
    });
  });

  describe("when a subtext prop is passed into the component", () => {
    it('does not render the subtext if the size prop is not "large"', () => {
      try {
        const wrapper = render({ children: "foo", subtext: "bar" }).dive();

        expect(wrapper.find('[data-element="subtext"]').exists()).toBe(false);
      } catch (error) {} // eslint-disable-line no-empty
    });

    it('renders the subtext if the size prop is "large"', () => {
      const wrapper = render({
        children: "foo",
        size: "large",
        subtext: "bar",
      }).dive();

      expect(wrapper.find('[data-element="subtext"]').exists()).toBe(true);
    });

    describe.each(["small", "medium"])(
      'when the "subtext" prop is specified and the size prop is set to "%s"',
      (size) => {
        it("throws an error", () => {
          expect(() => {
            render({ children: "foo", subtext: "bar", size }).dive();
          }).toThrowError(
            "subtext prop has no effect unless the button is large"
          );
        });
      }
    );
  });

  describe("tags on component", () => {
    it("includes correct component, element and role data tags", () => {
      const wrapper = shallow(
        <Button data-element="bar" data-role="baz">
          Test
        </Button>
      ).dive();

      rootTagTest(wrapper, "button", "bar", "baz");
    });
  });

  describe("aria-label", () => {
    it("should be present when button has only an icon", () => {
      const wrapper = shallow(
        <Button aria-label="Bin" iconType="bin" />
      ).dive();

      const ariaLink = wrapper.find('[aria-label="Bin"]');
      expect(ariaLink.exists()).toBe(true);
    });
  });

  describe('when the iconType is "services"', () => {
    it("applies the expected style to the icon", () => {
      const buttonWithServiceIcon = render(
        { children: "foo", iconType: "services", size: "large" },
        TestRenderer.create
      );
      assertStyleMatch(
        {
          height: "6px",
        },
        buttonWithServiceIcon.toJSON(),
        { modifier: `${StyledIcon}` }
      );
    });
  });

  describe("when the fullWidth prop is provided", () => {
    it.each(variants)(
      'applies the expected style to the "%s" button',
      (variant) => {
        const button = render(
          {
            children: "foo",
            fullWidth: true,
            buttonType: variant,
          },
          TestRenderer.create
        );
        assertStyleMatch(
          {
            width: "100%",
          },
          button.toJSON()
        );
      }
    );
  });

  describe("using href prop to render as an anchor", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(<Button href="/">Test</Button>);
    });

    it("should render as an <a> element", () => {
      expect(wrapper.find("a").exists()).toEqual(true);
    });

    describe("when space key pressed", () => {
      it("should click the link", () => {
        const preventDefaultSpy = jest.fn();

        act(() => {
          wrapper.find(StyledButton).at(0).props().onKeyDown({
            key: " ",
            which: 32,
            preventDefault: preventDefaultSpy,
          });
        });

        wrapper.update();

        expect(preventDefaultSpy).toHaveBeenCalled();
      });
    });

    describe("when other key pressed", () => {
      it("should not click the link", () => {
        const preventDefaultSpy = jest.fn();

        act(() => {
          wrapper.find(StyledButton).at(0).props().onKeyDown({
            key: "ArrowLeft",
            which: 37,
            preventDefault: jest.fn(),
          });
        });

        wrapper.update();

        expect(preventDefaultSpy).not.toHaveBeenCalled();
      });
    });

    describe("with target and rel props", () => {
      it("should set the correct html attributes", () => {
        wrapper = mount(
          <Button href="/" target="_blank" rel="noopener noreferrer">
            Test
          </Button>
        );

        expect(wrapper.find(StyledButton).props().target).toEqual("_blank");
        expect(wrapper.find(StyledButton).props().rel).toEqual(
          "noopener noreferrer"
        );
      });
    });
  });

  describe("overriding size based padding", () => {
    const paddingValues = Array.from({ length: 9 }).map((_, px) => [
      px === 0 ? String(px) : `${px * 8}px`,
      px,
    ]);
    it.each(paddingValues)(
      "sets the padding to %s when px prop is %d",
      (result, px) => {
        const wrapper = render({ px }, mount);

        assertStyleMatch(
          {
            paddingLeft: result,
          },
          wrapper
        );
      }
    );
  });
});
