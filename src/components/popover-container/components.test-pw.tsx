import React, { useState } from "react";
import Box from "../box";
import { Select, Option } from "../select";
import AdaptiveSidebar from "../adaptive-sidebar";
import { GlobalHeaderProvider } from "../global-header/__internal__/global-header.context";
import PopoverContainer from "./popover-container.component";

export const Default = ({ title, open }: { title?: string; open: boolean }) => (
  <PopoverContainer title={title} open={open} />
);

export const PopoverContainerOverlappingAdaptiveSidebar = () => (
  <Box height="100vh">
    <GlobalHeaderProvider>
      <PopoverContainer
        title="notifications"
        containerAriaLabel="notifications"
        openButtonAriaLabel="open"
        open
      >
        Notifications content
      </PopoverContainer>
    </GlobalHeaderProvider>
    <AdaptiveSidebar open renderAsModal aria-label="sidebar">
      Sidebar content
    </AdaptiveSidebar>
  </Box>
);

export const PopoverContainerWithSelect = () => {
  const [value, setValue] = useState("");

  return (
    <Box height="100">
      <PopoverContainer
        containerAriaLabel="popover-container"
        openButtonAriaLabel="open"
        title="select example"
      >
        <Select
          label="my select"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          <Option value="red" text="red" />
          <Option value="green" text="green" />
          <Option value="blue" text="blue" />
        </Select>
      </PopoverContainer>
    </Box>
  );
};

export const CoverButton = ({ children }: { children?: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);
  return (
    <Box height="100px">
      <PopoverContainer
        title="Cover Button"
        shouldCoverButton
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        {children || "Contents"}
      </PopoverContainer>
    </Box>
  );
};

export const DisableAnimation = () => (
  <Box height="100px">
    <PopoverContainer
      title="Disabled Animation Popover Container"
      disableAnimation
    >
      Contents
    </PopoverContainer>
  </Box>
);
