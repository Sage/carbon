import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import Button from "../button";
import Sidebar from ".";
import { SIDEBAR_ALIGNMENTS, SIDEBAR_SIZES } from "./sidebar.config";

export default {
  component: Sidebar,
  title: "Sidebar/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    open: { control: { disable: true } },
    "aria-label": { table: { disable: true }, control: { disable: true } },
    "aria-labelledby": {
      table: { disable: true },
      control: { disable: true },
    },
    "aria-describedby": {
      table: { disable: true },
      control: { disable: true },
    },
    children: { table: { disable: true }, control: { disable: true } },
    header: { table: { disable: true }, control: { disable: true } },
    role: { table: { disable: true }, control: { disable: true } },
    focusableContainers: {
      table: { disable: true },
      control: { disable: true },
    },
    position: {
      options: SIDEBAR_ALIGNMENTS,
      control: {
        type: "select",
      },
    },
    size: {
      options: SIDEBAR_SIZES,
      control: {
        type: "select",
      },
    },
    enableBackgroundUI: {
      control: {
        type: "boolean",
      },
    },
    disableEscKey: {
      control: {
        type: "boolean",
      },
    },
  },
};

export const Default = (args) => {
  const [isOpen, setIsOpen] = useState(true);
  const onCancel = () => {
    setIsOpen(false);
    action("cancel")();
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar {...args} aria-label="sidebar" open={isOpen} onCancel={onCancel}>
        <div>
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
            Last
          </Button>
        </div>
        <div style={{ marginBottom: 3000 }}>Main content</div>
      </Sidebar>
    </>
  );
};

Default.args = {
  position: "right",
  size: "medium",
  enableBackgroundUI: false,
  disableEscKey: false,
};
