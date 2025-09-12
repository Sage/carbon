import React, { useState, useRef } from "react";

import Typography from "../../../src/components/typography";
import Button from "../button";
import Sidebar, { SidebarProps } from ".";
import Box from "../box";
import Toast from "../toast";
import Textbox from "../textbox";
import Dialog from "../dialog";

export const Default = ({
  open = true,
  restoreFocusOnClose,
}: {
  open?: boolean;
  restoreFocusOnClose?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(open);
  const onCancel = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        aria-label="sidebar"
        open={isOpen}
        onCancel={onCancel}
        restoreFocusOnClose={restoreFocusOnClose}
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

export const DefaultNested = () => {
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

export const SidebarComponentWithOnCancel = (props: Partial<SidebarProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOnCancel = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Sidebar
        aria-label="sidebar"
        open={isOpen}
        position="right"
        size="medium"
        onCancel={handleOnCancel}
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

export const SidebarComponentWithHeading = (props: Partial<SidebarProps>) => {
  return (
    <>
      <Sidebar
        aria-label="sidebar"
        open
        position="right"
        size="medium"
        header={<Typography variant="h3">Sidebar Header</Typography>}
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

export const SidebarComponentWithDarkHeading = (
  props: Partial<SidebarProps>,
) => {
  return (
    <>
      <Sidebar
        aria-label="sidebar"
        open
        position="right"
        size="medium"
        header={
          <Typography variant="h3" color="white">
            Sidebar Header
          </Typography>
        }
        headerVariant="dark"
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

export const SidebarComponentWithSubHeading = (
  props: Partial<SidebarProps>,
) => {
  return (
    <>
      <Sidebar
        aria-label="sidebar"
        open
        position="right"
        size="medium"
        header={<Typography variant="h3">Sidebar Header</Typography>}
        subHeader={
          <Button iconType="chevron_left_thick" buttonType="tertiary">
            Action
          </Button>
        }
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
      <Box
        data-element="test-box"
        height="100px"
        position="absolute"
        bottom="0px"
      >
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
        data-role="toast"
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
