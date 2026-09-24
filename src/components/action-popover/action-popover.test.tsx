import React, { useRef } from "react";
import { render, screen, within, fireEvent, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as floatingUi from "@floating-ui/dom";

import { testStyledSystemMargin } from "../../__spec_helper__/__internal__/test-utils";

import {
  ActionPopover,
  ActionPopoverDivider,
  ActionPopoverItem,
  ActionPopoverMenu,
  ActionPopoverMenuButton,
  ActionPopoverHandle,
} from ".";

import Button from "../button";
import Icon from "../icon";
import {
  FlatTable,
  FlatTableBody,
  FlatTableRow,
  FlatTableCell,
} from "../flat-table";
import iconUnicodes from "../icon/icon-unicodes";
import guid from "../../__internal__/utils/helpers/guid";
import TokensWrapper from "../tokens-wrapper";
import Dialog from "../dialog";

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

test("error is thrown when an item is not rendered within ActionPopover", () => {
  jest.spyOn(global.console, "error").mockImplementation(() => {});

  expect(() =>
    render(<ActionPopoverItem href="#">Item 1</ActionPopoverItem>),
  ).toThrow(
    "Carbon ActionPopover: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
  );
});

test("error is thrown when a menu is not rendered within ActionPopover", () => {
  jest.spyOn(global.console, "error").mockImplementation(() => {});

  expect(() =>
    render(
      <ActionPopoverMenu>
        <ActionPopoverItem href="#">Item 1</ActionPopoverItem>
      </ActionPopoverMenu>,
    ),
  ).toThrow(
    "Carbon ActionPopover: Context not found. Have you wrapped your Carbon subcomponents properly? See stack trace for more details.",
  );
});

testStyledSystemMargin(
  (props) => (
    <ActionPopover data-role="action-popover-wrapper" {...props}>
      <ActionPopoverItem href="#" download>
        test download
      </ActionPopoverItem>
    </ActionPopover>
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

test("allows menus to size to their content rather than the trigger width", () => {
  render(
    <ActionPopover data-role="action-popover-wrapper">
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );

  expect(screen.getByTestId("action-popover-wrapper")).toHaveStyleRule(
    "max-width",
    "none",
    { modifier: '& [data-role="menu-wrapper"]' },
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
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
});

test("uses the default button text as its accessible name", () => {
  render(
    <ActionPopover>
      <ActionPopoverItem>example item</ActionPopoverItem>
    </ActionPopover>,
  );
  expect(screen.getByRole("button")).toHaveAccessibleName("Actions");
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

  expect(screen.getByRole("button", { name: "Actions" })).not.toHaveFocus();
});

test("disabled menu items cannot receive keyboard focus", async () => {
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

  expect(screen.getByRole("button", { name: "Actions" })).toHaveFocus();
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

test.each([false, true])(
  "clicking outside closes the menu once with submenu open=%s",
  async (openSubmenu) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    const onClose = jest.fn();

    render(
      <ActionPopover onClose={onClose}>
        <ActionPopoverItem disabled>disabled item</ActionPopoverItem>
        <ActionPopoverItem
          submenu={
            <>
              <ActionPopoverItem>submenu item</ActionPopoverItem>
            </>
          }
        >
          example item
        </ActionPopoverItem>
      </ActionPopover>,
    );

    await user.click(screen.getByRole("button"));
    if (openSubmenu) {
      await user.click(screen.getByRole("button", { name: "example item" }));
    }
    expect(
      screen.queryByRole("button", { name: "submenu item" }) !== null,
    ).toBe(openSubmenu);
    await user.click(document.body);

    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalledTimes(1);
  },
);

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

test("pressing a non-handled key when focused on the menu button does not open the menu", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem>example item 1</ActionPopoverItem>
      <ActionPopoverItem>example item 2</ActionPopoverItem>
    </ActionPopover>,
  );

  screen.getByRole("button").focus();
  await user.keyboard("a");

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("pressing Enter on an href menu item does not get default-prevented by the trigger keydown handler", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem href="/target-page">Go to target</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));

  const link = screen.getByRole("link", { name: "Go to target" });
  link.focus();

  const event = new KeyboardEvent("keydown", {
    key: "Enter",
    bubbles: true,
    cancelable: true,
  });

  fireEvent(link, event);

  expect(event.defaultPrevented).toBe(false);
});

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

  expect(screen.getByRole("button", { name: "Actions" })).toHaveFocus();
  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("pressing Escape in a fragment submenu closes both menus once and focuses the menu button", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onClose = jest.fn();
  render(
    <ActionPopover onClose={onClose}>
      <ActionPopoverItem
        submenu={
          <>
            <ActionPopoverItem>submenu item</ActionPopoverItem>
          </>
        }
      >
        parent item
      </ActionPopoverItem>
    </ActionPopover>,
  );

  const menuButton = screen.getByRole("button", { name: "Actions" });
  await user.click(menuButton);
  await user.click(screen.getByRole("button", { name: "parent item" }));
  expect(screen.getByRole("button", { name: "submenu item" })).toHaveFocus();

  await user.keyboard("{Escape}");

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  expect(menuButton).toHaveFocus();
  expect(onClose).toHaveBeenCalledTimes(1);
});

test("pressing the Down Arrow key stops on the last item", async () => {
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
  expect(screen.getByRole("button", { name: "example item 3" })).toHaveFocus();
});

test("pressing the Up Arrow key stops on the first item", async () => {
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
  expect(screen.getByRole("button", { name: "example item 1" })).toHaveFocus();

  await user.keyboard("{ArrowUp}");
  jest.runOnlyPendingTimers();
  expect(screen.getByRole("button", { name: "example item 1" })).toHaveFocus();

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

test("pressing Space activates the focused menu item", async () => {
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

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Actions" })).toHaveFocus();
});

test("moves focus to the first item that matches the typed character", async () => {
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

  await user.keyboard("p");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "Print Invoice" })).toHaveFocus();
});

