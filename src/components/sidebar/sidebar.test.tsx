import React from "react";
import {
  act,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { sageTheme } from "../../style/themes";
import {
  testStyledSystemPadding,
  testStyledSystemWidth,
} from "../../__spec_helper__/__internal__/test-utils";
import CarbonProvider from "../carbon-provider";

import Sidebar, { SidebarProps } from ".";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("sidebar element has aria-modal attribute set to true", () => {
  render(
    <CarbonProvider>
      <Sidebar open header="My sidebar" />
    </CarbonProvider>,
  );

  expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "true");
});

test("sidebar has aria-modal attribute set to false when enableBackgroundUI is true", () => {
  render(
    <CarbonProvider>
      <Sidebar open header="My sidebar" enableBackgroundUI />
    </CarbonProvider>,
  );

  expect(screen.getByRole("dialog")).toHaveAttribute("aria-modal", "false");
});

test("renders with header when prop is provided", () => {
  render(<Sidebar open header={<h1>My sidebar</h1>} />);

  expect(
    screen.getByRole("heading", { level: 1, name: "My sidebar" }),
  ).toBeVisible();
});

test("sidebar uses header prop as accessible name when an HTML element is provided as header", () => {
  render(<Sidebar open header={<h1>My sidebar</h1>} />);

  expect(screen.getByRole("dialog")).toHaveAccessibleName("My sidebar");
});

test("sidebar uses header prop as accessible name when a string is provided", () => {
  render(<Sidebar open header="My sidebar" />);

  expect(screen.getByRole("dialog")).toHaveAccessibleName("My sidebar");
});

test("sidebar uses aria-labelledby prop as accessible name when passed", () => {
  render(
    <Sidebar open aria-labelledby="my-heading">
      <h1 id="my-heading">My sidebar</h1>
    </Sidebar>,
  );

  expect(screen.getByRole("dialog")).toHaveAccessibleName("My sidebar");
});

test("sidebar uses aria-label prop as accessible name when passed", () => {
  render(<Sidebar open aria-label="My sidebar" />);

  expect(screen.getByRole("dialog")).toHaveAccessibleName("My sidebar");
});

test("sidebar uses aria-describedby prop as accessible description when passed", () => {
  render(
    <Sidebar open header="My sidebar" aria-describedby="my-description">
      <p id="my-description">My shiny sidebar</p>
    </Sidebar>,
  );

  expect(screen.getByRole("dialog")).toHaveAccessibleDescription(
    "My shiny sidebar",
  );
});

test("renders close button when onCancel prop is set", () => {
  render(<Sidebar open header="My sidebar" onCancel={() => {}} />);

  expect(screen.getByRole("button", { name: "Close" })).toBeVisible();
});

describe("closing behaviour", () => {
  const MockApp = ({ onCancel }: Pick<SidebarProps, "onCancel">) => {
    const [open, setOpen] = React.useState(true);
    return (
      <Sidebar
        open={open}
        header="My sidebar"
        onCancel={(ev) => {
          onCancel?.(ev);
          setOpen(false);
        }}
      />
    );
  };

  test("when close button is clicked, sidebar closes and onCancel callback is executed", async () => {
    const onCancel = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <MockApp onCancel={onCancel} />
      </CarbonProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Close" }));
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));

    await waitFor(() => expect(onCancel).toHaveBeenCalledTimes(1));
  });

  test("when Escape key is pressed, sidebar closes and onCancel callback is executed", async () => {
    const onCancel = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <MockApp onCancel={onCancel} />
      </CarbonProvider>,
    );

    await user.keyboard("{Escape}");

    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test("when close button is focused and Enter key is pressed, sidebar closes and onCancel callback is executed", async () => {
    const onCancel = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <MockApp onCancel={onCancel} />
      </CarbonProvider>,
    );

    act(() => {
      screen.getByRole("button", { name: "Close" }).focus();
    });
    await user.keyboard("{Enter}");

    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test("when close button is focused and Space key is pressed, sidebar closes and onCancel callback is executed", async () => {
    const onCancel = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <MockApp onCancel={onCancel} />
      </CarbonProvider>,
    );

    act(() => {
      screen.getByRole("button", { name: "Close" }).focus();
    });
    await user.keyboard("{ }");

    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test("when close button is focused and a non-Space/Enter key is pressed, sidebar remains open and onCancel callback is not executed", async () => {
    const onCancel = jest.fn();
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <MockApp onCancel={onCancel} />
      </CarbonProvider>,
    );

    act(() => {
      screen.getByRole("button", { name: "Close" }).focus();
    });
    await user.keyboard("{a}");

    expect(screen.getByRole("dialog")).toBeVisible();
    expect(onCancel).not.toHaveBeenCalled();
  });

  test("focus returns to last focused element when sidebar is closed", async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <CarbonProvider>
        <MockApp onCancel={() => {}} />
      </CarbonProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Close" }));

    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    expect(document.body).toHaveFocus();
  });
});

