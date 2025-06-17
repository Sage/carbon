import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { allModes } from "../../../.storybook/modes";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import isChromatic from "../../../.storybook/isChromatic";

import Box from "../box";
import useMediaQuery from "../../hooks/useMediaQuery";
import Search, { SearchEvent } from "../search";
import Typography from "../typography";
import Portrait from "../portrait";

import {
  Menu,
  MenuItem,
  MenuDivider,
  MenuSegmentTitle,
  ScrollableBlock,
  MenuFullscreen,
} from ".";

import type { MenuType } from "./menu.types";

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
type MenuStory = StoryObj<typeof Menu>;

const menuTypes: MenuType[] = ["white", "light", "dark", "black"];

export const DefaultStory: MenuStory = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem icon="settings" href="#">
              Menu Item One
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
            <MenuItem submenu="Menu Item Four" onClick={() => {}}>
              <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};
DefaultStory.storyName = "Default";
DefaultStory.parameters = { chromatic: { disableSnapshot: true } };

export const SelectedStory: MenuStory = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem selected href="#">
              Menu Item One
            </MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};
SelectedStory.storyName = "Selected";

export const DividerStory: MenuStory = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuDivider />
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuItem href="#">Item Submenu Three</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};
DividerStory.storyName = "Divider";
DividerStory.parameters = { chromatic: { disableSnapshot: true } };

export const LargeDividerStory: MenuStory = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuDivider size="large" />
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuItem href="#">Item Submenu Three</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};
LargeDividerStory.storyName = "Large Divider";
LargeDividerStory.parameters = { chromatic: { disableSnapshot: true } };

export const SegmentTitleStory: MenuStory = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuSegmentTitle text="segment title">
                <MenuItem href="#">Item Submenu Two</MenuItem>
                <MenuItem href="#">Item Submenu Three</MenuItem>
              </MenuSegmentTitle>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};
SegmentTitleStory.storyName = "Segment Title";
SegmentTitleStory.parameters = { chromatic: { disableSnapshot: true } };

export const AlternateColourStory: MenuStory = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuDivider size="large" />
              <MenuSegmentTitle text="segment title" variant="alternate">
                <MenuItem variant="alternate" href="#">
                  Item Submenu Two
                </MenuItem>
                <MenuItem variant="alternate" href="#">
                  Item Submenu Three
                </MenuItem>
              </MenuSegmentTitle>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};
AlternateColourStory.storyName = "Alternate Colour";
AlternateColourStory.parameters = { chromatic: { disableSnapshot: true } };

export const SubmenuNodes: MenuStory = () => (
  <Box mb={150}>
    {menuTypes.map((menuType) => {
      const submenuNode = (initials: string, name: string) => (
        <Box
          height="40px"
          width="60px"
          display="flex"
          alignItems="center"
          gap="2px"
          pl="7px"
        >
          <Portrait size="XS" initials={initials} />
          <Typography
            fontWeight="500"
            fontSize="14px"
            color={
              menuType === "black" || menuType === "dark" ? "white" : "black"
            }
            margin={0}
          >
            {name}
          </Typography>
        </Box>
      );
      return (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem
              submenu={submenuNode("JD", "John")}
              p={0}
              ariaLabel="John Doe"
            >
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuItem
              submenu={submenuNode("JS", "Jane")}
              p={0}
              ariaLabel="Jane Smith"
            >
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuItem
              submenu={submenuNode("AB", "Alice")}
              p={0}
              ariaLabel="Alice Brown"
            >
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuItem
              submenu={submenuNode("BC", "Bob")}
              p={0}
              ariaLabel="Bob Clark"
            >
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      );
    })}
  </Box>
);
SubmenuNodes.storyName = "Submenu Nodes";

export const SubmenuOptionsStory: MenuStory = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="No action or link">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuDivider />
              <MenuItem icon="settings" href="#">
                Item Submenu Three
              </MenuItem>
              <MenuItem href="#">Item Submenu Four</MenuItem>
            </MenuItem>
            <MenuItem submenu="With href" href="#">
              <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
            <MenuItem submenu="With clickToOpen prop" clickToOpen>
              <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};
SubmenuOptionsStory.storyName = "Submenu Options";
SubmenuOptionsStory.parameters = { chromatic: { disableSnapshot: true } };

