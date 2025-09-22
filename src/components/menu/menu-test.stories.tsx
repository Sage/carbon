import React, { useState, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import isChromatic from "../../../.storybook/isChromatic";
import {
  Menu,
  MenuItem,
  MenuFullscreen,
  MenuFullscreenProps,
  MenuSegmentTitle,
  ScrollableBlock,
  MenuDivider,
} from ".";
import Search from "../search";
import Box from "../box";
import GlobalHeader from "../global-header";
import Icon from "../icon";

import type { MenuType } from "./menu.types";
import NavigationBar from "../navigation-bar";
import Pill from "../pill";

const defaultOpenState = isChromatic();

const meta: Meta<typeof Menu> = {
  title: "Menu/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};
export default meta;

interface MenuFullScreenStoryProps extends MenuFullscreenProps {
  searchVariant?: "default" | "dark";
  menuType: MenuType;
  searchButton?: boolean;
}

type StoryFullScreen = StoryObj<MenuFullScreenStoryProps>;

export const MenuFullScreenStory: StoryFullScreen = ({
  menuType,
  startPosition,
  searchVariant,
  searchButton,
}: MenuFullScreenStoryProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const onClose = (
    ev:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
      | KeyboardEvent,
  ) => {
    setIsOpen(false);
    action("close icon clicked")(ev);
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
        <MenuItem href="#">
          Menu item as link with icon
          <Icon ml="4px" type="link" />
        </MenuItem>
        <MenuItem onClick={() => {}}>
          Menu item as button with icon
          <Icon ml="4px" type="link" />
        </MenuItem>
        <MenuItem
          onClick={(evt) => action("submenu item clicked")(evt)}
          submenu="Menu item with submenu and onClick"
        >
          <MenuItem py={3} href="#">
            Submenu item one as link with padding override and icon
            <Icon ml="4px" type="link" />
          </MenuItem>
          <MenuItem py={3} onClick={() => {}}>
            Submenu item two as button with padding override and icon
            <Icon ml="4px" type="link" />
          </MenuItem>
        </MenuItem>
        <MenuItem variant="alternate">
          <Search
            placeholder="Search..."
            variant={searchVariant}
            value=""
            onChange={() => {}}
            searchButton={searchButton}
          />
        </MenuItem>
        <MenuItem href="#">Menu item as link</MenuItem>
        <MenuItem onClick={() => {}}>Menu item as button</MenuItem>
        <MenuItem submenu="Menu item with submenu">
          <MenuItem href="#">
            Submenu item as link with icon
            <Icon ml="4px" type="link" />
          </MenuItem>
          <MenuItem onClick={() => {}}>
            Submenu item as button with icon
            <Icon ml="4px" type="link" />
          </MenuItem>
        </MenuItem>
        <MenuItem onClick={() => {}}>
          Menu item as button with a really long topic where the text should not
          be truncated but instead it should be wrapped
        </MenuItem>
        <MenuItem href="#">
          Menu item as link with a really long topic where the text should not
          be truncated but instead it should be wrapped
        </MenuItem>
        <MenuItem submenu="Menu item with submenu and with a really long topic where the text should not be truncated but instead it should be wrapped">
          <MenuItem href="#">
            Submenu item as link with a really long topic where the text should
            not be truncated but instead it should be wrapped
          </MenuItem>
          <MenuItem onClick={() => {}}>
            Submenu item as button with a really long topic where the text
            should not be truncated but instead it should be wrapped
          </MenuItem>
        </MenuItem>
      </MenuFullscreen>
    </Menu>
  );
};
MenuFullScreenStory.storyName = "Fullscreen Menu";
MenuFullScreenStory.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: {
    disableSnapshot: false,
    modes: {
      "1200px": {
        viewport: {
          width: 1200,
          height: 1200,
        },
      },
      "600px": {
        viewport: {
          width: 600,
          height: 1350,
        },
      },
    },
  },
};
MenuFullScreenStory.args = {
  menuType: "light",
  startPosition: "left",
  searchVariant: "default",
  searchButton: true,
};
MenuFullScreenStory.argTypes = {
  menuType: {
    options: ["light", "dark", "white", "black"],
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
};

MenuFullScreenStory.decorators = [
  (Story) => (
    <>
      {defaultOpenState ? (
        <Box width="100%" height="1350px">
          <Story />
        </Box>
      ) : (
        <Story />
      )}
    </>
  ),
];

export const LongLabelsStory = () => {
  return (
    <Menu>
      <MenuItem submenu="Parent Menu A">
        <MenuItem href="#">Child A</MenuItem>
        <MenuItem href="#">Child B with very long label</MenuItem>
        <MenuItem href="#">Child C</MenuItem>
      </MenuItem>
      <MenuItem submenu="Parent Menu B with very long label">
        <MenuItem href="#">Child A</MenuItem>
        <MenuItem href="#">Child B</MenuItem>
        <MenuItem href="#">Child C</MenuItem>
      </MenuItem>
      <MenuItem submenu="Parent Menu C with overflow" submenuMaxWidth="300px">
        <MenuItem minWidth="max-content" href="#">
          Child with a very long label that should wrap onto the next line and
          not get cut off
        </MenuItem>
      </MenuItem>
    </Menu>
  );
};

LongLabelsStory.storyName = "With Long MenuItem Labels";
LongLabelsStory.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const InGlobalHeaderStory = () => {
  return (
    <GlobalHeader>
      <Menu menuType="dark">
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
  );
};
InGlobalHeaderStory.storyName = "In GlobalHeader";
InGlobalHeaderStory.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const MenuFullScreenKeysTest = () => {
  const UpdatingSubmenu = () => {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
      const interval = setInterval(() => {
        setCounter((prev) => (prev >= 2 ? prev : prev + 1));
      }, 2000);
      return () => clearInterval(interval);
    }, []);
    return (
      <MenuItem submenu={`submenu 2 - count ${counter}`}>
        <MenuItem href="#">Item One</MenuItem>
        <MenuItem href="#">Item Two</MenuItem>
      </MenuItem>
    );
  };

  const [extraItem, setExtraItem] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setExtraItem(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Menu>
      <MenuFullscreen onClose={() => {}} isOpen>
        {extraItem ? (
          <MenuItem submenu="extra submenu">
            <MenuItem href="#">Item One</MenuItem>
            <MenuItem href="#">Item Two</MenuItem>
          </MenuItem>
        ) : null}
        <MenuItem submenu="submenu 1">
          <MenuItem href="#">Item One</MenuItem>
          <MenuItem href="#">Item Two</MenuItem>
        </MenuItem>
        <UpdatingSubmenu />
      </MenuFullscreen>
    </Menu>
  );
};
MenuFullScreenKeysTest.storyName = "Menu Fullscreen with dynamic submenus";

