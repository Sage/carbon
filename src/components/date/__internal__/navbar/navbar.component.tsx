import React from "react";

import Icon from "../../../icon";
import StyledNavbar, { StyledSelectWrapper } from "./navbar.style";

export interface NavbarProps {
  className?: string;
  labels?: {
    monthSelect?: string;
    yearSelect?: string;
  };
  months: string[];
  onMonthChange?: (month: number) => void;
  onMonthKeyDown?: (ev: React.KeyboardEvent<HTMLSelectElement>) => void;
  onYearChange?: (year: number) => void;
  selectedMonth?: number;
  selectedYear?: number;
  years: number[];
}

export const Navbar = ({
  className,
  labels,
  months,
  onMonthChange,
  onMonthKeyDown,
  onYearChange,
  selectedMonth,
  selectedYear,
  years,
}: NavbarProps) => {
  return (
    <StyledNavbar className={className} data-role="date-navbar">
      <StyledSelectWrapper>
        <select
          aria-label={labels?.monthSelect || "Month"}
          data-role="date-picker-month-select"
          onChange={(ev) => onMonthChange?.(Number(ev.target.value))}
          onKeyDown={onMonthKeyDown}
          value={selectedMonth}
        >
          {months.map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>
        <Icon type="caret_down" />
      </StyledSelectWrapper>
      <StyledSelectWrapper>
        <select
          aria-label={labels?.yearSelect || "Year"}
          data-role="date-picker-year-select"
          onChange={(ev) => onYearChange?.(Number(ev.target.value))}
          value={selectedYear}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <Icon type="caret_down" />
      </StyledSelectWrapper>
    </StyledNavbar>
  );
};

export default Navbar;
