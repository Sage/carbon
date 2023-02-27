import React from "react";
import { ComponentStory } from "@storybook/react";

import NavigationBar from "./navigation-bar.component";
import { Menu, MenuDivider, MenuItem } from "../menu";
import Box from "../box";

export const Default: ComponentStory<typeof NavigationBar> = () => (
  <NavigationBar>Example content</NavigationBar>
);

export const DarkTheme: ComponentStory<typeof NavigationBar> = () => (
  <NavigationBar navigationType="dark">Example content</NavigationBar>
);

export const WhiteTheme: ComponentStory<typeof NavigationBar> = () => (
  <NavigationBar navigationType="white">Example content</NavigationBar>
);

export const BlackTheme: ComponentStory<typeof NavigationBar> = () => (
  <NavigationBar navigationType="black">Example content</NavigationBar>
);

export const ExampleWithMenu: ComponentStory<typeof NavigationBar> = () => (
  <NavigationBar>
    <Menu>
      <MenuItem href="#">Menu Item One</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
    </Menu>
  </NavigationBar>
);

export const IsLoading: ComponentStory<typeof NavigationBar> = () => (
  <NavigationBar isLoading>
    <Menu>
      <MenuItem>Menu Item One</MenuItem>
      <MenuItem>Menu Item Two</MenuItem>
    </Menu>
  </NavigationBar>
);

export const WithCustomSpacing: ComponentStory<typeof NavigationBar> = () => (
  <NavigationBar py={2} px={7}>
    <Menu>
      <MenuItem href="#">menu item one</MenuItem>
      <MenuItem href="#">menu item two</MenuItem>
    </Menu>
  </NavigationBar>
);

export const ContentMaxWidthBox: ComponentStory<typeof NavigationBar> = () => (
  <NavigationBar>
    <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
      <Menu display="flex" flex="1">
        <MenuItem flex="1" onClick={() => {}}>
          Menu Item One
        </MenuItem>
        <MenuItem flex="0 0 auto" href="#">
          Menu Item Two
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Menu Item Three">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuDivider />
          <MenuItem icon="settings" href="#">
            Item Submenu Three
          </MenuItem>
          <MenuItem href="#">Item Submenu Four</MenuItem>
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Menu Item Four">
          <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  </NavigationBar>
);
ContentMaxWidthBox.decorators = [
  (Story) => (
    <div style={{ height: 200 }}>
      <Story />
    </div>
  ),
];

export const Sticky: ComponentStory<typeof NavigationBar> = () => (
  <div id="sticky-container" style={{ height: "250px" }}>
    <NavigationBar
      position="sticky"
      orientation="top"
      offset="25px"
      aria-label="header"
    >
      <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
        <Menu display="flex" flex="1">
          <MenuItem flex="1" onClick={() => {}}>
            Menu Item One
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Two
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Menu Item Three">
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
            <MenuDivider />
            <MenuItem icon="settings" href="#">
              Item Submenu Three
            </MenuItem>
            <MenuItem href="#">Item Submenu Four</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Menu Item Four">
            <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </Box>
    </NavigationBar>
    <div
      style={{
        height: "1000px",
        background: "green",
      }}
    />
    <NavigationBar
      position="sticky"
      orientation="bottom"
      offset="25px"
      aria-label="footer"
    >
      <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
        <Menu display="flex" flex="1">
          <MenuItem flex="1" onClick={() => {}}>
            Menu Item One
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Two
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Three
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Four
          </MenuItem>
        </Menu>
      </Box>
    </NavigationBar>
  </div>
);
Sticky.parameters = { docs: { inlineStories: false, iframeHeight: 250 } };

export const Fixed: ComponentStory<typeof NavigationBar> = () => (
  <div>
    <NavigationBar
      position="fixed"
      orientation="top"
      offset="25px"
      aria-label="header"
    >
      <Menu display="flex" flex="1">
        <MenuItem flex="1" onClick={() => {}}>
          Menu Item One
        </MenuItem>
        <MenuItem flex="0 0 auto" href="#">
          Menu Item Two
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Menu Item Three">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuDivider />
          <MenuItem icon="settings" href="#">
            Item Submenu Three
          </MenuItem>
          <MenuItem href="#">Item Submenu Four</MenuItem>
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Menu Item Four">
          <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </NavigationBar>
    <div
      style={{
        height: "1000px",
        background: "green",
      }}
    />
    <NavigationBar
      position="fixed"
      orientation="bottom"
      offset="25px"
      aria-label="footer"
    >
      <Menu display="flex" flex="1">
        <MenuItem flex="1" onClick={() => {}}>
          Menu Item One
        </MenuItem>
        <MenuItem flex="0 0 auto" href="#">
          Menu Item Two
        </MenuItem>
        <MenuItem flex="0 0 auto" href="#">
          Menu Item Three
        </MenuItem>
        <MenuItem flex="0 0 auto" href="#">
          Menu Item Four
        </MenuItem>
      </Menu>
    </NavigationBar>
  </div>
);
Fixed.parameters = {
  docs: { inlineStories: false, iframeHeight: 200 },
  themeProvider: { chromatic: { theme: "sage" } },
};
