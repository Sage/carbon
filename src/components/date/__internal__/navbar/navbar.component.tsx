import React, { useRef } from "react";

import StyledNavbar from "./navbar.style";
import guid from "../../../../__internal__/utils/helpers/guid";

export interface NavbarProps {
  className?: string;
  months: string[];
  years: number[];
  selectedMonth?: number;
  selectedYear?: number;
  onMonthChange?: (month: number) => void;
  onYearChange?: (year: number) => void;
}

export const Navbar = ({
  className,
  months,
  years,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}: NavbarProps) => {
  const monthId = useRef(guid());
  const yearId = useRef(guid());
  return (
    <StyledNavbar className={className} data-role="date-navbar">
      <select
        name="month select"
        id={monthId.current}
        value={selectedMonth}
        onChange={(e) => onMonthChange?.(Number(e.target.value))}
      >
        {months.map((month, index) => (
          <option key={month} value={index}>
            {month}
          </option>
        ))}
      </select>
      <select
        name="year select"
        id={yearId.current}
        value={selectedYear}
        onChange={(e) => onYearChange?.(Number(e.target.value))}
      >
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </StyledNavbar>
  );
};

export default Navbar;
