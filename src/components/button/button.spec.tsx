import React from "react";
import { mount } from "enzyme";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import Icon from "../icon";
import Button from "./button.component";
import StyledButton, { StyledButtonMainText } from "./button.style";
import {
  assertStyleMatch,
  testStyledSystemSpacing,
} from "../../__spec_helper__/test-utils";
import StyledIcon from "../icon/icon.style";
import { TooltipProvider } from "../../__internal__/tooltip-provider";
import Logger from "../../__internal__/utils/logger";

jest.mock("../../__internal__/utils/logger");

describe("Button", () => {
  describe("deprecation warnings", () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    it("should display deprecation warning once when dashed buttonType is used", () => {
      const loggerSpy = jest.spyOn(Logger, "deprecate");

      mount(
        <>
          <Button buttonType="dashed">Button</Button>
          <Button buttonType="dashed">Button</Button>
        </>
      );

      expect(loggerSpy).toHaveBeenCalledWith(
        "The `dashed` variant of the `buttonType` prop for `Button` component is deprecated and will soon be removed."
      );

      expect(loggerSpy).toHaveBeenCalledTimes(1);
    });
  });

  testStyledSystemSpacing((props) => <Button {...props}>Test</Button>, {
    px: "24px",
    m: "0",
  });

  it.each([
    ["small", "var(--spacing200)"],
    ["medium", "var(--spacing300)"],
    ["large", "var(--spacing400)"],
  ] as const)(
    "has correct default horizontal padding when size is %s",
    (size, padding) => {
      const wrapper = mount(<Button size={size}>Test</Button>);
      assertStyleMatch(
        { paddingLeft: padding, paddingRight: padding },
        wrapper
      );
    }
  );

  it("accepts ref as a ref object", () => {
    const ref = { current: null };
    const wrapper = mount(<Button ref={ref}>Button</Button>);

    wrapper.update();

    expect(ref.current).toBe(wrapper.find(StyledButton).getDOMNode());
  });

  it("accepts ref as a ref callback", () => {
    const ref = jest.fn();
    const wrapper = mount(<Button ref={ref}>Button</Button>);

    wrapper.update();

    expect(ref).toHaveBeenCalledWith(wrapper.find(StyledButton).getDOMNode());
  });

  it("sets ref to empty after unmount", () => {
    const ref = { current: null };
    const wrapper = mount(<Button ref={ref}>Button</Button>);

    wrapper.update();

    wrapper.unmount();
    expect(ref.current).toBe(null);
  });

  it("renders TooltipProvider with correct props when iconTooltipMessage prop is passed", () => {
    const wrapper = mount(
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

  it("renders medium-sized, secondary button when button has child text and no props", () => {
    const wrapper = mount(<Button>foo</Button>);
    const button = wrapper.find(StyledButton);
    expect(button.find(Icon).exists()).toBeFalsy();
    expect(button.prop("buttonType")).toEqual("secondary");
    expect(button.prop("size")).toEqual("medium");
    expect(button.prop("disabled")).toBeFalsy();
  });

  describe("when iconType specified with no children", () => {
    it("width matches the style for 'small' button", () => {
      const wrapper = mount(<Button iconType="bin" size="small" />);
      assertStyleMatch({ width: "32px" }, wrapper);
    });
    it("width matches the style for 'large' button", () => {
      const wrapper = mount(<Button iconType="bin" size="large" />);
      assertStyleMatch({ width: "48px" }, wrapper);
    });
  });

  it("icon is rendered before text when iconPosition is 'before' and iconType is specified", () => {
    const wrapper = mount(
      <Button iconType="filter" iconPosition="before">
        Filter
      </Button>
    );
    const button = wrapper.find("button");
    expect(button.childAt(0).find(Icon).exists()).toBeTruthy();
    expect(button.childAt(1).text()).toEqual("Filter");
  });

  it("icon is rendered after text when iconPosition is 'before' and iconType is specified", () => {
    const wrapper = mount(
      <Button iconType="filter" iconPosition="after">
        Filter
      </Button>
    );
    const button = wrapper.find("button");
    expect(button.childAt(0).text()).toEqual("Filter");
    expect(button.childAt(1).find(Icon).exists()).toBeTruthy();
  });

  it("renders with correct border radius", () => {
    const wrapper = mount(<Button>foo</Button>);
    assertStyleMatch({ borderRadius: "var(--borderRadius400)" }, wrapper);
  });

  it("error is thrown when there are no iconType and no children passed", () => {
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => mount(<Button />)).toThrow(
      "Either prop `iconType` must be defined or this node must have children."
    );

    consoleSpy.mockRestore();
  });

  it.each([
    ["primary", "var(--colorsActionDisabled500)", "transparent"],
    ["secondary", "transparent", "var(--colorsActionDisabled500)"],
    ["tertiary", "transparent", "transparent"],
    ["darkBackground", "var(--colorsActionDisabled500)", "transparent"],
  ] as const)(
    "has correct disabled styling when buttonType prop is %s and disabled prop is specified",
    (buttonType, background, borderColor) => {
      const wrapper = mount(
        <Button disabled buttonType={buttonType}>
          foo
        </Button>
      );

      assertStyleMatch(
        {
          background,
          borderColor,
          color: "var(--colorsActionMajorYin030)",
        },
        wrapper
      );
    }
  );

  describe("when the destructive prop is passed", () => {
    it("matches the expected destructive style for primary buttons", () => {
      const wrapper = mount(
        <Button destructive buttonType="primary">
          foo
        </Button>
      );

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
      const wrapper = mount(
        <Button destructive buttonType="secondary">
          foo
        </Button>
      );

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
    const wrapper = mount(
      <Button destructive buttonType="tertiary">
        foo
      </Button>
    );

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
      const wrapper = mount(<Button noWrap>Button</Button>);
      assertStyleMatch({ whiteSpace: "nowrap", flexFlow: undefined }, wrapper);
    });
  });

  it("button is disabled when disabled prop is passed", () => {
    render(<Button disabled>foo</Button>);

    const button = screen.getByRole("button", { name: /foo/ });
    expect(button).toBeDisabled();
  });

  it.each([
    ["small", "32px", "var(--fontSizes100)"],
    ["medium", "40px", "var(--fontSizes100)"],
    ["large", "48px", "var(--fontSizes200)"],
  ] as const)(
    "renders with correct minimum height and font size when size prop is %s",
    (size, minHeight, fontSize) => {
      const wrapper = mount(
        <Button disabled size={size}>
          foo
        </Button>
      );

      assertStyleMatch(
        {
          fontSize,
          minHeight,
        },
        wrapper
      );
    }
  );

  it.each([
    ["primary", "var(--colorsActionDisabled500)", "transparent"],
    ["secondary", "transparent", "var(--colorsActionDisabled500)"],
    ["tertiary", "transparent", "transparent"],
    ["darkBackground", "var(--colorsActionDisabled500)", "transparent"],
  ] as const)(
    "for a disabled %s button, disabled styling takes priority even when destructive prop is passed",
    (buttonType, background, borderColor) => {
      const wrapper = mount(
        <Button destructive disabled buttonType={buttonType}>
          foo
        </Button>
      );
      assertStyleMatch(
        {
          background,
          borderColor,
          color: "var(--colorsActionMajorYin030)",
        },
        wrapper
      );
    }
  );

  it("overrides the height of the button icon when iconType prop is passed", () => {
    const wrapper = mount(<Button iconType="plus">Test</Button>);

    assertStyleMatch(
      {
        height: "20px",
      },
      wrapper.find(Button),
      { modifier: `${StyledIcon}` }
    );
  });

  it("renders a primary button with correct semantics", () => {
    const wrapper = mount(
      <Button name="Primary Button" buttonType="primary">
        Primary
      </Button>
    );
    const button = wrapper.find(StyledButton);
    expect(button.prop("name")).toEqual("Primary Button");
    expect(button.prop("buttonType")).toEqual("primary");
    expect(button.find(StyledButtonMainText).text()).toEqual("Primary");
  });

  it("renders a secondary button with correct semantics", () => {
    const wrapper = mount(
      <Button name="Secondary Button" buttonType="secondary">
        Secondary
      </Button>
    );
    const button = wrapper.find(StyledButton);
    expect(button.prop("name")).toEqual("Secondary Button");
    expect(button.prop("buttonType")).toEqual("secondary");
    expect(button.find(StyledButtonMainText).text()).toEqual("Secondary");
  });

  it("renders a small button with correct semantics", () => {
    const wrapper = mount(
      <Button name="Small Button" size="small">
        Small
      </Button>
    );
    const button = wrapper.find(StyledButton);
    expect(button.prop("name")).toEqual("Small Button");
    expect(button.prop("size")).toEqual("small");
    expect(button.find(StyledButtonMainText).text()).toEqual("Small");
  });

  it("renders a large button with correct semantics", () => {
    const wrapper = mount(
      <Button name="Large Button" size="large">
        Large
      </Button>
    );
    const button = wrapper.find(StyledButton);
    expect(button.prop("name")).toEqual("Large Button");
    expect(button.prop("size")).toEqual("large");
    expect(button.find(StyledButtonMainText).text()).toEqual("Large");
  });

  it("renders a disabled button with correct semantics", () => {
    const wrapper = mount(
      <Button name="Disabled Button" disabled>
        Disabled
      </Button>
    );
    const button = wrapper.find(StyledButton);
    expect(button.prop("name")).toEqual("Disabled Button");
    expect(button.prop("buttonType")).toEqual("secondary");
    expect(button.find(StyledButtonMainText).text()).toEqual("Disabled");
    expect(button.prop("disabled")).toEqual(true);
  });

  describe("when subtext prop is passed", () => {
    it('renders the subtext if the size prop is "large"', () => {
      const wrapper = mount(
        <Button size="large" subtext="bar">
          foo
        </Button>
      );

      expect(wrapper.find('[data-element="subtext"]').exists()).toBeTruthy();
    });

    it.each(["small", "medium"] as const)(
      "throws an error if size prop is %s",
      (size) => {
        const consoleSpy = jest
          .spyOn(console, "error")
          .mockImplementation(() => {});

        expect(() =>
          mount(
            <Button subtext="bar" size={size}>
              foo
            </Button>
          )
        ).toThrow("subtext prop has no effect unless the button is large");

        consoleSpy.mockRestore();
      }
    );
  });

  it("correctly sets data tags", () => {
    render(
      <Button data-element="bar" data-role="baz">
        Test
      </Button>
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("data-component", "button");
    expect(button).toHaveAttribute("data-element", "bar");
    expect(button).toHaveAttribute("data-role", "baz");
  });

  it("correctly sets aria-label on button when passed as a prop", () => {
    render(<Button iconType="filter" aria-label="Filter" />);
    expect(screen.getByRole("button", { name: /Filter/ })).toHaveAccessibleName(
      /Filter/
    );
  });

  it("sets button's aria-label to be value of iconType prop when aria-label prop isn't passed", () => {
    render(<Button iconType="bin" />);
    expect(screen.getByRole("button")).toHaveAccessibleName(/bin/);
  });

  it("correctly sets aria-labelledby on button when passed as a prop", () => {
    render(
      <>
        <h1 id="add-product">Add product</h1>
        <Button
          aria-labelledby="add-product"
          iconType="add"
          onClick={() => {}}
        />
      </>
    );
    expect(screen.getByRole("button")).toHaveAccessibleName(/Add product/);
  });

  it("correctly sets aria-describedby on button when passed as a prop", () => {
    render(
      <>
        <h1 id="title">Addon A</h1>
        <Button aria-describedby="title" onClick={() => {}}>
          Select add-on
        </Button>
      </>
    );
    expect(screen.getByRole("button")).toHaveAccessibleDescription(/Addon A/);
  });

  it("rendered icon is hidden from assistive technologies when iconType prop is passed", () => {
    const wrapper = mount(<Button iconType="bin">Delete</Button>);
    expect(wrapper.find(Icon).prop("aria-hidden")).toBeTruthy();
  });

  it("overrides height of icon when iconType is 'services'", () => {
    const wrapper = mount(
      <Button iconType="services" size="large">
        foo
      </Button>
    );
    assertStyleMatch(
      {
        height: "6px",
      },
      wrapper.find(Button),
      { modifier: `${StyledIcon}` }
    );
  });

  it("renders with 100% width when fullWidth prop is specified", () => {
    const wrapper = mount(<Button fullWidth>foo</Button>);
    assertStyleMatch(
      {
        width: "100%",
      },
      wrapper.find(Button)
    );
  });

  describe("using href prop to render as an anchor", () => {
    it("should render as an <a> element", () => {
      const wrapper = mount(<Button href="/">Test</Button>);
      expect(wrapper.find("a").exists()).toEqual(true);
    });

    it("should click the link when space key pressed", () => {
      const preventDefaultSpy = jest.fn();
      const wrapper = mount(<Button href="/">Test</Button>);

      act(() => {
        wrapper.find(StyledButton).at(0).props().onKeyDown({
          key: " ",
          preventDefault: preventDefaultSpy,
        });
      });

      wrapper.update();

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("should not click the link when other key pressed", () => {
      const preventDefaultSpy = jest.fn();
      const wrapper = mount(<Button href="/">Test</Button>);

      act(() => {
        wrapper.find(StyledButton).at(0).props().onKeyDown({
          key: "ArrowLeft",
          preventDefault: jest.fn(),
        });
      });

      wrapper.update();

      expect(preventDefaultSpy).not.toHaveBeenCalled();
    });

    it("link has correct target and rel attributes set when they are passed as props", () => {
      const wrapper = mount(
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

  it.each(["gradient-white", "gradient-grey"] as const)(
    "uses correct icon colour when buttonType is %s",
    (buttonType) => {
      const wrapper = mount(
        <Button buttonType={buttonType} iconType="home">
          foo
        </Button>
      );
      assertStyleMatch(
        {
          color: "var(--colorsActionMinorYin090)",
        },
        wrapper.find(StyledIcon)
      );
    }
  );

  it.each(["gradient-white", "gradient-grey"] as const)(
    "uses correct background color on hover when buttonType is %s",
    (buttonType) => {
      const wrapper = mount(
        <Button buttonType={buttonType} iconType="home">
          foo
        </Button>
      );

      assertStyleMatch(
        {
          background:
            "linear-gradient(to right,#d6f8df,#d9f2ff,#ede2ff) padding-box,linear-gradient(to right,#00D639,#11AFFF,#8F49FE) border-box",
        },
        wrapper.find(StyledButton),
        { modifier: ":hover" }
      );
    }
  );
});
