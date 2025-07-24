import React, { useState } from "react";
import { Checkbox, CheckboxProps, CheckboxGroup, CheckboxGroupProps } from ".";
import CarbonProvider from "../carbon-provider";
import Box from "../box";

export const CheckboxComponent = (props: Partial<CheckboxProps>) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <Box mt={8}>
        <Checkbox
          label="Checkbox 1"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          {...props}
        />
      </Box>
    </>
  );
};

export const CheckboxGroupComponent = ({
  children,
  ...props
}: Partial<CheckboxGroupProps>) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Box mt={8} ml={8}>
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
    </Box>
  );
};

export const CheckboxGroupComponentNewValidation = ({
  children,
  ...props
}: Partial<CheckboxGroupProps>) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <Box mt={8} ml={8}>
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
    </Box>
  );
};

export const Sizes = () => {
  return (
    <>
      <Checkbox
        label="Small"
        key="checkbox-small"
        name="checkbox-small"
        size="small"
        checked
        onChange={() => {}}
      />
      <Checkbox
        label="Large"
        key="checkbox-large"
        name="checkbox-large"
        size="large"
        checked
        onChange={() => {}}
      />
    </>
  );
};

export const Reversed = () => {
  return (
    <Checkbox
      label="Reversed checkbox"
      name="checkbox-reverse"
      reverse
      checked
      onChange={() => {}}
    />
  );
};

export const WithCustomLabelWidth = () => {
  return (
    <Checkbox
      label="With custom labelWidth and label aligned to right"
      labelWidth={100}
      name="checkbox-custom-label"
      checked
      onChange={() => {}}
    />
  );
};
