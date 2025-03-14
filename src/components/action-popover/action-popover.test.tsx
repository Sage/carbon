import React, { useRef } from "react";
import { ThemeProvider } from "styled-components";
import * as floatingUi from "@floating-ui/dom";
import { screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  render,
  testStyledSystemMargin,
} from "../../__spec_helper__/__internal__/test-utils";
import sageTheme from "../../style/themes/sage";
import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenu,
  ActionPopoverMenuButton,
  ActionPopoverProps,
  ActionPopoverHandle,
} from "./index";
import Button from "../button";
import iconUnicodes from "../icon/icon-unicodes";
import guid from "../../__internal__/utils/helpers/guid";

jest.mock("../../__internal__/utils/helpers/guid");
(guid as jest.MockedFunction<typeof guid>).mockImplementation(
  () => "guid-12345",
);

beforeAll(() => {
  jest.useFakeTimers();
});

afterAll(() => {
  jest.useRealTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
});

testStyledSystemMargin(
  (props) => (
    <ThemeProvider theme={sageTheme}>
      <ActionPopover data-role="action-popover-wrapper" {...props}>
        <ActionPopoverItem href="#" download>
          test download
        </ActionPopoverItem>
      </ActionPopover>
    </ThemeProvider>
  ),
  () => screen.getByTestId("action-popover-wrapper"),
);

describe("if download prop and href prop are provided", () => {
  it("should render as a link component", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem href="#" download>
          test download
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("link")).toHaveTextContent("test download");
  });

  it("should close the menu if enter pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem href="#" download>
          test download
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    screen.getByRole("link").focus();
    await user.keyboard("{Enter}");

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});

test("displays the vertical ellipsis icon as the menu button", () => {
  render(
    <ActionPopover>
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );
  expect(screen.getByTestId("icon")).toHaveStyleRule(
    "content",
    `"${iconUnicodes.ellipsis_vertical}"`,
    { modifier: "&::before" },
  );
});

test("has proper data attributes applied to elements", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover
      data-role="action-popover-role"
      data-element="action-popover-element"
    >
      <ActionPopoverItem>example item 1</ActionPopoverItem>
      <ActionPopoverDivider />
      <ActionPopoverItem>example item 2</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));

  expect(screen.getByTestId("action-popover-role")).toHaveAttribute(
    "data-component",
    "action-popover-wrapper",
  );
  expect(screen.getByTestId("action-popover-role")).toHaveAttribute(
    "data-element",
    "action-popover-element",
  );
  expect(screen.getByRole("list")).toHaveAttribute(
    "data-component",
    "action-popover",
  );
  const divider = screen.getAllByRole("listitem")[1];
  expect(divider).toHaveAttribute("data-element", "action-popover-divider");
});

test("has a default aria-label", () => {
  render(
    <ActionPopover>
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );
  expect(screen.getByRole("button")).toHaveAccessibleName("actions");
});

test("has a default aria-label if the renderButton prop contains a button without text", () => {
  render(
    <ActionPopover
      renderButton={(props) => {
        return (
          <ActionPopoverMenuButton
            buttonType="tertiary"
            iconType="ellipsis_vertical"
            iconPosition="after"
            size="small"
            {...props}
          />
        );
      }}
    >
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );
  expect(screen.getByRole("button")).toHaveAccessibleName("actions");
});

test("has a default aria-label if the renderButton prop contains a button with children other than string", () => {
  render(
    <ActionPopover
      renderButton={(props) => {
        return (
          <ActionPopoverMenuButton
            buttonType="tertiary"
            iconType="ellipsis_vertical"
            iconPosition="after"
            size="small"
            {...props}
          >
            {42 as unknown as string}
          </ActionPopoverMenuButton>
        );
      }}
    >
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );
  expect(screen.getByRole("button")).toHaveAccessibleName("actions");
});

test("does not have a default aria-label if the renderButton prop contains a button with text", () => {
  render(
    <ActionPopover
      renderButton={(props) => {
        return (
          <ActionPopoverMenuButton
            buttonType="tertiary"
            iconType="ellipsis_vertical"
            iconPosition="after"
            size="small"
            {...props}
          >
            Button text
          </ActionPopoverMenuButton>
        );
      }}
    >
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );
  expect(screen.getByRole("button")).not.toHaveAccessibleName("actions");
});

test("uses the aria-label prop if provided", () => {
  render(
    <ActionPopover aria-label="test aria label">
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );
  expect(screen.getByRole("button")).toHaveAccessibleName("test aria label");
});

test("renders with the provided aria-labelledby prop", () => {
  render(
    <>
      <span id="test-label-id">test label</span>
      <ActionPopover aria-labelledby="test-label-id">
        <ActionPopoverItem>example item</ActionPopoverItem>
      </ActionPopover>
    </>,
  );
  expect(screen.getByRole("button")).toHaveAccessibleName("test label");
});

test("renders with the provided aria-describedby prop", () => {
  render(
    <>
      <span id="test-description-id">test description</span>
      <ActionPopover aria-describedby="test-description-id">
        <ActionPopoverItem>example item</ActionPopoverItem>
      </ActionPopover>
    </>,
  );
  expect(screen.getByRole("button")).toHaveAccessibleDescription(
    "test description",
  );
});

test("renders with the menu closed by default", () => {
  render(
    <ActionPopover>
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test.each<["top" | "bottom", boolean, string]>([
  ["top", false, "top-end"],
  ["top", true, "top-start"],
  ["bottom", false, "bottom-end"],
  ["bottom", true, "bottom-start"],
])(
  "applies proper %s prop to Popover component when rightAlignMenu is %s",
  async (placement, rightAlignMenu, result) => {
    const computePositionSpy = jest.spyOn(floatingUi, "computePosition");

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover placement={placement} rightAlignMenu={rightAlignMenu} />,
    );

    await user.click(screen.getByRole("button"));

    const placements = computePositionSpy.mock.calls.map(
      (call) => call[2]?.placement,
    );

    expect(placements.length).toBeGreaterThan(0);
    expect(placements.every((p) => p === result)).toBe(true);

    computePositionSpy.mockRestore();
  },
);

test("clicking a menu item calls its onClick handler", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem icon="email" onClick={() => onClick("email")}>
        Email Invoice
      </ActionPopoverItem>
      <ActionPopoverItem icon="print" onClick={() => onClick("print")}>
        Print Invoice
      </ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  await user.click(screen.getByText("Print Invoice"));

  expect(onClick).toHaveBeenCalledWith("print");
});

test("pressing enter on a menu item calls its onClick handler", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem icon="email" onClick={() => onClick("email")}>
        Email Invoice
      </ActionPopoverItem>
      <ActionPopoverItem icon="print" onClick={() => onClick("print")}>
        Print Invoice
      </ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  screen.getByRole("button", { name: "Print Invoice" }).focus();
  await user.keyboard("{Enter}");

  expect(onClick).toHaveBeenCalledWith("print");
});