test("moves focus to first match item if no matches after currently focused item", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem>Print PDF</ActionPopoverItem>
      <ActionPopoverItem>Email Invoice</ActionPopoverItem>
      <ActionPopoverItem>Print Invoice</ActionPopoverItem>
    </ActionPopover>,
  );
  await user.click(screen.getByRole("button"));
  jest.runOnlyPendingTimers();

  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowDown}");
  await user.keyboard("{ArrowDown}");
  await user.keyboard("p");
  jest.runOnlyPendingTimers();

  expect(screen.getByRole("button", { name: "Print PDF" })).toHaveFocus();
});

test("does not move focus if no items match the typed character", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem>Download PDF</ActionPopoverItem>
      <ActionPopoverItem>Email Invoice</ActionPopoverItem>
      <ActionPopoverItem>Print Invoice</ActionPopoverItem>
    </ActionPopover>,
  );
  await user.click(screen.getByRole("button"));
  jest.runOnlyPendingTimers();

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

  expect(screen.getByRole("button", { name: "Actions" })).toHaveFocus();
});

test.each([
  ["React.Fragment", React.Fragment],
  ["ActionPopoverMenu", ActionPopoverMenu],
])("renders and selects submenu items wrapped in %s", async (_, Menu) => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onClick = jest.fn();

  render(
    <ActionPopover>
      <ActionPopoverItem
        submenu={
          <Menu>
            <ActionPopoverItem icon="graph" onClick={onClick}>
              Sub Menu 1
            </ActionPopoverItem>
            <ActionPopoverDivider />
            <ActionPopoverItem disabled onClick={() => {}}>
              Sub Menu 2
            </ActionPopoverItem>
          </Menu>
        }
      >
        Parent item
      </ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button", { name: "Actions" }));
  await user.click(screen.getByRole("button", { name: "Parent item" }));

  const submenuItem = await screen.findByRole("button", { name: "Sub Menu 1" });
  expect(submenuItem).toBeVisible();
  expect(screen.getByRole("button", { name: "Sub Menu 2" })).toBeDisabled();

  await user.click(submenuItem);

  expect(onClick).toHaveBeenCalledTimes(1);
  expect(
    screen.queryByRole("button", { name: "Sub Menu 1" }),
  ).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Actions" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
});

test.each([
  ["React.Fragment", React.Fragment],
  ["ActionPopoverMenu", ActionPopoverMenu],
])(
  "an error is thrown if a %s submenu has incorrect children",
  async (_, Menu) => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    const globalConsoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    render(
      <ActionPopover>
        <ActionPopoverItem submenu={<Menu>invalid</Menu>}>
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
  },
);

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

test("the deprecated left horizontalAlignment renders PopoverMenu's leading icon", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover horizontalAlignment="left">
      <ActionPopoverItem icon="add">Apple</ActionPopoverItem>
    </ActionPopover>,
  );

  const menuButton = screen.getByRole("button");
  await user.click(menuButton);

  expect(await screen.findByTestId("button-icon-before")).toBeVisible();
});