export const SubmenuDirectionLeftStory: MenuStory = () => {
  return (
    <Box mb={150}>
      <Menu>
        <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem submenu="Menu Item Three" submenuDirection="left">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuDivider />
          <MenuItem icon="settings" href="#">
            Item Submenu Three
          </MenuItem>
          <MenuItem href="#">A really long Item Submenu Four</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
};
SubmenuDirectionLeftStory.storyName = "Submenu Direction Left";
SubmenuDirectionLeftStory.parameters = { chromatic: { disableSnapshot: true } };

export const WithIconStory: MenuStory = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem icon="home" href="#">
              Home
            </MenuItem>
            <MenuItem icon="person" href="#" ariaLabel="Account" />
            <MenuItem icon="settings" submenu="Settings">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuDivider />
              <MenuItem icon="settings" href="#" ariaLabel="settings" />
              <MenuItem href="#">Item Submenu Four</MenuItem>
            </MenuItem>
            <MenuItem icon="arrow_right" submenu ariaLabel="Actions">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};
WithIconStory.storyName = "With Icon";
WithIconStory.parameters = { chromatic: { disableSnapshot: true } };

export const NoDropdownArrowOnSubmenuStory: MenuStory = () => {
  return (
    <Box minHeight="150px">
      <Menu>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem showDropdownArrow={false} submenu="Menu Item Three">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
};
NoDropdownArrowOnSubmenuStory.storyName = "No Dropdown Arrow on Submenu";
NoDropdownArrowOnSubmenuStory.parameters = {
  chromatic: { disableSnapshot: true },
};

export const SplitSubmenuIntoSeparateComponentStory: MenuStory = () => {
  const MySubMenu = (
    <MenuItem submenu="Menu Item Three">
      <MenuItem href="#">Item Submenu One</MenuItem>
      <MenuItem href="#">Item Submenu Two</MenuItem>
    </MenuItem>
  );
  return (
    <Box minHeight="150px">
      <Menu>
        <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        {MySubMenu}
      </Menu>
    </Box>
  );
};
SplitSubmenuIntoSeparateComponentStory.storyName =
  "Split Submenu into Separate Component";
SplitSubmenuIntoSeparateComponentStory.parameters = {
  chromatic: { disableSnapshot: true },
};

export const SubmenuIconAndTextAlignment: MenuStory = () => {
  return (
    <Box minHeight="250px">
      <Menu menuType="dark">
        <MenuItem icon="settings" submenu="Settings">
          <MenuItem href="#" icon="settings" onClick={() => {}}>
            onClick and Icon
          </MenuItem>
          <MenuItem onClick={() => {}}>
            <Box ml="21px">onClick</Box>
          </MenuItem>
          <MenuDivider />
          <MenuItem icon="settings" href="#">
            href and Icon
          </MenuItem>
          <MenuItem href="#">
            <Box ml="21px">href</Box>
          </MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
};
SubmenuIconAndTextAlignment.storyName = "Submenu Icon and Text Alignment";
SubmenuIconAndTextAlignment.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ScrollableSubmenuStory: MenuStory = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
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
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};
ScrollableSubmenuStory.storyName = "Scrollable Submenu";
ScrollableSubmenuStory.parameters = { chromatic: { disableSnapshot: true } };

export const ScrollableSubmenuWithParent: MenuStory = () => {
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
              <Search
                placeholder="search"
                value={searchString}
                onChange={handleTextChange}
              />
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
};

ScrollableSubmenuWithParent.parameters = {
  chromatic: { disableSnapshot: true },
};

export const SubmenuWithSearch: MenuStory = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <Box key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuDivider size="large" />
              <MenuSegmentTitle text="segment title" variant="alternate">
                <MenuItem variant="alternate" p="2px 16px">
                  <Search
                    placeholder="Dark variant"
                    variant="dark"
                    defaultValue=""
                  />
                </MenuItem>
                <MenuItem variant="alternate" href="#">
                  Item Submenu Two
                </MenuItem>
                <MenuItem variant="alternate" href="#">
                  Item Submenu Three
                </MenuItem>
              </MenuSegmentTitle>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};
SubmenuWithSearch.storyName = "Submenu with Search";
SubmenuWithSearch.parameters = { chromatic: { disableSnapshot: true } };

export const TruncatedTitlesStory: MenuStory = () => {
  return (
    <Box minHeight="150px">
      <Menu>
        <MenuItem maxWidth="168px" href="#">
          A long menu item title
        </MenuItem>
        <MenuItem maxWidth="148px" submenu="Menu Item Three">
          <MenuItem maxWidth="182px" href="#">
            A long submenu menu item title
          </MenuItem>
        </MenuItem>
        <MenuItem maxWidth="180px" icon="home" href="#">
          A long menu item title
        </MenuItem>
      </Menu>
    </Box>
  );
};
TruncatedTitlesStory.storyName = "Truncated Titles";