test("clicking a menu item closes the menu", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem icon="email">Email Invoice</ActionPopoverItem>
      <ActionPopoverItem icon="print">Print Invoice</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  await user.click(screen.getByText("Print Invoice"));

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("pressing enter on a menu item closes the menu", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem icon="email">Email Invoice</ActionPopoverItem>
      <ActionPopoverItem icon="print">Print Invoice</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  screen.getByRole("button", { name: "Print Invoice" }).focus();
  await user.keyboard("{Enter}");

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("clicking a menu item focuses the menu button", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem icon="email">Email Invoice</ActionPopoverItem>
      <ActionPopoverItem icon="print">Print Invoice</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  await user.click(screen.getByText("Print Invoice"));

  expect(screen.getByRole("button")).toHaveFocus();
});

test("pressing enter on a menu item focuses the menu button", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem icon="email">Email Invoice</ActionPopoverItem>
      <ActionPopoverItem icon="print">Print Invoice</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  screen.getByRole("button", { name: "Print Invoice" }).focus();
  await user.keyboard("{Enter}");

  expect(screen.getByRole("button")).toHaveFocus();
});

test("clicking a disabled menu item does not call its onClick handler", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem icon="email" onClick={() => onClick("email")}>
        Email Invoice
      </ActionPopoverItem>
      <ActionPopoverItem icon="print" onClick={() => onClick("print")} disabled>
        Print Invoice
      </ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  await user.click(screen.getByText("Print Invoice"));

  expect(onClick).not.toHaveBeenCalled();
});

test("pressing enter on a disabled menu item does not call its onClick handler", async () => {
  const onClick = jest.fn();
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem icon="email" onClick={() => onClick("email")}>
        Email Invoice
      </ActionPopoverItem>
      <ActionPopoverItem icon="print" onClick={() => onClick("print")} disabled>
        Print Invoice
      </ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  screen.getByRole("button", { name: "Print Invoice" }).focus();
  await user.keyboard("{Enter}");

  expect(onClick).not.toHaveBeenCalled();
});

test("clicking a disabled menu item does not close the menu", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem icon="email">Email Invoice</ActionPopoverItem>
      <ActionPopoverItem icon="print" disabled>
        Print Invoice
      </ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  await user.click(screen.getByText("Print Invoice"));

  expect(screen.getByRole("list")).toBeVisible();
});

test("pressing enter on a disabled menu item does not close the menu", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem icon="email">Email Invoice</ActionPopoverItem>
      <ActionPopoverItem icon="print" disabled>
        Print Invoice
      </ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  screen.getByRole("button", { name: "Print Invoice" }).focus();
  await user.keyboard("{Enter}");

  expect(screen.getByRole("list")).toBeVisible();
});

test("clicking a disabled menu item does not focus the menu button", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem icon="email">Email Invoice</ActionPopoverItem>
      <ActionPopoverItem icon="print" disabled>
        Print Invoice
      </ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  await user.click(screen.getByText("Print Invoice"));

  expect(screen.getByRole("button", { name: "actions" })).not.toHaveFocus();
});

test("pressing enter on a disabled menu item does not focus the menu button", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem icon="email">Email Invoice</ActionPopoverItem>
      <ActionPopoverItem icon="print" disabled>
        Print Invoice
      </ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  screen.getByRole("button", { name: "Print Invoice" }).focus();
  await user.keyboard("{Enter}");

  expect(screen.getByRole("button", { name: "actions" })).not.toHaveFocus();
});

test("clicking the menu button calls the onOpen prop", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  const onOpen = jest.fn();

  render(
    <ActionPopover onOpen={onOpen}>
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));

  expect(onOpen).toHaveBeenCalledTimes(1);
});

test("clicking the menu button stops any further event propagation", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  const parentClickHandler = jest.fn();

  render(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={parentClickHandler}>
      <ActionPopover>
        <ActionPopoverItem>example item</ActionPopoverItem>
      </ActionPopover>
    </div>,
  );

  await user.click(screen.getByRole("button"));

  expect(parentClickHandler).not.toHaveBeenCalled();
});

test("clicking the menu button focuses the first focusable element", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem disabled>shouldn't be focused</ActionPopoverItem>
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "example item" })).toHaveFocus();
});

test("clicking the menu button with the menu open closes the menu and calls the onClose function", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  const onClose = jest.fn();

  render(
    <ActionPopover onClose={onClose}>
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );

  const menuButton = screen.getByRole("button");
  await user.click(menuButton);
  expect(screen.getByRole("list")).toBeVisible();
  await user.click(menuButton);

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("clicking inside the component does not close the menu", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem disabled>disabled item</ActionPopoverItem>
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));

  await user.click(screen.getByRole("button", { name: "disabled item" }));

  expect(screen.getByRole("list")).toBeVisible();
});

test("clicking elsewhere on the document closes the menu", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem disabled>disabled item</ActionPopoverItem>
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  await user.click(document.body);

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test.each(["ArrowDown", "Space", "Enter", "ArrowUp"] as const)(
  "pressing %s key when focused on the menu button opens the menu and calls the onOpen callback",
  async (key) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const onOpen = jest.fn();

    render(
      <ActionPopover onOpen={onOpen}>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
      </ActionPopover>,
    );

    screen.getByRole("button").focus();
    const userEventKeyCode = key === "Space" ? " " : `{${key}}`;
    await user.keyboard(userEventKeyCode);
    jest.runOnlyPendingTimers();

    expect(screen.getByRole("list")).toBeVisible();
    expect(onOpen).toHaveBeenCalledTimes(1);
  },
);

test.each(["ArrowDown", "Space", "Enter"] as const)(
  "pressing %s key when focused on the menu button selects the first focusable item",
  async (key) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
      </ActionPopover>,
    );

    screen.getByRole("button").focus();
    const userEventKeyCode = key === "Space" ? " " : `{${key}}`;
    await user.keyboard(userEventKeyCode);
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "example item 1" }),
    ).toHaveFocus();
  },
);

