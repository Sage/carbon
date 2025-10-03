import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Drawer from ".";
import { assertDeprecationWarning } from "../../__spec_helper__/__internal__/test-utils";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("displays a deprecation warning if `animationDuration` is used", () => {
  assertDeprecationWarning({
    component: <Drawer animationDuration={"100"}>Foobar</Drawer>,
    deprecationMessage:
      "The `animationDuration` prop in `Drawer` is deprecated and will soon be removed.",
  });
});

test("displays a deprecation warning if `backgroundColor` is used", () => {
  assertDeprecationWarning({
    component: <Drawer backgroundColor={"red"}>Foobar</Drawer>,
    deprecationMessage:
      "The `backgroundColor` prop in `Drawer` is deprecated and will soon be removed. Only white will be supported.",
  });
});

test("displays a deprecation warning if `showControls` is used", () => {
  assertDeprecationWarning({
    component: <Drawer showControls>Foobar</Drawer>,
    deprecationMessage:
      "The `showControls` prop in `Drawer` is deprecated and will soon be removed.",
  });
});

it("cleans ups timers on unmount", async () => {
  const clearTimeoutSpy = jest.spyOn(window, "clearTimeout");
  const { unmount } = render(<Drawer>Foobar</Drawer>);

  unmount();
  await waitFor(() => {
    expect(screen.queryByTestId("drawer")).not.toBeInTheDocument();
  });

  expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);

  clearTimeoutSpy.mockRestore();
});

it("sets correct data-* props on main dialog element", () => {
  render(
    <Drawer data-element="foo" data-role="bar">
      Foobar
    </Drawer>,
  );
  const drawer = screen.getByTestId("bar");

  expect(drawer).toHaveAttribute("data-component", "drawer");
  expect(drawer).toHaveAttribute("data-element", "foo");
});

it("has accessible name when ariaLabel prop is provided", () => {
  render(<Drawer aria-label="test">Foobar</Drawer>);
  expect(screen.getByTestId("drawer")).toHaveAccessibleName("test");
});

it("displays heading when title prop is provided", () => {
  render(
    <Drawer title={<h2>Test title</h2>} sidebar="Sidebar content">
      Foobar
    </Drawer>,
  );
  expect(
    screen.getByRole("heading", { name: "Test title", level: 2 }),
  ).toBeVisible();
});

it("has accessible name on the sidebar when sidebarAriaLabel prop is provided", () => {
  render(
    <Drawer sidebarAriaLabel="test" sidebar="Sidebar content">
      Foobar
    </Drawer>,
  );

  expect(screen.getByTestId("drawer-content")).toHaveAccessibleName("test");
});

it("renders sidebar with accessible name set to the `title` when provided", () => {
  render(
    <Drawer title={<h2>Test title</h2>} sidebar="Sidebar content">
      Foobar
    </Drawer>,
  );

  expect(screen.getByTestId("drawer-content")).toHaveAccessibleName(
    "Test title",
  );
});

it("renders sidebar header as sticky when stickyHeader prop is true", () => {
  render(
    <Drawer stickyHeader expanded title="Test title" sidebar="Sidebar content">
      Foobar
    </Drawer>,
  );
  expect(screen.getByTestId("drawer-sidebar-header")).toHaveStyle({
    position: "sticky",
    top: "0",
    borderBottom: "var(--sizing010) solid #ccd6db",
  });
});

it("renders sidebar footer when footer prop is provided", () => {
  render(
    <Drawer footer="Test footer" sidebar="Sidebar content">
      Foobar
    </Drawer>,
  );
  expect(screen.getByText("Test footer")).toBeVisible();
});

it("renders sidebar footer as sticky when stickyFooter prop is true", () => {
  render(
    <Drawer stickyFooter footer="Test footer" sidebar="Sidebar content">
      Foobar
    </Drawer>,
  );
  expect(screen.getByText("Test footer")).toHaveStyle({
    position: "sticky",
    bottom: "0",
  });
});

