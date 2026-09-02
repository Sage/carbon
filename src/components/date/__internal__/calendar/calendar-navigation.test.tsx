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

test("year select is disabled when only one year is selectable", () => {
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

  expect(getYearSelect()).toBeDisabled();
});

test("year select is disabled when no years are selectable", () => {
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

  expect(getYearSelect()).toBeDisabled();
});

test("month select disables months before minMonth in the boundary year", () => {
  render(
    <CalendarNavigation
      displayedMonth={new Date(2024, 5, 1)}
      minMonth={new Date(2024, 2, 1)}
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
  ).toBeDisabled();
  expect(
    within(monthSelect).getByRole("option", { name: "February" }),
  ).toBeDisabled();
  expect(
    within(monthSelect).getByRole("option", { name: "March" }),
  ).toBeEnabled();
  expect(
    within(monthSelect).getByRole("option", { name: "June" }),
  ).toBeEnabled();
});

test("month select disables months after maxMonth in the boundary year", () => {
  render(
    <CalendarNavigation
      displayedMonth={new Date(2024, 5, 1)}
      maxMonth={new Date(2024, 7, 1)}
      monthSelectId="month"
      yearSelectId="year"
      years={[2023, 2024]}
      localize={enUSLocale.localize}
      onMonthChange={noop}
      onYearChange={noop}
    />,
  );

  const monthSelect = getMonthSelect();
  expect(monthSelect).toBeEnabled();
  expect(
    within(monthSelect).getByRole("option", { name: "August" }),
  ).toBeEnabled();
  expect(
    within(monthSelect).getByRole("option", { name: "September" }),
  ).toBeDisabled();
  expect(
    within(monthSelect).getByRole("option", { name: "December" }),
  ).toBeDisabled();
});

test("minMonth/maxMonth bounds only apply to the year they fall in", () => {
  render(
    <CalendarNavigation
      displayedMonth={new Date(2025, 0, 1)}
      minMonth={new Date(2024, 2, 1)}
      maxMonth={new Date(2024, 7, 1)}
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
    within(monthSelect).getByRole("option", { name: "December" }),
  ).toBeEnabled();
});

test("month select is disabled entirely when every month is disabled", () => {
  render(
    <CalendarNavigation
      displayedMonth={new Date(2024, 5, 1)}
      minMonth={new Date(2024, 10, 1)}
      maxMonth={new Date(2024, 0, 1)}
      monthSelectId="month"
      yearSelectId="year"
      years={[2024]}
      onMonthChange={noop}
      onYearChange={noop}
    />,
  );

  expect(getMonthSelect()).toBeDisabled();
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
