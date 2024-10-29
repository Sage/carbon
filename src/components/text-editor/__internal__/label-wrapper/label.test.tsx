import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Label from "../../../../__internal__/label";
import LabelWrapper from "./label-wrapper.component";

test("should render children", () => {
  render(
    <LabelWrapper onClick={() => {}}>
      <Label>Test Children</Label>
    </LabelWrapper>,
  );

  expect(screen.getByText("Test Children")).toBeVisible();
});

test("should call the `onClick` function prop when clicked", async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(
    <LabelWrapper onClick={onClick}>
      <Label>Test Children</Label>
    </LabelWrapper>,
  );
  expect(onClick).not.toHaveBeenCalled();

  await user.click(screen.getByText("Test Children"));
  expect(onClick).toHaveBeenCalledTimes(1);
});