it("calls onChange callback when provided with isExpanded value as false, when sidebar is collapsed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <Drawer animationDuration="500ms" showControls onChange={onChange}>
      Foobar
    </Drawer>,
  );

  const button = screen.getByRole("button", { name: "toggle sidebar" });
  await user.click(button);

  expect(await screen.findByTestId("drawer-content")).toHaveClass("closing");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(onChange).toHaveBeenCalledWith(expect.anything(), false);
});

it("calls onChange callback when provided with isExpanded value as true, when sidebar is expanded", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <Drawer defaultExpanded={false} showControls onChange={onChange}>
      Foobar
    </Drawer>,
  );

  const button = screen.getByRole("button", { name: "toggle sidebar" });
  await user.click(button);

  expect(await screen.findByTestId("drawer-content")).toHaveClass("opening");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(onChange).toHaveBeenCalledWith(expect.anything(), true);
});

it("sets sidebar background color as red when backgroundColor prop is provided", () => {
  render(<Drawer backgroundColor="#FF0000">Foobar</Drawer>);
  expect(screen.getByTestId("drawer-content")).toHaveStyle({
    backgroundColor: "#FF0000",
  });
});

it("triggers opening animation sequence with correct timing, when animationDuration prop is specified", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <Drawer expanded={false} showControls animationDuration="500">
      Foobar
    </Drawer>,
  );

  const button = screen.getByRole("button", { name: "toggle sidebar" });
  await user.click(button);

  expect(await screen.findByTestId("drawer-content")).toHaveClass("opening");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  const content = screen.getByTestId("drawer-content");
  expect(content).toHaveClass("open");
  expect(content).not.toHaveClass("opening");
});

it("triggers closing animation sequence with correct timing, when animationDuration prop is specified", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <Drawer expanded showControls animationDuration="500">
      Foobar
    </Drawer>,
  );

  const button = screen.getByRole("button", { name: "toggle sidebar" });
  await user.click(button);

  expect(await screen.findByTestId("drawer-content")).toHaveClass("closing");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  const content = screen.getByTestId("drawer-content");
  expect(content).toHaveClass("closed");
  expect(content).not.toHaveClass("closing");
});

it("triggers opening animation sequence with correct timing, when animationDuration prop is specified in milliseconds", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <Drawer expanded={false} showControls animationDuration="500ms">
      Foobar
    </Drawer>,
  );

  const button = screen.getByRole("button", { name: "toggle sidebar" });
  await user.click(button);

  expect(await screen.findByTestId("drawer-content")).toHaveClass("opening");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  const content = screen.getByTestId("drawer-content");
  expect(content).toHaveClass("open");
  expect(content).not.toHaveClass("opening");
});

it("triggers closing animation sequence with correct timing, when animationDuration prop is specified in milliseconds", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <Drawer expanded showControls animationDuration="500ms">
      Foobar
    </Drawer>,
  );

  const button = screen.getByRole("button", { name: "toggle sidebar" });
  await user.click(button);

  expect(await screen.findByTestId("drawer-content")).toHaveClass("closing");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  const content = screen.getByTestId("drawer-content");
  expect(content).toHaveClass("closed");
  expect(content).not.toHaveClass("closing");
});

it("triggers opening animation sequence with correct timing, when animationDuration prop is specified in seconds", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <Drawer expanded={false} showControls animationDuration="0.5s">
      Foobar
    </Drawer>,
  );

  const button = screen.getByRole("button", { name: "toggle sidebar" });
  await user.click(button);

  expect(await screen.findByTestId("drawer-content")).toHaveClass("opening");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  const content = screen.getByTestId("drawer-content");
  expect(content).toHaveClass("open");
  expect(content).not.toHaveClass("opening");
});

it("triggers closing animation sequence with correct timing, when animationDuration prop is specified in seconds", async () => {
  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
  });
  render(
    <Drawer
      expanded
      sidebar="Sidebar content"
      showControls
      animationDuration="0.5s"
    >
      Foobar
    </Drawer>,
  );

  const button = screen.getByRole("button", { name: "toggle sidebar" });
  await user.click(button);

  expect(await screen.findByTestId("drawer-content")).toHaveClass("closing");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  const content = screen.getByTestId("drawer-content");
  expect(content).toHaveClass("closed");
  expect(content).not.toHaveClass("closing");
});

