import React, { useState } from "react";

import Typography from "../../../src/components/typography";
import Button from "../button";
import Sidebar, { SidebarProps } from ".";
import Box from "../box";
import Toast from "../toast";
import Textbox from "../textbox";

export const Default = ({
  open = true,
  restoreFocusOnClose,
  onCancel: onCancelProp,
}: {
  open?: boolean;
  restoreFocusOnClose?: boolean;
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

export const SidebarComponentFocusable = (props: Partial<SidebarProps>) => {
  const [setIsDialogOpen] = React.useState(false);
  const [isToastOpen, setIsToastOpen] = React.useState(false);
  const toastRef = React.useRef(null);
  const CUSTOM_SELECTOR = "button, .focusable-container input";
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");

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
