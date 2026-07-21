import React from "react";
import { render, screen } from "@testing-library/react";

import { CalendarWeekdayRenderer, mergeClassNames } from "./calendar.component";
import CalendarDayButton from "./calendar-day-button.component";
import CalendarNavigation from "./calendar-navigation.component";

const noop = () => {};

test("renders a day without an accessible label", () => {
  render(
    <CalendarDayButton
      day={{} as never}
      modifiers={{ today: false }}
      type="button"
      aria-label={undefined}
    >
      15
    </CalendarDayButton>,
  );

  expect(screen.getByRole("button", { name: "15" })).toBeVisible();
});

test("falls back to numeric month labels without a localizer", () => {
  render(
    <CalendarNavigation
      displayedMonth={new Date(2025, 0, 1)}
      monthSelectId="month"
      yearSelectId="year"
      years={[2025]}
      size="medium"
      onMonthChange={noop}
      onYearChange={noop}
    />,
  );

  expect(screen.getByRole("option", { name: "1" })).toBeVisible();
  expect(screen.getByRole("option", { name: "12" })).toBeVisible();
});

test("preserves unknown weekday content", () => {
  render(
    <table>
      <thead>
        <tr>
          <CalendarWeekdayRenderer
            className="weekday"
            aria-label="Unknown weekday"
          >
            Fallback content
          </CalendarWeekdayRenderer>
        </tr>
      </thead>
    </table>,
  );

  expect(screen.getByText("Fallback content")).toBeVisible();
  expect(screen.getByText("Unknown weekday")).toBeInTheDocument();
});

test("preserves known and unknown custom class names", () => {
  expect(
    mergeClassNames({
      root: "custom-root",
      unknown: "custom-unknown",
      day: "",
    } as never),
  ).toEqual({
    root: "rdp-root custom-root",
    unknown: "custom-unknown",
  });
});