test("the deprecated right horizontalAlignment has no effect", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover horizontalAlignment="right">
      <ActionPopoverItem icon="add">Apple</ActionPopoverItem>
    </ActionPopover>,
  );

  const menuButton = screen.getByRole("button");
  await user.click(menuButton);

  expect(await screen.findByTestId("button-icon-before")).toBeVisible();
});

test("a menu item's leading icon is hidden from assistive technologies", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem
        icon="favourite"
        submenu={
          <ActionPopoverMenu>
            <ActionPopoverItem>Apple</ActionPopoverItem>
          </ActionPopoverMenu>
        }
      >
        Fruits
      </ActionPopoverItem>
    </ActionPopover>,
  );

  const menuButton = screen.getByRole("button");
  await user.click(menuButton);

  const menuItem = await screen.findByRole("button", {
    name: "Fruits",
  });

  const itemIcon = within(menuItem).getByTestId("button-icon-before");

  expect(itemIcon).toHaveAttribute("aria-hidden", "true");
});

test("uses PopoverMenu's inline rendering inside FlatTable", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <FlatTable>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>
            <ActionPopover>
              <ActionPopoverItem>example item</ActionPopoverItem>
            </ActionPopover>
          </FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>,
  );

  await user.click(screen.getByRole("button"));

  expect(screen.queryByTestId("popup-backdrop")).not.toBeInTheDocument();
});

test("renders action popover menu under the action popover wrapper tree", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover data-role="anchor">
      <ActionPopoverItem>Item 1</ActionPopoverItem>
    </ActionPopover>,
  );

  await user.click(screen.getByRole("button"));
  const menu = await screen.findByRole("list");
  const anchor = screen.getByTestId("anchor");

  expect(anchor).toContainElement(menu);
});

test("renders the PopoverMenu inline within a TokensWrapper", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <TokensWrapper>
      <ActionPopover>
        <ActionPopoverItem>Item 1</ActionPopoverItem>
      </ActionPopover>
    </TokensWrapper>,
  );

  await user.click(screen.getByRole("button"));
  await screen.findByRole("list");

  const tokensWrapper = screen.getByTestId("tokens-wrapper");
  expect(tokensWrapper).toContainElement(screen.getByRole("list"));
  expect(
    screen.queryByTestId("carbon-portal-scoped-tokens-provider"),
  ).not.toBeInTheDocument();
});

test("closes the menu when an adaptive sidebar modal receives focus", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem>Item 1</ActionPopoverItem>
    </ActionPopover>,
  );

  const menuButton = screen.getByRole("button", { name: "Actions" });
  await user.click(menuButton);

  expect(await screen.findByRole("list")).toBeVisible();
  expect(menuButton).toHaveAttribute("aria-expanded", "true");

  fireEvent(document, new CustomEvent("adaptiveSidebarModalFocusIn"));

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
  expect(menuButton).toHaveAttribute("aria-expanded", "false");
});

test("closes the submenu when the user presses left arrow key and focus is in the submenu", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem
        submenu={
          <ActionPopoverMenu>
            <ActionPopoverItem>Submenu 1</ActionPopoverItem>
            <ActionPopoverItem>Submenu 2</ActionPopoverItem>
          </ActionPopoverMenu>
        }
      >
        Item 1
      </ActionPopoverItem>
    </ActionPopover>,
  );

  const menuButton = screen.getByRole("button");
  menuButton.focus();
  await user.keyboard("{ArrowDown}");
  jest.runOnlyPendingTimers();

  const submenuParent = screen.getByRole("button", { name: "Item 1" });
  expect(submenuParent).toHaveFocus();

  await user.keyboard("{ArrowRight}");
  const submenuItem = await screen.findByRole("button", { name: "Submenu 1" });

  expect(submenuItem).toHaveFocus();

  await user.keyboard("{ArrowLeft}");

  expect(submenuItem).not.toBeInTheDocument();
  expect(submenuParent).toHaveFocus();
  expect(submenuParent).toHaveAttribute("aria-expanded", "false");
});

