import React, { useState } from "react";
import { Checkbox, CheckboxProps, CheckboxGroup, CheckboxGroupProps } from ".";
import CarbonProvider from "../carbon-provider";

export const CheckboxComponent = (props: Partial<CheckboxProps>) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <div
        style={{
          marginTop: "64px",
        }}
      >
        <Checkbox
          label="Checkbox 1"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          {...props}
        />
      </div>
    </>
  );
};

export const CheckboxGroupComponent = ({
  children,
  ...props
}: Partial<CheckboxGroupProps>) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div
      style={{
        marginTop: "64px",
        marginLeft: "64px",
      }}
    >
      <CheckboxGroup legend="Test CheckboxGroup Label" {...props}>
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
    </div>
  );
};

export const CheckboxGroupComponentNewValidation = ({
  children,
  ...props
}: Partial<CheckboxGroupProps>) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <div
      style={{
        marginTop: "64px",
        marginLeft: "64px",
      }}
    >
      <CarbonProvider validationRedesignOptIn>
        <CheckboxGroup
          legend="Checkbox Group Label"
          legendHelp="Hint Text"
          required
          {...props}
        >
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
      </CarbonProvider>
    </div>
  );
};
