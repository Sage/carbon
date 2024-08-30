import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DismissibleBox from "./dismissible-box.component";

test("calls the `onClose` callback when the close button is clicked", async () => {
  const onCloseMock = jest.fn();
  const user = userEvent.setup({ delay: null });

  render(<DismissibleBox onClose={onCloseMock} />);

  const closeButton = screen.getByRole("button", { name: "Close" });
  await user.click(closeButton);

  expect(onCloseMock).toHaveBeenCalledWith(
    expect.objectContaining({ type: "click" })
  );
});

test("allows custom data props to be assigned to the close button", () => {
  render(
    <DismissibleBox
      onClose={() => {}}
      closeButtonDataProps={{
        "data-element": "bang",
        "data-role": "wallop",
      }}
    />
  );

  const closeButton = screen.getByRole("button", { name: "Close" });

  expect(closeButton).toHaveAttribute("data-element", "bang");
  expect(closeButton).toHaveAttribute("data-role", "wallop");
});

// This test is required for coverage
test("applies the expected styles when `variant` is dark", () => {
  render(
    <DismissibleBox
      onClose={() => {}}
      variant="dark"
      data-role="dismissible-box"
    />
  );

  const dismissibleBoxElement = screen.getByTestId("dismissible-box");

  expect(dismissibleBoxElement).toHaveStyleRule(
    "background-color",
    "var(--colorsUtilityMajor050)"
  );
});