test("pressing ArrowUp key when focused on the menu button selects the last focusable item", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem>example item 1</ActionPopoverItem>
      <ActionPopoverItem>example item 2</ActionPopoverItem>
    </ActionPopover>,
  );

  screen.getByRole("button").focus();
  await user.keyboard("{ArrowUp}");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "example item 2" })).toHaveFocus();
});

test.each([
  ["Tab", "{Tab}"],
  ["Shift + Tab", "{Shift}>{Tab}"],
])(
  "pressing %s key when focused on a menu item closes the menu",
  async (key, keycode) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const onClose = jest.fn();

    render(
      <ActionPopover onClose={onClose}>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
      </ActionPopover>,
    );

    screen.getByRole("button").focus();
    await user.keyboard("{Enter}");
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "example item 1" }),
    ).toHaveFocus();

    await user.keyboard(keycode);
    jest.runOnlyPendingTimers();

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  },
);

test("pressing Escape when focused on a menu item focuses the MenuButton and closes the Menu", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem>example item 1</ActionPopoverItem>
      <ActionPopoverItem>example item 2</ActionPopoverItem>
    </ActionPopover>,
  );

  screen.getByRole("button").focus();
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{Escape}");

  expect(screen.getByRole("button", { name: "actions" })).toHaveFocus();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("pressing the Down Arrow key when the menu is open focuses the next item and wraps around when on the last item", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem>example item 1</ActionPopoverItem>
      <ActionPopoverItem>example item 2</ActionPopoverItem>
      <ActionPopoverItem>example item 3</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 1" })).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 2" })).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 3" })).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 1" })).toHaveFocus();
});

test("pressing the Up Arrow key when the menu is open focuses the previous item and wraps around when on the first item", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem>example item 1</ActionPopoverItem>
      <ActionPopoverItem>example item 2</ActionPopoverItem>
      <ActionPopoverItem>example item 3</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 1" })).toHaveFocus();

  await user.keyboard("{ArrowUp}");
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 3" })).toHaveFocus();

  await user.keyboard("{ArrowUp}");
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 2" })).toHaveFocus();

  await user.keyboard("{ArrowUp}");
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 1" })).toHaveFocus();
});

test("pressing the Home key when the menu is open focuses the first item, no matter which item is currently focused", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem>example item 1</ActionPopoverItem>
      <ActionPopoverItem>example item 2</ActionPopoverItem>
      <ActionPopoverItem>example item 3</ActionPopoverItem>
      <ActionPopoverItem>example item 4</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 1" })).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 2" })).toHaveFocus();
  await user.keyboard("{Home}");
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 1" })).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  jest.runOnlyPendingTimers();
  await user.keyboard("{ArrowDown}");
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 3" })).toHaveFocus();
  await user.keyboard("{Home}");
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 1" })).toHaveFocus();

  await user.keyboard("{ArrowDown}");
  jest.runOnlyPendingTimers();
  await user.keyboard("{ArrowDown}");
  jest.runOnlyPendingTimers();
  await user.keyboard("{ArrowDown}");
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 4" })).toHaveFocus();
  await user.keyboard("{Home}");
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 1" })).toHaveFocus();
});

test("pressing the End key when the menu is open focuses the last item, no matter which item is currently focused", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem>example item 1</ActionPopoverItem>
      <ActionPopoverItem>example item 2</ActionPopoverItem>
      <ActionPopoverItem>example item 3</ActionPopoverItem>
      <ActionPopoverItem>example item 4</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "example item 1" })).toHaveFocus();

  await user.keyboard("{End}");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "example item 4" })).toHaveFocus();

  await user.keyboard("{ArrowUp}");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "example item 3" })).toHaveFocus();
  await user.keyboard("{End}");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "example item 4" })).toHaveFocus();

  await user.keyboard("{ArrowUp}");
  jest.runOnlyPendingTimers();

  await user.keyboard("{ArrowUp}");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "example item 2" })).toHaveFocus();
  await user.keyboard("{End}");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "example item 4" })).toHaveFocus();
});

test("pressing Space when the menu is open does nothing", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem>example item 1</ActionPopoverItem>
      <ActionPopoverItem>example item 2</ActionPopoverItem>
      <ActionPopoverItem>example item 3</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("list")).toBeVisible();
  expect(screen.getByRole("button", { name: "example item 1" })).toHaveFocus();

  await user.keyboard(" ");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("list")).toBeVisible();
  expect(screen.getByRole("button", { name: "example item 1" })).toHaveFocus();
});

test("pressing an alphabet character when the menu is open selects the next selectable item in the list starting with the letter that was pressed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem>Download PDF</ActionPopoverItem>
      <ActionPopoverItem>Email Invoice</ActionPopoverItem>
      <ActionPopoverItem>Print Invoice</ActionPopoverItem>
      <ActionPopoverItem disabled>Disabled</ActionPopoverItem>
      <ActionPopoverDivider key="divider" />
      <ActionPopoverItem>Download CSV</ActionPopoverItem>
    </ActionPopover>,
  );
  await user.click(screen.getByRole("button"));
  jest.runOnlyPendingTimers();

  // moves to first element starting with P
  await user.keyboard("p");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "Print Invoice" })).toHaveFocus();

  // moves to next element starting with D - noting that it skips the disabled "Disabled" item
  await user.keyboard("d");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "Download CSV" })).toHaveFocus();

  // moves to next element starting with D, it loops to the start
  await user.keyboard("d");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "Download PDF" })).toHaveFocus();

  // does nothing when there are no matches
  await user.keyboard("z");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "Download PDF" })).toHaveFocus();
});

test("pressing a non-printable character key when the menu is open does nothing", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem>first item</ActionPopoverItem>
      <ActionPopoverItem>F - shouldn't work</ActionPopoverItem>
      <ActionPopoverItem>F1 - shouldn't work</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("list")).toBeVisible();
  expect(screen.getByRole("button", { name: "first item" })).toHaveFocus();

  await user.keyboard("{F1}");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("list")).toBeVisible();
  expect(screen.getByRole("button", { name: "first item" })).toHaveFocus();
});

