import React from "react";
import { StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect } from "storybook/test";

import {
  Menu,
  MenuItem,
  MenuDivider,
  MenuSegmentTitle,
  ScrollableBlock,
  MenuProps,
} from ".";

import Box from "../box";
import Search from "../search";
import NavigationBar from "../navigation-bar";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof Menu>;

export default {
  title: "Menu/Interactions",
  component: Menu,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

interface StoryProps {
  variant?: MenuProps["variant"];
}

const MenuWithSearch = ({ variant }: StoryProps) => {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <Menu variant={variant}>
      <MenuItem submenu={`Menu Item ${variant}`}>
        <MenuItem>
          <Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            inverse={variant === "black"}
          />
        </MenuItem>
        <MenuDivider />
        <MenuItem href="#">Item Link One</MenuItem>
        <MenuItem data-role="target" icon="settings" href="#">
          Item Link Two
        </MenuItem>
        <MenuItem onClick={() => {}} variant="alternate">
          Item Button Three - Alternate
        </MenuItem>
        <MenuItem
          data-role="target"
          icon="settings"
          onClick={() => {}}
          variant="alternate"
        >
          Item Button Four - Alternate
        </MenuItem>
      </MenuItem>
    </Menu>
  );
};

const MenuWithScrollableBlock = ({ variant }: StoryProps) => (
  <Menu variant={variant}>
    <MenuItem submenu={`Menu Item ${variant}`}>
      <ScrollableBlock height="150px">
        <MenuItem href="#">Item Scrollable One</MenuItem>
        <MenuItem href="#">Item Scrollable Two</MenuItem>
        <MenuItem data-role="hover" href="#">
          Item Scrollable Three
        </MenuItem>
        <MenuItem href="#">Item Scrollable Four</MenuItem>
        <MenuItem href="#">Item Scrollable Five</MenuItem>
        <MenuItem href="#">Item Scrollable Six</MenuItem>
      </ScrollableBlock>
      <MenuDivider size="large" />
      <ScrollableBlock variant="alternate" height="160px">
        <MenuItem data-role="hover" onClick={() => {}}>
          Alternate Scrollable One
        </MenuItem>
        <MenuItem onClick={() => {}}>Alternate Scrollable Two</MenuItem>
        <MenuItem onClick={() => {}}>Alternate Scrollable Three</MenuItem>
        <MenuItem data-role="focus" onClick={() => {}}>
          Alternate Scrollable Four
        </MenuItem>
      </ScrollableBlock>
    </MenuItem>
  </Menu>
);

const MenuWithScrollableBlockParent = ({ variant }: StoryProps) => (
  <Menu variant={variant}>
    <MenuItem submenu={`Menu Item Parent ${variant}`}>
      <ScrollableBlock
        height="150px"
        parent={
          <Search value="" onChange={() => {}} inverse={variant === "black"} />
        }
      >
        <MenuItem href="#">Item Scrollable One</MenuItem>
        <MenuItem href="#">Item Scrollable Two</MenuItem>
        <MenuItem data-role="hover" href="#">
          Item Scrollable Three
        </MenuItem>
        <MenuItem href="#">Item Scrollable Four</MenuItem>
        <MenuItem href="#">Item Scrollable Five</MenuItem>
        <MenuItem href="#">Item Scrollable Six</MenuItem>
      </ScrollableBlock>
      <MenuDivider size="large" />
      <ScrollableBlock
        variant="alternate"
        height="160px"
        parent={
          <Search value="" onChange={() => {}} inverse={variant === "black"} />
        }
      >
        <MenuItem data-role="hover" onClick={() => {}}>
          Alternate Scrollable One
        </MenuItem>
        <MenuItem onClick={() => {}}>Alternate Scrollable Two</MenuItem>
        <MenuItem onClick={() => {}}>Alternate Scrollable Three</MenuItem>
        <MenuItem data-role="focus" onClick={() => {}}>
          Alternate Scrollable Four
        </MenuItem>
      </ScrollableBlock>
    </MenuItem>
  </Menu>
);

const MenuWithSegmentTitle = ({ variant }: StoryProps) => (
  <Menu variant={variant}>
    <MenuItem submenu={`Menu Item ${variant}`}>
      <MenuSegmentTitle text="segment title">
        <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
        <MenuItem onClick={() => {}}>Item Submenu Two</MenuItem>
        <MenuItem data-role="target" onClick={() => {}}>
          Item Submenu Three
        </MenuItem>
      </MenuSegmentTitle>
      <MenuSegmentTitle variant="alternate" text="alternate title">
        <MenuItem href="#">Alternate Item One</MenuItem>
        <MenuItem href="#">Alternate Item Two</MenuItem>
        <MenuItem data-role="target" href="#">
          Alternate Item Three
        </MenuItem>
      </MenuSegmentTitle>
    </MenuItem>
  </Menu>
);

