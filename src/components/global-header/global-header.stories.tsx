import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";

import NavigationBar from "../navigation-bar";
import {
  Menu,
  MenuFullscreen,
  MenuItem,
  MenuSegmentTitle,
  MenuDivider,
} from "../menu";
import GlobalHeader from "./global-header.component";
import useMediaQuery from "../../hooks/useMediaQuery";
import carbonLogo from "../../../logo/carbon-logo.png";

export const Default: ComponentStory<typeof GlobalHeader> = () => (
  <GlobalHeader>Example content</GlobalHeader>
);

export const WithLogo: ComponentStory<typeof GlobalHeader> = () => {
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;
  return <GlobalHeader logo={<Logo />}>Example content</GlobalHeader>;
};

export const BasicMenu: ComponentStory<typeof GlobalHeader> = () => {
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;
  return (
    <GlobalHeader logo={<Logo />}>
      <Menu menuType="black" display="flex" flex="1">
        <MenuItem flex="1" submenu="Product Switcher">
          <MenuItem>Product A</MenuItem>
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Parent Menu 1">
          <MenuItem href="#">Child Item 1</MenuItem>
          <MenuSegmentTitle>Segment title</MenuSegmentTitle>
          <MenuItem href="#">Child Item 2</MenuItem>
          <MenuItem href="#">Child Item 3</MenuItem>
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Parent Menu 2">
          <MenuItem>Child Item</MenuItem>
        </MenuItem>
      </Menu>
    </GlobalHeader>
  );
};

export const ResponsiveMenu: ComponentStory<typeof GlobalHeader> = () => {
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;
  const fullscreenViewBreakPoint = useMediaQuery("(max-width: 599px)");
  const [isListViewOpen, setIsListViewOpen] = useState(false);
  const menuItems = [
    <MenuItem
      key="product-switcher"
      minWidth="160px"
      flex="1"
      submenu="Product Switcher"
    >
      <MenuItem>Product A</MenuItem>
    </MenuItem>,
    <MenuItem
      key="parent-menu-1"
      minWidth="145px"
      flex="0 0 auto"
      submenu="Parent Menu 1"
    >
      <MenuItem href="#">Child Item 1</MenuItem>
      <MenuSegmentTitle>Segment title</MenuSegmentTitle>
      <MenuItem href="#">Child Item 2</MenuItem>
      <MenuItem href="#">Child Item 3</MenuItem>
    </MenuItem>,
    <MenuItem
      key="parent-menu-2"
      minWidth="145px"
      flex="0 0 auto"
      submenu="Parent Menu 2"
    >
      <MenuItem>Child Item</MenuItem>
    </MenuItem>,
  ];
  return (
    <GlobalHeader logo={<Logo />}>
      <Menu menuType="black" display="flex" flex="1">
        {fullscreenViewBreakPoint ? (
          <>
            <MenuItem
              onClick={(ev) => {
                ev.preventDefault();
                setIsListViewOpen(true);
              }}
            >
              Menu
            </MenuItem>
            <MenuFullscreen
              isOpen={isListViewOpen}
              onClose={() => setIsListViewOpen(false)}
            >
              {menuItems}
            </MenuFullscreen>
          </>
        ) : (
          menuItems
        )}
      </Menu>
    </GlobalHeader>
  );
};

export const GlobalLocalNavBarLayout: ComponentStory<
  typeof GlobalHeader
> = () => {
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;
  return (
    <>
      <GlobalHeader logo={<Logo />}>
        <Menu menuType="black" display="flex" flex="1">
          <MenuItem flex="1" submenu="Product Switcher">
            <MenuItem href="#">Product A</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Parent Menu 1">
            <MenuItem href="#">Child Item 1</MenuItem>
            <MenuItem href="#">Child Item 2</MenuItem>
            <MenuItem href="#">Child Item 3</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Parent Menu 2">
            <MenuItem>Child Item</MenuItem>
          </MenuItem>
        </Menu>
      </GlobalHeader>
      <NavigationBar position="fixed" orientation="top" offset="40px">
        <Menu display="flex" flex="1">
          <MenuItem flex="1">Menu Item One</MenuItem>
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
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </NavigationBar>
    </>
  );
};
GlobalLocalNavBarLayout.parameters = {
  docs: { inlineStories: false, iframeHeight: 250 },
};