test("an error is thrown, with appropriate error message, if invalid children are used", () => {
  const globalConsoleSpy = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => {});

  expect(() => {
    render(
      <ActionPopover>
        <ActionPopoverItem onClick={() => {}}>Item</ActionPopoverItem>
        Invalid children
        <p>invalid children</p>
      </ActionPopover>,
    );
  }).toThrow(
    "ActionPopover only accepts children of type `ActionPopoverItem`" +
      " and `ActionPopoverDivider`.",
  );

  globalConsoleSpy.mockRestore();
});

test("should call the exposed `focusButton` method and focus the toggle button", async () => {
  const MockComponent = () => {
    const ref = useRef<ActionPopoverHandle>(null);

    return (
      <>
        <Button
          onClick={() => {
            ref.current?.focusButton();
          }}
        >
          Focus
        </Button>
        <ActionPopover ref={ref}>
          <ActionPopoverItem onClick={() => {}}>foo</ActionPopoverItem>
        </ActionPopover>
      </>
    );
  };

  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<MockComponent />);

  const button = screen.getByRole("button", { name: "Focus" });
  await user.click(button);

  expect(screen.getByRole("button", { name: "actions" })).toHaveFocus();
});

describe("when an item has a submenu with default (left) alignment", () => {
  it("renders the appropriate icon with the correct alignment", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    // there are 2 elements with data-role="icon", the other being the main menu button.
    // Unfortunately there seems to be no way with the RTL options for getByTestId to select the correct one, so we have to index
    // into the array of all such elements
    const submenuIcon = screen.getAllByTestId("icon")[1];
    expect(submenuIcon).toHaveStyleRule(
      "content",
      `"${iconUnicodes.chevron_left_thick}"`,
      { modifier: "&::before" },
    );
    expect(submenuIcon).toHaveStyle({ left: "-5px" });
  });

  it("opens the submenu on mouseenter", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    expect(
      screen.queryByRole("button", { name: "submenu item 1" }),
    ).not.toBeInTheDocument();

    // move mouse over the item with the submenu
    await user.hover(
      screen.getByRole("button", { name: "example item with submenu" }),
    );

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(
      screen.getByRole("button", { name: "submenu item 1" }),
    ).toBeVisible();
  });

  // test needed for coverage of the clearTimeout call - it's not clear if the clearTimeout is actually needed
  // and if it has any real observable consequences. We should investigate that and remove the call, and this
  // test, if it is not needed.
  it("clears the timeout when mouseenter happens twice in a short interval", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    const clearTimeoutSpy = jest.spyOn(window, "clearTimeout");

    await user.hover(
      screen.getByRole("button", { name: "example item with submenu" }),
    );
    expect(clearTimeoutSpy).not.toHaveBeenCalled();
    // need to move the pointer away from the element before moving it back, otherwise mouseEnter won't be triggered a second time
    await user.unhover(
      screen.getByRole("button", { name: "example item with submenu" }),
    );
    await user.hover(
      screen.getByRole("button", { name: "example item with submenu" }),
    );

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it("closes the submenu when the mouse leaves the parent item", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    await user.hover(
      screen.getByRole("button", { name: "example item with submenu" }),
    );
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(
      screen.getByRole("button", { name: "submenu item 1" }),
    ).toBeVisible();

    await user.hover(screen.getByRole("button", { name: "example item 2" }));
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(
      screen.queryByRole("button", { name: "submenu item 1" }),
    ).not.toBeInTheDocument();
  });

  // test needed for coverage of the clearTimeout call - it's not clear if the clearTimeout is actually needed
  // and if it has any real observable consequences. We should investigate that and remove the call, and this
  // test, if it is not needed.
  it("clears the the timeout when mouseleave happens twice in a short interval", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    const clearTimeoutSpy = jest.spyOn(window, "clearTimeout");

    await user.hover(
      screen.getByRole("button", { name: "example item with submenu" }),
    );
    await user.unhover(
      screen.getByRole("button", { name: "example item with submenu" }),
    );
    expect(clearTimeoutSpy).not.toHaveBeenCalled();
    // need to enter and leave a second time
    await user.hover(
      screen.getByRole("button", { name: "example item with submenu" }),
    );
    await user.unhover(
      screen.getByRole("button", { name: "example item with submenu" }),
    );

    // need to check for 2 calls, as one will have been due to the cleartimeout of the double mouse-enter
    // - unfortunately it's not possible to check that a specific call has been made (as the argument is
    // just a timer ID)
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(2);
    clearTimeoutSpy.mockRestore();
  });

  it("opens the submenu and focuses the first item when the left arrow key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));
    jest.runOnlyPendingTimers();

    screen.getByRole("button", { name: "example item with submenu" }).focus();
    await user.keyboard("{ArrowLeft}");
    jest.runOnlyPendingTimers();

    const firstItem = screen.getByRole("button", { name: "submenu item 1" });
    expect(firstItem).toBeVisible();
    expect(firstItem).toHaveFocus();
  });

  it("closes the submenu and returns focus to the parent item when the right arrow key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    const parentItem = screen.getByRole("button", {
      name: "example item with submenu",
    });

    parentItem.focus();
    await user.keyboard("{ArrowLeft}");

    expect(
      screen.getByRole("button", { name: "submenu item 1" }),
    ).toBeVisible();

    await user.keyboard("{ArrowRight}");

    expect(
      screen.queryByRole("button", { name: "submenu item 1" }),
    ).not.toBeInTheDocument();
    expect(parentItem).toHaveFocus();
  });

  it("leaves the submenu open, and keeps focus where it is, when an alphabetical key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));
    jest.runOnlyPendingTimers();

    screen.getByRole("button", { name: "example item with submenu" }).focus();
    await user.keyboard("{ArrowLeft}");
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "submenu item 1" }),
    ).toBeVisible();

    await user.keyboard("z");
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "submenu item 1" }),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "submenu item 1" }),
    ).toHaveFocus();
  });

  it("opens the submenu and focuses the first item when the enter key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));
    jest.runOnlyPendingTimers();

    screen.getByRole("button", { name: "example item with submenu" }).focus();
    await user.keyboard("{Enter}");
    jest.runOnlyPendingTimers();

    const firstItem = screen.getByRole("button", { name: "submenu item 1" });
    expect(firstItem).toBeVisible();
    expect(firstItem).toHaveFocus();
  });

  it("closes the entire parent menu and focuses the main menu button when a submenu item is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));
    await user.click(
      screen.getByRole("button", { name: "example item with submenu" }),
    );

    await user.click(screen.getByRole("button", { name: "submenu item 1" }));

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveFocus();
  });

  it("closes the entire parent menu and focuses the main menu button when the escape key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));
    jest.runOnlyPendingTimers();

    screen.getByRole("button", { name: "example item with submenu" }).focus();

    await user.keyboard("{ArrowLeft}");
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "submenu item 1" }),
    ).toHaveFocus();

    await user.keyboard("{Escape}");
    jest.runOnlyPendingTimers();

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveFocus();
  });

  it("does not open the submenu on mouseenter when the item is disabled", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          disabled
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    expect(
      screen.queryByRole("button", { name: "submenu item 1" }),
    ).not.toBeInTheDocument();

    await user.hover(
      screen.getByRole("button", { name: "example item with submenu" }),
    );

    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(
      screen.queryByRole("button", { name: "submenu item 1" }),
    ).not.toBeInTheDocument();
  });

  it("does not open the submenu when the left arrow key is pressed if the item is disabled", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          disabled
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    screen.getByRole("button", { name: "example item with submenu" }).focus();
    await user.keyboard("{ArrowLeft}");

    expect(
      screen.queryByRole("button", { name: "submenu item 1" }),
    ).not.toBeInTheDocument();
  });

  it("does not open the submenu when the enter key is pressed if the item is disabled", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          disabled
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    screen.getByRole("button", { name: "example item with submenu" }).focus();
    await user.keyboard("{Enter}");

    expect(
      screen.queryByRole("button", { name: "submenu item 1" }),
    ).not.toBeInTheDocument();
  });

  it("leaves the submenu open, and keeps focus where it is, when a disabled submenu item is clicked", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem disabled>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    screen.getByRole("button", { name: "example item with submenu" }).focus();
    await user.keyboard("{ArrowLeft}");

    await user.click(screen.getByRole("button", { name: "submenu item 1" }));
    expect(
      screen.getByRole("button", { name: "submenu item 1" }),
    ).toBeVisible();
    expect(
      screen.getByRole("button", { name: "submenu item 1" }),
    ).toHaveFocus();
  });
});

