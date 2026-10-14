import React from "react";
import BatchSelection, { BatchSelectionProps } from ".";
import Button from "../button/__next__";

const BatchSelectionComponent = ({ ...rest }: Partial<BatchSelectionProps>) => (
  <BatchSelection selectedCount={1} {...rest}>
    <Button>Button 1</Button>
    <Button>Button 2</Button>
    <Button>Button 3</Button>
  </BatchSelection>
);

export default BatchSelectionComponent;
