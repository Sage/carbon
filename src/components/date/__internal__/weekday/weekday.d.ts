import * as React from "react";

export interface WeekdayProps {
  className?: string;
  title?: string;
  children?: React.ReactNode;
}

declare function Weekday(
  props: WeekdayProps & React.RefAttributes<HTMLElement>
): JSX.Element;

export default Weekday;
