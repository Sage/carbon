import React, { useState } from "react";
import { OptionTile, OptionTileGroup } from ".";

export const SingleOptionTileComponent = () => (
  <OptionTile variant="single" number={1} title="Pay now" />
);

export const CustomOptionTileComponent = () => {
  const [customValue, setCustomValue] = useState("");

  return (
    <OptionTile
      variant="custom"
      title="Custom amount"
      inputAriaLabel="Custom amount"
      inputPlaceholder="Type amount"
      customValue={customValue}
      onCustomValueChange={setCustomValue}
    />
  );
};

export const MultipleOptionTileComponent = () => {
  const [checked, setChecked] = useState(false);

  return (
    <OptionTile
      variant="multiple"
      label="Enable recurring payment"
      checked={checked}
      onChange={setChecked}
    />
  );
};

export const SingleSelectGroupOptionTileComponent = () => {
  const [selected, setSelected] = useState("none");

  return (
    <>
      <OptionTileGroup selectionType="single" aria-label="Payment options">
        <OptionTile
          variant="single"
          number={1}
          title="Pay now"
          onClick={() => setSelected("Pay now")}
        />
        <OptionTile
          variant="single"
          number={2}
          title="Pay later"
          onClick={() => setSelected("Pay later")}
        />
      </OptionTileGroup>
      <p>{`Selected: ${selected}`}</p>
    </>
  );
};

export const GroupedOptionTileComponent = () => {
  const [emailChecked, setEmailChecked] = useState(false);
  const [smsChecked, setSmsChecked] = useState(false);

  return (
    <OptionTileGroup selectionType="multiple" aria-label="Delivery options">
      <OptionTile
        variant="multiple"
        label="Email receipt"
        checked={emailChecked}
        onChange={setEmailChecked}
      />
      <OptionTile
        variant="multiple"
        label="SMS updates"
        checked={smsChecked}
        onChange={setSmsChecked}
      />
    </OptionTileGroup>
  );
};
