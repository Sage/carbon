import React from "react";
import Fieldset from "./fieldset.component";
import { FieldsetProps } from "../../../src/components/fieldset";
import Textbox from "../textbox";

const FieldsetComponent = (props: FieldsetProps) => {
  return (
    <Fieldset {...props}>
      <Textbox label="Input 1" value="Input Text" onChange={() => {}} />
      <Textbox label="Input 2" value="Input Text" onChange={() => {}} />
      <Textbox label="Input 3" value="Input Text" onChange={() => {}} />
    </Fieldset>
  );
};

export default FieldsetComponent;
