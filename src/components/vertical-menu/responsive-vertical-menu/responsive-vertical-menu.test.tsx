/* eslint-disable no-console */
import React, { act } from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import {
  ResponsiveVerticalMenu,
  ResponsiveVerticalMenuItem,
  ResponsiveVerticalMenuProvider,
} from ".";
import useIsAboveBreakpoint from "../../../hooks/__internal__/useIsAboveBreakpoint";
import useMediaQuery from "../../../hooks/useMediaQuery";

jest.mock("../../../hooks/__internal__/useIsAboveBreakpoint");
jest.mock("../../../hooks/useMediaQuery");

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;
const mockUseIsAboveBreakpoint = useIsAboveBreakpoint as jest.MockedFunction<
  typeof useIsAboveBreakpoint
>;

const CustomSVG = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24.7358 0H3.26418C1.46142 0 0 1.46142 0 3.26418V24.7358C0 26.5386 1.46142 28 3.26418 28H24.7358C26.5386 28 28 26.5386 28 24.7358V3.26418C28 1.46142 26.5386 0 24.7358 0Z"
      fill="black"
    />
    <path
      d="M5.92137 15.8727C6.95575 15.8727 7.79427 15.0341 7.79427 13.9997C7.79427 12.9654 6.95575 12.1268 5.92137 12.1268C4.88699 12.1268 4.04846 12.9654 4.04846 13.9997C4.04846 15.0341 4.88699 15.8727 5.92137 15.8727Z"
      fill="white"
    />
    <path
      d="M22.0786 15.8727C23.113 15.8727 23.9515 15.0341 23.9515 13.9997C23.9515 12.9654 23.113 12.1268 22.0786 12.1268C21.0442 12.1268 20.2057 12.9654 20.2057 13.9997C20.2057 15.0341 21.0442 15.8727 22.0786 15.8727Z"
      fill="white"
    />
    <path
      d="M8.2874 21.5855C9.32178 21.5855 10.1603 20.747 10.1603 19.7126C10.1603 18.6782 9.32178 17.8397 8.2874 17.8397C7.25303 17.8397 6.4145 18.6782 6.4145 19.7126C6.4145 20.747 7.25303 21.5855 8.2874 21.5855Z"
      fill="white"
    />
    <path
      d="M19.7126 10.1603C20.7469 10.1603 21.5855 9.32182 21.5855 8.28744C21.5855 7.25306 20.7469 6.41453 19.7126 6.41453C18.6782 6.41453 17.8397 7.25306 17.8397 8.28744C17.8397 9.32182 18.6782 10.1603 19.7126 10.1603Z"
      fill="white"
    />
    <path
      d="M13.9997 23.9515C15.0341 23.9515 15.8726 23.113 15.8726 22.0786C15.8726 21.0443 15.0341 20.2057 13.9997 20.2057C12.9653 20.2057 12.1268 21.0443 12.1268 22.0786C12.1268 23.113 12.9653 23.9515 13.9997 23.9515Z"
      fill="white"
    />
    <path
      d="M13.9997 7.79427C15.0341 7.79427 15.8726 6.95575 15.8726 5.92137C15.8726 4.88699 15.0341 4.04846 13.9997 4.04846C12.9653 4.04846 12.1268 4.88699 12.1268 5.92137C12.1268 6.95575 12.9653 7.79427 13.9997 7.79427Z"
      fill="white"
    />
    <path
      d="M19.7126 21.5855C20.7469 21.5855 21.5855 20.747 21.5855 19.7126C21.5855 18.6782 20.7469 17.8397 19.7126 17.8397C18.6782 17.8397 17.8397 18.6782 17.8397 19.7126C17.8397 20.747 18.6782 21.5855 19.7126 21.5855Z"
      fill="white"
    />
    <path
      d="M8.2874 10.1603C9.32178 10.1603 10.1603 9.32182 10.1603 8.28744C10.1603 7.25306 9.32178 6.41453 8.2874 6.41453C7.25303 6.41453 6.4145 7.25306 6.4145 8.28744C6.4145 9.32182 7.25303 10.1603 8.2874 10.1603Z"
      fill="white"
    />
    <path
      d="M13.9997 15.8726C15.0341 15.8726 15.8726 15.0341 15.8726 13.9997C15.8726 12.9654 15.0341 12.1268 13.9997 12.1268C12.9654 12.1268 12.1268 12.9654 12.1268 13.9997C12.1268 15.0341 12.9654 15.8726 13.9997 15.8726Z"
      fill="#00D639"
    />
  </svg>
);

