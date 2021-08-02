import React, { useState } from "react";
import { select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Menu } from ".";
import MenuItem from "./menu-item";
import MenuFullscreen from "./menu-full-screen";

export default {
  title: "Design System/Menu/Test",
  component: MenuFullscreen,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: false,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(true);
  const menuType = select("menuType", ["light", "dark"], "light");
  const startPosition = select("startPosition", ["left", "right"], "left");

  const onClose = (evt) => {
    setIsOpen(false);
    action("close icon clicked")(evt);
  };

  const handleOpen = () => {
    setIsOpen(true);
    action("open")();
  };

  return (
    <Menu menuType={menuType}>
      <MenuItem onClick={handleOpen}>Menu</MenuItem>
      <MenuFullscreen
        startPosition={startPosition}
        isOpen={isOpen}
        onClose={onClose}
      >
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem
          onClick={(evt) => action("submenu item clicked")(evt)}
          submenu="Menu Item Two"
        >
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
        </MenuItem>
        <MenuItem href="#">Menu Item Three</MenuItem>
        <MenuItem href="#">Menu Item Four</MenuItem>
        <MenuItem submenu="Menu Item Five">
          <MenuItem href="#">Submenu Item One</MenuItem>
          <MenuItem href="#">Submenu Item Two</MenuItem>
        </MenuItem>
        <MenuItem href="#">Menu Item Six</MenuItem>
      </MenuFullscreen>
    </Menu>
  );
};

Default.story = {
  name: "default",
};
