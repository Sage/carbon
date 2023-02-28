/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import { Menu } from ".";
import MenuItem from "./menu-item";
import MenuFullscreen from "./menu-full-screen";
import Search from "../search";

export default {
  title: "Menu/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const MenuFullScreenStory = ({
  menuType,
  startPosition,
  searchVariant,
  searchButton,
}) => {
  const [isOpen, setIsOpen] = useState(true);
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
        <MenuItem variant="alternate">
          <Search
            placeholder="Search..."
            variant={searchVariant}
            defaultValue=""
            searchButton={searchButton}
          />
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

MenuFullScreenStory.storyName = "fullscreen menu";
MenuFullScreenStory.story = {
  args: {
    menuType: "light",
    startPosition: "left",
    searchVariant: "default",
    searchButton: true,
  },
  argTypes: {
    menuType: {
      options: ["light", "dark"],
      control: {
        type: "select",
      },
    },
    startPosition: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
    searchVariant: {
      options: ["default", "dark"],
      control: {
        type: "select",
      },
    },
    searchButton: {
      options: [true, false],
      control: {
        type: "boolean",
      },
    },
  },
};

export const LongLabelsStory = () => {
  return (
    <Menu>
      <MenuItem submenu="Parent Menu A">
        <MenuItem>Child A</MenuItem>
        <MenuItem>Child B with very long label</MenuItem>
        <MenuItem>Child C</MenuItem>
      </MenuItem>
      <MenuItem submenu="Parent Menu B with very long label">
        <MenuItem>Child A</MenuItem>
        <MenuItem>Child B</MenuItem>
        <MenuItem>Child C</MenuItem>
      </MenuItem>
    </Menu>
  );
};

LongLabelsStory.storyName = "submenus with long item labels";
