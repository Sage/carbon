import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import Form from "../form";
import Textbox from "../textbox";
import Button from "../button";
import Sidebar, { SidebarProps } from ".";
import { SIDEBAR_ALIGNMENTS, SIDEBAR_SIZES } from "./sidebar.config";
import Box from "../box";
import Typography from "../typography";

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: "Sidebar/Test",
  parameters: {
    themeProvider: { chromatic: { theme: "none" } },
  },
  decorators: [
    (Story) => (
      <div style={{ height: "900px" }}>
        <Story />
      </div>
    ),
  ],
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
    width: {
      control: {
        type: "text",
      },
    },
    padding: {
      control: {
        type: "text",
      },
    },
    paddingX: {
      control: {
        type: "text",
      },
    },
    paddingRight: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

export const Default = (args: Partial<SidebarProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const onCancel = () => {
    setIsOpen(false);
    action("cancel")();
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar {...args} aria-label="sidebar" open={isOpen} onCancel={onCancel}>
        <Box mb={2}>
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        <Box mb="3000px">Main content</Box>
      </Sidebar>
    </>
  );
};

Default.storyName = "default";
Default.args = {
  position: "right",
  size: "medium",
  enableBackgroundUI: false,
  disableEscKey: false,
};
Default.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const WithStickyForm: StoryObj<typeof Sidebar> = {
  render: (args) => (
    <Sidebar
      {...args}
      header={<Typography variant="h3">With sticky form</Typography>}
      open
      onCancel={() => {}}
    >
      <Form
        fieldSpacing={2}
        leftSideButtons={<Button buttonType="tertiary">Cancel</Button>}
        saveButton={<Button buttonType="primary">Save</Button>}
        stickyFooter
        onSubmit={(ev) => ev.preventDefault()}
      >
        <Textbox label="Textbox" />
        <Textbox label="Textbox" />
        <Textbox label="Textbox" />
        <Textbox label="Textbox" />
        <Textbox label="Textbox" />
        <Textbox label="Textbox" />
        <Textbox label="Textbox" />
      </Form>
    </Sidebar>
  ),
};

export const WithForm: StoryObj<typeof Sidebar> = {
  render: (args) => (
    <Sidebar
      {...args}
      header={<Typography variant="h3">With form</Typography>}
      open
      onCancel={() => {}}
    >
      <Form
        fieldSpacing={2}
        leftSideButtons={<Button buttonType="tertiary">Cancel</Button>}
        saveButton={<Button buttonType="primary">Save</Button>}
        onSubmit={(ev) => ev.preventDefault()}
      >
        <Textbox label="Textbox" />
        <Textbox label="Textbox" />
        <Textbox label="Textbox" />
        <Textbox label="Textbox" />
        <Textbox label="Textbox" />
        <Textbox label="Textbox" />
        <Textbox label="Textbox" />
      </Form>
    </Sidebar>
  ),
};
