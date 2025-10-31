import React from "react";
import { StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";

import {
  Menu,
  MenuItem,
  MenuDivider,
  MenuSegmentTitle,
  ScrollableBlock,
  MenuFullscreen,
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
  menuType?: MenuProps["menuType"];
}

const MenuWithSearch = ({ menuType }: StoryProps) => {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <Menu menuType={menuType}>
      <MenuItem submenu={`Menu Item ${menuType}`}>
        <MenuItem>
          <Search
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            variant={
              menuType === "white" || menuType === "light" ? "default" : "dark"
            }
          />
        </MenuItem>
        <MenuDivider />
        <MenuItem href="#">Item Link One</MenuItem>
        <MenuItem data-role="target" icon="settings" href="#">
          Item Link Two
        </MenuItem>
        <MenuItem onClick={() => {}}>Item Button Three</MenuItem>
        <MenuItem data-role="target" icon="settings" onClick={() => {}}>
          Item Button Four
        </MenuItem>
      </MenuItem>
    </Menu>
  );
};

const MenuWithScrollableBlock = ({ menuType }: StoryProps) => (
  <Menu menuType={menuType}>
    <MenuItem submenu={`Menu Item ${menuType}`}>
      <ScrollableBlock height="150px">
        <MenuItem href="#">Item Scrollable One</MenuItem>
        <MenuItem href="#">Item Scrollable Two</MenuItem>
        <MenuItem data-role="target" href="#">
          Item Scrollable Three
        </MenuItem>
        <MenuItem href="#">Item Scrollable Four</MenuItem>
        <MenuItem href="#">Item Scrollable Five</MenuItem>
        <MenuItem href="#">Item Scrollable Six</MenuItem>
      </ScrollableBlock>
      <MenuDivider size="large" />
      <ScrollableBlock variant="alternate" height="150px">
        <MenuItem onClick={() => {}}>Alternative Scrollable One</MenuItem>
        <MenuItem onClick={() => {}}>Alternative Scrollable Two</MenuItem>
        <MenuItem onClick={() => {}}>Alternative Scrollable Three</MenuItem>
        <MenuItem data-role="target" onClick={() => {}}>
          Alternative Scrollable Four
        </MenuItem>
        <MenuItem onClick={() => {}}>Alternative Scrollable Five</MenuItem>
        <MenuItem onClick={() => {}}>Alternative Scrollable Six</MenuItem>
      </ScrollableBlock>
    </MenuItem>
  </Menu>
);

const MenuWithSegmentTitle = ({ menuType }: StoryProps) => (
  <Menu menuType={menuType}>
    <MenuItem submenu={`Menu Item ${menuType}`}>
      <MenuSegmentTitle text="segment title">
        <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
        <MenuItem onClick={() => {}}>Item Submenu Two</MenuItem>
        <MenuItem data-role="target" onClick={() => {}}>
          Item Submenu Three
        </MenuItem>
      </MenuSegmentTitle>
      <MenuSegmentTitle variant="alternate" text="alternate title">
        <MenuItem variant="alternate" href="#">
          Alternate Item One
        </MenuItem>
        <MenuItem variant="alternate" href="#">
          Alternate Item Two
        </MenuItem>
        <MenuItem data-role="target" variant="alternate" href="#">
          Alternate Item Three
        </MenuItem>
      </MenuSegmentTitle>
    </MenuItem>
  </Menu>
);

const MenuWithCustomWidth = () => (
  <>
    <Menu menuType="white">
      <MenuItem
        submenuMaxWidth="300px"
        submenu="With maxWidth"
        submenuDirection="left"
      >
        <MenuItem href="#">Item One</MenuItem>
        <MenuItem href="#">Item Two</MenuItem>
        <MenuItem href="#">
          This is a longer text string. I will wrap instead of truncating!
        </MenuItem>
      </MenuItem>
    </Menu>
    <Menu menuType="black">
      <MenuItem submenuMinWidth="300px" submenu="With minWidth">
        <MenuItem href="#">Item One</MenuItem>
        <MenuItem href="#">Item Two</MenuItem>
        <MenuItem href="#">Item Three</MenuItem>
      </MenuItem>
    </Menu>
  </>
);