export const ResponsiveCompositionStory: MenuStory = () => {
  const isBelowBreakpoint1 = useMediaQuery("(max-width: 1200px)");
  const isBelowBreakpoint2 = useMediaQuery("(max-width: 1000px)");
  const isBelowBreakpoint3 = useMediaQuery("(max-width: 800px)");
  const isBelowBreakpoint4 = useMediaQuery("(max-width: 600px)");
  const responsiveMenuItems = () => {
    if (isBelowBreakpoint4) {
      return [
        <MenuItem key="submenu-4" submenu="More">
          <MenuItem href="#">Menu Item One</MenuItem>
          <MenuItem href="#">Menu Item Two</MenuItem>
          <MenuItem href="#">Menu Item Three</MenuItem>
          <MenuItem href="#">Menu Item Four</MenuItem>
        </MenuItem>,
      ];
    }
    if (isBelowBreakpoint3) {
      return [
        <MenuItem key="menu-item-3" href="#">
          Menu Item One
        </MenuItem>,
        <MenuItem key="submenu-3" submenu="More">
          <MenuItem href="#">Menu Item Two</MenuItem>
          <MenuItem href="#">Menu Item Three</MenuItem>
          <MenuItem href="#">Menu Item Four</MenuItem>
        </MenuItem>,
      ];
    }
    if (isBelowBreakpoint2) {
      return [
        <MenuItem key="menu-item-2-a" href="#">
          Menu Item One
        </MenuItem>,
        <MenuItem key="menu-item-2-b" href="#">
          Menu Item Two
        </MenuItem>,
        <MenuItem key="submenu-2" submenu="More">
          <MenuItem href="#">Menu Item Three</MenuItem>
          <MenuItem href="#">Menu Item Four</MenuItem>
        </MenuItem>,
      ];
    }
    if (isBelowBreakpoint1) {
      return [
        <MenuItem key="menu-item-1-a" href="#">
          Menu Item One
        </MenuItem>,
        <MenuItem key="menu-item-1-b" href="#">
          Menu Item Two
        </MenuItem>,
        <MenuItem key="menu-item-1-c" href="#">
          Menu Item Three
        </MenuItem>,
        <MenuItem key="submenu-1" submenu="More">
          <MenuItem href="#">Menu Item Four</MenuItem>
        </MenuItem>,
      ];
    }
    return [
      <MenuItem key="menu-item-a" href="#">
        Menu Item One
      </MenuItem>,
      <MenuItem key="menu-item-b" href="#">
        Menu Item Two
      </MenuItem>,
      <MenuItem key="menu-item-c" href="#">
        Menu Item Three
      </MenuItem>,
      <MenuItem key="menu-item-d" href="#">
        Menu Item Four
      </MenuItem>,
    ];
  };
  return (
    <Box minHeight="250px">
      <Menu>{React.Children.map(responsiveMenuItems(), (items) => items)}</Menu>
    </Box>
  );
};
ResponsiveCompositionStory.storyName = "Responsive Composition";
ResponsiveCompositionStory.parameters = {
  chromatic: { disableSnapshot: true },
};