test("closes an open submenu when another one is opened", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ActionPopover>
      <ActionPopoverItem
        submenu={
          <ActionPopoverMenu>
            <ActionPopoverItem>Submenu 1</ActionPopoverItem>
          </ActionPopoverMenu>
        }
      >
        Item 1
      </ActionPopoverItem>
      <ActionPopoverItem
        submenu={
          <ActionPopoverMenu>
            <ActionPopoverItem>Submenu 2</ActionPopoverItem>
          </ActionPopoverMenu>
        }
      >
        Item 2
      </ActionPopoverItem>
    </ActionPopover>,
  );

  const menuButton = screen.getByRole("button");
  await user.click(menuButton);

  const item1 = await screen.findByRole("button", { name: "Item 1" });
  await user.click(item1);
  const submenu1 = await screen.findByRole("button", { name: "Submenu 1" });

  expect(submenu1).toBeVisible();
  expect(item1).toHaveAttribute("aria-expanded", "true");

  const item2 = await screen.findByRole("button", { name: "Item 2" });
  await user.click(item2);
  const submenu2 = await screen.findByRole("button", { name: "Submenu 2" });

  expect(submenu2).toBeVisible();
  expect(submenu1).not.toBeInTheDocument();
  expect(item1).toHaveAttribute("aria-expanded", "false");
  expect(item2).toHaveAttribute("aria-expanded", "true");
});

test("blocks opening the menu via up arrow key when inside a Table", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <FlatTable>
      <FlatTableBody>
        <tr>
          <td>
            <ActionPopover>
              <ActionPopoverItem>Item 1</ActionPopoverItem>
            </ActionPopover>
          </td>
        </tr>
      </FlatTableBody>
    </FlatTable>,
  );

  const menuButton = screen.getByRole("button");
  menuButton.focus();
  await user.keyboard("{ArrowUp}");

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test("blocks opening the menu via down arrow key when inside a Table", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <FlatTable>
      <FlatTableBody>
        <tr>
          <td>
            <ActionPopover>
              <ActionPopoverItem>Item 1</ActionPopoverItem>
            </ActionPopover>
          </td>
        </tr>
      </FlatTableBody>
    </FlatTable>,
  );

  const menuButton = screen.getByRole("button");
  menuButton.focus();
  await user.keyboard("{ArrowDown}");

  expect(screen.queryByRole("list")).not.toBeInTheDocument();
});

test.each([
  ["default", undefined],
  ["string", "Actions"],
  ["nested text", <span key="label">Actions</span>],
])("does not set aria-label if button has %s label text", (_, buttonLabel) => {
  render(
    <ActionPopover buttonLabel={buttonLabel}>
      <ActionPopoverItem>Item 1</ActionPopoverItem>
    </ActionPopover>,
  );

  const menuButton = screen.getByRole("button", { name: "Actions" });
  expect(menuButton).not.toHaveAttribute("aria-label");
});

test("sets a default aria-label when the button label contains only an icon", () => {
  render(
    <ActionPopover buttonLabel={<Icon type="ellipsis_vertical" />}>
      <ActionPopoverItem>Item 1</ActionPopoverItem>
    </ActionPopover>,
  );

  expect(screen.getByRole("button", { name: "actions" })).toHaveAttribute(
    "aria-label",
    "actions",
  );
});

test.each([false, true])(
  "Escape closes the action popover before its parent dialog with submenu open=%s",
  async (openSubmenu) => {
    const onCancel = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <Dialog open title="Parent dialog" onCancel={onCancel}>
        <ActionPopover>
          <ActionPopoverItem
            submenu={
              <>
                <ActionPopoverItem>Submenu item</ActionPopoverItem>
              </>
            }
          >
            Item 1
          </ActionPopoverItem>
        </ActionPopover>
      </Dialog>,
    );

    act(() => {
      jest.runOnlyPendingTimers();
    });

    const menuButton = screen.getByRole("button", { name: "Actions" });
    await user.click(menuButton);
    act(() => {
      jest.runOnlyPendingTimers();
    });

    expect(screen.getByRole("button", { name: /Item 1/ })).toHaveFocus();
    expect(menuButton).toHaveAttribute("aria-expanded", "true");
    if (openSubmenu) {
      await user.click(screen.getByRole("button", { name: /Item 1/ }));
    }
    expect(
      screen.queryByRole("button", { name: "Submenu item" }) !== null,
    ).toBe(openSubmenu);

    await user.keyboard("{Escape}");

    expect(onCancel).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog", { name: /Parent dialog/ })).toBeVisible();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(menuButton).toHaveFocus();

    await user.keyboard("{Escape}");

    expect(onCancel).toHaveBeenCalledTimes(1);
  },
);
