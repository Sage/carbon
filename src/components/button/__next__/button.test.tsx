import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Button, { ButtonHandle } from "./button.component";
import Box from "../../box";

import useMediaQuery from "../../../hooks/useMediaQuery";
import Icon from "../../icon";
import { Size, VariantType } from "./button.config";

jest.mock("../../../hooks/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const sizes: Partial<Size>[] = ["small", "medium", "large"];
const variantTypes: VariantType[] = ["primary", "secondary"];

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;

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

describe("variant: default", () => {
  describe("variantType: primary", () => {
    sizes.forEach((size) => {
      describe(`size: ${size}`, () => {
        it("renders correctly", () => {
          render(
            <Button size={size} variant="default" variantType="primary">
              Test Button
            </Button>,
          );

          expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders correctly when disabled", () => {
          render(
            <Button
              size={size}
              variant="default"
              variantType="primary"
              disabled
            >
              Test Button
            </Button>,
          );
          const button = screen.getByRole("button");

          expect(button).toBeInTheDocument();
          expect(button).toBeDisabled();
        });

        it("renders correctly when loading", () => {
          render(
            <Button size={size} variant="default" variantType="primary" loading>
              Test Button
            </Button>,
          );
          const loader = screen.getByRole("status");

          expect(loader).toBeInTheDocument();
          expect(loader).toHaveAttribute("data-component", "loader");
        });

        it("renders correctly with an icon", () => {
          render(
            <Button size={size} variant="default" variantType="primary">
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
              variant="default"
              variantType="primary"
              disabled
            >
              <>
                <Icon type="alert" />
                Test Button
              </>
            </Button>,
          );
          const button = screen.getByRole("button");

          expect(button).toBeDisabled();
          expect(screen.getByTestId("icon")).toBeInTheDocument();
        });
      });
    });
  });

  describe("variantType: secondary", () => {
    sizes.forEach((size) => {
      describe(`size: ${size}`, () => {
        test("renders correctly", () => {
          render(
            <Button size={size} variant="default" variantType="secondary">
              Test Button
            </Button>,
          );

          expect(screen.getByRole("button")).toBeInTheDocument();
        });

        test("renders correctly when disabled", () => {
          render(
            <Button
              size={size}
              variant="default"
              variantType="secondary"
              disabled
            >
              Test Button
            </Button>,
          );
          const button = screen.getByRole("button");

          expect(button).toBeDisabled();
        });

        test("renders correctly when loading", () => {
          render(
            <Button
              size={size}
              variant="default"
              variantType="secondary"
              loading
            >
              Test Button
            </Button>,
          );
          const loader = screen.getByRole("status");

          expect(loader).toHaveAttribute("data-component", "loader");
        });

        test("renders correctly with an icon", () => {
          render(
            <Button size={size} variant="default" variantType="secondary">
              <>
                <Icon type="alert" />
                Test Button
              </>
            </Button>,
          );

          expect(screen.getByTestId("icon")).toBeInTheDocument();
        });

        test("renders correctly with disabled and with an icon", () => {
          render(
            <Button
              size={size}
              variant="default"
              variantType="secondary"
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
      });
    });
  });

  describe("variantType: tertiary", () => {
    sizes.forEach((size) => {
      describe(`size: ${size}`, () => {
        it("renders correctly", () => {
          render(
            <Button size={size} variant="default" variantType="tertiary">
              Test Button
            </Button>,
          );

          expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders correctly when disabled", () => {
          render(
            <Button
              size={size}
              variant="default"
              variantType="tertiary"
              disabled
            >
              Test Button
            </Button>,
          );

          expect(screen.getByRole("button")).toBeDisabled();
        });

        it("renders correctly when loading", () => {
          render(
            <Button
              size={size}
              variant="default"
              variantType="tertiary"
              loading
            >
              Test Button
            </Button>,
          );

          expect(screen.getByRole("status")).toHaveAttribute(
            "data-component",
            "loader",
          );
        });

        it("renders correctly with an icon", () => {
          render(
            <Button size={size} variant="default" variantType="tertiary">
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
              variant="default"
              variantType="tertiary"
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
      });
    });
  });

  describe("variantType: subtle", () => {
    sizes.forEach((size) => {
      describe(`size: ${size}`, () => {
        it("renders correctly", () => {
          render(
            <Button size={size} variant="default" variantType="subtle">
              Test Button
            </Button>,
          );

          expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders correctly when disabled", () => {
          render(
            <Button size={size} variant="default" variantType="subtle" disabled>
              Test Button
            </Button>,
          );

          expect(screen.getByRole("button")).toBeDisabled();
        });

        it("renders correctly when loading", () => {
          render(
            <Button size={size} variant="default" variantType="subtle" loading>
              Test Button
            </Button>,
          );

          expect(screen.getByRole("status")).toHaveAttribute(
            "data-component",
            "loader",
          );
        });

        it("renders correctly with an icon", () => {
          render(
            <Button size={size} variant="default" variantType="subtle">
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
            <Button size={size} variant="default" variantType="subtle" disabled>
              <>
                <Icon type="alert" />
                Test Button
              </>
            </Button>,
          );

          expect(screen.getByRole("button")).toBeDisabled();
          expect(screen.getByTestId("icon")).toBeInTheDocument();
        });
      });
    });
  });
});

describe("variant: destructive", () => {
  variantTypes.forEach((variantType) => {
    describe(`variantType: ${variantType}`, () => {
      sizes.forEach((size) => {
        describe(`size: ${size}`, () => {
          it("renders correctly", () => {
            render(
              <Button
                size={size}
                variant="destructive"
                variantType={variantType}
              >
                Test Button
              </Button>,
            );

            expect(screen.getByRole("button")).toBeInTheDocument();
          });

          it("renders correctly when disabled", () => {
            render(
              <Button
                size={size}
                variant="destructive"
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
              <Button
                size={size}
                variant="destructive"
                variantType={variantType}
                loading
              >
                Test Button
              </Button>,
            );

            expect(screen.getByRole("status")).toHaveAttribute(
              "data-component",
              "loader",
            );
          });

          it("renders correctly with an icon", () => {
            render(
              <Button
                size={size}
                variant="destructive"
                variantType={variantType}
              >
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
                variant="destructive"
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
        });
      });
    });
  });
});

describe("variant: gradient", () => {
  describe("variantType: secondary", () => {
    sizes.forEach((size) => {
      describe(`size: ${size}`, () => {
        it("renders correctly", () => {
          render(
            <Button size={size} variant="gradient" variantType="secondary">
              Test Button
            </Button>,
          );

          expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders correctly when disabled", () => {
          render(
            <Button
              size={size}
              variant="gradient"
              variantType="secondary"
              disabled
            >
              Test Button
            </Button>,
          );

          expect(screen.getByRole("button")).toBeDisabled();
        });

        it("renders correctly when loading", () => {
          render(
            <Button
              size={size}
              variant="gradient"
              variantType="secondary"
              loading
            >
              Test Button
            </Button>,
          );

          expect(screen.getByRole("status")).toHaveAttribute(
            "data-component",
            "loader",
          );
        });

        it("renders correctly with an icon", () => {
          render(
            <Button size={size} variant="gradient" variantType="secondary">
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
              variant="gradient"
              variantType="secondary"
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
      });
    });
  });
});

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

test("does not show a loader when size is 'xs'", () => {
  render(
    <Button size="xs" variant="default" variantType="secondary" loading>
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button", { name: "Test Button" });
  const loader = screen.queryByRole("status");

  expect(button).toBeInTheDocument();
  expect(loader).not.toBeInTheDocument();
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

test("does not fire the onClick handler when loading and clicked", async () => {
  const user = userEvent.setup();
  const clickMock = jest.fn();

  render(
    <Button
      loading
      onClick={(ev) => {
        ev.preventDefault();
        clickMock(ev);
      }}
    >
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");
  await user.click(button);

  expect(clickMock).not.toHaveBeenCalled();
});

test("does not show the loading spinner if reduced motion is active", async () => {
  mockUseMediaQuery.mockReturnValueOnce(false);
  render(<Button loading>Test Button</Button>);
  const { textContent } = screen.getByRole("button");

  expect(textContent).toEqual("Loading...");
});

test("shows the loading spinner if reduced motion is not set", async () => {
  mockUseMediaQuery.mockReturnValueOnce(true);
  render(<Button loading>Test Button</Button>);
  const { textContent } = screen.getByRole("button");

  expect(textContent).toEqual("Loading...Loading...");
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
});
