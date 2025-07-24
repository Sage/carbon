import React from "react";
import NumeralDate, { NumeralDateProps } from ".";

export const NumeralDateComponent = (props: Partial<NumeralDateProps>) => {
  return (
    <NumeralDate
      value={{ dd: "01", mm: "01", yyyy: "2001" }}
      label="Default"
      onChange={() => {}}
      {...props}
    />
  );
};

export const NumeralDateControlled = (props: Partial<NumeralDateProps>) => {
  const [value, setValue] = React.useState<NumeralDateProps["value"]>({
    dd: "",
    mm: "",
    yyyy: "",
  });

  return (
    <NumeralDate
      value={value}
      onChange={(e) => setValue(e.target.value)}
      label="Controlled"
      {...props}
    />
  );
};
