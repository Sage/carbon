import React, { useState } from "react";
import Fieldset from "./fieldset.component";
import { FieldsetProps } from "../../../src/components/fieldset";
import Textbox from "../textbox";
import Checkbox from "../checkbox/checkbox.component";

const FieldsetComponent = (props: FieldsetProps) => {
  const [textboxValue, setTextboxValue] = useState("");
  const [checkboxValue, setCheckboxValue] = useState(false);

  return (
    <div>
      <Fieldset legend="Fieldset" {...props}>
        <Textbox
          label="First Name"
          labelInline
          labelAlign="right"
          labelWidth={30}
          value={textboxValue}
          onChange={(e) => setTextboxValue(e.target.value)}
        />
        <Textbox
          label="Last Name"
          labelInline
          labelAlign="right"
          labelWidth={30}
          value={textboxValue}
          onChange={(e) => setTextboxValue(e.target.value)}
        />
        <Textbox
          label="Address"
          labelInline
          labelAlign="right"
          labelWidth={30}
          value={textboxValue}
          onChange={(e) => setTextboxValue(e.target.value)}
        />
        <Checkbox
          label="Checkbox"
          labelWidth={30}
          labelSpacing={2}
          reverse
          checked={checkboxValue}
          onChange={(e) => setCheckboxValue(e.target.checked)}
        />
        <Textbox
          label="City"
          labelInline
          labelAlign="right"
          labelWidth={30}
          value={textboxValue}
          onChange={(e) => setTextboxValue(e.target.value)}
        />
        <Textbox
          label="Country"
          labelInline
          labelAlign="right"
          labelWidth={30}
          value={textboxValue}
          onChange={(e) => setTextboxValue(e.target.value)}
        />
        <Textbox
          label="Telephone"
          labelInline
          labelAlign="right"
          labelWidth={30}
          value={textboxValue}
          onChange={(e) => setTextboxValue(e.target.value)}
        />
      </Fieldset>
    </div>
  );
};

export default FieldsetComponent;
