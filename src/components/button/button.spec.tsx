import React from "react";
import { shallow, mount, ShallowWrapper, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import TestRenderer from "react-test-renderer";
import { space } from "../../style/themes/base/base-theme.config";

import Icon from "../icon";
import Button, {
  ButtonProps,
  ButtonTypes,
  SizeOptions,
  ButtonIconPosition,
  ButtonWithForwardRef,
} from "./button.component";
import StyledButton from "./button.style";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
} from "../../__spec_helper__/test-utils";
import { rootTagTest } from "../../__internal__/utils/helpers/tags/tags-specs";
import StyledIcon from "../icon/icon.style";
import { BUTTON_VARIANTS } from "./button.config";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import Logger from "../../__internal__/utils/logger";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const render = (props: ButtonProps, renderer: any = shallow) => {
  return renderer(<Button {...props} />);
};

const sizesPadding: [SizeOptions, string][] = [
  ["small", "16px"],
  ["medium", "24px"],
  ["large", "32px"],
];
const sizesHeights: [SizeOptions, string][] = [
  ["small", "32px"],
  ["medium", "40px"],
  ["large", "48px"],
];

jest.mock("../../__internal__/utils/logger");

describe("Button", () => {
  let loggerSpy: jest.SpyInstance<void, [message: string]> | jest.Mock;
  let wrapper: ShallowWrapper | ReactWrapper;

  beforeEach(() => {
    loggerSpy = jest.spyOn(Logger, "deprecate");
    jest.restoreAllMocks();
  });

  afterEach(() => {
    loggerSpy.mockRestore();
  });

  afterAll(() => {
    loggerSpy.mockClear();
  });

  describe("Dashed Button", () => {
    it("should display deprecation warning once", () => {
      mount(<Button buttonType="dashed">Button</Button>);

      expect(loggerSpy).toHaveBeenCalledWith(
        "The `dashed` variant of the `buttonType` prop for `Button` component is deprecated and will soon be removed."
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("ButtonWithForwardRef", () => {
    it("should display deprecation warning when the component is used once", () => {
      wrapper = mount(<ButtonWithForwardRef>Button</ButtonWithForwardRef>);

      expect(loggerSpy).toHaveBeenCalledWith(
        "The `ButtonWithForwardRef` component is deprecated and will soon be removed. Please use a basic `Button` component with `ref` instead."
      );

      wrapper.setProps({ prop1: true });
      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  it("should display deprecation warning when the forwardRef prop is used", () => {
    const ref = { current: null };

    wrapper = mount(<Button forwardRef={ref}>Button</Button>);

    expect(loggerSpy).toHaveBeenCalledWith(
      "The `forwardRef` prop in `Button` component is deprecated and will soon be removed. Please use `ref` instead."
    );
    wrapper.setProps({ prop1: true });
    expect(loggerSpy).toHaveBeenCalledTimes(1);
  });

  describe.each(["ref", "forwardRef"])("%s", (propName) => {
    it("accepts ref as a ref object", () => {
      const ref = { current: null };

      wrapper = mount(<Button {...{ [propName]: ref }}>Button</Button>);

      wrapper.update();

      expect(ref.current).toBe(wrapper.find(StyledButton).getDOMNode());
    });

    it("accepts ref as a ref callback", () => {
      const ref = jest.fn();
      wrapper = mount(<Button {...{ [propName]: ref }}>Button</Button>);

      wrapper.update();

      expect(ref).toHaveBeenCalledWith(wrapper.find(StyledButton).getDOMNode());
    });

    it("sets ref to empty after unmount", () => {
      const ref = { current: null };
      wrapper = mount(<Button {...{ [propName]: ref }}>Button</Button>);

      wrapper.update();

      wrapper.unmount();

      expect(ref.current).toBe(null);
    });
  });

  describe("tooltip", () => {
    it("renders TooltipProvider with correct props", () => {
      wrapper = mount(
        <Button
          iconType="bin"
          iconTooltipMessage="This is a tooltip"
          aria-label="Delete"
        />
      );

      const props = wrapper.find(TooltipProvider).props();

      expect(props.disabled).toBe(false);
      expect(props.focusable).toBe(false);
      expect(props.target).toBe(wrapper.find(StyledButton).getDOMNode());
    });
  });

  describe("when no props other than children are passed into the component", () => {
    it("renders the default props and children", () => {
      const wrapperWithChildren = render({ children: "foo" });
      expect(wrapperWithChildren.contains(<Icon type="filter" />)).toBeFalsy();
      expect(wrapperWithChildren.props().buttonType).toEqual("secondary");
      expect(wrapperWithChildren.props().size).toEqual("medium");
      expect(wrapperWithChildren.props().disabled).toEqual(false);
    });
  });

  describe.each(BUTTON_VARIANTS)("spacing for %s button", (variant) => {
    testStyledSystemSpacing(
      (props) => (
        <Button buttonType={variant} {...props}>
          Test
        </Button>
      ),
      { px: "24px", m: "0" }
    );
  });

  describe("when iconType specified with no children", () => {
    it("icon matches the style for an icon only button", () => {
      wrapper = mount(<Button iconType="bin" />);
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
      wrapper = mount(<Button iconType="bin" size="small" />);
      assertStyleMatch({ width: "32px" }, wrapper);
    });
    it("width matches the style for 'large' button", () => {
      wrapper = mount(<Button iconType="bin" size="large" />);
      assertStyleMatch({ width: "48px" }, wrapper);
    });
  });

  describe.each<[SizeOptions, string]>(sizesPadding)(
    "spacing for %s button size",
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
      wrapper = render(
        { children: "foo", iconType: "filter", iconPosition: "before" },
        TestRenderer.create
      );
      expect(wrapper).toMatchSnapshot();
    });

    it("renders the default props and children to match the snapshot with the Icon after children", () => {
      wrapper = render(
        { children: "foo", iconType: "filter", iconPosition: "after" },
        TestRenderer.create
      );
      expect(wrapper).toMatchSnapshot();
    });

    describe.each<ButtonIconPosition>(["before", "after"])(
      'when position is set to "%s"',
      (position) => {
        describe.each<ButtonTypes>(BUTTON_VARIANTS)(
          "and the button type is %s",
          (buttonType) => {
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
      wrapper = render({ children: "foo" }, TestRenderer.create).toJSON();
      assertStyleMatch(
        {
          background: "transparent",
          borderColor: "var(--colorsActionMajor500)",
          color: "var(--colorsActionMajor500)",
          fontSize: "var(--fontSizes100)",
          minHeight: "40px",
        },
        wrapper
      );
    });
  });

  describe("when there are no iconType or children passed", () => {
    it("throws an error", () => {
      const mockGlobal = jest
        .spyOn(global.console, "error")
        .mockImplementation(() => undefined);
      const errorMessage =
        "Either prop `iconType` must be defined or this node must have children.";

      expect(() => {
        render({}, mount);
      }).toThrow(errorMessage);

      mockGlobal.mockReset();
    });
  });

  describe.each(BUTTON_VARIANTS)(
    'when setting the "buttonType" prop to "%s"',
    (variant) => {
      it("matches the expected style", () => {
        wrapper = render(
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
                : "var(--colorsActionDisabled500)",
            borderColor:
              variant === "secondary" || variant === "dashed"
                ? "var(--colorsActionDisabled500)"
                : "transparent",
            color:
              variant === "dashed"
                ? "var(--colorsActionMinorYin030)"
                : "var(--colorsActionMajorYin030)",
          },
          wrapper
        );
      });
    }
  );

  describe("when the destructive prop is passed", () => {
    it("matches the expected destructive style for primary buttons", () => {
      wrapper = render(
        {
          children: "foo",
          destructive: true,
          buttonType: "primary",
        },
        TestRenderer.create
      ).toJSON();

      assertStyleMatch(
        {
          background: "var(--colorsSemanticNegative500)",
          color: "var(--colorsSemanticNegativeYang100)",
        },
        wrapper
      );

      assertStyleMatch(
        {
          background: "var(--colorsSemanticNegative600)",
        },
        wrapper,
        { modifier: ":hover" }
      );
    });

    it("matches the expected destructive style for secondary buttons", () => {
      wrapper = render(
        {
          children: "foo",
          destructive: true,
        },
        TestRenderer.create
      ).toJSON();

      assertStyleMatch(
        {
          background: "transparent",
          borderColor: "var(--colorsSemanticNegative500)",
          color: "var(--colorsSemanticNegative500)",
        },
        wrapper
      );

      assertStyleMatch(
        {
          color: "var(--colorsSemanticNegative500)",
        },
        wrapper,
        { modifier: `${StyledIcon}` }
      );

      assertStyleMatch(
        {
          background: "var(--colorsSemanticNegative600)",
          borderColor: "var(--colorsSemanticNegativeTransparent)",
          color: "var(--colorsSemanticNegativeYang100)",
        },
        wrapper,
        { modifier: ":hover" }
      );

      assertStyleMatch(
        {
          color: "var(--colorsSemanticNegativeYang100)",
        },
        wrapper,
        { modifier: `:hover ${StyledIcon}` }
      );
    });
  });

  it("matches the expected destructive style for tertiary buttons", () => {
    wrapper = render(
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
        color: "var(--colorsSemanticNegative500)",
      },
      wrapper
    );

    assertStyleMatch(
      {
        color: "var(--colorsSemanticNegative500)",
      },
      wrapper,
      { modifier: `${StyledIcon}` }
    );

    assertStyleMatch(
      {
        color: "var(--colorsSemanticNegativeYang100)",
        background: "var(--colorsSemanticNegative600)",
      },
      wrapper,
      { modifier: ":hover" }
    );

    assertStyleMatch(
      {
        color: "var(--colorsSemanticNegativeYang100)",
      },
      wrapper,
      { modifier: `:hover ${StyledIcon}` }
    );
  });

  describe('when "noWrap" prop is passed', () => {
    it("renders with whiteSpace: nowrap set and removes flex-flow: wrap", () => {
      wrapper = mount(<Button noWrap>Button</Button>);
      assertStyleMatch({ whiteSpace: "nowrap", flexFlow: undefined }, wrapper);
    });
  });

  describe('when the "disabled" prop is passed', () => {
    it('matches the style for the default Button when no "as" and "size" props are passed', () => {
      wrapper = render(
        { children: "foo", disabled: true },
        TestRenderer.create
      ).toJSON();
      assertStyleMatch(
        {
          background: "transparent",
          borderColor: "var(--colorsActionDisabled500)",
          color: "var(--colorsActionMajorYin030)",
          fontSize: "var(--fontSizes100)",
          minHeight: "40px",
        },
        wrapper
      );
    });

    describe.each(sizesHeights)('when a "%s"', (size, height) => {
      describe.each(BUTTON_VARIANTS)(
        'and "%s" button is rendered',
        (variant) => {
          it("matches the expected style", () => {
            wrapper = render(
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
                    : "var(--colorsActionDisabled500)",
                borderColor:
                  variant === "secondary" || variant === "dashed"
                    ? "var(--colorsActionDisabled500)"
                    : "transparent",
                color:
                  variant === "dashed"
                    ? "var(--colorsActionMinorYin030)"
                    : "var(--colorsActionMajorYin030)",
                fontSize: size === "large" ? "16px" : "var(--fontSizes100)",
                minHeight: height,
              },
              wrapper
            );
          });

          it("matches the expected disabled style even if destructive", () => {
            wrapper = render(
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
                    : "var(--colorsActionDisabled500)",
                borderColor:
                  variant === "secondary" || variant === "dashed"
                    ? "var(--colorsActionDisabled500)"
                    : "transparent",
                color:
                  variant === "dashed"
                    ? "var(--colorsActionMinorYin030)"
                    : "var(--colorsActionMajorYin030)",
                fontSize: size === "large" ? "16px" : "var(--fontSizes100)",
                minHeight: height,
              },
              wrapper
            );
          });
        }
      );
    });
  });

  it("matches the applies the expected style to the icon", () => {
    const renderWrapper = TestRenderer.create(
      <StyledButton iconType="plus">Test</StyledButton>
    );
    assertStyleMatch(
      {
        height: "16px",
      },
      renderWrapper.toJSON(),
      { modifier: `${StyledIcon}` }
    );
  });

  describe("A primary button", () => {
    const primary = render({
      name: "Primary Button",
      buttonType: "primary",
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
        wrapper = render({ children: "foo", subtext: "bar" }).dive();

        expect(wrapper.find('[data-element="subtext"]').exists()).toBe(false);
      } catch (error) {} // eslint-disable-line no-empty
    });

    it('renders the subtext if the size prop is "large"', () => {
      wrapper = render({
        children: "foo",
        size: "large",
        subtext: "bar",
      }).dive();

      expect(wrapper.find('[data-element="subtext"]').exists()).toBe(true);
    });

    describe.each<SizeOptions>(["small", "medium"])(
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
      wrapper = shallow(
        <Button data-element="bar" data-role="baz">
          Test
        </Button>
      ).dive();

      rootTagTest(wrapper, "button", "bar", "baz");
    });
  });

  describe("aria-label", () => {
    it("when defined, should be present on the button element", () => {
      wrapper = shallow(<Button aria-label="bar">foo</Button>).dive();

      const ariaLink = wrapper.find('[aria-label="bar"]');
      expect(ariaLink.exists()).toBe(true);
    });

    it("when defined, should be present on the button element, when the button has only an icon", () => {
      wrapper = shallow(<Button aria-label="foo" iconType="bin" />).dive();

      const ariaLink = wrapper.find('[aria-label="foo"]');
      expect(ariaLink.exists()).toBe(true);
    });

    it("when not defined, should default to iconType, when the button has only an icon", () => {
      wrapper = shallow(<Button iconType="bin" />).dive();

      const ariaLink = wrapper.find('[aria-label="bin"]');
      expect(ariaLink.exists()).toBe(true);
    });
  });

  describe("when specified with an icon", () => {
    it.each<ButtonProps>([
      { iconType: "bin", "aria-label": "Message" },
      { iconType: "bin", children: "Message" },
    ])("hide icon from assistive technologies", (props) => {
      wrapper = render(props);

      const iconProps = wrapper.find(Icon).props();

      expect(iconProps["aria-hidden"]).toBe(true);
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
    it.each(BUTTON_VARIANTS)(
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
      space[px],
      px,
    ]);
    it.each(paddingValues)(
      "sets the padding to %s when px prop is %d",
      (result, px) => {
        wrapper = render({ px, children: "foo" }, mount);

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
