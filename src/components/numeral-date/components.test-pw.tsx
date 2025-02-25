import React from "react";
import NumeralDate, { NumeralDateProps } from ".";
import { FullDate, NumeralDateObject } from "./numeral-date.component";

export const NumeralDateComponent = (
  props: React.JSX.IntrinsicAttributes &
    NumeralDateProps<NumeralDateObject> &
    React.RefAttributes<HTMLInputElement>,
) => {
  return <NumeralDate label="Default" {...props} />;
};

export const NumeralDateControlled = (
  props: React.JSX.IntrinsicAttributes &
    NumeralDateProps<NumeralDateObject> &
    React.RefAttributes<HTMLInputElement>,
) => {
  const [value, setValue] = React.useState({ dd: "", mm: "", yyyy: "" });

  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value as FullDate)}
      label="Controlled"
      {...props}
    />
  );
};
