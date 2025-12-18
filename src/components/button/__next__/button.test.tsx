import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Button, { ButtonHandle } from "./button.component";
import Box from "../../box";
import { Loader } from "../../loader/__next__/loader.component";

import Icon from "../../icon";
import { Size, Variant, VariantType } from "./button.config";

jest.mock("../../../hooks/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const sizes: Partial<Size>[] = ["small", "medium", "large"];

test("renders correctly", () => {
  render(<Button>Test Button</Button>);
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-action-xl)",
  );
  expect(button).toHaveStyleRule("height", "var(--global-size-m)");
  expect(button).toHaveStyleRule(
    "padding",
    "6px var(--global-space-layout-2-xs)",
  );
});

test("renders correctly when inverse", () => {
  render(<Button inverse>Test Button</Button>);
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule(
    "background-color",
    "var(--button-typical-primary-inverse-bg-default)",
  );
  expect(button).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-action-xl)",
  );
  expect(button).toHaveStyleRule("height", "var(--global-size-m)");
  expect(button).toHaveStyleRule(
    "padding",
    "6px var(--global-space-layout-2-xs)",
  );
});

test("renders correctly when inverse and tertiary", () => {
  render(
    <Button inverse variantType="tertiary">
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule(
    "border",
    "1px solid var(--button-typical-tertiary-inverse-border-default)",
  );
  expect(button).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-action-xl)",
  );
  expect(button).toHaveStyleRule("height", "var(--global-size-m)");
  expect(button).toHaveStyleRule(
    "padding",
    "6px var(--global-space-layout-2-xs)",
  );
});

test("renders correctly when inverse and disabled", () => {
  render(
    <Button inverse disabled>
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule(
    "background-color",
    "var(--button-typical-primary-inverse-bg-disabled)",
  );
  expect(button).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-action-xl)",
  );
  expect(button).toHaveStyleRule("height", "var(--global-size-m)");
  expect(button).toHaveStyleRule(
    "padding",
    "6px var(--global-space-layout-2-xs)",
  );
});