beforeEach(() => {
  jest.useFakeTimers();
  mockUseMediaQuery.mockReturnValue(true);
  mockUseIsAboveBreakpoint.mockReturnValue(true);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("renders correctly", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem id="menu-item-1" label="Menu Item 1" />
        <ResponsiveVerticalMenuItem id="menu-item-2" label="Menu Item 2" />
        <ResponsiveVerticalMenuItem id="menu-item-3" label="Menu Item 3" />
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  expect(launcherButton).toBeInTheDocument();
  await user.click(launcherButton);

  expect(screen.getByText("Menu Item 1")).toBeInTheDocument();
  expect(screen.getByText("Menu Item 2")).toBeInTheDocument();
  expect(screen.getByText("Menu Item 3")).toBeInTheDocument();
});

test("throws if not wrapped in provider", async () => {
  const originalError = console.error;
  console.error = jest.fn();

  expect(() => {
    render(<ResponsiveVerticalMenu />);
  }).toThrow(
    "useResponsiveVerticalMenu must be used within a ResponsiveVerticalMenuProvider",
  );

  console.error = originalError;
});

test("items without children are rendered as anchor links", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          data-role="menu-item-1"
          id="menu-item-1"
          label="Menu Item 1"
          href="https://example.com"
        />
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  await user.click(launcherButton);

  const menuItem = screen.getByTestId("menu-item-1");

  expect(menuItem).toHaveAttribute("href", "https://example.com");
});

test("items with children are rendered as buttons", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          data-role="menu-item-1"
          id="menu-item-1"
          label="Menu Item 1"
        >
          <ResponsiveVerticalMenuItem
            data-role="menu-item-2"
            id="menu-item-2"
            label="Menu Item 2"
          />
        </ResponsiveVerticalMenuItem>
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  await user.click(launcherButton);

  const menuItem = screen.getByTestId("menu-item-1");

  expect(menuItem).not.toHaveAttribute("href");
  expect(menuItem.nodeName.toLowerCase()).toBe("button");
});

test("top-level items with children are expanded and collapsed on click", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          data-role="menu-item-1"
          id="menu-item-1"
          label="Menu Item 1"
        >
          <ResponsiveVerticalMenuItem
            data-role="menu-item-2"
            id="menu-item-2"
            label="Menu Item 2"
          />
        </ResponsiveVerticalMenuItem>
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  expect(screen.queryByText("Menu Item 2")).not.toBeInTheDocument();

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  await user.click(launcherButton);

  const menuItem = screen.getByTestId("menu-item-1");
  await user.click(menuItem);

  expect(screen.getByText("Menu Item 2")).toBeInTheDocument();

  await user.click(menuItem);

  expect(screen.queryByText("Menu Item 2")).not.toBeInTheDocument();
});

