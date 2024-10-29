import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../../../button";

import ListActionButton from ".";

test("button element can be accessed via a forwarded ref", async () => {
  const ref = jest.fn();
  render(<ListActionButton ref={ref} />);

  expect(ref).toHaveBeenCalledWith(
    screen.getByRole("button", { name: "Add New Item" }),
  );
});

test("renders custom button when listActionButton prop is provided", () => {
  render(<ListActionButton listActionButton={<Button>Test Button</Button>} />);
  expect(screen.getByRole("button", { name: "Test Button" })).toBeVisible();
});

test("calls onListAction when custom button is clicked", async () => {
  const onListAction = jest.fn();
  const user = userEvent.setup();
  render(
    <ListActionButton
      listActionButton={<Button>Test Button</Button>}
      onListAction={onListAction}
    />,
  );

  await user.click(screen.getByRole("button", { name: "Test Button" }));

  expect(onListAction).toHaveBeenCalled();
});
