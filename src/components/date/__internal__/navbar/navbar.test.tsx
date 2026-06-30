import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Navbar from "./navbar.component";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = [2024, 2025, 2026];

const renderNavbar = (
  props: Partial<React.ComponentProps<typeof Navbar>> = {},
) =>
  render(
    <Navbar
      className="custom-class"
      months={months}
      selectedMonth={1}
      selectedYear={2025}
      years={years}
      {...props}
    />,
  );

test("should apply the custom class passed via `className` prop", () => {
  renderNavbar();

  expect(screen.getByTestId("date-navbar")).toHaveClass("custom-class");
});

test("should render native month and year select controls with default labels", () => {
  renderNavbar();

  expect(screen.getByRole("combobox", { name: "Month" })).toHaveValue("1");
  expect(screen.getByRole("combobox", { name: "Year" })).toHaveValue("2025");
});

test("should render custom labels for the select controls", () => {
  renderNavbar({
    labels: {
      monthSelect: "Choose month",
      yearSelect: "Choose year",
    },
  });

  expect(screen.getByRole("combobox", { name: "Choose month" })).toBeVisible();
  expect(screen.getByRole("combobox", { name: "Choose year" })).toBeVisible();
});

test("should render all month and year options", () => {
  renderNavbar();

  const monthSelect = screen.getByRole("combobox", { name: "Month" });
  const yearSelect = screen.getByRole("combobox", { name: "Year" });

  expect(monthSelect).toHaveTextContent("January");
  expect(monthSelect).toHaveTextContent("December");
  expect(yearSelect).toHaveTextContent("2024");
  expect(yearSelect).toHaveTextContent("2026");
});

test("should call `onMonthChange` when the selected month changes", async () => {
  const user = userEvent.setup();
  const onMonthChange = jest.fn();
  renderNavbar({ onMonthChange });

  await user.selectOptions(screen.getByRole("combobox", { name: "Month" }), [
    "4",
  ]);

  expect(onMonthChange).toHaveBeenCalledWith(4);
});

test("should call `onYearChange` when the selected year changes", async () => {
  const user = userEvent.setup();
  const onYearChange = jest.fn();
  renderNavbar({ onYearChange });

  await user.selectOptions(screen.getByRole("combobox", { name: "Year" }), [
    "2026",
  ]);

  expect(onYearChange).toHaveBeenCalledWith(2026);
});