[
  { key: "Enter", value: "{Enter}" },
  { key: "Space", value: " " },
].forEach(({ key, value }) => {
  test(`top-level items with children are expanded and collapsed when ${key} key is pressed`, async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ResponsiveVerticalMenuProvider>
        <ResponsiveVerticalMenu>
          <ResponsiveVerticalMenuItem
            data-role="menu-item-1"
            id="menu-item-1"
            label="Menu Item 1"
          >
            <ResponsiveVerticalMenuItem
              data-role="menu-item-2"
              id="menu-item-2"
              label="Menu Item 2"
            />
          </ResponsiveVerticalMenuItem>
        </ResponsiveVerticalMenu>
      </ResponsiveVerticalMenuProvider>,
    );

    expect(screen.queryByText("Menu Item 2")).not.toBeInTheDocument();

    const launcherButton = screen.getByTestId(
      "responsive-vertical-menu-launcher",
    );
    await user.click(launcherButton);

    const menuItem = screen.getByTestId("menu-item-1");

    act(() => {
      menuItem.focus();
    });

    await user.keyboard(value);

    expect(screen.getByText("Menu Item 2")).toBeInTheDocument();

    await user.keyboard(value);

    expect(screen.queryByText("Menu Item 2")).not.toBeInTheDocument();
  });
});

test("secondary-level items with children are expanded and collapsed on click", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          data-role="menu-item-1"
          id="menu-item-1"
          label="Menu Item 1"
        >
          <ResponsiveVerticalMenuItem
            data-role="menu-item-2"
            id="menu-item-2"
            label="Menu Item 2"
          >
            <ResponsiveVerticalMenuItem
              data-role="menu-item-3"
              id="menu-item-3"
              label="Menu Item 3"
            />
          </ResponsiveVerticalMenuItem>
        </ResponsiveVerticalMenuItem>
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  expect(screen.queryByText("Menu Item 3")).not.toBeInTheDocument();

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  await user.click(launcherButton);

  const menuItem = screen.getByTestId("menu-item-1");
  await user.click(menuItem);
  const menuItem2 = screen.getByTestId("menu-item-2");
  await user.click(menuItem2);

  expect(screen.getByText("Menu Item 3")).toBeInTheDocument();

  await user.click(menuItem2);

  expect(screen.queryByText("Menu Item 3")).not.toBeInTheDocument();
});

[
  { key: "Enter", value: "{Enter}" },
  { key: "Space", value: " " },
].forEach(({ key, value }) => {
  test(`secondary-level items with children are expanded and collapsed when ${key} key is pressed`, async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ResponsiveVerticalMenuProvider>
        <ResponsiveVerticalMenu>
          <ResponsiveVerticalMenuItem
            data-role="menu-item-1"
            id="menu-item-1"
            label="Menu Item 1"
          >
            <ResponsiveVerticalMenuItem
              data-role="menu-item-2"
              id="menu-item-2"
              label="Menu Item 2"
            >
              <ResponsiveVerticalMenuItem
                data-role="menu-item-3"
                id="menu-item-3"
                label="Menu Item 3"
              />
            </ResponsiveVerticalMenuItem>
          </ResponsiveVerticalMenuItem>
        </ResponsiveVerticalMenu>
      </ResponsiveVerticalMenuProvider>,
    );

    expect(screen.queryByText("Menu Item 3")).not.toBeInTheDocument();

    const launcherButton = screen.getByTestId(
      "responsive-vertical-menu-launcher",
    );
    await user.click(launcherButton);
    const menuItem = screen.getByTestId("menu-item-1");
    await user.click(menuItem);

    const menuItem2 = screen.getByTestId("menu-item-2");

    act(() => {
      menuItem2.focus();
    });

    await user.keyboard(value);

    expect(screen.getByText("Menu Item 3")).toBeInTheDocument();

    await user.keyboard(value);

    expect(screen.queryByText("Menu Item 3")).not.toBeInTheDocument();
  });
});

test("items render with a Carbon icon", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          icon="home"
          data-role="menu-item-1"
          id="menu-item-1"
          label="Menu Item 1"
        />
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  await user.click(launcherButton);

  const icon = screen.getByTestId("responsive-vertical-menu-icon");
  expect(icon).toBeInTheDocument();
});

