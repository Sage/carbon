import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { useState } from "react";

import AdaptiveSidebar, {
  AdaptiveSidebarProps,
} from "./adaptive-sidebar.component";
import useIsAboveBreakpoint from "../../hooks/__internal__/useIsAboveBreakpoint";
import useMediaQuery from "../../hooks/useMediaQuery";

jest.mock("../../hooks/__internal__/useIsAboveBreakpoint");
jest.mock("../../hooks/useMediaQuery");

const mockUseMediaQuery = useMediaQuery as jest.MockedFunction<
  typeof useMediaQuery
>;
const mockUseIsAboveBreakpoint = useIsAboveBreakpoint as jest.MockedFunction<
  typeof useIsAboveBreakpoint
>;

const MockAdaptiveSidebar = (
  props: Omit<AdaptiveSidebarProps, "open" | "children">,
) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen((prev) => !prev)}>
        {open ? "Close" : "Open"}
      </button>
      <AdaptiveSidebar open={open} {...props}>
        <span id="accessible-name">My Content</span>
      </AdaptiveSidebar>
    </>
  );
};

beforeEach(() => {
  jest.clearAllMocks();
  mockUseIsAboveBreakpoint.mockReturnValue(true);
  mockUseMediaQuery.mockReturnValue(false);
});

test("opens and closes the sidebar when the toggle button is clicked", async () => {
  const user = userEvent.setup();
  render(<MockAdaptiveSidebar />);

  expect(screen.queryByText("My Content")).not.toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: "Open" }));
  expect(screen.getByText("My Content")).toBeVisible();

  await user.click(screen.getByRole("button", { name: "Close" }));
  expect(screen.queryByText("My Content")).not.toBeInTheDocument();
});

(
  [
    ["white", "var(--container-standard-bg-default)"],
    ["black", "var(--container-standard-inverse-bg-default)"],
    ["app", "var(--container-standard-bg-alt)"],
  ] as const
).forEach(([backgroundColor, expectedColor]) => {
  test(`maps the deprecated \`backgroundColor\` value '${backgroundColor}' to the correct variant`, () => {
    render(
      <AdaptiveSidebar open backgroundColor={backgroundColor}>
        My Content
      </AdaptiveSidebar>,
    );

    expect(screen.getByRole("region")).toHaveStyleRule(
      "background-color",
      expectedColor,
    );
  });
});

test("renders a left border when `hasBorder` is set", () => {
  render(
    <AdaptiveSidebar open hasBorder>
      My Content
    </AdaptiveSidebar>,
  );

  expect(screen.getByRole("region")).toHaveStyleRule(
    "border-left",
    "1px solid var(--container-standard-border-default)",
  );
});

test("does not render a left border by default", () => {
  render(<AdaptiveSidebar open>My Content</AdaptiveSidebar>);

  expect(screen.getByRole("region")).not.toHaveStyleRule("border-left");
});

test("hides the sidebar when the `hidden` prop is set", () => {
  render(
    <AdaptiveSidebar open hidden>
      My Content
    </AdaptiveSidebar>,
  );

  expect(screen.getByRole("region", { hidden: true })).toHaveStyleRule(
    "display",
    "none",
  );
});

test("renders as a modal, with a translucent background, when `renderAsModal` is set", async () => {
  const user = userEvent.setup();
  render(<MockAdaptiveSidebar renderAsModal />);

  await user.click(screen.getByRole("button", { name: "Open" }));

  expect(screen.getByRole("dialog")).toBeVisible();
  expect(screen.getByTestId("modal-background")).toBeVisible();
});

test("renders as a modal when below the adaptive breakpoint", () => {
  mockUseIsAboveBreakpoint.mockReturnValue(false);

  render(<AdaptiveSidebar open>My Content</AdaptiveSidebar>);

  expect(screen.getByRole("dialog")).toBeVisible();
});

test("hides the modal sidebar when the `hidden` prop is set", () => {
  render(
    <AdaptiveSidebar open hidden renderAsModal>
      My Content
    </AdaptiveSidebar>,
  );

  expect(screen.getByRole("dialog", { hidden: true })).toHaveStyleRule(
    "display",
    "none",
  );
});

test("sets the modal accessible name via `aria-label`", () => {
  render(
    <AdaptiveSidebar open renderAsModal aria-label="sidebar">
      My Content
    </AdaptiveSidebar>,
  );

  expect(screen.getByRole("dialog")).toHaveAccessibleName("sidebar");
});

test("sets the modal accessible name via `aria-labelledby`", () => {
  render(
    <AdaptiveSidebar open renderAsModal aria-labelledby="accessible-name">
      <span id="accessible-name">My Content</span>
    </AdaptiveSidebar>,
  );

  expect(screen.getByRole("dialog")).toHaveAccessibleName("My Content");
});
