import React, { useState, useEffect } from "react";
import { Meta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { allModes } from "../../../.storybook/modes";
import isChromatic from "../../../.storybook/isChromatic";
import {
  Menu,
  MenuItem,
  MenuFullscreen,
  MenuFullscreenProps,
  MenuSegmentTitle,
  ScrollableBlock,
} from ".";
import { MenuType } from "./__internal__/menu.context";
import Search from "../search";
import Box from "../box";
import NavigationBar, { NavigationBarProps } from "../navigation-bar";
import GlobalHeader from "../global-header";

const defaultOpenState = isChromatic();

const meta: Meta<typeof Menu> = {
  title: "Menu/Test",
  includeStories: [
    "MenuFullScreenStory",
    "LongLabelsStory",
    "InGlobalHeaderStory",
    "InNavigationBarStory",
    "MenuFullScreenKeysTest",
    "MenuWithTwoSegments",
    "MenuFullScreenWithLargeMenuItems",
    "MenuComponentFullScreenWithLongSubmenuText",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: false,
      modes: {
        desktop: allModes.chromatic,
      },
    },
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
export default meta;

interface MenuFullScreenStoryProps extends MenuFullscreenProps {
  searchVariant?: "default" | "dark";
  menuType: MenuType;
  searchButton?: boolean;
}

export const MenuFullScreenStory = ({
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
      | KeyboardEvent
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
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem
          onClick={(evt) => action("submenu item clicked")(evt)}
          submenu="Menu Item Two"
        >
          <MenuItem py={3} href="#">
            Submenu Item One
          </MenuItem>
          <MenuItem py={3} href="#">
            Submenu Item Two
          </MenuItem>
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

InGlobalHeaderStory.storyName = "long submenu in global header";

type InNavigationBarStoryProps = Pick<
  NavigationBarProps,
  "orientation" | "offset"
>;

export const InNavigationBarStory = (props: InNavigationBarStoryProps) => {
  return (
    <NavigationBar position="fixed" {...props}>
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
    </NavigationBar>
  );
};

InNavigationBarStory.storyName = "long submenu in navigation bar";

InNavigationBarStory.story = {
  args: {
    orientation: "top",
    offset: "calc(75vh - 100px)",
  },
};

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
      <MenuItem>Item One </MenuItem>
      <MenuItem>Item Two </MenuItem>
    </MenuItem>
  );
};

export const MenuFullScreenKeysTest = () => {
  const [extraItem, setExtraItem] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setExtraItem(true);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <MenuFullscreen onClose={() => {}} isOpen>
      {extraItem ? (
        <MenuItem submenu="extra submenu">
          <MenuItem>Item One </MenuItem>
          <MenuItem>Item Two </MenuItem>
        </MenuItem>
      ) : null}
      <MenuItem submenu="submenu 1">
        <MenuItem>Item One </MenuItem>
        <MenuItem>Item Two </MenuItem>
      </MenuItem>
      <UpdatingSubmenu />
    </MenuFullscreen>
  );
};

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
