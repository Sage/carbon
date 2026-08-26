import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import BatchSelection from ".";
import Button from "../button/__next__";

test("Renders with children", () => {
  render(
    <BatchSelection selectedCount={0} totalItems={10}>
      <Button>Button</Button>
    </BatchSelection>,
  );

  expect(screen.getByRole("button", { name: "Button" })).toBeVisible();
});

test("Renders the selected count message using the `selectedCount` and `totalItems` props", () => {
  render(
    <BatchSelection selectedCount={1} totalItems={10}>
      <Button>Button</Button>
    </BatchSelection>,
  );

  expect(screen.getByText("1 of 10 items selected")).toBeVisible();
});

test("Renders close button that calls `onDismiss` when clicked", async () => {
  const user = userEvent.setup();
  const onDismiss = jest.fn();

  render(
    <BatchSelection selectedCount={0} totalItems={10} onDismiss={onDismiss}>
      <Button>Button</Button>
    </BatchSelection>,
  );

  const closeButton = screen.getByRole("button", { name: "Close" });
  await user.click(closeButton);

  expect(onDismiss).toHaveBeenCalledTimes(1);
});

test("Does not render a close button when `onDismiss` is not provided", () => {
  render(
    <BatchSelection selectedCount={0} totalItems={10}>
      <Button>Button</Button>
    </BatchSelection>,
  );

  expect(
    screen.queryByRole("button", { name: "Close" }),
  ).not.toBeInTheDocument();
});

test("Renders with the small screen layout when the `smallScreen` prop is true", () => {
  render(
    <BatchSelection
      selectedCount={1}
      totalItems={10}
      onDismiss={() => {}}
      smallScreen
    >
      <Button>Button</Button>
    </BatchSelection>,
  );

  expect(screen.getByText("1 of 10 items selected")).toBeVisible();
  expect(screen.getByRole("button", { name: "Close" })).toBeVisible();
  expect(screen.getByRole("button", { name: "Button" })).toBeVisible();
});

test("Renders with provided data- attributes", () => {
  render(
    <BatchSelection data-element="bar" data-role="baz" selectedCount={0}>
      <Button>Button</Button>
    </BatchSelection>,
  );

  expect(screen.getByTestId("baz")).toHaveAttribute("data-element", "bar");
});

test("Renders as hidden when the `hidden` prop is true", () => {
  render(
    <BatchSelection data-role="batch-selection" selectedCount={0} hidden>
      <Button>Button</Button>
    </BatchSelection>,
  );

  const batchSelection = screen.getByTestId("batch-selection");

  expect(batchSelection).not.toBeVisible();
});
