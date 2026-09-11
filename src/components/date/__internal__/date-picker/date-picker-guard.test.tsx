import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import DatePicker from "./date-picker.component";

jest.mock("../calendar/calendar.component", () => ({
  __esModule: true,
  default: ({ onDayClick }: { onDayClick: (date?: Date) => void }) => (
    <button type="button" onClick={() => onDayClick(undefined)}>
      Day without a date
    </button>
  ),
}));

test("ignores a day click when the calendar supplies no date", async () => {
  const user = userEvent.setup();
  const onRequestPickerClose = jest.fn();
  const inputContainerRef = {
    current: document.createElement("div"),
  } as React.RefObject<HTMLDivElement>;

  render(
    <DatePicker
      inputContainerRef={inputContainerRef}
      onRequestPickerClose={onRequestPickerClose}
      open
      disablePortal
    />,
  );

  await user.click(screen.getByRole("button", { name: "Day without a date" }));

  expect(onRequestPickerClose).not.toHaveBeenCalled();
});