test("items render with a custom icon", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          customIcon={<CustomSVG />}
          data-role="menu-item-1"
          id="menu-item-1"
          label="Menu Item 1"
        />
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  await user.click(launcherButton);

  const icon = screen.getByTestId("responsive-vertical-menu-custom-icon");
  expect(icon).toBeInTheDocument();
});

test("items render with a custom icon if both customIcon and icon are provided", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          customIcon={<CustomSVG />}
          data-role="menu-item-1"
          icon="home"
          id="menu-item-1"
          label="Menu Item 1"
        />
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  await user.click(launcherButton);
  expect(launcherButton).toBeInTheDocument();

  const customIcon = screen.getByTestId("responsive-vertical-menu-custom-icon");
  expect(customIcon).toBeInTheDocument();

  const icon = screen.queryByTestId("responsive-vertical-menu-icon");
  expect(icon).not.toBeInTheDocument();
});

test("closes menu when Escape key is pressed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem id="menu-item-1" label="Menu Item 1" />
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  expect(launcherButton).toBeInTheDocument();
  await user.click(launcherButton);

  expect(screen.getByText("Menu Item 1")).toBeInTheDocument();

  await user.keyboard("{Escape}");

  expect(screen.queryByText("Menu Item 1")).not.toBeInTheDocument();
});

test("closes menu when focus is lost", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          data-role="menu-item-1"
          id="menu-item-1"
          label="Menu Item 1"
        />
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  expect(launcherButton).toBeInTheDocument();
  await user.click(launcherButton);

  const menuItem = screen.getByTestId("menu-item-1");
  expect(menuItem).toBeInTheDocument();

  await user.tab();
  expect(launcherButton).not.toHaveFocus();
  expect(menuItem).toHaveFocus();

  await user.tab();
  expect(menuItem).not.toHaveFocus();

  await waitFor(() => {
    expect(screen.queryByText("Menu Item 1")).not.toBeInTheDocument();
  });
});

test("closes menu when the user clicks outside of the menu", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem id="menu-item-1" label="Menu Item 1" />
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  expect(launcherButton).toBeInTheDocument();
  await user.click(launcherButton);

  expect(screen.getByText("Menu Item 1")).toBeInTheDocument();

  await user.click(document.body);

  expect(screen.queryByText("Menu Item 1")).not.toBeInTheDocument();
});

test("does not close the menu when the user clicks outside of the menu but responsive mode is active", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  mockUseIsAboveBreakpoint.mockReturnValue(false);

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem id="menu-item-1" label="Menu Item 1" />
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );
  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  expect(launcherButton).toBeInTheDocument();
  await user.click(launcherButton);

  expect(screen.getByText("Menu Item 1")).toBeInTheDocument();

  await user.click(document.body);

  expect(screen.getByText("Menu Item 1")).toBeInTheDocument();
});

test("closes menu when the user clicks the close button in responsive mode", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  mockUseIsAboveBreakpoint.mockReturnValue(false);

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem id="menu-item-1" label="Menu Item 1" />
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  expect(launcherButton).toBeInTheDocument();
  await user.click(launcherButton);

  expect(screen.getByText("Menu Item 1")).toBeInTheDocument();

  const modalCloseButton = screen.getByTestId("responsive-vertical-menu-close");
  await user.click(modalCloseButton);

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(screen.queryByText("Menu Item 1")).not.toBeInTheDocument();
});

