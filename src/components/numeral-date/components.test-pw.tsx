import React from "react";
import NumeralDate, { NumeralDateProps } from ".";

export const NumeralDateComponent = (props: Partial<NumeralDateProps>) => {
  return <NumeralDate label="Default" {...props} />;
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
