import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import BatchSelection from ".";
import IconButton from "../icon-button";
import Icon from "../icon";
import Button from "../button";
import Link from "../link";

const meta: Meta<typeof BatchSelection> = {
  title: "Batch Selection",
  component: BatchSelection,
};

export default meta;
type Story = StoryObj<typeof BatchSelection>;

export const Default: Story = () => {
  return (
    <BatchSelection selectedCount={0}>
      <Button size="small" mx={1} buttonType="secondary">
        Select All 38 items
      </Button>
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
    </BatchSelection>
  );
};
Default.storyName = "Default";

export const Dark: Story = () => {
  return (
    <BatchSelection selectedCount={1} colorTheme="dark">
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
    </BatchSelection>
  );
};
Dark.storyName = "Dark";

export const Light: Story = () => {
  return (
    <BatchSelection selectedCount={2} colorTheme="light">
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
    </BatchSelection>
  );
};
Light.storyName = "Light";

export const White: Story = () => {
  return (
    <BatchSelection selectedCount={3} colorTheme="white">
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
    </BatchSelection>
  );
};
White.storyName = "White";

export const Disabled: Story = () => {
  return (
    <BatchSelection selectedCount={4} disabled>
      <IconButton onClick={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onClick={() => {}}>
        <Icon type="pdf" />
      </IconButton>
      <Button iconType="home" mr="3px">
        Button
      </Button>
      <Link icon="admin">This is a link</Link>
      <Link icon="admin" onClick={() => {}}>
        This is actually a button but looks like a link
      </Link>
    </BatchSelection>
  );
};
Disabled.storyName = "Disabled";