test("has the correct styling when interacting", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          data-role="menu-item-1"
          id="menu-item-1"
          label="Menu Item 1"
        >
          <ResponsiveVerticalMenuItem
            data-role="menu-item-2"
            id="menu-item-2"
            label="Menu Item 2"
          >
            <ResponsiveVerticalMenuItem
              data-role="menu-item-3"
              id="menu-item-3"
              label="Menu Item 3"
            />
          </ResponsiveVerticalMenuItem>
        </ResponsiveVerticalMenuItem>
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  expect(launcherButton).toBeInTheDocument();
  await user.click(launcherButton);

  const menuItem = screen.getByTestId("menu-item-1");
  const expansionIcon = within(menuItem).getByTestId(
    "responsive-vertical-menu-expander-icon",
  );
  expect(expansionIcon).toHaveStyleRule("rotate", "0deg");
  expect(expansionIcon).toHaveStyleRule("transition", "rotate 0.2s ease-in");
  expect(menuItem).toHaveStyleRule("background-color", "transparent");

  await user.click(menuItem);

  expect(expansionIcon).toHaveStyleRule("transition", "rotate 0.2s ease-out");
  expect(menuItem).toHaveStyleRule("background-color", "var(--colorsGray850)");

  const menuItem2 = screen.getByTestId("menu-item-2");
  const expansionIcon2 = within(menuItem2).getByTestId(
    "responsive-vertical-menu-expander-icon",
  );
  expect(expansionIcon2).toHaveStyleRule("rotate", "0deg");
  expect(expansionIcon2).toHaveStyleRule("transition", "rotate 0.2s ease-in");
  expect(menuItem2).toHaveStyleRule("background-color", "transparent");

  await user.click(menuItem2);

  expect(expansionIcon2).toHaveStyleRule("transition", "rotate 0.2s ease-out");
  expect(menuItem2).toHaveStyleRule("background-color", "transparent");
});

test("has the correct styling when interacting and responsive", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  mockUseIsAboveBreakpoint.mockReturnValue(false);

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          data-role="menu-item-1"
          id="menu-item-1"
          label="Menu Item 1"
        >
          <ResponsiveVerticalMenuItem
            data-role="menu-item-2"
            id="menu-item-2"
            label="Menu Item 2"
          >
            <ResponsiveVerticalMenuItem
              data-role="menu-item-3"
              id="menu-item-3"
              label="Menu Item 3"
            />
          </ResponsiveVerticalMenuItem>
          <ResponsiveVerticalMenuItem
            data-role="menu-item-4"
            id="menu-item-4"
            label="Menu Item 4"
          />
        </ResponsiveVerticalMenuItem>
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  expect(launcherButton).toBeInTheDocument();
  await user.click(launcherButton);

  const menuItem = screen.getByTestId("menu-item-1");
  const expansionIcon = within(menuItem).getByTestId(
    "responsive-vertical-menu-expander-icon",
  );
  expect(expansionIcon).toHaveStyleRule("transition", "rotate 0.2s ease-in");
  expect(menuItem).toHaveStyleRule("background-color", "transparent");

  await user.click(menuItem);

  expect(expansionIcon).toHaveStyleRule("transition", "rotate 0.2s ease-out");
  expect(menuItem).toHaveStyleRule("background-color", "transparent");

  const menuItem2 = screen.getByTestId("menu-item-2");
  const expansionIcon2 = within(menuItem2).getByTestId(
    "responsive-vertical-menu-expander-icon",
  );
  expect(expansionIcon2).toHaveStyleRule("transition", "rotate 0.2s ease-in");
  expect(menuItem2).toHaveStyleRule("background-color", "transparent");

  await user.click(menuItem2);

  expect(expansionIcon2).toHaveStyleRule("transition", "rotate 0.2s ease-out");
  expect(menuItem2).toHaveStyleRule("background-color", "transparent");

  const nestedMenu = screen.getByTestId("menu-item-2-nested-menu");
  expect(nestedMenu).toHaveStyleRule("width", "90%");
  expect(nestedMenu).toHaveStyleRule("margin-left", "16px", {
    modifier: "a",
  });
  expect(nestedMenu).toHaveStyleRule("margin-right", "16px", {
    modifier: "a",
  });
});

