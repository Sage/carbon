import React, { useState, useRef } from "react";

import Typography from "../typography";
import Button from "../button/__next__";
import Sidebar, { SidebarProps } from ".";
import Box from "../box";
import Form from "../form";
import Message from "../message";
import Portal from "../portal";
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
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
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
            <Button variantType="primary">Test</Button>
            <Button variantType="secondary" ml={2}>
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
  const message1Ref = useRef(null);
  const message2Ref = useRef(null);
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
        focusableContainers={[message1Ref, message2Ref]}
      >
        <Textbox
          label="textbox"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Sidebar>
      <Portal inertOptOut>
        <Box ref={message1Ref} position="fixed" top="0px">
          <Message open onDismiss={() => {}}>
            Message 1
          </Message>
        </Box>
        <Box ref={message2Ref} position="fixed" top="100px">
          <Message open onDismiss={() => {}}>
            Message 2
          </Message>
        </Box>
      </Portal>
    </Box>
  );
};

export const SidebarWithFocusableContainer = (props: Partial<SidebarProps>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const messageRef = useRef(null);
  const CUSTOM_SELECTOR = "button, .focusable-container input";
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

  return (
    <>
      <Sidebar
        open={isSidebarOpen}
        onCancel={() => setIsSidebarOpen(false)}
        header={<Typography variant="h3">Sidebar header</Typography>}
        focusableContainers={[messageRef]}
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
            variantType="primary"
            data-element="open-message"
            onClick={() => setIsMessageOpen(true)}
          >
            Show message
          </Button>
        </Box>
      </Sidebar>
      <Portal inertOptOut>
        <Message
          open={isMessageOpen}
          onDismiss={() => setIsMessageOpen(false)}
          ref={messageRef}
          data-role="message"
        >
          Message
        </Message>
      </Portal>
    </>
  );
};

export const SidebarWithStickyForm = (props: Partial<SidebarProps> = {}) => (
  <Sidebar
    open
    onCancel={() => {}}
    header="Sidebar with sticky footer"
    {...props}
  >
    <Form
      saveButton={<Button variantType="primary">Save</Button>}
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

export const SidebarWithStickyCustomFooter = (
  props: Partial<SidebarProps> = {},
) => (
  <Sidebar
    open
    onCancel={() => {}}
    header="Sidebar with custom sticky footer"
    footer={<Button variantType="primary">Save</Button>}
    stickyFooter
    {...props}
  >
    <Box height="1200px">Long content</Box>
  </Sidebar>
);

export const SidebarWithShortStickyCustomFooter = () => (
  <Sidebar
    open
    onCancel={() => {}}
    header="Sidebar with short custom sticky footer"
    footer={<Button variantType="primary">Save</Button>}
    stickyFooter
  >
    Short content
  </Sidebar>
);

export const SidebarWithTallStickyCustomFooter = () => (
  <Sidebar
    open
    onCancel={() => {}}
    header="Sidebar with tall custom sticky footer"
    footer={<Box height="128px">Footer content</Box>}
    stickyFooter
  >
    Short content
  </Sidebar>
);
