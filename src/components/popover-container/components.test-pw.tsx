import React, { useState } from "react";
import Box from "../box";
import { Select, Option } from "../select";
import AdaptiveSidebar from "../adaptive-sidebar";
import { GlobalHeaderProvider } from "../global-header/__internal__/global-header.context";
import PopoverContainer from "./popover-container.component";
import { Menu, MenuItem } from "../menu";

export const Default = ({ title, open }: { title?: string; open: boolean }) => (
  <PopoverContainer title={title} open={open} />
);

export const PopoverContainerOverlappingAdaptiveSidebar = () => (
  <Box height="100vh">
    <GlobalHeaderProvider>
      <PopoverContainer
        title="notifications"
        containerAriaLabel="notifications"
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

export const MenuItemAsOpenComponent = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav>
      <Menu menuType="black">
        <MenuItem href="#">Home</MenuItem>
        <MenuItem href="#">About Me</MenuItem>
        <MenuItem href="#">My todolist</MenuItem>
        <PopoverContainer
          containerAriaLabel="notifications"
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          renderOpenComponent={({ onClick }) => (
            <MenuItem onClick={onClick}>Notifications</MenuItem>
          )}
        >
          You are all caught up!
        </PopoverContainer>
      </Menu>
    </nav>
  );
};

export const MenuItemAsOpenComponentInSubmenu = () => (
  <nav>
    <Menu menuType="black">
      <MenuItem clickToOpen submenu="More">
        <MenuItem href="#">Submenu item</MenuItem>
        <PopoverContainer
          containerAriaLabel="notifications"
          renderOpenComponent={({ onClick }) => (
            <MenuItem onClick={onClick}>Notifications</MenuItem>
          )}
        >
          You are all caught up!
        </PopoverContainer>
      </MenuItem>
    </Menu>
  </nav>
);