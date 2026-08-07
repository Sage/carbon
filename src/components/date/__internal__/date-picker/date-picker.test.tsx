import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Logger from "../../../../__internal__/utils/logger";
import deDE from "../../../../locales/de-de";
import I18nProvider from "../../../i18n-provider";
import DatePicker from "./date-picker.component";
import type { DatePickerProps } from "./date-picker.types";

const DatePickerWithInput = (
  props: Omit<DatePickerProps, "inputContainerRef">,
) => {
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={ref}>
        <input aria-label="Date" />
      </div>
      <DatePicker {...props} inputContainerRef={ref} />
    </>
  );
};

test("logs the disablePortal deprecation warning once", () => {
  const loggerSpy = jest
    .spyOn(Logger, "deprecate")
    .mockImplementation(() => {});

  render(
    <>
      <DatePickerWithInput onRequestPickerClose={() => {}} open disablePortal />
      <DatePickerWithInput onRequestPickerClose={() => {}} open disablePortal />
    </>,
  );

  expect(loggerSpy).toHaveBeenCalledWith(
    "`disablePortal` is deprecated in DateInput and DateRange, and support will soon be removed.",
  );
  expect(loggerSpy).toHaveBeenCalledTimes(1);
  loggerSpy.mockRestore();
});

test("renders localized weekday headers", () => {
  render(
    <I18nProvider locale={deDE}>
      <DatePickerWithInput
        onRequestPickerClose={() => {}}
        open
        disablePortal
        selectedDate={new Date(2019, 3, 4)}
      />
    </I18nProvider>,
  );

  expect(screen.getByText("So", { selector: "span" })).toBeVisible();
  expect(screen.getByText("Sonntag")).toBeInTheDocument();
});

test("does not render when closed", () => {
  render(<DatePickerWithInput onRequestPickerClose={() => {}} open={false} />);

  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("renders month and year selects instead of navigation buttons", () => {
  render(
    <DatePickerWithInput onRequestPickerClose={() => {}} open disablePortal />,
  );

  expect(
    screen.getByRole("combobox", { name: "Choose the month" }),
  ).toBeVisible();
  expect(
    screen.getByRole("combobox", { name: "Choose the year" }),
  ).toBeVisible();
  expect(
    screen.queryByRole("button", { name: "Previous month" }),
  ).not.toBeInTheDocument();
  expect(
    screen.queryByRole("button", { name: "Next month" }),
  ).not.toBeInTheDocument();
});

test("labels every grid in a multi-month picker", () => {
  render(
    <DatePickerWithInput
      onRequestPickerClose={() => {}}
      open
      disablePortal
      dayPickerProps={{ numberOfMonths: 2 }}
    />,
  );

  const dialog = screen.getByRole("dialog");
  const labelledBy = dialog.getAttribute("aria-labelledby");

  expect(screen.getAllByRole("grid")).toHaveLength(2);
  screen
    .getAllByRole("grid")
    .forEach((grid) =>
      expect(grid).toHaveAttribute("aria-labelledby", labelledBy),
    );
});

test("renders a Close button that closes the picker and refocuses the input", async () => {
  const user = userEvent.setup();
  const onRequestPickerClose = jest.fn();
  render(
    <DatePickerWithInput
      onRequestPickerClose={onRequestPickerClose}
      open
      disablePortal
    />,
  );

  await user.click(screen.getByRole("button", { name: "Close" }));

  expect(onRequestPickerClose).toHaveBeenCalledTimes(1);
  expect(screen.getByRole("textbox", { name: "Date" })).toHaveFocus();
});

test("disables dates outside the configured range", () => {
  render(
    <DatePickerWithInput
      onRequestPickerClose={() => {}}
      open
      disablePortal
      selectedDate={new Date(2019, 3, 4)}
      minDate="2019-04-04"
      maxDate="2019-04-30"
    />,
  );

  expect(
    screen.getByRole("button", { name: "Wednesday, April 3rd, 2019" }),
  ).toBeDisabled();
  expect(
    screen.getByRole("button", {
      name: "Thursday, April 4th, 2019, selected",
    }),
  ).toBeEnabled();
});
