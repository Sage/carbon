import React from "react";
import BatchSelection, { BatchSelectionProps } from ".";
import IconButton from "../icon-button";
import Icon from "../icon";

const BatchSelectionComponent = ({
  children,
  selectedCount = 0,
  ...rest
}: Partial<BatchSelectionProps>) => (
  <BatchSelection {...rest} selectedCount={selectedCount}>
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="csv" />
    </IconButton>
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="bin" />
    </IconButton>
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="pdf" />
    </IconButton>
    {children}
  </BatchSelection>
);

export default BatchSelectionComponent;