test("renders correctly when inverse, disabled and tertiary", () => {
  render(
    <Button inverse disabled variantType="tertiary">
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule("background-color", "transparent");
  expect(button).toHaveStyleRule(
    "border-color",
    "var(--button-typical-tertiary-inverse-border-disabled)",
  );
  expect(button).toHaveStyleRule(
    "border-radius",
    "var(--global-radius-action-xl)",
  );
  expect(button).toHaveStyleRule("height", "var(--global-size-m)");
  expect(button).toHaveStyleRule(
    "padding",
    "6px var(--global-space-layout-2-xs)",
  );
});

test.each(["xs", ...sizes] as Size[])(
  "renders correctly when size is %s",
  (size) => {
    render(<Button size={size}>Test Button</Button>);
    const button = screen.getByRole("button");
    const abbreviation = size === "xs" ? size : size.charAt(0);

    expect(button).toHaveStyleRule(
      "font",
      `var(--global-font-static-comp-medium-${abbreviation})`,
    );
  },
);

describe.each<{ variant: Variant; variantType: VariantType; size: Size }>([
  { variant: "default", variantType: "primary", size: "small" },
  { variant: "default", variantType: "primary", size: "medium" },
  { variant: "default", variantType: "primary", size: "large" },
  { variant: "default", variantType: "secondary", size: "small" },
  { variant: "default", variantType: "secondary", size: "medium" },
  { variant: "default", variantType: "secondary", size: "large" },
  { variant: "default", variantType: "tertiary", size: "small" },
  { variant: "default", variantType: "tertiary", size: "medium" },
  { variant: "default", variantType: "tertiary", size: "large" },
  { variant: "default", variantType: "subtle", size: "small" },
  { variant: "default", variantType: "subtle", size: "medium" },
  { variant: "default", variantType: "subtle", size: "large" },
  { variant: "destructive", variantType: "primary", size: "small" },
  { variant: "destructive", variantType: "primary", size: "medium" },
  { variant: "destructive", variantType: "primary", size: "large" },
  { variant: "destructive", variantType: "secondary", size: "small" },
  { variant: "destructive", variantType: "secondary", size: "medium" },
  { variant: "destructive", variantType: "secondary", size: "large" },
  { variant: "gradient", variantType: "secondary", size: "small" },
  { variant: "gradient", variantType: "secondary", size: "medium" },
  { variant: "gradient", variantType: "secondary", size: "large" },
])(
  "when variant is $variant, variantType is $variantType and size is $size",
  ({ variant, variantType, size }) => {
    it("renders correctly", () => {
      render(
        <Button size={size} variant={variant} variantType={variantType}>
          Test Button
        </Button>,
      );

      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders correctly when disabled", () => {
      render(
        <Button
          size={size}
          variant={variant}
          variantType={variantType}
          disabled
        >
          Test Button
        </Button>,
      );

      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("renders correctly when loading", () => {
      render(
        <Button size={size} variant={variant} variantType={variantType}>
          <Loader
            variant="inline"
            loaderType="ring"
            loaderLabel="Loading"
            size="extra-small"
          />
        </Button>,
      );

      expect(screen.getByRole("status")).toHaveAttribute(
        "data-component",
        "loader",
      );
    });

    it("renders correctly with an icon", () => {
      render(
        <Button size={size} variant={variant} variantType={variantType}>
          <>
            <Icon type="alert" />
            Test Button
          </>
        </Button>,
      );

      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });

    it("renders correctly with disabled and with an icon", () => {
      render(
        <Button
          size={size}
          variant={variant}
          variantType={variantType}
          disabled
        >
          <>
            <Icon type="alert" />
            Test Button
          </>
        </Button>,
      );

      expect(screen.getByRole("button")).toBeDisabled();
      expect(screen.getByTestId("icon")).toBeInTheDocument();
    });
  },
);

test("renders correctly with an icon and no text", () => {
  render(
    <Button>
      <Icon type="alert" />
    </Button>,
  );
  const button = screen.getByRole("button");
  const icon = screen.getByTestId("icon");

  expect(button).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});

test("renders correctly when 'fullWidth' is specified", () => {
  render(
    <Box width="1000px">
      <Button fullWidth>Test Button</Button>
    </Box>,
  );
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyle("width: 100%");
});

test("calling exposed focusButton method focuses chosen button", async () => {
  const user = userEvent.setup();
  const MockComponent = () => {
    const buttonHandle = React.useRef<ButtonHandle>(null);

    return (
      <>
        <Button ref={buttonHandle}>Test Button</Button>
        <Button onClick={() => buttonHandle.current?.focusButton()}>
          Focus Other Button
        </Button>
      </>
    );
  };

  render(<MockComponent />);

  const targetButton = screen.getByRole("button", {
    name: "Test Button",
  });
  const programmaticButton = screen.getByRole("button", {
    name: "Focus Other Button",
  });

  await user.click(programmaticButton);

  expect(targetButton).toHaveFocus();
});

test("renders correctly with noWrap set", () => {
  render(<Button noWrap>Test Button</Button>);
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyle("white-space: nowrap");
});

test("renders correctly with wrapping text", () => {
  render(
    <Button noWrap={false}>Test Button With Some Really Long Text</Button>,
  );
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyle("flex-flow: wrap");
  expect(button).toHaveStyle("height: unset");
  expect(button).toHaveStyleRule("min-height", "var(--global-size-m)");
});

test("does not render 'xs' buttons when `variantType` is set to 'primary' and `variant` is set to 'default'", () => {
  render(
    <Button size="xs" variant="default" variantType="primary">
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule(
    "background-color",
    "var(--button-typical-secondary-bg-default)",
  );
});

test("renders 'xs' buttons when `variantType` is set to 'tertiary' and `variant` is not set to 'default'", () => {
  render(
    <Button size="xs" variant="destructive" variantType="tertiary">
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule(
    "background-color",
    "var(--button-typical-secondary-bg-default)",
  );
  expect(button).toHaveStyleRule(
    "font",
    "var(--global-font-static-comp-medium-xs)",
  );
});

test("renders 'primary' `variantType` when 'tertiary` passed with 'destructive' `variant`", () => {
  render(
    <Button variant="destructive" variantType="tertiary">
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule(
    "background-color",
    "var(--button-destructive-primary-bg-default)",
  );
});

describe("When passing legacy interface", () => {
  it("renders as expected when 'primary' 'buttonType' is used", () => {
    render(<Button buttonType="primary">Test Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyleRule(
      "background-color",
      "var(--button-typical-primary-bg-default)",
    );
  });

  it("renders as expected when 'secondary' 'buttonType' is used", () => {
    render(<Button buttonType="secondary">Test Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyleRule(
      "background-color",
      "var(--button-typical-secondary-bg-default)",
    );
  });

  it("renders as expected when 'tertiary' 'buttonType' is used", () => {
    render(<Button buttonType="tertiary">Test Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveStyleRule(
      "background-color",
      "var(--button-typical-tertiary-bg-default)",
    );
  });

  it("renders as expected when 'gradient-grey' 'buttonType' is used", () => {
    render(<Button buttonType="gradient-grey">Test Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveStyle("background: white");
  });

  it("renders as expected when 'gradient-white' 'buttonType' is used", () => {
    render(<Button buttonType="gradient-white">Test Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveStyle("background: white");
  });

  it("renders as expected when 'primary' 'buttonType' and 'destructive' are used", () => {
    render(
      <Button buttonType="primary" destructive>
        Test Button
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveStyleRule(
      "background-color",
      "var(--button-destructive-primary-bg-default)",
    );
    expect(button).toHaveStyleRule(
      "color",
      "var(--button-destructive-primary-label-default)",
    );
  });

  it("renders as expected when 'secondary' 'buttonType' and 'destructive' are used", () => {
    render(
      <Button buttonType="secondary" destructive>
        Test Button
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveStyle("background-color: transparent");
    expect(button).toHaveStyleRule(
      "color",
      "var(--button-destructive-secondary-label-default)",
    );
  });

  it("renders as expected when 'tertiary' 'buttonType' and 'destructive' are used", () => {
    render(
      <Button buttonType="tertiary" destructive>
        Test Button
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveStyle("background-color: transparent");
    expect(button).toHaveStyleRule(
      "color",
      "var(--button-destructive-secondary-label-default)",
    );
  });

  it("renders as expected when 'darkBackground' 'buttonType' is used", () => {
    render(<Button buttonType="darkBackground">Test Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveStyleRule(
      "background-color",
      "var(--button-typical-secondary-inverse-bg-default)",
    );
    expect(button).toHaveStyleRule(
      "color",
      "var(--button-typical-secondary-inverse-label-default)",
    );
  });

  it("renders as expected when 'isWhite' is used", () => {
    render(
      <Button buttonType="primary" isWhite>
        Test Button
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveStyleRule(
      "background-color",
      "var(--button-typical-primary-inverse-bg-default)",
    );
    expect(button).toHaveStyleRule(
      "color",
      "var(--button-typical-primary-inverse-label-default)",
    );
  });

  it("renders using the 'variantType' if 'destructive' is used without 'buttonType'", () => {
    render(<Button destructive>Test Button</Button>);
    const button = screen.getByRole("button");

    expect(button).toHaveStyleRule(
      "background-color",
      "var(--button-destructive-primary-bg-default)",
    );
    expect(button).toHaveStyleRule(
      "color",
      "var(--button-destructive-primary-label-default)",
    );
  });

  it("renders as expected when 'iconType' is used", () => {
    render(<Button iconType="services">Test Button</Button>);

    expect(screen.getByTestId("button-icon-before")).toBeInTheDocument();
  });

  it("renders as expected when 'iconType' and 'iconPosition' are used", () => {
    render(
      <Button iconType="services" iconPosition="after">
        Test Button
      </Button>,
    );

    expect(screen.getByTestId("button-icon-after")).toBeInTheDocument();
  });

  it("renders as expected when 'iconType' is used without 'children'", () => {
    render(<Button iconType="services" />);

    expect(screen.getByTestId("button-icon-only")).toBeInTheDocument();
  });

  it("renders a link element when 'href' is used and does not call any `onClick` callback passed", () => {
    const onClickMock = jest.fn();
    render(
      <Button
        href="https://www.example.com"
        target="_blank"
        rel="noreferrer"
        onClick={onClickMock}
      >
        Test Button
      </Button>,
    );
    const button = screen.getByRole("link");

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "https://www.example.com");
    expect(button).toHaveAttribute("target", "_blank");
    expect(button).toHaveAttribute("rel", "noreferrer");
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
