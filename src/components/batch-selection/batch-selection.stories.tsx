import React from "react";

import BatchSelection from ".";
import IconButton from "../icon-button";
import Icon from "../icon";
import Button from "../button";

export const Default = () => (
  <BatchSelection selectedCount={0}>
    <Button size="small" mx={1} buttonType="secondary">
      Select All 38 items
    </Button>
    <IconButton onAction={() => {}}>
      <Icon type="csv" />
    </IconButton>
    <IconButton onAction={() => {}}>
      <Icon type="bin" />
    </IconButton>
    <IconButton onAction={() => {}}>
      <Icon type="pdf" />
    </IconButton>
  </BatchSelection>
);

export const Dark = () => (
  <BatchSelection selectedCount={1} colorTheme="dark">
    <IconButton onAction={() => {}}>
      <Icon type="csv" />
    </IconButton>
    <IconButton onAction={() => {}}>
      <Icon type="bin" />
    </IconButton>
    <IconButton onAction={() => {}}>
      <Icon type="pdf" />
    </IconButton>
  </BatchSelection>
);

export const Light = () => (
  <BatchSelection selectedCount={2} colorTheme="light">
    <IconButton onAction={() => {}}>
      <Icon type="csv" />
    </IconButton>
    <IconButton onAction={() => {}}>
      <Icon type="bin" />
    </IconButton>
    <IconButton onAction={() => {}}>
      <Icon type="pdf" />
    </IconButton>
  </BatchSelection>
);

export const White = () => (
  <BatchSelection selectedCount={3} colorTheme="white">
    <IconButton onAction={() => {}}>
      <Icon type="csv" />
    </IconButton>
    <IconButton onAction={() => {}}>
      <Icon type="bin" />
    </IconButton>
    <IconButton onAction={() => {}}>
      <Icon type="pdf" />
    </IconButton>
  </BatchSelection>
);

export const Disabled = () => (
  <BatchSelection selectedCount={4} disabled>
    <IconButton onAction={() => {}}>
      <Icon type="csv" />
    </IconButton>
    <IconButton onAction={() => {}}>
      <Icon type="bin" />
    </IconButton>
    <IconButton onAction={() => {}}>
      <Icon type="pdf" />
    </IconButton>
  </BatchSelection>
);