it("triggers opening animation sequence, when expanded prop is updated to true", async () => {
  const MockApp = () => {
    const [expanded, setExpanded] = React.useState(false);
    return (
      <>
        <button type="button" onClick={() => setExpanded(true)}>
          Expand
        </button>
        <Drawer expanded={expanded} animationDuration="500">
          Foobar
        </Drawer>
      </>
    );
  };
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<MockApp />);

  await user.click(screen.getByRole("button", { name: "Expand" }));

  expect(await screen.findByTestId("drawer-content")).toHaveClass("opening");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  const content = screen.getByTestId("drawer-content");
  expect(content).toHaveClass("open");
  expect(content).not.toHaveClass("opening");
});

it("triggers closing animation sequence, when expanded prop is updated to false", async () => {
  const MockApp = () => {
    const [expanded, setExpanded] = React.useState(true);
    return (
      <>
        <button type="button" onClick={() => setExpanded(false)}>
          Collapse
        </button>
        <Drawer expanded={expanded} animationDuration="500">
          Foobar
        </Drawer>
      </>
    );
  };
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<MockApp />);

  await user.click(screen.getByRole("button", { name: "Collapse" }));

  expect(await screen.findByTestId("drawer-content")).toHaveClass("closing");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  const content = screen.getByTestId("drawer-content");
  expect(content).toHaveClass("closed");
  expect(content).not.toHaveClass("closing");
});

it("interrupts opening animation sequence, when user clicks on toggle button before animation is completed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <Drawer expanded={false} showControls animationDuration="500">
      Foobar
    </Drawer>,
  );

  const button = screen.getByRole("button", { name: "toggle sidebar" });
  await user.click(button);

  expect(await screen.findByTestId("drawer-content")).toHaveClass("opening");

  act(() => {
    jest.advanceTimersByTime(250);
  });

  await user.click(button);

  expect(await screen.findByTestId("drawer-content")).toHaveClass("closing");

  act(() => {
    jest.advanceTimersByTime(500);
  });

  const content = screen.getByTestId("drawer-content");
  expect(content).toHaveClass("closed");
  expect(content).not.toHaveClass("closing");
});

describe("uncontrolled behaviour", () => {
  it("is expanded by default", () => {
    render(<Drawer sidebar="I am visible!">Foobar</Drawer>);
    expect(screen.getByText("I am visible!")).toBeVisible();
  });

  it("does not expand sidebar by default, if defaultExpanded prop is false", () => {
    render(
      <Drawer defaultExpanded={false} sidebar="Sidebar content">
        Foobar
      </Drawer>,
    );
    expect(screen.getByText("Sidebar content")).not.toBeVisible();
  });

  it("throws an error when the component is switched from uncontrolled to controlled behaviour", () => {
    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    const { rerender } = render(<Drawer expanded={undefined}>Foobar</Drawer>);
    expect(() => {
      rerender(<Drawer expanded>Foobar</Drawer>);
    }).toThrow(
      "Drawer should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled Drawer element for the lifetime of the component",
    );

    consoleSpy.mockRestore();
  });
});

describe("controlled behaviour", () => {
  it("expands sidebar when expanded prop is true", () => {
    render(
      <Drawer expanded sidebar="I am visible!">
        Foobar
      </Drawer>,
    );
    expect(screen.getByText("I am visible!")).toBeVisible();
  });

  it("collapses sidebar when expanded prop is false", () => {
    render(
      <Drawer expanded={false} sidebar="I am hidden...">
        Foobar
      </Drawer>,
    );
    expect(screen.getByText("I am hidden...")).not.toBeVisible();
  });

  it("throws an error when component is changed from controlled to uncontrolled behaviour", () => {
    const consoleSpy = jest
      .spyOn(global.console, "error")
      .mockImplementation(() => {});

    const { rerender } = render(<Drawer expanded>Foobar</Drawer>);
    expect(() => {
      rerender(<Drawer expanded={undefined}>Foobar</Drawer>);
    }).toThrow(
      "Drawer should not switch from uncontrolled to controlled (or vice versa). Decide between using a controlled or uncontrolled Drawer element for the lifetime of the component",
    );

    consoleSpy.mockRestore();
  });
});