export const MenuWithTwoSegments = () => {
  return (
    <Box margin="0 25px" display="flex" flexDirection="row">
      <Menu menuType="black">
        <MenuItem submenu="Menu Item">
          <MenuItem href="#" minWidth="200px">
            Submenu
          </MenuItem>
          <MenuSegmentTitle text="segment title 1" variant="alternate">
            <MenuItem href="#" variant="alternate">
              Menu Item 1
            </MenuItem>
          </MenuSegmentTitle>
          <MenuSegmentTitle text="segment title 2" variant="alternate">
            <MenuItem href="#" variant="alternate">
              Menu Item 2
            </MenuItem>
            <MenuItem href="#" variant="alternate">
              Menu Item 3
            </MenuItem>
          </MenuSegmentTitle>
          <MenuItem href="#">Menu Item 4</MenuItem>
        </MenuItem>
      </Menu>
      <Menu menuType="light">
        <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="Menu Item Three">
          <ScrollableBlock height="200px">
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
          <MenuItem href="#">Item Submenu FFS</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
};
MenuWithTwoSegments.storyName = "Menu with Two Segments";

export const MenuWithSubmenuCustomPadding = () => (
  <>
    {[0, "5px", 1, 2, "17px", 3, 4, 5, 6, 7, 8].map((padding) => (
      <Menu>
        <MenuItem px={padding} href="#">
          Item One
        </MenuItem>
        <MenuItem px={padding} submenu="Item Two">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuItem href="#">Item Submenu Three</MenuItem>
        </MenuItem>
      </Menu>
    ))}
  </>
);
MenuWithSubmenuCustomPadding.storyName = "MenuItem with Custom Padding";
MenuWithSubmenuCustomPadding.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const WhenMenuItemsWrap = () => {
  return (
    <Box mb={150}>
      <Menu width="400px">
        <MenuItem
          justifyContent="flex-start"
          width="100px"
          icon="settings"
          href="#"
        >
          M
        </MenuItem>
        <MenuItem icon="settings" onClick={() => {}}>
          Menu Item Two
        </MenuItem>
        <MenuItem submenu="Menu Item Three">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuDivider />
          <MenuItem icon="entry" href="#">
            Item Submenu Three
          </MenuItem>
          <MenuItem icon="settings" href="#">
            Item Submenu Four
          </MenuItem>
        </MenuItem>
        <MenuItem maxWidth="100px" submenu="Menu Item Four" onClick={() => {}}>
          <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
};
WhenMenuItemsWrap.storyName = "MenuItems with Wrapped Text";
WhenMenuItemsWrap.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const MenuFullScreenWithMaxWidth: StoryFullScreen = () => {
  return (
    <Menu menuType="black">
      <MenuFullscreen isOpen onClose={() => {}}>
        <MenuItem href="#">Menu item with href set</MenuItem>
        <MenuItem onClick={() => {}}>Menu with onClick set</MenuItem>
        <MenuItem href="#" maxWidth="300px">
          Menu with Max Width and href set
        </MenuItem>
        <MenuItem onClick={() => {}} maxWidth="300px">
          Menu with Max Width and onClick set
        </MenuItem>
        <MenuItem submenu="Submenu">
          <MenuItem href="#">Menu item with href set</MenuItem>
          <MenuItem onClick={() => {}}>Menu with onClick set</MenuItem>
          <MenuItem href="#" maxWidth="300px">
            Menu with Max Width and href set
          </MenuItem>
          <MenuItem onClick={() => {}} maxWidth="300px">
            Menu with Max Width and onClick set
          </MenuItem>
        </MenuItem>
      </MenuFullscreen>
    </Menu>
  );
};
MenuFullScreenWithMaxWidth.storyName = "Menu Full Screen with Max Width";
MenuFullScreenWithMaxWidth.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};
MenuFullScreenWithMaxWidth.decorators = [
  (Story) => (
    <>
      {defaultOpenState ? (
        <Box width="100%" height="600px">
          <Story />
        </Box>
      ) : (
        <Story />
      )}
    </>
  ),
];

export const NavBarMenuWithPill: StoryFullScreen = () => {
  return (
    <NavigationBar navigationType="white" orientation="top">
      <Menu menuType="white">
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem onClick={() => {}}>Menu Item Button</MenuItem>
        <MenuItem onClick={() => {}}>
          incomplete
          <Pill pillRole="status" colorVariant="warning" fill ml={1} size="M">
            2
          </Pill>
        </MenuItem>

        <MenuItem submenu="Menu Item Four" onClick={() => {}}>
          <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </NavigationBar>
  );
};
NavBarMenuWithPill.storyName = "Menu in a Navigation Bar with Pill ";
NavBarMenuWithPill.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};