export const FullscreenViewStory: MenuStory = () => {
  const [menuOpen, setMenuOpen] = useState({
    light: false,
    dark: false,
    white: false,
    black: false,
  });
  const fullscreenViewBreakPoint = useMediaQuery("(max-width: 1200px)");
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
          <MenuItem href="#">Menu Item One</MenuItem>
          <MenuItem onClick={() => {}} submenu="Menu Item Two">
            <MenuItem href="#">Submenu Item One</MenuItem>
            <MenuItem href="#">Submenu Item Two</MenuItem>
          </MenuItem>
          <MenuItem href="#">Menu Item Three</MenuItem>
          <MenuItem href="#">Menu Item Four</MenuItem>
          <MenuItem
            href="#"
            submenu={
              <Typography
                variant="big"
                fontWeight="500"
                lineHeight="40px"
                color={menu === "black" || menu === "dark" ? "white" : "black"}
              >
                Menu Item Five
              </Typography>
            }
          >
            <MenuItem href="#">Submenu Item One</MenuItem>
            <MenuItem href="#">Submenu Item Two</MenuItem>
          </MenuItem>
          <MenuItem href="#">Menu Item Six</MenuItem>
        </MenuFullscreen>,
      ];
    }
    return [
      <MenuItem key="default-menu-item-1" href="#">
        Menu Item One
      </MenuItem>,
      <MenuItem key="default-menu-item-2" submenu="Menu Item Two">
        <MenuItem href="#">Submenu Item One</MenuItem>
        <MenuItem href="#">Submenu Item Two</MenuItem>
      </MenuItem>,
      <MenuItem key="default-menu-item-3" href="#">
        Menu Item Three
      </MenuItem>,
      <MenuItem key="default-menu-item-4" href="#">
        Menu Item Four
      </MenuItem>,
      <MenuItem key="default-menu-item-5" submenu="Menu Item Five">
        <MenuItem href="#">Submenu Item One</MenuItem>
        <MenuItem href="#">Submenu Item Two</MenuItem>
      </MenuItem>,
      <MenuItem key="default-menu-item-6" href="#">
        Menu Item Six
      </MenuItem>,
    ];
  };
  return (
    <Box>
      {menuTypes.map((menuType) => (
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
FullscreenViewStory.storyName = "Fullscreen View";
FullscreenViewStory.parameters = { chromatic: { disableSnapshot: true } };

export const ControllingTheSubmenuWidth: MenuStory = {
  render: () => (
    <Menu menuType="black">
      <MenuItem submenuMaxWidth="300px" submenu="Open submenu with max width">
        <MenuItem href="#">Item One</MenuItem>
        <MenuItem href="#">
          This is a longer text string. I will wrap instead of truncating!
        </MenuItem>
      </MenuItem>
      <MenuItem submenuMinWidth="300px" submenu="Open submenu with min width">
        <MenuItem href="#">Item One</MenuItem>
        <MenuItem href="#">Item Two</MenuItem>
        <MenuItem href="#">Item Three</MenuItem>
      </MenuItem>
    </Menu>
  ),
  decorators: [
    (Story) => (
      <div style={{ minHeight: "250px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: { chromatic: { disableSnapshot: true } },
};

export const MenuFullscreenWithSegmentStyling = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSegmentedOpen, setIsSegmentedOpen] = useState(false);

  return (
    <Box minHeight="250px">
      <Box display="flex" marginBottom={2}>
        <Menu menuType="black">
          <MenuItem onClick={() => setIsOpen(true)} icon="entry">
            Open Normal Menu
          </MenuItem>
          <MenuFullscreen isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <MenuItem variant="default" href="#">
              Default Menu Item
            </MenuItem>
            <MenuItem variant="alternate" href="#">
              Alternate Menu Item
            </MenuItem>
          </MenuFullscreen>

          <MenuItem
            onClick={() => setIsSegmentedOpen(true)}
            icon="stacked_squares"
          >
            Open Segmented Menu
          </MenuItem>
          <MenuFullscreen
            isOpen={isSegmentedOpen}
            onClose={() => setIsSegmentedOpen(false)}
          >
            <MenuSegmentTitle
              key="default-variant"
              variant="default"
              text="Menu items (default variant)"
            >
              <MenuItem variant="default" href="#">
                Segmented Default Menu Item
              </MenuItem>
            </MenuSegmentTitle>
            <MenuSegmentTitle
              key="alternate-variant"
              variant="alternate"
              text="Menu items (alternate variant)"
            >
              <MenuItem variant="alternate" href="#">
                Segmented Alternate Menu Item
              </MenuItem>
            </MenuSegmentTitle>
          </MenuFullscreen>
        </Menu>
      </Box>
      <Box display="flex">
        <Menu menuType="black">
          <MenuItem submenu="Standard Menu">
            <MenuItem href="#" variant="default">
              Default Menu Item
            </MenuItem>
            <MenuItem href="#" variant="alternate">
              Alternate Menu Item
            </MenuItem>
            <MenuSegmentTitle
              key="default-variant"
              variant="default"
              text="Menu items (default variant)"
            >
              <MenuItem href="#" variant="default">
                Segmented Default Menu Item
              </MenuItem>
            </MenuSegmentTitle>
            <MenuSegmentTitle
              key="alternate-variant"
              variant="alternate"
              text="Menu items (alternate variant)"
            >
              <MenuItem href="#" variant="alternate">
                Segmented Alternate Menu Item
              </MenuItem>
            </MenuSegmentTitle>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

MenuFullscreenWithSegmentStyling.storyName =
  "Full-screen Menu with segment styling";
MenuFullscreenWithSegmentStyling.parameters = {
  chromatic: { disableSnapshot: true },
};
