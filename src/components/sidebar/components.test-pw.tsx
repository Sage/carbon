import React, { useState, useRef } from "react";

import Typography from "../typography";
import Button from "../button";
import Sidebar, { SidebarProps } from ".";
import Box from "../box";
import Form from "../form";
import Toast from "../toast";
import Textbox from "../textbox";

export const ControlledSidebar = ({
  open = true,
  restoreFocusOnClose,
  onCancel: onCancelProp,
  ...props
}: Partial<SidebarProps> & {
  onCancel?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const handleCancel = () => {
    onCancelProp?.();
    setIsOpen(false);
  };
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        aria-label="sidebar"
        open={isOpen}
        onCancel={handleCancel}
        restoreFocusOnClose={restoreFocusOnClose}
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

export const NestedSidebars = () => {
  const [isFirstSidebarOpen, setIsFirstSidebarOpen] = useState(false);
  const [isNestedSidebarOpen, setIsNestedSidebarOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsFirstSidebarOpen(true)}>
        Open First Sidebar
      </Button>
      <Sidebar
        open={isFirstSidebarOpen}
        onCancel={() => setIsFirstSidebarOpen(false)}
      >
        <Button onClick={() => setIsNestedSidebarOpen(true)}>
          Open Nested Sidebar
        </Button>
        <Sidebar
          open={isNestedSidebarOpen}
          onCancel={() => setIsNestedSidebarOpen(false)}
        >
          <Box mb={2}>
            <Button buttonType="primary">Test</Button>
            <Button buttonType="secondary" ml={2}>
              Last
            </Button>
          </Box>
        </Sidebar>
      </Sidebar>
    </>
  );
};

export const SidebarWithBackgroundScrollTarget = () => {
  const [value, setValue] = useState("");

  return (
    <Box height="2000px" position="relative">
      <Box
        data-element="test-box"
        height="100px"
        position="absolute"
        bottom="0px"
      >
        I should not be scrolled into view
      </Box>
      <Sidebar open onCancel={() => {}}>
        <Textbox
          label="textbox"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Sidebar>
    </Box>
  );
};

export const SidebarWithBackgroundScrollTargetAndFocusableContainers = () => {
  const toast1Ref = useRef(null);
  const toast2Ref = useRef(null);
  const [value, setValue] = useState("");

  return (
    <Box height="2000px" position="relative">
      <Box
        data-element="test-box"
        height="100px"
        position="absolute"
        bottom="0px"
      >
        I should not be scrolled into view
      </Box>
      <Sidebar
        open
        onCancel={() => {}}
        focusableContainers={[toast1Ref, toast2Ref]}
      >
        <Textbox
          label="textbox"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
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

export const SidebarWithFocusableContainer = (props: Partial<SidebarProps>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const toastRef = useRef(null);
  const CUSTOM_SELECTOR = "button, .focusable-container input";
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  return (
    <>
      <Sidebar
        open={isSidebarOpen}
        onCancel={() => setIsSidebarOpen(false)}
        header={<Typography variant="h3">Sidebar header</Typography>}
        focusableContainers={[toastRef]}
        focusableSelectors={CUSTOM_SELECTOR}
        {...props}
      >
        <Box className="focusable-container">
          <Textbox
            label="First Name"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </Box>
        <Box>
          <Textbox
            label="Surname"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
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
        data-role="toast"
      >
        Toast Message
      </Toast>
    </>
  );
};

export const SidebarWithStickyForm = () => (
  <Sidebar open onCancel={() => {}} header="Sidebar with sticky footer">
    <Form
      saveButton={<Button buttonType="primary">Save</Button>}
      stickyFooter
      onSubmit={(event) => event.preventDefault()}
    >
      <Box height="1200px">Long content</Box>
    </Form>
  </Sidebar>
);

export const SidebarWithTallStickyFormFooter = () => (
  <Sidebar open onCancel={() => {}} header="Sidebar with tall sticky footer">
    <Form
      footerChildren={<Box height="128px">Footer content</Box>}
      stickyFooter
    >
      content
    </Form>
  </Sidebar>
);
