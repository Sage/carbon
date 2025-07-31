import React, { useState } from "react";
import Textbox from "../textbox";
import Decimal from "../decimal";
import { Option, Select } from "../select";
import Box from "../box";
import InlineInputs from ".";

export const Default = () => {
  let validationProps = {};
  validationProps = {
    hasWarning: true,
    inputIcon: "warning",
    tooltipMessage: "warning",
  };
  const [decimalValue, setDecimalValue] = useState("0.00");
  const [selectValue, setSelectValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const handleDecimalChange = (ev: {
    target: { value: { rawValue: React.SetStateAction<string> } };
  }) => {
    setDecimalValue(ev.target.value.rawValue);
  };
  const handleSelectChange = (ev: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectValue(ev.target.value);
  };
  return (
    <InlineInputs
      label="Inline Inputs"
      labelId="inline-inputs-default"
      gutter="none"
    >
      <Textbox
        aria-labelledby="inline-inputs-default"
        {...validationProps}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
      <Decimal
        aria-labelledby="inline-inputs-default"
        value={decimalValue}
        onChange={handleDecimalChange}
      />
      <Select
        value={selectValue}
        onChange={handleSelectChange}
        aria-labelledby="inline-inputs-default"
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </InlineInputs>
  );
};

export const WithAdaptiveLabelBreakpoint = () => {
  const [textValue, setTextValue] = useState("");

  return (
    <Box p={4}>
      <InlineInputs
        label="My Inline Inputs"
        labelId="inline-inputs-adaptive"
        adaptiveLabelBreakpoint={768}
        labelWidth={30}
        gutter="none"
      >
        <Textbox
          aria-labelledby="inline-inputs-adaptive"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />

        <Textbox
          aria-labelledby="inline-inputs-adaptive"
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
        />
      </InlineInputs>
      <Textbox
        label="My Textbox"
        adaptiveLabelBreakpoint={768}
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
    </Box>
  );
};

export const Required = () => {
  const [textValue, setTextValue] = useState("");
  return (
    <InlineInputs
      label="Inline Inputs"
      labelId="inline-inputs-required"
      required
    >
      <Textbox
        aria-labelledby="inline-inputs-required"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
      <Textbox
        aria-labelledby="inline-inputs-required"
        value={textValue}
        onChange={(e) => setTextValue(e.target.value)}
      />
    </InlineInputs>
  );
};
