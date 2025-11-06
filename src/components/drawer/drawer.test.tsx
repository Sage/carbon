import React from "react";
import { act, render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import Drawer from ".";
import { assertLoggerComponentMessage } from "../../__spec_helper__/__internal__/test-utils";

jest.mock("../../__internal__/utils/logger");

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("should log a deprecation warning for `animationDuration` prop", () => {
  assertLoggerComponentMessage({
    component: <Drawer animationDuration="500ms">Foobar</Drawer>,
    message:
      "The `animationDuration` prop in `Drawer` is deprecated and will soon be removed.",
  });
});

test("should log a deprecation warning for `showControls` prop", () => {
  assertLoggerComponentMessage({
    component: <Drawer showControls>Foobar</Drawer>,
    message:
      "The `showControls` prop in `Drawer` is deprecated and will soon be removed.",
  });
});

test("should log a deprecation warning for `defaultExpanded` prop", () => {
  assertLoggerComponentMessage({
    component: <Drawer defaultExpanded>Foobar</Drawer>,
    message:
      "The `defaultExpanded` prop in `Drawer` is deprecated and will soon be removed.",
  });
});

test("sets correct data-* props on main dialog element", () => {
  render(
    <Drawer data-element="foo" data-role="bar">
      Foobar
    </Drawer>,
  );
  const drawer = screen.getByTestId("bar");

  expect(drawer).toHaveAttribute("data-component", "drawer");
  expect(drawer).toHaveAttribute("data-element", "foo");
});

test("has accessible name when ariaLabel prop is provided", () => {
  render(
    <Drawer data-role="drawer" aria-label="test">
      Foobar
    </Drawer>,
  );

  expect(screen.getByTestId("drawer")).toHaveAccessibleName("test");
});

test("displays heading when title prop is provided", () => {
  render(
    <Drawer title={<h2>Test title</h2>} sidebar="Sidebar content">
      Foobar
    </Drawer>,
  );

  expect(
    screen.getByRole("heading", { name: "Test title", level: 2 }),
  ).toBeVisible();
});

test("has accessible name on the sidebar when sidebarAriaLabel prop is provided", () => {
  render(
    <Drawer sidebarAriaLabel="test" sidebar="Sidebar content">
      Foobar
    </Drawer>,
  );

  expect(screen.getByRole("complementary")).toHaveAccessibleName("test");
});

test("renders sidebar with accessible name set to the `title` when provided", () => {
  render(
    <Drawer title={<h2>Test title</h2>} sidebar="Sidebar content">
      Foobar
    </Drawer>,
  );

  expect(screen.getByRole("complementary")).toHaveAccessibleName("Test title");
});

test("renders sidebar header as sticky when stickyHeader prop is true", () => {
  render(
    <Drawer stickyHeader expanded title="Test title" sidebar="Sidebar content">
      Foobar
    </Drawer>,
  );
  expect(screen.getByText("Test title")).toHaveStyle({
    position: "sticky",
    top: "0",
  });
});

test("renders sidebar footer when footer prop is provided", () => {
  render(
    <Drawer footer="Test footer" sidebar="Sidebar content">
      Foobar
    </Drawer>,
  );
  expect(screen.getByText("Test footer")).toBeVisible();
});

test("renders sidebar footer as sticky when stickyFooter prop is true", () => {
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

test("calls onChange callback when provided with isExpanded value as false, when sidebar is collapsed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <Drawer animationDuration="500ms" showControls onChange={onChange}>
      Foobar
    </Drawer>,
  );

  const button = screen.getByRole("button", { name: "toggle sidebar" });
  await user.click(button);

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(onChange).toHaveBeenCalledWith(expect.anything(), false);
});

test("calls onChange callback when provided with isExpanded value as true, when sidebar is expanded", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  const onChange = jest.fn();
  render(
    <Drawer defaultExpanded={false} showControls onChange={onChange}>
      Foobar
    </Drawer>,
  );

  const button = screen.getByRole("button", { name: "toggle sidebar" });
  await user.click(button);

  act(() => {
    jest.advanceTimersByTime(500);
  });

  expect(onChange).toHaveBeenCalledWith(expect.anything(), true);
});

test("sets sidebar background color when `backgroundColor` prop is provided", () => {
  render(<Drawer backgroundColor="#FF0000">Foobar</Drawer>);

  expect(screen.getByTestId("drawer-content")).toHaveStyle({
    backgroundColor: "#FF0000",
  });
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
