import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { enUS as enUSLocale } from "date-fns/locale/en-US";

import CalendarNavigation from "./calendar-navigation.component";

const noop = () => {};

const getMonthSelect = () =>
  within(screen.getByTestId("date-picker-month-selector")).getByRole(
    "combobox",
  );

const getYearSelect = () =>
  within(screen.getByTestId("date-picker-year-selector")).getByRole("combobox");

test("year select is enabled when more than one year is selectable", () => {
  render(
    <CalendarNavigation
      displayedMonth={new Date(2024, 5, 1)}
      monthSelectId="month"
      yearSelectId="year"
      years={[2023, 2024, 2025]}
      onMonthChange={noop}
      onYearChange={noop}
    />,
  );

  expect(getYearSelect()).toBeEnabled();
});

test("year select remains enabled when only one year is selectable", () => {
  render(
    <CalendarNavigation
      displayedMonth={new Date(2024, 5, 1)}
      monthSelectId="month"
      yearSelectId="year"
      years={[2024]}
      onMonthChange={noop}
      onYearChange={noop}
    />,
  );

  expect(getYearSelect()).toBeEnabled();
});

test("year select remains enabled when no years are selectable", () => {
  render(
    <CalendarNavigation
      displayedMonth={new Date(2024, 5, 1)}
      monthSelectId="month"
      yearSelectId="year"
      years={[]}
      onMonthChange={noop}
      onYearChange={noop}
    />,
  );

  expect(getYearSelect()).toBeEnabled();
});

test("month select options are never disabled", () => {
  render(
    <CalendarNavigation
      displayedMonth={new Date(2024, 5, 1)}
      monthSelectId="month"
      yearSelectId="year"
      years={[2024, 2025]}
      localize={enUSLocale.localize}
      onMonthChange={noop}
      onYearChange={noop}
    />,
  );

  const monthSelect = getMonthSelect();
  expect(monthSelect).toBeEnabled();
  expect(
    within(monthSelect).getByRole("option", { name: "January" }),
  ).toBeEnabled();
  expect(
    within(monthSelect).getByRole("option", { name: "June" }),
  ).toBeEnabled();
  expect(
    within(monthSelect).getByRole("option", { name: "December" }),
  ).toBeEnabled();
});

test("calls onMonthChange and onYearChange when the user picks a value", async () => {
  const user = userEvent.setup();
  const onMonthChange = jest.fn();
  const onYearChange = jest.fn();

  render(
    <CalendarNavigation
      displayedMonth={new Date(2024, 5, 1)}
      monthSelectId="month"
      yearSelectId="year"
      years={[2023, 2024, 2025]}
      onMonthChange={onMonthChange}
      onYearChange={onYearChange}
    />,
  );

  await user.selectOptions(getMonthSelect(), "7");
  expect(onMonthChange).toHaveBeenCalledTimes(1);

  await user.selectOptions(getYearSelect(), "2025");
  expect(onYearChange).toHaveBeenCalledTimes(1);
});
