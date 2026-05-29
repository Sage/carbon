import React, { useState } from "react";
import { Checkbox, CheckboxProps, CheckboxGroup, CheckboxGroupProps } from ".";

export const CheckboxComponent = (props: Partial<CheckboxProps>) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Checkbox
      label="Checkbox 1"
      checked={isChecked}
      onChange={(e) => setIsChecked(e.target.checked)}
      {...props}
    />
  );
};

export const CheckboxGroupComponent = ({
  children,
  ...props
}: Partial<CheckboxGroupProps>) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <CheckboxGroup {...props}>
      {children || (
        <>
          {["One", "Two", "Three"].map((label) => (
            <Checkbox
              label={label}
              id={`checkbox-group-${label}`}
              key={`checkbox-group-${label}`}
              name={`checkbox-group-${label}`}
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
          ))}
        </>
      )}
    </CheckboxGroup>
  );
};
