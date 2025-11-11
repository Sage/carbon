import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Button, { ButtonHandle, ButtonProps } from "./button.component";
import Box from "../../box";

import useMediaQuery from "../../../hooks/useMediaQuery";

jest.mock("../../../hooks/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;

test("renders correctly", () => {
  render(<Button>Test Button</Button>);
  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();

  expect(button).toHaveStyle(
    "border-radius: var(--global-radius-action-xl,20px)",
  );
  expect(button).toHaveStyle("height: var(--global-size-m,40px)");
  expect(button).toHaveStyleRule("font-size", "14px");
  expect(button).toHaveStyleRule("padding", "6px 16px");
});

describe("variant: default", () => {
  describe("variantType: primary", () => {
    ["small", "medium", "large"].forEach((size) => {
      describe(`size: ${size}`, () => {
        it("renders correctly", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="primary"
            >
              Test Button
            </Button>,
          );
          expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders correctly when disabled", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="primary"
              disabled
            >
              Test Button
            </Button>,
          );
          const btn = screen.getByRole("button");
          expect(btn).toBeInTheDocument();
          expect(btn).toBeDisabled();
        });

        it("renders correctly when loading", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="primary"
              loading
            >
              Test Button
            </Button>,
          );
          const loader = screen.getByRole("status");
          expect(loader).toBeInTheDocument();
          expect(loader).toHaveAttribute("data-component", "loader");
        });

        it("renders correctly with an icon", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="primary"
              iconType="alert"
            >
              Test Button
            </Button>,
          );
          expect(screen.getByTestId("icon")).toBeInTheDocument();
        });

        it("renders correctly with disabled and with an icon", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="primary"
              disabled
              iconType="alert"
            >
              Test Button
            </Button>,
          );
          const btn = screen.getByRole("button");
          expect(btn).toBeDisabled();
          expect(screen.getByTestId("icon")).toBeInTheDocument();
        });
      });
    });
  });

  describe("variantType: secondary", () => {
    ["small", "medium", "large"].forEach((size) => {
      describe(`size: ${size}`, () => {
        test("renders correctly", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="secondary"
            >
              Test Button
            </Button>,
          );
          expect(screen.getByRole("button")).toBeInTheDocument();
        });

        test("renders correctly when disabled", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="secondary"
              disabled
            >
              Test Button
            </Button>,
          );
          const btn = screen.getByRole("button");
          expect(btn).toBeDisabled();
        });

        test("renders correctly when loading", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
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
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="secondary"
              iconType="alert"
            >
              Test Button
            </Button>,
          );
          expect(screen.getByTestId("icon")).toBeInTheDocument();
        });

        test("renders correctly with disabled and with an icon", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="secondary"
              disabled
              iconType="alert"
            >
              Test Button
            </Button>,
          );
          expect(screen.getByRole("button")).toBeDisabled();
          expect(screen.getByTestId("icon")).toBeInTheDocument();
        });
      });
    });
  });

  describe("variantType: tertiary", () => {
    ["small", "medium", "large"].forEach((size) => {
      describe(`size: ${size}`, () => {
        it("renders correctly", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="tertiary"
            >
              Test Button
            </Button>,
          );
          expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders correctly when disabled", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
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
              size={size as ButtonProps["size"]}
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
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="tertiary"
              iconType="alert"
            >
              Test Button
            </Button>,
          );
          expect(screen.getByTestId("icon")).toBeInTheDocument();
        });

        it("renders correctly with disabled and with an icon", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="tertiary"
              disabled
              iconType="alert"
            >
              Test Button
            </Button>,
          );
          expect(screen.getByRole("button")).toBeDisabled();
          expect(screen.getByTestId("icon")).toBeInTheDocument();
        });
      });
    });
  });

  describe("variantType: subtle", () => {
    ["small", "medium", "large"].forEach((size) => {
      describe(`size: ${size}`, () => {
        it("renders correctly", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="subtle"
            >
              Test Button
            </Button>,
          );
          expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders correctly when disabled", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="subtle"
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
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="subtle"
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
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="subtle"
              iconType="alert"
            >
              Test Button
            </Button>,
          );
          expect(screen.getByTestId("icon")).toBeInTheDocument();
        });

        it("renders correctly with disabled and with an icon", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="default"
              variantType="subtle"
              disabled
              iconType="alert"
            >
              Test Button
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
  ["primary", "secondary"].forEach((variantType) => {
    describe(`variantType: ${variantType}`, () => {
      ["small", "medium", "large"].forEach((size) => {
        describe(`size: ${size}`, () => {
          it("renders correctly", () => {
            render(
              <Button
                size={size as ButtonProps["size"]}
                variant="destructive"
                variantType={variantType as ButtonProps["variantType"]}
              >
                Test Button
              </Button>,
            );
            expect(screen.getByRole("button")).toBeInTheDocument();
          });

          it("renders correctly when disabled", () => {
            render(
              <Button
                size={size as ButtonProps["size"]}
                variant="destructive"
                variantType={variantType as ButtonProps["variantType"]}
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
                size={size as ButtonProps["size"]}
                variant="destructive"
                variantType={variantType as ButtonProps["variantType"]}
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
                size={size as ButtonProps["size"]}
                variant="destructive"
                variantType={variantType as ButtonProps["variantType"]}
                iconType="alert"
              >
                Test Button
              </Button>,
            );
            expect(screen.getByTestId("icon")).toBeInTheDocument();
          });

          it("renders correctly with disabled and with an icon", () => {
            render(
              <Button
                size={size as ButtonProps["size"]}
                variant="destructive"
                variantType={variantType as ButtonProps["variantType"]}
                disabled
                iconType="alert"
              >
                Test Button
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

describe("variant: ai", () => {
  describe("variantType: secondary", () => {
    ["small", "medium", "large"].forEach((size) => {
      describe(`size: ${size}`, () => {
        it("renders correctly", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="ai"
              variantType="secondary"
            >
              Test Button
            </Button>,
          );
          expect(screen.getByRole("button")).toBeInTheDocument();
        });

        it("renders correctly when disabled", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="ai"
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
              size={size as ButtonProps["size"]}
              variant="ai"
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
            <Button
              size={size as ButtonProps["size"]}
              variant="ai"
              variantType="secondary"
              iconType="alert"
            >
              Test Button
            </Button>,
          );
          expect(screen.getByTestId("icon")).toBeInTheDocument();
        });

        it("renders correctly with disabled and with an icon", () => {
          render(
            <Button
              size={size as ButtonProps["size"]}
              variant="ai"
              variantType="secondary"
              disabled
              iconType="alert"
            >
              Test Button
            </Button>,
          );
          expect(screen.getByRole("button")).toBeDisabled();
          expect(screen.getByTestId("icon")).toBeInTheDocument();
        });
      });
    });
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
  expect(button).toHaveStyle("min-height: var(--global-size-m,40px)");
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
  const buttonText = screen.getByRole("button").textContent;
  expect(buttonText).toEqual("Loading...");
});

test("shows the loading spinner if reduced motion is not set", async () => {
  mockUseMediaQuery.mockReturnValueOnce(true);
  render(<Button loading>Test Button</Button>);
  const buttonText = screen.getByRole("button").textContent;
  expect(buttonText).toEqual("Loading...Loading...");
});