describe("when there isn't enough space on the screen to render a submenu on the left", () => {
  let getBoundingClientRectSpy: jest.SpyInstance;
  beforeEach(() => {
    getBoundingClientRectSpy = jest.spyOn(
      Element.prototype,
      "getBoundingClientRect",
    );
    getBoundingClientRectSpy.mockImplementation(() => ({
      left: "-100",
      right: "auto",
      top: "100",
    }));
  });

  afterEach(() => {
    getBoundingClientRectSpy.mockRestore();
  });

  it("renders the appropriate icon with the correct alignment", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover submenuPosition="left">
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    // there are 2 elements with data-role="icon", the other being the main menu button.
    // Unfortunately there seems to be no way with the RTL options for getByTestId to select the correct one, so we have to index
    // into the array of all such elements
    const submenuIcon = screen.getAllByTestId("icon")[1];
    expect(submenuIcon).toHaveStyleRule(
      "content",
      `"${iconUnicodes.chevron_right_thick}"`,
      { modifier: "&::before" },
    );
    expect(submenuIcon).toHaveStyle({ right: "-5px" });
  });

  it("opens the submenu and focuses the first item when right arrow key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover submenuPosition="left">
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));
    jest.runOnlyPendingTimers();

    screen.getByRole("button", { name: "example item with submenu" }).focus();
    await user.keyboard("{ArrowRight}");
    jest.runOnlyPendingTimers();

    const firstItem = screen.getByRole("button", { name: "submenu item 1" });
    expect(firstItem).toBeVisible();
    expect(firstItem).toHaveFocus();
  });

  it("closes the submenu and returns focus to parent item when the submenu is open and the left arrow key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover submenuPosition="left">
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    const parentItem = screen.getByRole("button", {
      name: "example item with submenu",
    });

    parentItem.focus();
    await user.keyboard("{ArrowRight}");

    expect(
      screen.getByRole("button", { name: "submenu item 1" }),
    ).toBeVisible();

    await user.keyboard("{ArrowLeft}");

    expect(
      screen.queryByRole("button", { name: "submenu item 1" }),
    ).not.toBeInTheDocument();
    expect(parentItem).toHaveFocus();
  });
});

describe("when the submenuPosition prop is set to 'right'", () => {
  it("renders the appropriate icon with the correct alignment", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover submenuPosition="right">
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    // there are 2 elements with data-role="icon", the other being the main menu button.
    // Unfortunately there seems to be no way with the RTL options for getByTestId to select the correct one, so we have to index
    // into the array of all such elements
    const submenuIcon = screen.getAllByTestId("icon")[1];
    expect(submenuIcon).toHaveStyleRule(
      "content",
      `"${iconUnicodes.chevron_right_thick}"`,
      { modifier: "&::before" },
    );
    expect(submenuIcon).toHaveStyle({ right: "-5px" });
  });

  it("opens the submenu and focuses the first item when right arrow key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover submenuPosition="right">
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));
    jest.runOnlyPendingTimers();

    screen.getByRole("button", { name: "example item with submenu" }).focus();
    await user.keyboard("{ArrowRight}");
    jest.runOnlyPendingTimers();

    const firstItem = screen.getByRole("button", { name: "submenu item 1" });
    expect(firstItem).toBeVisible();
    expect(firstItem).toHaveFocus();
  });

  it("closes the submenu and returns focus to parent item when the submenu is open and the left arrow key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover submenuPosition="right">
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    const parentItem = screen.getByRole("button", {
      name: "example item with submenu",
    });

    parentItem.focus();
    await user.keyboard("{ArrowRight}");

    expect(
      screen.getByRole("button", { name: "submenu item 1" }),
    ).toBeVisible();

    await user.keyboard("{ArrowLeft}");

    expect(
      screen.queryByRole("button", { name: "submenu item 1" }),
    ).not.toBeInTheDocument();
    expect(parentItem).toHaveFocus();
  });
});

