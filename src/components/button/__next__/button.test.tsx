import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Button, { ButtonHandle, ButtonProps } from "./button.component";
import Box from "../../box";

test("renders correctly", () => {
  render(<Button>Test Button</Button>);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();

  expect(button).toHaveStyleRule("border-radius", "20px");
  expect(button).toHaveStyleRule("font-size", "14px");
  expect(button).toHaveStyleRule("min-height", "40px");
  expect(button).toHaveStyleRule("padding", "8px 16px");
});

const sizeAndVariantCombinations = [
  "default-primary-small",
  "default-primary-medium",
  "default-primary-large",
  "default-secondary-small",
  "default-secondary-medium",
  "default-secondary-large",
  "default-tertiary-small",
  "default-tertiary-medium",
  "default-tertiary-large",
  "default-subtle-small",
  "default-subtle-medium",
  "default-subtle-large",
  "destructive-primary-small",
  "destructive-primary-medium",
  "destructive-primary-large",
  "destructive-secondary-small",
  "destructive-secondary-medium",
  "destructive-secondary-large",
  "ai-primary-small",
  "ai-primary-medium",
  "ai-primary-large",
];

sizeAndVariantCombinations.forEach((combo) => {
  const [variant, variantType, size] = combo.split("-");
  const typedSize = size as ButtonProps["size"];
  const typedVariant = variant as ButtonProps["variant"];
  const typedVariantType = variantType as ButtonProps["variantType"];

  test(`renders correctly when size is "${typedSize}", variant is "${typedVariant}" and variantType is "${typedVariantType}"`, () => {
    render(
      <Button
        size={typedSize}
        variant={typedVariant}
        variantType={typedVariantType}
      >
        Test Button
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test(`renders correctly when size is "${typedSize}", variant is "${typedVariant}", variantType is "${typedVariantType}" and disabled`, () => {
    render(
      <Button
        size={typedSize}
        variant={typedVariant}
        variantType={typedVariantType}
        disabled
      >
        Test Button
      </Button>,
    );
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test(`renders correctly when size is "${typedSize}", variant is "${typedVariant}", variantType is "${typedVariantType}" and loading`, () => {
    render(
      <Button
        size={typedSize}
        variant={typedVariant}
        variantType={typedVariantType}
        loading
      >
        Test Button
      </Button>,
    );
    const button = screen.getByRole("button");
    const loader = screen.getByRole("status");
    expect(button).toBeInTheDocument();
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute("data-component", "loader-spinner");
  });

  test(`renders correctly when size is "${typedSize}", variant is "${typedVariant}", variantType is "${typedVariantType}" and an icon is set`, () => {
    render(
      <Button
        size={typedSize}
        variant={typedVariant}
        variantType={typedVariantType}
        iconType="alert"
      >
        Test Button
      </Button>,
    );
    const button = screen.getByRole("button");
    const icon = screen.getByTestId("icon");
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  test(`renders correctly when size is "${typedSize}", variant is "${typedVariant}", variantType is "${typedVariantType}", disabled and an icon is set`, () => {
    render(
      <Button
        size={typedSize}
        variant={typedVariant}
        variantType={typedVariantType}
        disabled
        iconType="alert"
      >
        Test Button
      </Button>,
    );
    const button = screen.getByRole("button");
    const icon = screen.getByTestId("icon");
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(icon).toBeInTheDocument();
  });
});

test("renders correctly with an icon on the left", () => {
  render(<Button iconType="alert">Test Button</Button>);
  const button = screen.getByRole("button");
  const icon = screen.getByTestId("icon");
  expect(button).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});

test("renders correctly with an icon on the right", () => {
  render(
    <Button iconType="alert" iconPosition="right">
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");
  const icon = screen.getByTestId("icon");
  expect(button).toBeInTheDocument();
  expect(icon).toBeInTheDocument();

  const childWrapper = within(button).getByTestId("button-child-container");
  expect(childWrapper).toHaveStyleRule("flex-direction", "row-reverse");
});

test("renders correctly with an icon and no text", () => {
  render(<Button iconType="alert" />);
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
  expect(button).toHaveStyleRule("width", "100%");
});

test("does not show an icon when size is 'xs'", () => {
  render(
    <Button
      size="xs"
      variant="default"
      variantType="secondary"
      iconType="alert"
    >
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");
  const icon = screen.queryByTestId("icon");
  expect(button).toBeInTheDocument();
  expect(icon).not.toBeInTheDocument();
});

test("does not show a loader when size is 'xs'", () => {
  render(
    <Button size="xs" variant="default" variantType="secondary" loading>
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");
  const loader = screen.queryByRole("status");
  expect(button).toBeInTheDocument();
  expect(loader).not.toBeInTheDocument();
});

test("renders correctly with an icon and inverse", () => {
  render(
    <Button iconType="alert" inverse>
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");
  const icon = screen.getByTestId("icon");
  expect(button).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});

test("renders correctly with an icon when inverse and secondary", () => {
  render(
    <Button iconType="alert" inverse variantType="secondary">
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");
  const icon = screen.getByTestId("icon");
  expect(button).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});

test("renders correctly with an icon when inverse and tertiary", () => {
  render(
    <Button iconType="alert" inverse variantType="tertiary">
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");
  const icon = screen.getByTestId("icon");
  expect(button).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});

test("renders correctly with an icon when inverse and subtle", () => {
  render(
    <Button iconType="alert" inverse variantType="subtle">
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");
  const icon = screen.getByTestId("icon");
  expect(button).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});

test("renders correctly with an icon when inverse, secondary and disabled", () => {
  render(
    <Button iconType="alert" inverse variantType="secondary" disabled>
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");
  const icon = screen.getByTestId("icon");
  expect(button).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});

test("renders correctly with an icon when inverse, tertiary and disabled", () => {
  render(
    <Button iconType="alert" inverse variantType="tertiary" disabled>
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");
  const icon = screen.getByTestId("icon");
  expect(button).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});

test("renders correctly with an icon when inverse, subtle and disabled", () => {
  render(
    <Button iconType="alert" inverse variantType="subtle" disabled>
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");
  const icon = screen.getByTestId("icon");
  expect(button).toBeInTheDocument();
  expect(icon).toBeInTheDocument();
});

test("calls onClick when an 'href' is passed and the space key is pressed", async () => {
  const user = userEvent.setup();
  const clickMock = jest.fn();
  render(
    <Button
      onClick={(ev) => {
        ev.preventDefault();
        clickMock(ev);
      }}
      href="https://carbon.sage.com/"
    >
      Test Button
    </Button>,
  );

  const button = screen.getByRole("link", { name: "Test Button" });
  button.focus();
  await user.keyboard(" ");

  expect(clickMock).toHaveBeenCalledTimes(1);
});

test("does not call onClick when a 'href' is passed and any other key is pressed", async () => {
  const user = userEvent.setup();
  const clickMock = jest.fn();
  render(
    <Button
      onClick={(ev) => {
        ev.preventDefault();
        clickMock(ev);
      }}
      href="https://carbon.sage.com/"
    >
      Test Button
    </Button>,
  );

  const button = screen.getByRole("link", { name: "Test Button" });
  button.focus();
  await user.keyboard("{ArrowRight}");

  expect(clickMock).not.toHaveBeenCalled();
});

test("calling exposed focusTab method with correct tabId focuses chosen tab", async () => {
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
  expect(button).toHaveStyleRule("white-space", "nowrap");
});