test("focus is trapped within sidebar when opened", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <CarbonProvider>
      <Sidebar open header="My sidebar">
        <button type="button">First</button>
        <button type="button">Second</button>
      </Sidebar>
    </CarbonProvider>,
  );
  const firstButton = screen.getByRole("button", { name: "First" });
  act(() => {
    firstButton.focus();
  });
  await user.tab();

  expect(screen.getByRole("button", { name: "Second" })).toHaveFocus();

  await user.tab();

  expect(screen.getByRole("button", { name: "First" })).toHaveFocus();
});

test("focus is not trapped within sidebar when enableBackgroundUI is true", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <CarbonProvider>
      <Sidebar open header="My sidebar" enableBackgroundUI>
        <button type="button">First</button>
        <button type="button">Second</button>
      </Sidebar>
    </CarbonProvider>,
  );
  const firstButton = screen.getByRole("button", { name: "First" });
  act(() => {
    firstButton.focus();
  });
  await user.tab();

  expect(screen.getByRole("button", { name: "Second" })).toHaveFocus();

  await user.tab();

  expect(firstButton).not.toHaveFocus();
});

test("can refocus sidebar container using a forwarded ref", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const MockApp = () => {
    const ref = React.useRef<HTMLDivElement | null>(null);
    return (
      <Sidebar open header="My sidebar" ref={ref}>
        <button type="button" onClick={() => ref.current?.focus()}>
          Refocus sidebar
        </button>
      </Sidebar>
    );
  };
  render(
    <CarbonProvider>
      <MockApp />
    </CarbonProvider>,
  );

  await user.click(screen.getByRole("button", { name: "Refocus sidebar" }));

  await waitFor(() => {
    expect(screen.getByRole("dialog")).toHaveFocus();
  });
});

test("calls a forwarded ref callback on render with sidebar element as argument", () => {
  const ref = jest.fn();
  render(<Sidebar open header="My sidebar" ref={ref} />);

  expect(ref).toHaveBeenNthCalledWith(1, screen.getByRole("dialog"));
});

test("sidebar element has correct data-* tags when provided", () => {
  render(<Sidebar open data-element="foo" data-role="bar" />);

  const sidebar = screen.getByRole("dialog");
  expect(sidebar).toHaveAttribute("data-element", "foo");
  expect(sidebar).toHaveAttribute("data-role", "bar");
});

test("ensures overflowing content is scrollable", () => {
  render(<Sidebar open />);

  const sidebarContent = screen.getByTestId("sidebar-content");
  expect(sidebarContent).toHaveStyle("overflow-y: auto");
});

testStyledSystemWidth(
  (props) => (
    <CarbonProvider theme={sageTheme}>
      <Sidebar open {...props}>
        Content
      </Sidebar>
    </CarbonProvider>
  ),
  () => screen.getByRole("dialog"),
);

testStyledSystemPadding(
  (props) => (
    <CarbonProvider theme={sageTheme}>
      <Sidebar open {...props}>
        Content
      </Sidebar>
    </CarbonProvider>
  ),
  () => {
    const sidebars = screen.getAllByTestId("sidebar-content");

    // the use of Portal means there is two instances of the sidebar content
    return sidebars[sidebars.length - 1];
  },
);