describe("when the submenuPosition prop is set to 'right' and there isn't enough space on the screen to render a submenu on the right", () => {
  let getBoundingClientRectSpy: jest.SpyInstance;
  beforeEach(() => {
    getBoundingClientRectSpy = jest.spyOn(
      Element.prototype,
      "getBoundingClientRect",
    );
    getBoundingClientRectSpy.mockImplementation(() => ({
      left: "auto",
      right: "100",
      top: "100",
    }));
  });

  afterEach(() => {
    getBoundingClientRectSpy.mockRestore();
  });

  it("renders the appropriate icon with the correct alignment", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover submenuPosition="right">
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    // there are 2 elements with data-role="icon", the other being the main menu button.
    // Unfortunately there seems to be no way with the RTL options for getByTestId to select the correct one, so we have to index
    // into the array of all such elements
    const submenuIcon = screen.getAllByTestId("icon")[1];
    expect(submenuIcon).toHaveStyleRule(
      "content",
      `"${iconUnicodes.chevron_left_thick}"`,
      { modifier: "&::before" },
    );
    expect(submenuIcon).toHaveStyle({ left: "-5px" });
  });

  it("opens the submenu and focuses the first item when left arrow key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover submenuPosition="right">
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));
    jest.runOnlyPendingTimers();

    screen.getByRole("button", { name: "example item with submenu" }).focus();
    await user.keyboard("{ArrowLeft}");
    jest.runOnlyPendingTimers();

    const firstItem = screen.getByRole("button", { name: "submenu item 1" });
    expect(firstItem).toBeVisible();
    expect(firstItem).toHaveFocus();
  });

  it("closes the submenu and returns focus to parent item when the submenu is open and the right arrow key is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover submenuPosition="right">
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item with submenu
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    const parentItem = screen.getByRole("button", {
      name: "example item with submenu",
    });

    parentItem.focus();
    await user.keyboard("{ArrowLeft}");

    expect(
      screen.getByRole("button", { name: "submenu item 1" }),
    ).toBeVisible();

    await user.keyboard("{ArrowRight}");

    expect(
      screen.queryByRole("button", { name: "submenu item 1" }),
    ).not.toBeInTheDocument();
    expect(parentItem).toHaveFocus();
  });
});

test("an error is thrown, with appropriate error message, if an invalid element is used for the 'submenu' prop", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  const globalConsoleSpy = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => {});

  render(
    <ActionPopover>
      <ActionPopoverItem submenu={<p>foo</p>}>item</ActionPopoverItem>
    </ActionPopover>,
  );

  await expect(() => {
    // error should only be actually thrown when the Popover menu, with invalid submenu, is rendered
    return user.click(screen.getByRole("button"));
  }).rejects.toThrow(
    "ActionPopoverItem only accepts submenu of type `ActionPopoverMenu`",
  );

  globalConsoleSpy.mockRestore();
});

test("an error is thrown, with appropriate error message, if a submenu has incorrect children", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  const globalConsoleSpy = jest
    .spyOn(global.console, "error")
    .mockImplementation(() => {});

  render(
    <ActionPopover>
      <ActionPopoverItem
        submenu={<ActionPopoverMenu>invalid</ActionPopoverMenu>}
      >
        item
      </ActionPopoverItem>
    </ActionPopover>,
  );

  await expect(() => {
    // error should only be actually thrown when the Popover menu, with invalid submenu, is rendered
    return user.click(screen.getByRole("button"));
  }).rejects.toThrow(
    "ActionPopoverMenu only accepts children of type `ActionPopoverItem`" +
      " and `ActionPopoverDivider`.",
  );

  globalConsoleSpy.mockRestore();
});

describe("when the renderButton prop is passed", () => {
  it("renders that component as the menu button", () => {
    render(
      <ActionPopover
        renderButton={(props) => (
          <ActionPopoverMenuButton
            buttonType="tertiary"
            iconType="dropdown"
            iconPosition="after"
            size="small"
            data-role="my-custom-button"
            {...props}
          >
            Foo
          </ActionPopoverMenuButton>
        )}
      >
        <ActionPopoverItem onClick={jest.fn()}>foo</ActionPopoverItem>
      </ActionPopover>,
    );

    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeVisible();
    expect(menuButton).toHaveAttribute("tabindex", "0");
    expect(menuButton).toHaveAttribute("data-element", "action-popover-button");
    expect(menuButton).toHaveAttribute("data-role", "my-custom-button");
    expect(menuButton).toHaveTextContent("Foo");
  });

  it("sets the tabIndex of the menu button to -1 when opened", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover
        renderButton={(props) => (
          <ActionPopoverMenuButton
            buttonType="tertiary"
            iconType="dropdown"
            iconPosition="after"
            size="small"
            data-role="my-custom-button"
            {...props}
          >
            Foo
          </ActionPopoverMenuButton>
        )}
      >
        <ActionPopoverItem onClick={jest.fn()}>foo</ActionPopoverItem>
      </ActionPopover>,
    );

    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeVisible();

    await user.click(menuButton);

    expect(menuButton).toHaveAttribute("tabindex", "-1");
  });

  it("renders the menu button with the provided aria-label", () => {
    render(
      <ActionPopover
        renderButton={(props) => (
          <ActionPopoverMenuButton
            buttonType="tertiary"
            iconType="dropdown"
            iconPosition="after"
            size="small"
            aria-label="test label"
            {...props}
          >
            Foo
          </ActionPopoverMenuButton>
        )}
      >
        <ActionPopoverItem onClick={jest.fn()}>foo</ActionPopoverItem>
      </ActionPopover>,
    );

    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeVisible();
    expect(menuButton).toHaveAccessibleName("test label");
  });

  it("renders the menu button with the provided aria-labelledby and aria-describedby", () => {
    render(
      <>
        <span id="test-label-id">test label</span>
        <span id="test-description-id">test description</span>
        <ActionPopover
          aria-labelledby="test-label-id"
          aria-describedby="test-description-id"
          renderButton={(props) => (
            <ActionPopoverMenuButton
              buttonType="tertiary"
              iconType="dropdown"
              iconPosition="after"
              size="small"
              {...props}
            >
              Foo
            </ActionPopoverMenuButton>
          )}
        >
          <ActionPopoverItem onClick={() => {}}>foo</ActionPopoverItem>
        </ActionPopover>
      </>,
    );

    const menuButton = screen.getByRole("button");
    expect(menuButton).toBeVisible();
    expect(menuButton).toHaveAccessibleName("test label");
    expect(menuButton).toHaveAccessibleDescription("test description");
  });

  it("should call the exposed `focusButton` method and focus the menu button", async () => {
    const MockComponent = () => {
      const ref = useRef<ActionPopoverHandle>(null);

      return (
        <>
          <Button
            onClick={() => {
              ref.current?.focusButton();
            }}
          >
            Focus
          </Button>
          <ActionPopover
            ref={ref}
            renderButton={(props) => (
              <ActionPopoverMenuButton
                buttonType="tertiary"
                iconType="dropdown"
                iconPosition="after"
                size="small"
                aria-label={undefined}
                {...props}
              >
                Foo
              </ActionPopoverMenuButton>
            )}
          >
            <ActionPopoverItem onClick={() => {}}>foo</ActionPopoverItem>
          </ActionPopover>
        </>
      );
    };

    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(<MockComponent />);

    const button = screen.getByRole("button", { name: "Focus" });
    await user.click(button);

    expect(screen.getByRole("button", { name: "Foo" })).toHaveFocus();
  });
});

