import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import isChromatic from "../../../.storybook/isChromatic";

import Button from "../button/__next__";
import Box from "../box";
import Search from "../search";
import Portrait from "../portrait";
import Icon from "../icon";

import {
  Menu,
  MenuItem,
  MenuItemHandle,
  MenuDivider,
  MenuSegmentTitle,
  ScrollableBlock,
  MenuFullscreen,
} from ".";

const styledSystemProps = generateStyledSystemProps(
  {
    flexBox: true,
    layout: true,
  },
  undefined,
  ["height", "minHeight", "maxHeight", "size", "display", "overflowY"],
);

const defaultOpenState = isChromatic();

const meta: Meta<typeof Menu> = {
  title: "Menu",
  component: Menu,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  decorators: [
    (Story) => (
      <>
        {defaultOpenState ? (
          <Box width="100%" height={900} backgroundColor="lightgrey">
            <Story />
          </Box>
        ) : (
          <Box
            p={2}
            width="800px"
            height="300px"
            backgroundColor="lightgrey"
            display="flex"
            flexDirection="column"
            gap={6}
          >
            <Story />
          </Box>
        )}
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuItem href="#">Menu Item One</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
      <MenuItem onClick={() => {}}>
        <Icon type="placeholder" />
        Menu Item Three
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <Icon type="placeholder" />
        Menu Item Four
      </MenuItem>
    </Menu>
  ),
};

export const BlackVariant: Story = {
  ...Default,
  args: {
    variant: "black",
  },
};

export const SelectedMenuItem: Story = {
  render: () => (
    <>
      <Menu>
        <MenuItem href="#" selected ariaCurrent="page">
          Menu Item One
        </MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem onClick={() => {}}>Menu Item Three</MenuItem>
        <MenuItem onClick={() => {}}>Menu Item Four</MenuItem>
      </Menu>
      <Menu variant="black">
        <MenuItem href="#" selected ariaCurrent="page">
          Menu Item One
        </MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem onClick={() => {}}>Menu Item Three</MenuItem>
        <MenuItem onClick={() => {}}>Menu Item Four</MenuItem>
      </Menu>
    </>
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Submenu">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
        <MenuItem
          submenu={
            <Box display="flex" alignItems="center" gap={1}>
              <Portrait size="XS" initials="JD" /> John Doe
            </Box>
          }
        >
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Submenu">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
        <MenuItem
          submenu={
            <Box display="flex" alignItems="center" gap={1}>
              <Portrait size="XS" initials="JD" /> John Doe
            </Box>
          }
        >
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </>
  ),
};

export const WithAlternateVariant: Story = {
  render: () => (
    <>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Submenu">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#" variant="alternate">
            Alternate Item One
          </MenuItem>
          <MenuItem href="#" variant="alternate">
            Alternate Item Two
          </MenuItem>
        </MenuItem>
      </Menu>
      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Submenu">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#" variant="alternate">
            Alternate Item One
          </MenuItem>
          <MenuItem href="#" variant="alternate">
            Alternate Item Two
          </MenuItem>
        </MenuItem>
      </Menu>
    </>
  ),
};

export const WithMenuDivider: Story = {
  render: () => (
    <>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Divider">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuDivider />
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#">Item Submenu Three</MenuItem>
        </MenuItem>
        <MenuItem submenu="With Large Divider">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuDivider size="large" />
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#">Item Submenu Three</MenuItem>
        </MenuItem>
      </Menu>

      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Divider">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuDivider />
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#">Item Submenu Three</MenuItem>
        </MenuItem>
        <MenuItem submenu="With Large Divider">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuDivider size="large" />
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#">Item Submenu Three</MenuItem>
        </MenuItem>
      </Menu>
    </>
  ),
};

export const WithSegmentTitle: Story = {
  render: () => (
    <>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Segment Title">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuSegmentTitle text="Segment Title">
            <MenuItem href="#">Segment Item one</MenuItem>
            <MenuItem href="#">Segment Item Two</MenuItem>
          </MenuSegmentTitle>
        </MenuItem>
        <MenuItem submenu="Alternate Segment Title">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuSegmentTitle text="Alternate Segment Title" variant="alternate">
            <MenuItem href="#">Segment Item one</MenuItem>
            <MenuItem href="#">Segment Item Two</MenuItem>
          </MenuSegmentTitle>
        </MenuItem>
      </Menu>

      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Segment Title">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuSegmentTitle text="Segment Title">
            <MenuItem href="#">Segment Item one</MenuItem>
            <MenuItem href="#">Segment Item Two</MenuItem>
          </MenuSegmentTitle>
        </MenuItem>
        <MenuItem submenu="Alternate Segment Title">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuSegmentTitle text="Alternate Segment Title" variant="alternate">
            <MenuItem href="#">Segment Item one</MenuItem>
            <MenuItem href="#">Segment Item Two</MenuItem>
          </MenuSegmentTitle>
        </MenuItem>
      </Menu>
    </>
  ),
};

export const WithScrollableBlock: Story = {
  render: () => (
    <>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Scrollable Block">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <ScrollableBlock height="200px">
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">Scrollable Item Three</MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
        <MenuItem submenu="Alternate Scrollable Block">
          <ScrollableBlock height="200px" variant="alternate">
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">Scrollable Item Three</MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
      </Menu>

      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="With Scrollable Block">
          <ScrollableBlock height="200px">
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">Scrollable Item Three</MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
        <MenuItem submenu="Alternate Scrollable Block">
          <ScrollableBlock height="200px" variant="alternate">
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">Scrollable Item Three</MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
      </Menu>
    </>
  ),
};

export const ScrollableBlockWithParent: Story = {
  render: () => (
    <>
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="Scrollable Block with Parent">
          <ScrollableBlock
            height="200px"
            parent={<Search value="" onChange={() => {}} />}
          >
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">Scrollable Item Three</MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
      </Menu>

      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="Scrollable Block with Parent">
          <ScrollableBlock
            height="200px"
            parent={<Search value="" onChange={() => {}} inverse />}
          >
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">Scrollable Item Three</MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
      </Menu>
    </>
  ),
};

export const TextOverflow: Story = {
  render: () => (
    <Menu>
      <MenuItem href="#">Menu Item One</MenuItem>
      <MenuItem href="#" maxWidth="175px">
        Really Long Menu Item Two
      </MenuItem>
      <MenuItem submenu="Really long Submenu" maxWidth="175px">
        <MenuItem href="#">Item Submenu One</MenuItem>
        <MenuItem href="#" maxWidth="175px">
          Really long Item Submenu Two
        </MenuItem>
      </MenuItem>
    </Menu>
  ),
};

export const ProgrammaticFocus: Story = {
  render: () => {
    const menuItemHandle = useRef<MenuItemHandle>(null);
    return (
      <>
        <Button onClick={() => menuItemHandle.current?.focus()}>
          Click to focus Menu Item One
        </Button>
        <Menu>
          <MenuItem ref={menuItemHandle} href="#">
            Menu Item One
          </MenuItem>
          <MenuItem href="#">Menu Item Two</MenuItem>
          <MenuItem onClick={() => {}}>Menu Item Three</MenuItem>
          <MenuItem onClick={() => {}}>Menu Item Four</MenuItem>
        </Menu>
      </>
    );
  },
};

export const FullscreenMenu: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Menu>
          <MenuItem onClick={() => setIsOpen(true)}>Open Menu</MenuItem>
          <MenuFullscreen isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Submenu">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuSegmentTitle text="Segment Title">
              <MenuItem href="#">Segment Item one</MenuItem>
              <MenuItem href="#">Segment Item Two</MenuItem>
            </MenuSegmentTitle>
            <MenuItem submenu="With Scrollable Block">
              <ScrollableBlock height="200px">
                <MenuItem href="#">Scrollable Item One</MenuItem>
                <MenuItem href="#">Scrollable Item Two</MenuItem>
                <MenuItem href="#">Scrollable Item Three</MenuItem>
                <MenuItem href="#">Scrollable Item Four</MenuItem>
                <MenuItem href="#">Scrollable Item Five</MenuItem>
                <MenuItem href="#">Scrollable Item Six</MenuItem>
              </ScrollableBlock>
            </MenuItem>
          </MenuFullscreen>
        </Menu>

        <Menu variant="black">
          <MenuItem onClick={() => setIsOpen(true)}>Open Menu</MenuItem>
          <MenuFullscreen isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Submenu">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuSegmentTitle text="Segment Title">
              <MenuItem href="#">Segment Item one</MenuItem>
              <MenuItem href="#">Segment Item Two</MenuItem>
            </MenuSegmentTitle>
            <MenuItem submenu="Submenu with Scrollable Block">
              <ScrollableBlock height="200px">
                <MenuItem href="#">Scrollable Item One</MenuItem>
                <MenuItem href="#">Scrollable Item Two</MenuItem>
                <MenuItem href="#">Scrollable Item Three</MenuItem>
                <MenuItem href="#">Scrollable Item Four</MenuItem>
                <MenuItem href="#">Scrollable Item Five</MenuItem>
                <MenuItem href="#">Scrollable Item Six</MenuItem>
              </ScrollableBlock>
            </MenuItem>
          </MenuFullscreen>
        </Menu>
      </>
    );
  },
};