const MenuWithCustomWidth = () => (
  <>
    <Menu>
      <MenuItem
        submenuMaxWidth="300px"
        submenu="With submenuMaxWidth"
        submenuDirection="left"
      >
        <MenuItem data-role="hover">Non Interactive Item</MenuItem>
        <MenuItem href="#" data-role="target">
          Item One
        </MenuItem>
        <MenuItem href="#">
          This is a longer text string. I will wrap instead of truncating!
        </MenuItem>
      </MenuItem>
    </Menu>
    <Menu>
      <MenuItem onClick={() => {}} maxWidth="210px">
        MenuItem with maxWidth - I should not be visible
      </MenuItem>{" "}
    </Menu>
    <Menu>
      <MenuItem
        submenu="Submenu with maxWidth - I should not be visible"
        maxWidth="230px"
      >
        <MenuItem href="#" maxWidth="240px">
          Submenu Item with maxWidth - I should not be visible
        </MenuItem>
      </MenuItem>
    </Menu>
    <Menu>
      <MenuItem submenuMinWidth="300px" submenu="With submenuMinWidth">
        <MenuItem href="#" data-role="target">
          Item One
        </MenuItem>
        <MenuItem href="#">Item Two</MenuItem>
        <MenuItem href="#">Item Three</MenuItem>
      </MenuItem>
    </Menu>
  </>
);

const MenuInNavigationBar = () => (
  <NavigationBar position="fixed" orientation="bottom" offset="400px">
    <Menu variant="black">
      <MenuItem submenu="Menu Item">
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
  </NavigationBar>
);

export const WithSearch: Story = {
  render: () => (
    <Box display="flex" flexDirection="row" gap="100px">
      <MenuWithSearch variant="white" />
      <MenuWithSearch variant="black" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const menuItemBlack = canvas.getByRole("button", {
      name: "Menu Item black",
    });

    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard("{ArrowDown}");

    const search = canvas.getByRole("searchbox", { name: "Search" });
    await expect(search).toHaveFocus();

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowUp}");
    await expect(search).toHaveFocus();

    await userEvent.hover(menuItemBlack);
  },
  parameters: {
    pseudo: {
      hover: "[data-role='target'] a",
      focus: "[data-role='target'] button",
    },
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const WithScrollable: Story = {
  render: () => (
    <Box display="flex" flexDirection="row" gap="75px">
      <MenuWithScrollableBlock variant="white" />
      <MenuWithScrollableBlock variant="black" />
      <MenuWithScrollableBlockParent variant="white" />
      <MenuWithScrollableBlockParent variant="black" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const menuItemWhite = canvas.getByRole("button", {
      name: "Menu Item white",
    });
    const menuItemBlack = canvas.getByRole("button", {
      name: "Menu Item black",
    });

    const menuItemWhiteParent = canvas.getByRole("button", {
      name: "Menu Item Parent white",
    });
    const menuItemBlackParent = canvas.getByRole("button", {
      name: "Menu Item Parent black",
    });

    await userEvent.hover(menuItemWhite);
    await userEvent.hover(menuItemBlack);
    await userEvent.hover(menuItemWhiteParent);
    await userEvent.hover(menuItemBlackParent);
  },
  parameters: {
    pseudo: {
      hover: "[data-role='hover'] :is(button, a)",
      focus: "[data-role='focus'] button",
    },
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const WithSegmentTitle: Story = {
  render: () => (
    <Box display="flex" flexDirection="row" gap="100px">
      <MenuWithSegmentTitle variant="white" />
      <MenuWithSegmentTitle variant="black" />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const menuItemWhite = canvas.getByRole("button", {
      name: "Menu Item white",
    });
    const menuItemBlack = canvas.getByRole("button", {
      name: "Menu Item black",
    });

    await userEvent.hover(menuItemWhite);
    await userEvent.hover(menuItemBlack);

    const itemTwo = canvas.getAllByRole("button", {
      name: "Item Submenu Three",
    });
    itemTwo[0].focus();
    await expect(itemTwo[0]).toHaveFocus();
  },
  parameters: {
    pseudo: {
      hover: "[data-role='target'] :is(button, a)",
      focus: "[data-role='target'] a",
    },
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

// Tests non-interactive item in submenu
export const WithCustomWidth: Story = {
  render: () => (
    <Box ml="100px" display="flex" flexDirection="row" gap="50px" width="100%">
      <MenuWithCustomWidth />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const submenuMaxWidth = canvas.getByRole("button", {
      name: "With submenuMaxWidth",
    });
    const menuItemMaxWidth = canvas.getByRole("button", {
      name: /MenuItem with maxWidth/i,
    });
    const submenuItemMaxWidth = canvas.getByRole("button", {
      name: /Submenu with maxWidth/i,
    });
    const submenuMinWidth = canvas.getByRole("button", {
      name: "With submenuMinWidth",
    });

    await userEvent.click(submenuMaxWidth);
    await userEvent.hover(menuItemMaxWidth);
    await userEvent.hover(submenuItemMaxWidth);
    await userEvent.hover(submenuMinWidth);

    await expect(
      await within(document.body).findByText("Item Three"),
    ).toBeVisible();
    await expect(
      await within(document.body).findByText(
        "This is a longer text string. I will wrap instead of truncating!",
      ),
    ).toBeVisible();

    // Ensure focus lands on first focusable menu item
    await userEvent.tab();
    const firstItems = within(document.body).getAllByRole("link", {
      name: "Item One",
    });
    await expect(firstItems[0]).toHaveFocus();
  },
  parameters: {
    pseudo: {
      hover: "[data-role='target'] a",
      rootSelector: "body",
    },
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const InNavigationBar: Story = {
  render: () => <MenuInNavigationBar />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const menuItem = canvas.getByRole("button", { name: "Menu Item" });

    await userEvent.click(menuItem);
    await expect(await within(document.body).findByText("Foo 1")).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