describe("When ActionPopoverMenu contains multiple disabled items", () => {
  it("should focus the next focusable item when down arrow is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem disabled>example item 2</ActionPopoverItem>
        <ActionPopoverItem disabled>example item 3</ActionPopoverItem>
        <ActionPopoverItem>example item 4</ActionPopoverItem>
        <ActionPopoverItem>example item 5</ActionPopoverItem>
        <ActionPopoverItem disabled>example item 6</ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "example item 1" }),
    ).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "example item 4" }),
    ).toHaveFocus();
  });

  it("should focus the previous focusable item when up arrow is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem>example item 1</ActionPopoverItem>
        <ActionPopoverItem disabled>example item 2</ActionPopoverItem>
        <ActionPopoverItem disabled>example item 3</ActionPopoverItem>
        <ActionPopoverItem>example item 4</ActionPopoverItem>
        <ActionPopoverItem>example item 5</ActionPopoverItem>
        <ActionPopoverItem disabled>example item 6</ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "example item 1" }),
    ).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "example item 4" }),
    ).toHaveFocus();
    await user.keyboard("{ArrowUp}");
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "example item 1" }),
    ).toHaveFocus();
  });

  it("should focus the first focusable item when Home is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem disabled>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem disabled>example item 3</ActionPopoverItem>
        <ActionPopoverItem>example item 4</ActionPopoverItem>
        <ActionPopoverItem>example item 5</ActionPopoverItem>
        <ActionPopoverItem disabled>example item 6</ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "example item 2" }),
    ).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "example item 4" }),
    ).toHaveFocus();
    await user.keyboard("{ArrowDown}");
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "example item 5" }),
    ).toHaveFocus();
    await user.keyboard("{Home}");
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "example item 2" }),
    ).toHaveFocus();
  });

  it("should focus the last focusable item when End is pressed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover>
        <ActionPopoverItem disabled>example item 1</ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem disabled>example item 3</ActionPopoverItem>
        <ActionPopoverItem>example item 4</ActionPopoverItem>
        <ActionPopoverItem>example item 5</ActionPopoverItem>
        <ActionPopoverItem disabled>example item 6</ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "example item 2" }),
    ).toHaveFocus();
    await user.keyboard("{End}");
    jest.runOnlyPendingTimers();

    expect(
      screen.getByRole("button", { name: "example item 5" }),
    ).toHaveFocus();
  });
});

// The styling checks in the rest of this file are purely for coverage - these styles are already tested with Playwright

