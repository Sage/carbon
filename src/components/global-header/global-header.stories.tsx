import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

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

const styledSystemProps = generateStyledSystemProps({
  padding: true,
  flexBox: true,
});

const meta: Meta<typeof GlobalHeader> = {
  title: "Global Header",
  component: GlobalHeader,
  argTypes: {
    ...styledSystemProps,
  },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", height: "250px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof GlobalHeader>;

export const Default: Story = () => {
  return (
    <GlobalHeader aria-label="Default global header component">
      Example content
    </GlobalHeader>
  );
};
Default.storyName = "Default";

export const WithLogo: Story = () => {
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;

  return (
    <GlobalHeader
      logo={<Logo />}
      aria-label="Global header component with logo"
    >
      Example content
    </GlobalHeader>
  );
};
WithLogo.storyName = "With Logo";

export const BasicMenu: Story = () => {
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;

  return (
    <GlobalHeader
      logo={<Logo />}
      aria-label="Global header component with basic menu"
    >
      <Menu menuType="black" flex="1">
        <MenuItem flex="1" submenu="Product Switcher">
          <MenuItem href="#">Product A</MenuItem>
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Parent Menu 1">
          <MenuItem href="#">Child Item 1</MenuItem>
          <MenuSegmentTitle text="segment title">
            <MenuItem href="#">Child Item 2</MenuItem>
            <MenuItem href="#">Child Item 3</MenuItem>
          </MenuSegmentTitle>
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Parent Menu 2">
          <MenuItem href="#">Child Item</MenuItem>
        </MenuItem>
      </Menu>
    </GlobalHeader>
  );
};
BasicMenu.storyName = "Basic Menu";

export const ResponsiveMenu: Story = () => {
  const fullscreenViewBreakPoint = useMediaQuery("(max-width: 599px)");
  const [isListViewOpen, setIsListViewOpen] = useState(false);
  const menuItems = [
    <MenuItem
      key="product-switcher"
      minWidth="160px"
      flex="1"
      submenu="Product Switcher"
    >
      <MenuItem href="#">Product A</MenuItem>
    </MenuItem>,
    <MenuItem
      key="parent-menu-1"
      minWidth="145px"
      flex="0 0 auto"
      submenu="Parent Menu 1"
    >
      <MenuItem href="#">Child Item 1</MenuItem>
      <MenuSegmentTitle text="segment title">
        <MenuItem href="#">Child Item 2</MenuItem>
        <MenuItem href="#">Child Item 3</MenuItem>
      </MenuSegmentTitle>
    </MenuItem>,
    <MenuItem
      key="parent-menu-2"
      minWidth="145px"
      flex="0 0 auto"
      submenu="Parent Menu 2"
    >
      <MenuItem href="#">Child Item</MenuItem>
    </MenuItem>,
  ];
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;

  return (
    <GlobalHeader
      logo={<Logo />}
      aria-label="Global header component with responsive menu"
    >
      <Menu menuType="black" flex="1">
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
ResponsiveMenu.storyName = "Responsive Menu";

export const GlobalLocalNavBarLayout: Story = () => {
  const Logo = () => <img height={28} src={carbonLogo} alt="Carbon logo" />;

  return (
    <>
      <GlobalHeader
        logo={<Logo />}
        aria-label="Global header component with local nav bar"
      >
        <Menu menuType="black" flex="1" aria-label="Menu bar">
          <MenuItem flex="1" submenu="Product Switcher">
            <MenuItem href="#">Product A</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Parent Menu 1">
            <MenuItem href="#">Child Item 1</MenuItem>
            <MenuItem href="#">Child Item 2</MenuItem>
            <MenuItem href="#">Child Item 3</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Parent Menu 2">
            <MenuItem href="#">Child Item</MenuItem>
          </MenuItem>
        </Menu>
      </GlobalHeader>
      <NavigationBar
        position="fixed"
        orientation="top"
        offset="40px"
        aria-label="Local nav bar"
      >
        <Menu flex="1">
          <MenuItem href="#" flex="1">
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
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </NavigationBar>
    </>
  );
};
GlobalLocalNavBarLayout.storyName = "Global + Local Nav Bar Layout";
GlobalLocalNavBarLayout.parameters = {
  docs: { inlineStories: false, iframeHeight: 250 },
};
