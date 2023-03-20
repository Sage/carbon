/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import { Menu } from ".";
import MenuItem from "./menu-item";
import MenuFullscreen from "./menu-full-screen";
import MenuDivider from "./menu-divider/menu-divider.component";
import MenuSegmentTitle from "./menu-segment-title/menu-segment-title.component";
import Search from "../search";
import Box from "../box";
import Typography from "../typography";
import ScrollableBlock from "./scrollable-block/scrollable-block.component";
import useMediaQuery from "../../hooks/useMediaQuery";

export default {
  title: "Menu/Test",
  includeStories: "Default",
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

export const MenuComponent = ({ ...props }) => {
  return (
    <Box mb={150}>
      {["white", "light", "dark", "black"].map((menuType) => (
        <div key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType} display="flex" {...props}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuDivider {...props} />
              <MenuItem icon="settings" href="#">
                Item Submenu Three
              </MenuItem>
              <MenuItem href="#">Item Submenu Four</MenuItem>
            </MenuItem>
            <MenuItem submenu="Menu Item Four" onClick={() => {}}>
              <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
              <MenuSegmentTitle>segment title</MenuSegmentTitle>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </div>
      ))}
    </Box>
  );
};

export const MenuComponentScrollable = ({ ...props }) => {
  return (
    <Box mb={150}>
      {["white", "light", "dark", "black"].map((menuType) => (
        <div key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <ScrollableBlock height="200px" {...props}>
                <MenuItem href="#">Item Submenu One</MenuItem>
                <MenuItem href="#">Item Submenu Two</MenuItem>
                <MenuItem href="#">Item Submenu Three</MenuItem>
                <MenuItem href="#">Item Submenu Four</MenuItem>
                <MenuItem href="#">Item Submenu Five</MenuItem>
                <MenuItem href="#">Item Submenu Six</MenuItem>
                <MenuItem href="#">Item Submenu Seven</MenuItem>
                <MenuItem href="#">Item Submenu Eight</MenuItem>
                <MenuItem href="#">Item Submenu Nine</MenuItem>
                <MenuItem href="#">Item Submenu Ten</MenuItem>
                <MenuItem href="#">Item Submenu Eleven</MenuItem>
                <MenuItem href="#">Item Submenu Twelve</MenuItem>
              </ScrollableBlock>
            </MenuItem>
            <MenuItem submenu="Menu Item Four">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <ScrollableBlock variant="alternate" height="200px">
                <MenuItem href="#">Item Submenu Three</MenuItem>
                <MenuItem href="#">Item Submenu Four</MenuItem>
                <MenuItem href="#">Item Submenu Five</MenuItem>
                <MenuItem href="#">Item Submenu Six</MenuItem>
                <MenuItem href="#">Item Submenu Seven</MenuItem>
                <MenuItem href="#">Item Submenu Eight</MenuItem>
                <MenuItem href="#">Item Submenu Nine</MenuItem>
                <MenuItem href="#">Item Submenu Ten</MenuItem>
                <MenuItem href="#">Item Submenu Eleven</MenuItem>
                <MenuItem href="#">Item Submenu Twelve</MenuItem>
              </ScrollableBlock>
            </MenuItem>
          </Menu>
        </div>
      ))}
    </Box>
  );
};

export const MenuComponentSearch = () => {
  return (
    <Box mb={150}>
      {["dark", "white", "light", "black"].map((menuType) => (
        <div key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem submenu="Menu One">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuDivider size="large" />
              <MenuSegmentTitle>segment title</MenuSegmentTitle>
              <MenuItem variant="alternate">
                <Search
                  placeholder="Dark variant"
                  variant="dark"
                  defaultValue=""
                />
              </MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuItem href="#">Item Submenu Three</MenuItem>
            </MenuItem>
          </Menu>
        </div>
      ))}
    </Box>
  );
};

export const MenuComponentFullScreen = ({ ...props }) => {
  const [menuOpen, setMenuOpen] = React.useState({
    light: false,
    dark: false,
    white: false,
    black: false,
  });
  const fullscreenViewBreakPoint = useMediaQuery("(max-width: 1200px)");

  const responsiveMenuItems = (startPosition, menus) => {
    if (fullscreenViewBreakPoint) {
      return [
        <MenuItem
          onClick={() => setMenuOpen((state) => ({ ...state, [menus]: true }))}
        >
          Menu
        </MenuItem>,
        <MenuFullscreen
          startPosition={startPosition}
          isOpen={menuOpen[menus]}
          onClose={() => setMenuOpen((state) => ({ ...state, [menus]: false }))}
          {...props}
        >
          <MenuItem href="#">Menu Item One</MenuItem>
          <MenuItem onClick={() => {}} submenu="Menu Item Two">
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
        </MenuFullscreen>,
      ];
    }

    return [
      <MenuItem href="#">Menu Item One</MenuItem>,
      <MenuItem submenu="Menu Item Two">
        <MenuItem href="#">Submenu Item One</MenuItem>
        <MenuItem href="#">Submenu Item Two</MenuItem>
      </MenuItem>,
      <MenuItem href="#">Menu Item Three</MenuItem>,
      <MenuItem href="#">Menu Item Four</MenuItem>,
      <MenuItem submenu="Menu Item Five">
        <MenuItem href="#">Submenu Item One</MenuItem>
        <MenuItem href="#">Submenu Item Two</MenuItem>
      </MenuItem>,
      <MenuItem href="#">Menu Item Six</MenuItem>,
    ];
  };

  return [
    <Box>
      {["white", "light", "dark", "black"].map((menuType) => (
        <div key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType} {...props}>
            {React.Children.map(
              responsiveMenuItems("left", menuType),
              (items) => items
            )}
          </Menu>
        </div>
      ))}
    </Box>,
  ];
};

export const MenuComponentItems = ({ ...props }) => {
  return (
    <Box mb={150}>
      <Typography textTransform="capitalize" my={2} />
      <Menu menuType="white" display="flex">
        <MenuItem submenu="Menu Item One" submenuDirection="right" {...props}>
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuDivider {...props} />
          <MenuItem icon="settings" href="#">
            Item Submenu Three
          </MenuItem>
          <MenuItem href="#">Item Submenu Four</MenuItem>
        </MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem
          submenu="Menu Item Three"
          submenuDirection="left"
          onClick={() => {}}
        >
          <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
          <MenuSegmentTitle>segment title</MenuSegmentTitle>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
};
