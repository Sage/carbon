import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./button.component";
import Box from "../box";

import useMediaQuery from "../../hooks/useMediaQuery";
import Icon from "../icon";
import { Size, VariantType } from "./__internal__/__next__/button.config";

jest.mock("../../hooks/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;

const sizes: Partial<Size>[] = ["small", "medium", "large"];

test("renders correctly", () => {
  render(<Button>Test Button</Button>);
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyle("border-radius: var(--global-radius-action-xl)");
  expect(button).toHaveStyle("height: var(--global-size-m)");
  expect(button).toHaveStyleRule("font-size", "14px");
  expect(button).toHaveStyleRule("padding", "6px 16px");
});

test("renders correctly when inverse", () => {
  render(<Button inverse>Test Button</Button>);
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule(
    "background-color: var(--button-typical-primary-inverse-bg-default)",
  );
  expect(button).toHaveStyle("border-radius: var(--global-radius-action-xl)");
  expect(button).toHaveStyle("height: var(--global-size-m)");
  expect(button).toHaveStyleRule("font-size", "14px");
  expect(button).toHaveStyleRule("padding", "6px 16px");
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
    "border: 1px solid var(--button-typical-tertiary-inverse-border-default)",
  );
  expect(button).toHaveStyle("border-radius: var(--global-radius-action-xl)");
  expect(button).toHaveStyle("height: var(--global-size-m)");
  expect(button).toHaveStyleRule("font-size", "14px");
  expect(button).toHaveStyleRule("padding", "6px 16px");
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
    "background-color: var(--button-typical-primary-inverse-bg-disabled)",
  );
  expect(button).toHaveStyle("border-radius: var(--global-radius-action-xl)");
  expect(button).toHaveStyle("height: var(--global-size-m)");
  expect(button).toHaveStyleRule("font-size", "14px");
  expect(button).toHaveStyleRule("padding", "6px 16px");
});

test("renders correctly when inverse, disabled and tertiary", () => {
  render(
    <Button inverse disabled variantType="tertiary">
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule(
    "background-color: var(--button-typical-primary-inverse-bg-disabled)",
  );
  expect(button).toHaveStyleRule(
    "border: 1px solid var(--button-typical-tertiary-inverse-border-disabled)",
  );
  expect(button).toHaveStyle("border-radius: var(--global-radius-action-xl)");
  expect(button).toHaveStyle("height: var(--global-size-m)");
  expect(button).toHaveStyleRule("font-size", "14px");
  expect(button).toHaveStyleRule("padding", "6px 16px");
});

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
  (["primary", "secondary"] as VariantType[]).forEach((variantType) => {
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
  expect(button).toHaveStyleRule("width", "100%");
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

test("using a ref to call focus method focuses chosen button", async () => {
  const user = userEvent.setup();
  const MockComponent = () => {
    const ref = React.useRef<HTMLButtonElement>(null);

    return (
      <>
        <Button ref={ref}>Test Button</Button>
        <Button onClick={() => ref.current?.focus()}>Focus Other Button</Button>
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

test("renders correctly with wrapping text", () => {
  render(
    <Button noWrap={false}>Test Button With Some Really Long Text</Button>,
  );
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyleRule("flex-flow", "wrap");
  expect(button).toHaveStyleRule("height", "unset");
  expect(button).toHaveStyle("min-height: var(--global-size-m)");
});

test("does not render 'xs' buttons when `variantType` is set to 'primary' and `variant` is set to 'default'", () => {
  render(
    <Button size="xs" variant="default" variantType="primary">
      Test Button
    </Button>,
  );
  const button = screen.getByRole("button");

  expect(button).toBeInTheDocument();
  expect(button).toHaveStyle(
    "background: var(--button-typical-secondary-bg-default, #00812008)",
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

  expect(textContent).toEqual("Loading...");
});

describe("legacy wrapper", () => {
  it("maps 'primary' 'buttonType' and 'destructive' to 'variant' and 'variantType' correctly", () => {
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

  it("maps 'secondary' 'buttonType' and 'destructive' to 'variant' and 'variantType' correctly", () => {
    render(
      <Button buttonType="secondary" destructive>
        Test Button
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveStyleRule("background-color", "transparent");
    expect(button).toHaveStyleRule(
      "color",
      "var(--button-destructive-secondary-label-default)",
    );
  });

  it("maps 'tertiary' 'buttonType' and 'destructive' to 'variant' and 'variantType' correctly", () => {
    render(
      <Button buttonType="tertiary" destructive>
        Test Button
      </Button>,
    );
    const button = screen.getByRole("button");

    expect(button).toHaveStyleRule("background-color", "transparent");
    expect(button).toHaveStyleRule(
      "color",
      "var(--button-destructive-secondary-label-default)",
    );
  });

  it("maps 'darkBackground' 'buttonType' to the correct `inverse` 'variant' and 'variantType'", () => {
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

  it("maps 'isWhite' to the correct `inverse` 'variant' and 'variantType'", () => {
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
});
