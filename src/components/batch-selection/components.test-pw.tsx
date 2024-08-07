import React from "react";
import BatchSelection, { BatchSelectionProps } from ".";
import IconButton from "../icon-button";
import Icon from "../icon";
import Button from "../button";
import ButtonMinor from "../button-minor";
import Link from "../link";

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

const BatchSelectionDisabledComponent = () => (
  <BatchSelection selectedCount={0} disabled>
    <IconButton aria-label="icon-button" onClick={() => {}}>
      <Icon type="csv" />
    </IconButton>
    <Button aria-label="button" iconType="csv">
      Button
    </Button>
    <ButtonMinor aria-label="button-minor" iconType="csv">
      Button Minor
    </ButtonMinor>
    <Link aria-label="link" icon="csv">
      Link
    </Link>
    <Link aria-label="link-button" onClick={() => {}} icon="csv">
      Link as a Button
    </Link>
  </BatchSelection>
);

const BatchSelectionLinkOnlyDisabledComponent = () => (
  <BatchSelection selectedCount={0} disabled>
    <Link aria-label="link" icon="csv">
      Link
    </Link>
  </BatchSelection>
);

export {
  BatchSelectionComponent,
  BatchSelectionDisabledComponent,
  BatchSelectionLinkOnlyDisabledComponent,
};
