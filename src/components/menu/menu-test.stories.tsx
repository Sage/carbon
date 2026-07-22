import React, { useState, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import isChromatic from "../../../.storybook/isChromatic";
import {
  Menu,
  MenuItem,
  MenuFullscreen,
  MenuFullscreenProps,
  MenuDivider,
  MenuSegmentTitle,
  ScrollableBlock,
} from ".";
import Search, { SearchEvent } from "../search";
import Box from "../box";
import GlobalHeader from "../global-header";
import Icon from "../icon";

import type { MenuType } from "./menu.types";
import NavigationBar from "../navigation-bar";
import Pill from "../pill";

import useMediaQuery from "../../hooks/useMediaQuery";
import Typography from "../typography";

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

export const LongLabelsWrappingAndPill = () => {
  return (
    <>
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
      <Box mt={4}>
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
          <MenuItem
            maxWidth="100px"
            submenu="Menu Item Four"
            onClick={() => {}}
          >
            <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </Box>
      <Box mt={4}>
        <NavigationBar navigationType="white" orientation="top">
          <Menu menuType="white">
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem onClick={() => {}}>Menu Item Button</MenuItem>
            <MenuItem onClick={() => {}}>
              incomplete
              <Pill
                pillRole="status"
                colorVariant="warning"
                fill
                ml={1}
                size="M"
              >
                2
              </Pill>
            </MenuItem>
            <MenuItem submenu="Menu Item Four" onClick={() => {}}>
              <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </NavigationBar>
      </Box>
    </>
  );
};

LongLabelsWrappingAndPill.storyName =
  "With Long MenuItem Labels, Wrapping and Pill";
LongLabelsWrappingAndPill.parameters = {
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
  chromatic: { disableSnapshot: true },
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

export const FullscreenViewAlternateStory = () => {
  const [menuOpen, setMenuOpen] = useState({
    light: false,
    dark: false,
    white: false,
    black: false,
  });
  const fullscreenViewBreakPoint = useMediaQuery("(max-width: 1200px)");

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
  const [itemSearch, setItemSearch] = useState(items);
  const [searchString, setSearchString] = useState("");
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
  const searchVariant = (menu: MenuType) => {
    if (menu === "black" || menu === "dark") {
      return "dark";
    }
    return "default";
  };

  const responsiveMenuItems = (
    startPosition: "left" | "right",
    menu: MenuType,
  ) => {
    if (fullscreenViewBreakPoint) {
      return [
        <MenuItem
          key="fullscreen-menu-item-1"
          onClick={() => setMenuOpen((state) => ({ ...state, [menu]: true }))}
        >
          Menu
        </MenuItem>,
        <MenuFullscreen
          key="fullscreen-menu-1"
          startPosition={startPosition}
          isOpen={menuOpen[menu]}
          onClose={() => setMenuOpen((state) => ({ ...state, [menu]: false }))}
        >
          <MenuItem key="default-menu-item-1" href="#">
            Menu Item
          </MenuItem>
          <MenuItem key="default-menu-item-2" href="#" variant="alternate">
            Menu Item Alternate
          </MenuItem>
          <MenuItem key="default-menu-item-3" submenu="Submenu Title">
            <MenuItem key="default-submenu-item-1" href="#">
              Submenu Item
            </MenuItem>
            <MenuItem key="default-submenu-item-2" href="#">
              Submenu Item
            </MenuItem>
            <MenuSegmentTitle text="Segment title">
              <ScrollableBlock
                key="search-results"
                maxHeight="280px"
                parent={
                  <Search
                    key="business-search"
                    placeholder="Search"
                    variant={searchVariant(menu)}
                    onChange={handleTextChange}
                    value={searchString}
                  />
                }
              >
                {itemSearch.map((val) => (
                  <MenuItem key={`default-submenu-search-${val}`} href="#">
                    {val}
                  </MenuItem>
                ))}
                {!itemSearch.length ? (
                  <MenuItem key="default-no-results">
                    <Box mx={2}>No results</Box>
                  </MenuItem>
                ) : null}
              </ScrollableBlock>
            </MenuSegmentTitle>
          </MenuItem>
          <MenuItem
            key="default-menu-item-4"
            submenu="Submenu Title Alternate"
            variant="alternate"
          >
            <MenuItem key="alternate-submenu-item-1" href="#">
              Submenu Item
            </MenuItem>
            <MenuItem
              key="alternate-submenu-item-2"
              href="#"
              variant="alternate"
            >
              Submenu Item Alternate
            </MenuItem>
            <MenuSegmentTitle
              key="alternate-variant"
              variant="alternate"
              text="Alternate Segment title"
            >
              <ScrollableBlock
                key="search-results"
                maxHeight="280px"
                variant="alternate"
                parentVariant="alternate"
                parent={
                  <Search
                    key="business-search"
                    placeholder="Search"
                    variant={searchVariant(menu)}
                    onChange={handleTextChange}
                    value={searchString}
                  />
                }
              >
                {itemSearch.map((val) => (
                  <MenuItem
                    key={`alternate-submenu-search-${val}`}
                    variant="alternate"
                    href="#"
                  >
                    {val}
                  </MenuItem>
                ))}
                {!itemSearch.length ? (
                  <MenuItem key="alternate-no-results" variant="alternate">
                    <Box mx={2}>No results</Box>
                  </MenuItem>
                ) : null}
              </ScrollableBlock>
            </MenuSegmentTitle>
          </MenuItem>
        </MenuFullscreen>,
      ];
    }
    return [
      <MenuItem key="default-menu-item-1" href="#">
        Menu Item
      </MenuItem>,
      <MenuItem key="default-menu-item-2" href="#" variant="alternate">
        Menu Item Alternate
      </MenuItem>,
      <MenuItem key="default-menu-item-3" submenu="Submenu Title">
        <MenuItem key="default-submenu-item-1" href="#">
          Submenu Item
        </MenuItem>
        <MenuItem key="default-submenu-item-2" href="#">
          Submenu Item
        </MenuItem>
        <MenuSegmentTitle text="Segment title">
          <ScrollableBlock
            key="search-results"
            maxHeight="280px"
            parent={
              <Search
                key="business-search"
                placeholder="Search"
                variant={searchVariant(menu)}
                onChange={handleTextChange}
                value={searchString}
              />
            }
          >
            {itemSearch.map((val) => (
              <MenuItem key={`default-submenu-search-${val}`} href="#">
                {val}
              </MenuItem>
            ))}
            {!itemSearch.length ? (
              <MenuItem key="default-no-results">
                <Box mx={2}>No results</Box>
              </MenuItem>
            ) : null}
          </ScrollableBlock>
        </MenuSegmentTitle>
      </MenuItem>,
      <MenuItem
        key="default-menu-item-4"
        submenu="Submenu Title Alternate"
        variant="alternate"
      >
        <MenuItem key="alternate-submenu-item-1" href="#">
          Submenu Item
        </MenuItem>
        <MenuItem key="alternate-submenu-item-2" href="#" variant="alternate">
          Submenu Item Alternate
        </MenuItem>
        <MenuSegmentTitle
          key="alternate-variant"
          variant="alternate"
          text="Alternate Segment title"
        >
          <ScrollableBlock
            key="search-results"
            maxHeight="280px"
            variant="alternate"
            parentVariant="alternate"
            parent={
              <Search
                key="business-search"
                placeholder="Search"
                variant={searchVariant(menu)}
                onChange={handleTextChange}
                value={searchString}
              />
            }
          >
            {itemSearch.map((val) => (
              <MenuItem
                key={`alternate-submenu-search-${val}`}
                variant="alternate"
                href="#"
              >
                {val}
              </MenuItem>
            ))}
            {!itemSearch.length ? (
              <MenuItem key="alternate-no-results" variant="alternate">
                <Box mx={2}>No results</Box>
              </MenuItem>
            ) : null}
          </ScrollableBlock>
        </MenuSegmentTitle>
      </MenuItem>,
    ];
  };
  return (
    <Box>
      {(["white", "light", "dark", "black"] as MenuType[]).map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            {React.Children.map(
              responsiveMenuItems("left", menuType),
              (items) => items,
            )}
          </Menu>
        </Box>
      ))}
    </Box>
  );
};
FullscreenViewAlternateStory.storyName = "Fullscreen View Alternate";
FullscreenViewAlternateStory.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: true },
};