test("respects reduced motion and has the correct styling when interacting", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  mockUseMediaQuery.mockReturnValue(false);

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          data-role="menu-item-1"
          id="menu-item-1"
          label="Menu Item 1"
        >
          <ResponsiveVerticalMenuItem
            data-role="menu-item-2"
            id="menu-item-2"
            label="Menu Item 2"
          >
            <ResponsiveVerticalMenuItem
              data-role="menu-item-3"
              id="menu-item-3"
              label="Menu Item 3"
            />
          </ResponsiveVerticalMenuItem>
        </ResponsiveVerticalMenuItem>
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  expect(launcherButton).toBeInTheDocument();
  await user.click(launcherButton);

  const menuItem = screen.getByTestId("menu-item-1");
  const expansionIcon = within(menuItem).getByTestId(
    "responsive-vertical-menu-expander-icon",
  );
  expect(expansionIcon).toHaveStyleRule("rotate", "0deg");
  expect(expansionIcon).toHaveStyleRule("transition", "rotate 0 ease-in");
  expect(menuItem).toHaveStyleRule("background-color", "transparent");

  await user.click(menuItem);

  expect(expansionIcon).toHaveStyleRule("transition", "rotate 0 ease-out");
  expect(menuItem).toHaveStyleRule("background-color", "var(--colorsGray850)");

  const menuItem2 = screen.getByTestId("menu-item-2");
  const expansionIcon2 = within(menuItem2).getByTestId(
    "responsive-vertical-menu-expander-icon",
  );
  expect(expansionIcon2).toHaveStyleRule("rotate", "0deg");
  expect(expansionIcon2).toHaveStyleRule("transition", "rotate 0 ease-in");
  expect(menuItem2).toHaveStyleRule("background-color", "transparent");

  await user.click(menuItem2);

  expect(expansionIcon2).toHaveStyleRule("transition", "rotate 0 ease-out");
  expect(menuItem2).toHaveStyleRule("background-color", "transparent");
});

test("allows for full keyboard navigation of primary menus", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  mockUseIsAboveBreakpoint.mockReturnValue(true);

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          data-role="menu-item-1"
          id="menu-item-1"
          label="Menu Item 1"
        >
          <ResponsiveVerticalMenuItem
            data-role="menu-item-4"
            id="menu-item-4"
            label="Menu Item 4"
          />
        </ResponsiveVerticalMenuItem>

        <ResponsiveVerticalMenuItem
          data-role="menu-item-2"
          id="menu-item-2"
          label="Menu Item 2"
        />

        <ResponsiveVerticalMenuItem
          data-role="menu-item-3"
          id="menu-item-3"
          label="Menu Item 3"
        />
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  expect(launcherButton).toBeInTheDocument();
  await launcherButton.focus();
  await user.keyboard("{Enter}");

  await user.tab();
  const menuItem = screen.getByTestId("menu-item-1");
  expect(menuItem).toHaveFocus();

  await user.tab();
  const menuItem2 = screen.getByTestId("menu-item-2");
  expect(menuItem).not.toHaveFocus();
  expect(menuItem2).toHaveFocus();

  await user.tab();
  const menuItem3 = screen.getByTestId("menu-item-3");
  expect(menuItem2).not.toHaveFocus();
  expect(menuItem3).toHaveFocus();

  await user.tab();
  expect(menuItem3).not.toHaveFocus();

  await waitFor(() => {
    expect(menuItem).not.toBeInTheDocument();
  });
});

