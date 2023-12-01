import React, { useState, useRef } from "react";
import { action } from "@storybook/addon-actions";
import Typography from "../../../src/components/typography";
import Button from "../button";
import Sidebar, { SidebarProps } from ".";
import { SIDEBAR_ALIGNMENTS, SIDEBAR_SIZES } from "./sidebar.config";
import Box from "../box";
import Toast from "../toast";
import Textbox from "../textbox";
import Dialog from "../dialog";

export default {
  component: Sidebar,
  includeStories: ["Default"],
  title: "Sidebar/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
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
    width: {
      control: {
        type: "text",
      },
    },
  },
};

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

export const SidebarComponent = (props: Partial<SidebarProps>) => {
  return (
    <>
      <Sidebar
        aria-label="sidebar"
        open
        position="right"
        size="medium"
        {...props}
      >
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

export const SidebarBackgroundScrollTestComponent = () => {
  return (
    <Box height="2000px" position="relative">
      <Box height="100px" id="bottom-box" position="absolute" bottom="0px">
        I should not be scrolled into view
      </Box>
      <Sidebar open onCancel={() => {}}>
        <Textbox label="textbox" />
      </Sidebar>
    </Box>
  );
};

export const SidebarBackgroundScrollWithOtherFocusableContainers = () => {
  const toast1Ref = useRef(null);
  const toast2Ref = useRef(null);
  return (
    <Box height="2000px" position="relative">
      <Box height="100px" id="bottom-box" position="absolute" bottom="0px">
        I should not be scrolled into view
      </Box>
      <Sidebar
        open
        onCancel={() => {}}
        focusableContainers={[toast1Ref, toast2Ref]}
      >
        <Textbox label="textbox" />
      </Sidebar>
      <Toast open onDismiss={() => {}} ref={toast1Ref} targetPortalId="stacked">
        Toast message 1
      </Toast>
      <Toast open onDismiss={() => {}} ref={toast2Ref} targetPortalId="stacked">
        Toast message 2
      </Toast>
    </Box>
  );
};

export const SidebarComponentFocusable = (props: Partial<SidebarProps>) => {
  const [setIsDialogOpen] = React.useState(false);
  const [isToastOpen, setIsToastOpen] = React.useState(false);
  const toastRef = React.useRef(null);
  const CUSTOM_SELECTOR = "button, .focusable-container input";
  return (
    <>
      <Sidebar
        open
        onCancel={() => setIsDialogOpen}
        header={<Typography variant="h3">Sidebar header</Typography>}
        focusableContainers={[toastRef]}
        focusableSelectors={CUSTOM_SELECTOR}
        {...props}
      >
        <Box className="focusable-container">
          <Textbox label="First Name" />
        </Box>
        <Box>
          <Textbox label="Surname" />
        </Box>
        <Box className="focusable-container">
          <Button
            buttonType="primary"
            data-element="open-toast"
            onClick={() => setIsToastOpen(true)}
          >
            Show toast
          </Button>
        </Box>
      </Sidebar>
      <Toast
        open={isToastOpen}
        onDismiss={() => setIsToastOpen(false)}
        ref={toastRef}
        targetPortalId="stacked"
        data-element="toast"
      >
        Toast Message
      </Toast>
    </>
  );
};

export const TopModalOverride = () => {
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <>
      <Sidebar
        open={isOpen1}
        onCancel={() => setIsOpen1(false)}
        header="Sidebar"
        topModalOverride
      >
        foo
      </Sidebar>
      <Dialog open={isOpen2} onCancel={() => setIsOpen2(false)} title="Dialog">
        foo
      </Dialog>
    </>
  );
};
