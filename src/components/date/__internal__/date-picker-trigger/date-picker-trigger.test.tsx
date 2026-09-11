import React from "react";
import { render, screen } from "@testing-library/react";
import { enGB as enGBDateLocale } from "date-fns/locale/en-GB";

import I18nProvider from "../../../i18n-provider";
import DatePickerTrigger from "./date-picker-trigger.component";

const defaultProps = {
  pickerId: "test-picker",
  size: "medium" as const,
  onClick: () => {},
};

describe("typical variant", () => {
  test("renders a visually hidden span in the DOM", () => {
    render(<DatePickerTrigger {...defaultProps} variant="typical" />);

    const span = screen.getByText("Instructions on how to use", {
      selector: "span",
    });

    expect(span).toBeInTheDocument();
  });

  test("aria-describedby on button matches hidden span id", () => {
    render(<DatePickerTrigger {...defaultProps} variant="typical" />);

    const button = screen.getByRole("button", { name: "Open calendar" });
    const span = screen.getByText("Instructions on how to use", {
      selector: "span",
    });

    const descId = button.getAttribute("aria-describedby");
    expect(descId).toBeTruthy();

    expect(span).toHaveAttribute("id", descId);
  });

  test("hidden span text matches locale openCalendarDescription", () => {
    render(<DatePickerTrigger {...defaultProps} variant="typical" />);

    const span = screen.getByText("Instructions on how to use", {
      selector: "span",
    });

    expect(span).toHaveTextContent("Instructions on how to use");
  });

  test("hidden span text uses locale override when provided", () => {
    render(
      <I18nProvider
        locale={{
          date: {
            dateFnsLocale: () => enGBDateLocale,
            ariaLabels: {
              previousMonthButton: () => "Previous month",
              nextMonthButton: () => "Next month",
              openCalendarDescription: () => "Custom instructions",
            },
          },
        }}
      >
        <DatePickerTrigger {...defaultProps} variant="typical" />
      </I18nProvider>,
    );

    const span = screen.getByText("Custom instructions", {
      selector: "span",
    });

    expect(span).toHaveTextContent("Custom instructions");
  });

  test("hidden span is not hidden with display:none or visibility:hidden", () => {
    render(<DatePickerTrigger {...defaultProps} variant="typical" />);

    const span = screen.getByText("Instructions on how to use", {
      selector: "span",
    });

    expect(span).not.toHaveStyle("display: none");
    expect(span).not.toHaveStyle("visibility: hidden");
  });

  test("stable ID — does not change on re-render", () => {
    const { rerender } = render(
      <DatePickerTrigger {...defaultProps} variant="typical" />,
    );

    const button = screen.getByRole("button", { name: "Open calendar" });
    const span = screen.getByText("Instructions on how to use", {
      selector: "span",
    });

    const idBefore = button.getAttribute("aria-describedby");

    rerender(<DatePickerTrigger {...defaultProps} variant="typical" open />);

    expect(button.getAttribute("aria-describedby")).toBe(idBefore);
    expect(span).toHaveAttribute("id", idBefore);
  });
});

describe("legacy variant", () => {
  test("does not render a hidden instructions span", () => {
    render(<DatePickerTrigger {...defaultProps} variant="legacy" />);

    // No button element — legacy trigger is aria-hidden
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    // No instructions text
    expect(
      screen.queryByText("Instructions on how to use"),
    ).not.toBeInTheDocument();
  });
});
