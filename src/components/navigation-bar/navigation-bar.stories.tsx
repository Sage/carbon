import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import NavigationBar from "./navigation-bar.component";
import { Menu, MenuDivider, MenuItem } from "../menu";
import Box from "../box";

const styledSystemProps = generateStyledSystemProps({
  padding: true,
  flexBox: true,
});

const meta: Meta<typeof NavigationBar> = {
  title: "Navigation Bar",
  component: NavigationBar,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof NavigationBar>;

export const Default: Story = () => {
  return <NavigationBar>Example content</NavigationBar>;
};
Default.storyName = "Default";

export const DarkTheme: Story = () => {
  return <NavigationBar navigationType="dark">Example content</NavigationBar>;
};
DarkTheme.storyName = "Dark Theme";

export const WhiteTheme: Story = () => {
  return <NavigationBar navigationType="white">Example content</NavigationBar>;
};
WhiteTheme.storyName = "White Theme";

export const BlackTheme: Story = () => {
  return <NavigationBar navigationType="black">Example content</NavigationBar>;
};
BlackTheme.storyName = "Black Theme";

export const ExampleWithMenu: Story = () => {
  return (
    <NavigationBar>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
      </Menu>
    </NavigationBar>
  );
};
ExampleWithMenu.storyName = "Example with Menu";

export const IsLoading: Story = () => {
  return (
    <NavigationBar isLoading>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
      </Menu>
    </NavigationBar>
  );
};
IsLoading.storyName = "Is Loading";

export const WithCustomSpacing: Story = () => {
  return (
    <NavigationBar py={2} px={7}>
      <Menu>
        <MenuItem href="#">menu item one</MenuItem>
        <MenuItem href="#">menu item two</MenuItem>
      </Menu>
    </NavigationBar>
  );
};
WithCustomSpacing.storyName = "With Custom Spacing";

export const ContentMaxWidthBox: Story = () => {
  return (
    <NavigationBar>
      <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
        <Menu flex="1">
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
};
ContentMaxWidthBox.storyName = "Content Max Width Box";
ContentMaxWidthBox.decorators = [
  (ThisStory) => (
    <div style={{ height: 200 }}>
      <ThisStory />
    </div>
  ),
];

export const Sticky: Story = () => {
  return (
    <Box id="sticky-container" height={250}>
      <NavigationBar
        position="sticky"
        orientation="top"
        offset="25px"
        aria-label="header"
      >
        <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
          <Menu flex="1">
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
      <Box height={1000} backgroundColor="green" />
      <NavigationBar
        position="sticky"
        orientation="bottom"
        offset="25px"
        aria-label="footer"
      >
        <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
          <Menu flex="1">
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
    </Box>
  );
};
Sticky.storyName = "Sticky";
Sticky.parameters = { docs: { inlineStories: false, iframeHeight: 250 } };

export const Fixed: Story = () => {
  return (
    <>
      <NavigationBar
        position="fixed"
        orientation="top"
        offset="25px"
        aria-label="header"
      >
        <Menu flex="1">
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
      <Box height={1000} backgroundColor="green" />
      <NavigationBar
        position="fixed"
        orientation="bottom"
        offset="25px"
        aria-label="footer"
      >
        <Menu flex="1">
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
    </>
  );
};
Fixed.storyName = "Fixed";
Fixed.parameters = {
  docs: { inlineStories: false, iframeHeight: 200 },
  themeProvider: { chromatic: { theme: "sage" } },
};