const MenuInNavigationBar = () => (
  <NavigationBar position="fixed" orientation="bottom" offset="400px">
    <Menu menuType="dark">
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

const FullScreenWithSegmentTitle = () => (
  <Menu menuType="dark">
    <MenuFullscreen isOpen onClose={() => {}}>
      <MenuItem data-role="target" href="#">
        Item One
      </MenuItem>
      <MenuItem href="#">Item Two</MenuItem>
      <MenuItem href="#">Item Three</MenuItem>
      <MenuItem submenu="Item Three With Submenu">
        <MenuItem data-role="target" onClick={() => {}} p={2}>
          Item Submenu One with padding
        </MenuItem>
        <MenuItem onClick={() => {}}>Item Submenu Two</MenuItem>
        <MenuSegmentTitle text="segment title">
          <MenuItem data-role="target" onClick={() => {}}>
            Item Segment One
          </MenuItem>
          <MenuItem onClick={() => {}}>Item Segment Two</MenuItem>
        </MenuSegmentTitle>
      </MenuItem>
    </MenuFullscreen>
  </Menu>
);

const FullScreenWithScrollableBlock = () => {
  const [searchValue, setSearchValue] = React.useState("");
  return (
    <Menu menuType="white">
      <MenuFullscreen isOpen onClose={() => {}}>
        <MenuItem>
          <Search
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            searchButton
          />
        </MenuItem>
        <MenuItem submenu="Item Three With Submenu">
          <MenuItem data-role="target" href="#">
            Item Submenu One
          </MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <ScrollableBlock height="150px">
            <MenuItem onClick={() => {}}>Item Scrollable One</MenuItem>
            <MenuItem onClick={() => {}}>Item Scrollable Two</MenuItem>
            <MenuItem onClick={() => {}}>Item Scrollable Three</MenuItem>
            <MenuItem data-role="target" onClick={() => {}}>
              Item Scrollable Four
            </MenuItem>
            <MenuItem onClick={() => {}}>Item Scrollable Five</MenuItem>
            <MenuItem onClick={() => {}}>Item Scrollable Six</MenuItem>
          </ScrollableBlock>
        </MenuItem>
      </MenuFullscreen>
    </Menu>
  );
};

export const WithSearch: Story = {
  render: () => (
    <Box display="flex" flexDirection="row" gap="100px">
      <MenuWithSearch menuType="white" />
      <MenuWithSearch menuType="light" />
      <MenuWithSearch menuType="dark" />
      <MenuWithSearch menuType="black" />
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
    const menuItemLight = canvas.getByRole("button", {
      name: "Menu Item light",
    });
    const menuItemDark = canvas.getByRole("button", { name: "Menu Item dark" });
    const menuItemBlack = canvas.getByRole("button", {
      name: "Menu Item black",
    });

    await userEvent.hover(menuItemWhite);
    await userEvent.hover(menuItemLight);
    await userEvent.hover(menuItemDark);
    await userEvent.hover(menuItemBlack);

    const search = canvas.getAllByRole("textbox", { name: "search" });
    search[0].focus();
    await expect(search[0]).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
WithSearch.storyName = "With Search";
WithSearch.parameters = {
  pseudo: {
    hover: "[data-role='target'] a",
    focus: "[data-role='target'] button",
  },
};

export const WithScrollable: Story = {
  render: () => (
    <Box display="flex" flexDirection="row" gap="100px">
      <MenuWithScrollableBlock menuType="white" />
      <MenuWithScrollableBlock menuType="light" />
      <MenuWithScrollableBlock menuType="dark" />
      <MenuWithScrollableBlock menuType="black" />
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
    const menuItemLight = canvas.getByRole("button", {
      name: "Menu Item light",
    });
    const menuItemDark = canvas.getByRole("button", { name: "Menu Item dark" });
    const menuItemBlack = canvas.getByRole("button", {
      name: "Menu Item black",
    });

    await userEvent.hover(menuItemWhite);
    await userEvent.hover(menuItemLight);
    await userEvent.hover(menuItemDark);
    await userEvent.hover(menuItemBlack);

    const lastItemInScrollable = canvas.getAllByRole("button", {
      name: "Alternative Scrollable Six",
    });
    lastItemInScrollable[0].focus();
    await expect(lastItemInScrollable[0]).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
WithScrollable.storyName = "With Scrollable";
WithScrollable.parameters = {
  pseudo: {
    hover: "[data-role='target'] button",
    focus: "[data-role='target'] a",
  },
};

export const WithSegmentTitle: Story = {
  render: () => (
    <Box display="flex" flexDirection="row" gap="100px">
      <MenuWithSegmentTitle menuType="white" />
      <MenuWithSegmentTitle menuType="light" />
      <MenuWithSegmentTitle menuType="dark" />
      <MenuWithSegmentTitle menuType="black" />
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
    const menuItemLight = canvas.getByRole("button", {
      name: "Menu Item light",
    });
    const menuItemDark = canvas.getByRole("button", { name: "Menu Item dark" });
    const menuItemBlack = canvas.getByRole("button", {
      name: "Menu Item black",
    });

    await userEvent.hover(menuItemWhite);
    await userEvent.hover(menuItemLight);
    await userEvent.hover(menuItemDark);
    await userEvent.hover(menuItemBlack);

    const itemTwo = canvas.getAllByRole("button", {
      name: "Item Submenu Three",
    });
    itemTwo[0].focus();
    await expect(itemTwo[0]).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
WithSegmentTitle.storyName = "With Segment Title";
WithSegmentTitle.parameters = {
  pseudo: {
    hover: "[data-role='target'] :is(button, a)",
    focus: "[data-role='target'] a",
  },
};

export const WithCustomWidth: Story = {
  render: () => (
    <Box ml="150px" display="flex" flexDirection="row" gap="100px">
      <MenuWithCustomWidth />
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const menuItemMaxWidth = canvas.getByRole("button", {
      name: "With maxWidth",
    });
    const menuItemMinWidth = canvas.getByRole("button", {
      name: "With minWidth",
    });

    await userEvent.hover(menuItemMaxWidth);
    await userEvent.hover(menuItemMinWidth);
    await expect(
      await within(document.body).findByText("Item Three"),
    ).toBeVisible();
    await expect(
      await within(document.body).findByText(
        "This is a longer text string. I will wrap instead of truncating!",
      ),
    ).toBeVisible();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
WithCustomWidth.storyName = "With Custom Width";

export const InNavigationBarStory: Story = {
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
InNavigationBarStory.storyName = "In NavigationBar";

export const MenuFullScreenWithSegmentTitle: Story = {
  render: () => <FullScreenWithSegmentTitle />,
  play: async () => {
    if (!allowInteractions()) {
      return;
    }
    const closeButton = within(document.body).getByRole("button", {
      name: "Close",
    });
    await userEvent.tab(); // focus close button
    await expect(closeButton).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
MenuFullScreenWithSegmentTitle.storyName = "MenuFullScreen With Segment Title";
MenuFullScreenWithSegmentTitle.parameters = {
  pseudo: {
    hover: "[data-role='target'] button",
    focus: "[data-role='target'] a",
    rootSelector: "body",
  },
};

export const MenuFullScreenWithScrollableBlock: Story = {
  render: () => <FullScreenWithScrollableBlock />,
  play: async () => {
    if (!allowInteractions()) {
      return;
    }

    const search = within(document.body).getByRole("textbox");
    await userEvent.tab();
    await userEvent.tab(); // focus search input
    await expect(search).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
MenuFullScreenWithScrollableBlock.storyName =
  "MenuFullScreen With Scrollable Block";
MenuFullScreenWithScrollableBlock.parameters = {
  pseudo: {
    hover: "[data-role='target'] a",
    focus: "[data-role='target'] button",
    rootSelector: "body",
  },
};