test("allows for full keyboard navigation of secondary menus", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  mockUseIsAboveBreakpoint.mockReturnValue(true);

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          data-role="menu-item-1"
          id="menu-item-1"
          label="Menu Item 1"
        >
          <ResponsiveVerticalMenuItem
            data-role="menu-item-4"
            id="menu-item-4"
            label="Menu Item 4"
          />
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuItem
          data-role="menu-item-2"
          id="menu-item-2"
          label="Menu Item 2"
        />

        <ResponsiveVerticalMenuItem
          data-role="menu-item-3"
          id="menu-item-3"
          label="Menu Item 3"
        />
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  expect(launcherButton).toBeInTheDocument();
  await launcherButton.focus();
  await user.keyboard("{Enter}");

  await user.tab();
  const menuItem = screen.getByTestId("menu-item-1");
  expect(menuItem).toHaveFocus();
  await user.keyboard("{Enter}");

  const menuItem4 = screen.getByTestId("menu-item-4");
  expect(menuItem4).toBeInTheDocument();
  await user.tab();
  expect(menuItem4).toHaveFocus();
  await user.tab();
  expect(menuItem).toHaveFocus();
  await user.tab();
  expect(menuItem4).toHaveFocus();

  await user.tab({ shift: true });
  expect(menuItem).toHaveFocus();
  await user.tab({ shift: true });
  expect(menuItem4).toHaveFocus();
});

test("allows for full keyboard navigation of tertiary menus", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  mockUseIsAboveBreakpoint.mockReturnValue(true);

  render(
    <ResponsiveVerticalMenuProvider>
      <ResponsiveVerticalMenu>
        <ResponsiveVerticalMenuItem
          data-role="menu-item-1"
          id="menu-item-1"
          label="Menu Item 1"
        >
          <ResponsiveVerticalMenuItem
            data-role="menu-item-4"
            id="menu-item-4"
            label="Menu Item 4"
          >
            <ResponsiveVerticalMenuItem
              data-role="menu-item-5"
              id="menu-item-5"
              label="Menu Item 5"
            />
          </ResponsiveVerticalMenuItem>
        </ResponsiveVerticalMenuItem>
        <ResponsiveVerticalMenuItem
          data-role="menu-item-2"
          id="menu-item-2"
          label="Menu Item 2"
        />

        <ResponsiveVerticalMenuItem
          data-role="menu-item-3"
          id="menu-item-3"
          label="Menu Item 3"
        />
      </ResponsiveVerticalMenu>
    </ResponsiveVerticalMenuProvider>,
  );

  const launcherButton = screen.getByTestId(
    "responsive-vertical-menu-launcher",
  );
  expect(launcherButton).toBeInTheDocument();
  await launcherButton.focus();
  await user.keyboard("{Enter}");

  await user.tab();
  const menuItem = screen.getByTestId("menu-item-1");
  expect(menuItem).toHaveFocus();
  await user.keyboard("{Enter}");

  const menuItem4 = screen.getByTestId("menu-item-4");
  expect(menuItem4).toBeInTheDocument();
  await user.tab();
  expect(menuItem4).toHaveFocus();
  await user.keyboard("{Enter}");

  await user.tab();
  const menuItem5 = screen.getByTestId("menu-item-5");
  expect(menuItem5).toHaveFocus();
  await user.tab();
  expect(menuItem).toHaveFocus();
  await user.tab();
  expect(menuItem4).toHaveFocus();
  await user.tab();
  expect(menuItem5).toHaveFocus();

  await user.tab({ shift: true });
  expect(menuItem4).toHaveFocus();
  await user.tab({ shift: true });
  expect(menuItem).toHaveFocus();
});

["Enter", "Space"].forEach((key) => {
  test(`anchor links are activated when focused and ${key} key is pressed`, async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

    render(
      <ResponsiveVerticalMenuProvider>
        <ResponsiveVerticalMenu>
          <ResponsiveVerticalMenuItem
            data-role="menu-item-1"
            id="menu-item-1"
            label="Menu Item 1"
            href="https://example.com"
          />
        </ResponsiveVerticalMenu>
      </ResponsiveVerticalMenuProvider>,
    );

    const launcherButton = screen.getByTestId(
      "responsive-vertical-menu-launcher",
    );
    await user.click(launcherButton);
    expect(screen.getByRole("link", { name: "Menu Item 1" })).toHaveAttribute(
      "href",
      "https://example.com",
    );
  });
});