describe("padding checks on 'StyledMenuItemInnerText'", () => {
  it.each([
    ["left", "left"],
    ["left", "right"],
    ["right", "left"],
    ["right", "right"],
  ] as const)(
    "should render menu items with left and right padding as var(--spacing100) when horizontalAlignment is %s and submenuPosition is %, if there are no submenus anywhere in the menu",
    async (alignment, position) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(
        <ActionPopover
          horizontalAlignment={alignment}
          submenuPosition={position}
        >
          <ActionPopoverItem>example item 1</ActionPopoverItem>
          <ActionPopoverItem>example item 2</ActionPopoverItem>
          <ActionPopoverItem>example item 3</ActionPopoverItem>
          <ActionPopoverItem>example item 4</ActionPopoverItem>
        </ActionPopover>,
      );

      await user.click(screen.getByRole("button"));

      expect(screen.getByText("example item 1")).toHaveStyleRule(
        "padding-left",
        "var(--spacing100)",
      );
      expect(screen.getByText("example item 1")).toHaveStyleRule(
        "padding-right",
        "var(--spacing100)",
      );
    },
  );

  it.each([
    ["var(--spacing400)", "var(--spacing100)", "left", "left"],
    ["var(--spacing100)", "var(--spacing400)", "right", "right"],
  ] as [
    string,
    string,
    ActionPopoverProps["horizontalAlignment"],
    ActionPopoverProps["submenuPosition"],
  ][])(
    "should render a menu item with no icon or submenu with padding-left as %s and padding-right as %s when horizontalAlignment is %s, submenuPosition is %s and some other menu items have a submenu",
    async (paddingLeft, paddingRight, alignment, position) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(
        <ActionPopover
          horizontalAlignment={alignment}
          submenuPosition={position}
        >
          <ActionPopoverItem>example item 1</ActionPopoverItem>
          <ActionPopoverItem
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem>submenu item 1</ActionPopoverItem>
                <ActionPopoverItem>submenu item 2</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            example item 2
          </ActionPopoverItem>
          <ActionPopoverItem>example item 3</ActionPopoverItem>
          <ActionPopoverItem
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem>submenu item 1</ActionPopoverItem>
                <ActionPopoverItem>submenu item 2</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            example item 4
          </ActionPopoverItem>
        </ActionPopover>,
      );

      await user.click(screen.getByRole("button"));

      expect(screen.getByText("example item 1")).toHaveStyleRule(
        "padding-left",
        paddingLeft,
      );
      expect(screen.getByText("example item 1")).toHaveStyleRule(
        "padding-right",
        paddingRight,
      );
    },
  );

  it.each([
    ["var(--spacing600)", "var(--spacing100)", "left", "left"],
    ["var(--spacing100)", "var(--spacing600)", "right", "right"],
  ] as [
    string,
    string,
    ActionPopoverProps["horizontalAlignment"],
    ActionPopoverProps["submenuPosition"],
  ][])(
    "should render a menu item with a submenu but no icon with padding-left as %s and padding-right as %s when horizontalAlignment is %s, submenuPosition is %s and some other menu items have an icon",
    async (paddingLeft, paddingRight, alignment, position) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(
        <ActionPopover
          horizontalAlignment={alignment}
          submenuPosition={position}
        >
          <ActionPopoverItem
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem icon="bin">submenu item 1</ActionPopoverItem>
                <ActionPopoverItem>submenu item 2</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            example item 1
          </ActionPopoverItem>
          <ActionPopoverItem>example item 2</ActionPopoverItem>
          <ActionPopoverItem icon="alert">example item 3</ActionPopoverItem>
          <ActionPopoverItem
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem>submenu item 1</ActionPopoverItem>
                <ActionPopoverItem>submenu item 2</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            example item 4
          </ActionPopoverItem>
        </ActionPopover>,
      );

      await user.click(screen.getByRole("button"));

      expect(screen.getByText("example item 1")).toHaveStyleRule(
        "padding-left",
        paddingLeft,
      );
      expect(screen.getByText("example item 1")).toHaveStyleRule(
        "padding-right",
        paddingRight,
      );
    },
  );

  it.each([
    ["var(--spacing900)", "var(--spacing100)", "left", "left"],
    ["var(--spacing100)", "var(--spacing900)", "right", "right"],
  ] as [
    string,
    string,
    ActionPopoverProps["horizontalAlignment"],
    ActionPopoverProps["submenuPosition"],
  ][])(
    "should render a menu item with no icon or submenu with padding-left as %s and padding-right as %s when horizontalAlignment is %s submenuPosition is %s and both icons and submenus exist elsewhere in the menu",
    async (paddingLeft, paddingRight, alignment, position) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(
        <ActionPopover
          horizontalAlignment={alignment}
          submenuPosition={position}
        >
          <ActionPopoverItem>example item 1</ActionPopoverItem>
          <ActionPopoverItem
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem icon="bin">submenu item 1</ActionPopoverItem>
                <ActionPopoverItem>submenu item 2</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            example item 2
          </ActionPopoverItem>
          <ActionPopoverItem icon="alert">example item 3</ActionPopoverItem>
          <ActionPopoverItem
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem>submenu item 1</ActionPopoverItem>
                <ActionPopoverItem>submenu item 2</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            example item 4
          </ActionPopoverItem>
        </ActionPopover>,
      );

      await user.click(screen.getByRole("button"));

      expect(screen.getByText("example item 1")).toHaveStyleRule(
        "padding-left",
        paddingLeft,
      );
      expect(screen.getByText("example item 1")).toHaveStyleRule(
        "padding-right",
        paddingRight,
      );
    },
  );

  it.each([
    ["left", "left"],
    ["left", "right"],
    ["right", "left"],
    ["right", "right"],
  ] as const)(
    "should render a menu item in a submenu with left and right padding as var(--spacing000), when horizontalAlignment is %s, submenuPosition is %s and child is a submenu",
    async (alignment, position) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(
        <ActionPopover
          horizontalAlignment={alignment}
          submenuPosition={position}
        >
          <ActionPopoverItem>example item 1</ActionPopoverItem>
          <ActionPopoverItem
            submenu={
              <ActionPopoverMenu>
                <ActionPopoverItem>submenu item 1</ActionPopoverItem>
                <ActionPopoverItem>submenu item 2</ActionPopoverItem>
              </ActionPopoverMenu>
            }
          >
            example item 2
          </ActionPopoverItem>
          <ActionPopoverItem>example item 3</ActionPopoverItem>
          <ActionPopoverItem>example item 4</ActionPopoverItem>
        </ActionPopover>,
      );

      await user.click(screen.getByRole("button"));

      expect(screen.getByText("submenu item 1")).toHaveStyleRule(
        "padding-left",
        "var(--spacing000)",
      );
      expect(screen.getByText("submenu item 1")).toHaveStyleRule(
        "padding-right",
        "var(--spacing000)",
      );
    },
  );
});

describe("justify-content checks on 'StyledMenuItem'", () => {
  it.each([
    ["flex-start", "left", "left"],
    ["flex-end", "right", "left"],
    ["space-between", "left", "right"],
    ["flex-end", "right", "right"],
  ] as const)(
    "renders menu item with justify-content %s when horizontalAlignment is %s and submenuPosition is %s",
    async (justifyContent, alignment, position) => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

      render(
        <ActionPopover
          horizontalAlignment={alignment}
          submenuPosition={position}
        >
          <ActionPopoverItem>example item 1</ActionPopoverItem>
          <ActionPopoverItem>example item 2</ActionPopoverItem>
          <ActionPopoverItem>example item 3</ActionPopoverItem>
          <ActionPopoverItem>example item 4</ActionPopoverItem>
        </ActionPopover>,
      );

      await user.click(screen.getByRole("button"));

      expect(
        screen.getByRole("button", { name: "example item 1" }),
      ).toHaveStyle({ justifyContent });
    },
  );

  it("renders menu with justify-content space-between when horizontalAlignment is left, submenuPosition is right and any menu item has a submenu", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover horizontalAlignment="left" submenuPosition="right">
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item 1
        </ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem>example item 3</ActionPopoverItem>
        <ActionPopoverItem>example item 4</ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("button", { name: "example item 1" })).toHaveStyle({
      justifyContent: "space-between",
    });
    expect(screen.getByRole("button", { name: "example item 2" })).toHaveStyle({
      justifyContent: "space-between",
    });
  });

  it("renders menu with justify-content space-between when horizontalAlignment is right, submenuPosition is left and that specific menu item has a submenu", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ActionPopover horizontalAlignment="right" submenuPosition="left">
        <ActionPopoverItem
          submenu={
            <ActionPopoverMenu>
              <ActionPopoverItem>submenu item 1</ActionPopoverItem>
              <ActionPopoverItem>submenu item 2</ActionPopoverItem>
            </ActionPopoverMenu>
          }
        >
          example item 1
        </ActionPopoverItem>
        <ActionPopoverItem>example item 2</ActionPopoverItem>
        <ActionPopoverItem>example item 3</ActionPopoverItem>
        <ActionPopoverItem>example item 4</ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));

    expect(screen.getByRole("button", { name: "example item 1" })).toHaveStyle({
      justifyContent: "space-between",
    });
    expect(screen.getByRole("button", { name: "example item 2" })).toHaveStyle({
      justifyContent: "flex-end",
    });
  });
});
