import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import {
  Menu,
  MenuItem,
  MenuFullscreen,
  MenuSegmentTitle,
  ScrollableBlock,
} from ".";
import Search, { SearchEvent } from "../search";
import Box from "../box";
import GlobalHeader from "../global-header";
import Icon from "../icon";
import Portrait from "../portrait";
import Image from "../image";
import CarbonLogo from "../../../logo/carbon-logo.png";
import isChromatic from "../../../.storybook/isChromatic";

const meta: Meta<typeof Menu> = {
  title: "Menu/Test",
  component: Menu,
  parameters: {
    chromatic: {
      themeProvider: { chromatic: { theme: "sage" } },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

const defaultOpenState = isChromatic();

// Test all MenuFullScreen subcomponents
// Alternate variant should have no effect
export const MenuFullScreenWhite: Story = {
  render: (args) => (
    <Menu {...args}>
      <MenuFullscreen isOpen onClose={() => {}}>
        <MenuItem href="#" variant="alternate">
          Menu Item One
        </MenuItem>
        <MenuItem href="#" selected ariaCurrent="page">
          Menu Item Two - Selected
        </MenuItem>
        <MenuItem href="#">
          <Icon type="placeholder" />
          Menu Item Three - With Icon
        </MenuItem>
        <MenuItem href="#" maxWidth="100px">
          Menu Item Four - With maxWidth
        </MenuItem>
        <MenuItem>Menu Item Five - Non Interactive</MenuItem>
        <MenuItem href="#" p={4}>
          Menu Item Six - With Custom Padding
        </MenuItem>
        <MenuItem href="#">
          <Search
            value=""
            onChange={() => {}}
            inverse={args.variant === "black"}
          />
        </MenuItem>
        <MenuItem submenu="Submenu" variant="alternate">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
        <MenuSegmentTitle text="Segment Title" variant="alternate">
          <MenuItem href="#">Segment Item one</MenuItem>
          <MenuItem href="#">
            Segment Item Two with a really long topic where the text should not
            be truncated but instead it should be wrapped
          </MenuItem>
        </MenuSegmentTitle>
        <MenuItem submenu="With Scrollable Block" variant="alternate">
          <ScrollableBlock height="150px">
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">
              Scrollable Item Three with a really long topic where the text
              should not be truncated but instead it should be wrapped
            </MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
        <MenuItem submenu="With Scrollable Block Parent">
          <ScrollableBlock
            height="150px"
            parent={
              <Search
                value=""
                onChange={() => {}}
                inverse={args.variant === "black"}
              />
            }
          >
            <MenuItem href="#">Scrollable Item One</MenuItem>
            <MenuItem href="#">Scrollable Item Two</MenuItem>
            <MenuItem href="#">Scrollable Item Three</MenuItem>
            <MenuItem href="#">Scrollable Item Four</MenuItem>
            <MenuItem href="#">Scrollable Item Five</MenuItem>
            <MenuItem href="#">Scrollable Item Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
        <MenuItem href="#">
          Menu item with a really long topic where the text should not be
          truncated but instead it should be wrapped
        </MenuItem>
        <MenuItem submenu="Submenu with a really long topic where the text should not be truncated but instead it should be wrapped">
          <MenuItem onClick={() => {}}>
            Submenu item with a really long topic where the text should not be
            truncated but instead it should be wrapped
          </MenuItem>
        </MenuItem>
      </MenuFullscreen>
    </Menu>
  ),
  parameters: {
    chromatic: { viewports: [1200, 320] },
  },
  decorators: [
    (Story) => (
      <>
        {defaultOpenState ? (
          <Box width="100%" height={900}>
            <Story />
          </Box>
        ) : (
          <Story />
        )}
      </>
    ),
  ],
};

export const MenuFullScreenBlack: Story = {
  ...MenuFullScreenWhite,
  args: {
    variant: "black",
  },
  parameters: {
    chromatic: { viewports: [1200, 320] },
  },
  decorators: [
    (Story) => (
      <>
        {defaultOpenState ? (
          <Box width="100%" height={900}>
            <Story />
          </Box>
        ) : (
          <Story />
        )}
      </>
    ),
  ],
};

export const Chromatic: Story = {
  render: () => (
    <Box display="flex" flexDirection="column" gap={4}>
      <Menu>
        <MenuItem href="#" selected ariaCurrent="page">
          Menu Item One
        </MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem onClick={() => {}}>
          <Icon type="placeholder" />
          Menu Item Three
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <Icon type="placeholder" />
          Menu Item Four
        </MenuItem>
        <MenuItem href="#" icon="placeholder" ariaLabel="aria-label" />
        <MenuItem href="#" ariaLabel="aria-label">
          <Icon type="placeholder" />
        </MenuItem>
      </Menu>
      <Menu variant="black">
        <MenuItem href="#" selected ariaCurrent="page">
          Menu Item One
        </MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem onClick={() => {}}>
          <Icon type="placeholder" />
          Menu Item Three
        </MenuItem>
        <MenuItem onClick={() => {}}>
          <Icon type="placeholder" />
          Menu Item Four
        </MenuItem>
        <MenuItem href="#" icon="placeholder" ariaLabel="aria-label" />
        <MenuItem href="#" ariaLabel="aria-label">
          <Icon type="placeholder" />
        </MenuItem>
      </Menu>
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
        <MenuItem icon="placeholder" ariaLabel="aria-label" submenu>
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
        <MenuItem submenu={<Icon type="placeholder" />} ariaLabel="aria-label">
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
        <MenuItem icon="placeholder" ariaLabel="aria-label" submenu>
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
        <MenuItem submenu={<Icon type="placeholder" />} ariaLabel="aria-label">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
      <Box width="700px">
        <Menu>
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
          <MenuItem submenu="With Submenu">
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
          <MenuItem
            submenu={
              <>
                <Icon type="placeholder" />
                Menu Item Three
              </>
            }
          >
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  ),
};

export const InGlobalHeader: Story = {
  render: () => (
    <GlobalHeader>
      <Menu variant="black">
        <MenuItem href="#" data-role="target">
          <Box
            alignItems="center"
            display="flex"
            gap={1}
            justifyContent="center"
          >
            <Image size={20} src={CarbonLogo} alt="" decorative />
            Carbon docs
          </Box>
        </MenuItem>
        <MenuItem submenu="I'm long" clickToOpen>
          <MenuItem onClick={() => {}}>Foo 1</MenuItem>
          <MenuItem onClick={() => {}}>Foo 2</MenuItem>
          <MenuItem onClick={() => {}}>Foo 3</MenuItem>
          <MenuItem onClick={() => {}}>Foo 4</MenuItem>
          <MenuItem onClick={() => {}}>Foo 5</MenuItem>
          <MenuItem onClick={() => {}}>Foo 6</MenuItem>
          <MenuItem onClick={() => {}}>Foo 7</MenuItem>
          <MenuItem onClick={() => {}}>Foo 8</MenuItem>
          <MenuItem onClick={() => {}}>Foo 9</MenuItem>
          <MenuItem onClick={() => {}}>Foo 10</MenuItem>
          <MenuItem onClick={() => {}}>Foo 11</MenuItem>
          <MenuItem onClick={() => {}}>Foo 12</MenuItem>
          <MenuItem onClick={() => {}}>Foo 13</MenuItem>
          <MenuItem onClick={() => {}}>Foo 14</MenuItem>
          <MenuItem onClick={() => {}}>Foo 15</MenuItem>
          <MenuItem onClick={() => {}}>Foo 16</MenuItem>
          <MenuItem onClick={() => {}}>Foo 17</MenuItem>
          <MenuItem onClick={() => {}}>Foo 18</MenuItem>
          <MenuItem onClick={() => {}}>Foo 19</MenuItem>
          <MenuItem onClick={() => {}}>Foo 20</MenuItem>
        </MenuItem>
      </Menu>
    </GlobalHeader>
  ),
  parameters: {
    pseudo: {
      focus: "[data-role='target'] a",
    },
  },
};

export const MenuComponentScrollableWithSearch: Story = {
  render: () => {
    const items = [
      "apple",
      "banana",
      "carrot",
      "grapefruit",
      "melon",
      "orange",
      "pear",
      "strawberry",
    ];
    const [itemSearch, setItemSearch] = React.useState(items);
    const [searchString, setSearchString] = React.useState("");
    const handleTextChange = (e: SearchEvent) => {
      const searchStr = e.target.value;
      setSearchString(searchStr);
      let found;
      if (searchStr.length > 0) {
        found = items.filter((item) => item.includes(searchStr));
      } else {
        found = items;
      }
      setItemSearch(found);
    };
    return (
      <Box mb={300}>
        <Menu>
          <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
          <MenuItem href="#">Menu Item Two</MenuItem>
          <MenuItem submenu="Menu Item Three">
            <MenuItem href="#">Item Submenu One</MenuItem>
            <ScrollableBlock
              variant="alternate"
              height="200px"
              parent={
                <Search value={searchString} onChange={handleTextChange} />
              }
            >
              {itemSearch.map((item) => (
                <MenuItem key={item} href="#">
                  {item}
                </MenuItem>
              ))}
            </ScrollableBlock>
          </MenuItem>
        </Menu>
      </Box>
    );
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};
