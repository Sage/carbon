import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import PopoverContainer from "./popover-container.component";
import { Select, Option } from "../select";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

test("does not animate in popup when disableAnimation is true", async () => {
  const user = userEvent.setup({
    advanceTimers: jest.advanceTimersByTime,
  });
  render(<PopoverContainer disableAnimation>Content</PopoverContainer>);

  await user.click(screen.getByRole("button"));

  expect(await screen.findByRole("dialog")).toHaveStyle({
    position: "fixed",
    opacity: "1",
    transform: "none",
  });
});

test("closes popup when Escape key is pressed", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<PopoverContainer>Content</PopoverContainer>);

  await user.click(screen.getByRole("button"));
  await screen.findByRole("dialog");

  await user.keyboard("{Escape}");

  await waitFor(() => {
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

test("pressing Escape key does not close the popup, when nested popup content is open inside it", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(
    <PopoverContainer onClose={() => {}}>
      <Select name="colour" id="colour" label="Select colour">
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
      </Select>
    </PopoverContainer>
  );

  await user.click(screen.getByRole("button"));

  // open select list
  await user.click(await screen.findByRole("combobox"));
  await screen.findByRole("listbox");

  // should close select list only
  await user.keyboard("{Escape}");

  expect(screen.getByRole("dialog")).toBeVisible();
});

test("triggers closing animation sequence with correct timing when closing popup", async () => {
  const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
  render(<PopoverContainer>Content</PopoverContainer>);

  await user.click(screen.getByRole("button"));

  const popup = await screen.findByRole("dialog");
  await user.click(screen.getByRole("button", { name: "close" }));

  expect(popup).toHaveClass("exit");

  act(() => {
    jest.advanceTimersByTime(300);
  });

  expect(popup).toHaveClass("exit-done");
});
