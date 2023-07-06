import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";

import {
  Menu,
  MenuItem,
  MenuDivider,
  MenuSegmentTitle,
  ScrollableBlock,
  MenuFullscreen,
} from ".";
import Box from "../box";
import useMediaQuery from "../../hooks/useMediaQuery";
import Search, { SearchEvent } from "../search";
import Typography from "../typography";
import { MenuType } from "./menu.context";

const menuTypes: MenuType[] = ["white", "light", "dark", "black"];

export const DefaultStory: ComponentStory<typeof Menu> = () => (
  <Box mb={150}>
    {menuTypes.map((menuType) => (
      <Box key={menuType}>
        <Typography variant="h4" textTransform="capitalize" my={2}>
          {menuType}
        </Typography>
        <Menu menuType={menuType}>
          <MenuItem className="foooooo" href="#">
            Menu Item One
          </MenuItem>
          <MenuItem href="#">Menu Item Two</MenuItem>
          <MenuItem submenu="Menu Item Three">
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
            <MenuDivider />
            <MenuItem icon="settings" href="#">
              Item Submenu Three
            </MenuItem>
            <MenuItem href="#">Item Submenu Four</MenuItem>
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

DefaultStory.parameters = { chromatic: { disableSnapshot: true } };

export const SelectedStory: ComponentStory<typeof Menu> = () => (
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

export const DividerStory: ComponentStory<typeof Menu> = () => (
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

DividerStory.parameters = { chromatic: { disableSnapshot: true } };

export const LargeDividerStory: ComponentStory<typeof Menu> = () => (
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

LargeDividerStory.parameters = { chromatic: { disableSnapshot: true } };

export const SegmentTitleStory: ComponentStory<typeof Menu> = () => (
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
            <MenuSegmentTitle>segment title</MenuSegmentTitle>
            <MenuItem href="#">Item Submenu Two</MenuItem>
            <MenuItem href="#">Item Submenu Three</MenuItem>
          </MenuItem>
        </Menu>
      </Box>
    ))}
  </Box>
);

SegmentTitleStory.parameters = { chromatic: { disableSnapshot: true } };

export const AlternateColourStory: ComponentStory<typeof Menu> = () => (
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
            <MenuSegmentTitle variant="alternate">
              segment title
            </MenuSegmentTitle>
            <MenuItem variant="alternate" href="#">
              Item Submenu Two
            </MenuItem>
            <MenuItem variant="alternate" href="#">
              Item Submenu Three
            </MenuItem>
          </MenuItem>
        </Menu>
      </Box>
    ))}
  </Box>
);

AlternateColourStory.parameters = { chromatic: { disableSnapshot: true } };

export const SubmenuOptionsStory: ComponentStory<typeof Menu> = () => (
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

SubmenuOptionsStory.parameters = { chromatic: { disableSnapshot: true } };

export const SubmenuDirectionLeftStory: ComponentStory<typeof Menu> = () => (
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

SubmenuDirectionLeftStory.parameters = { chromatic: { disableSnapshot: true } };

export const WithIconStory: ComponentStory<typeof Menu> = () => (
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

WithIconStory.parameters = { chromatic: { disableSnapshot: true } };

export const NoDropdwonArrowOnSubmenuStory: ComponentStory<
  typeof Menu
> = () => (
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

NoDropdwonArrowOnSubmenuStory.parameters = {
  chromatic: { disableSnapshot: true },
};

export const SplitSubmenuIntoSeparateComponentStory: ComponentStory<
  typeof Menu
> = () => {
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

SplitSubmenuIntoSeparateComponentStory.parameters = {
  chromatic: { disableSnapshot: true },
};

export const SubmeuIconAndTextAlignment: ComponentStory<typeof Menu> = () => (
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

SubmeuIconAndTextAlignment.parameters = {
  chromatic: { disableSnapshot: true },
};

export const ScrollableSubmenuStory: ComponentStory<typeof Menu> = () => (
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

ScrollableSubmenuStory.parameters = { chromatic: { disableSnapshot: true } };

export const ScrollableSubmenuWithParent: ComponentStory<typeof Menu> = () => {
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

export const SubmenuWithSearch: ComponentStory<typeof Menu> = () => (
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
            <MenuSegmentTitle variant="alternate">
              segment title
            </MenuSegmentTitle>
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
          </MenuItem>
        </Menu>
      </Box>
    ))}
  </Box>
);

SubmenuWithSearch.parameters = { chromatic: { disableSnapshot: true } };

export const TruncatedTitlesStory: ComponentStory<typeof Menu> = () => (
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

export const ResponsiveCompositionStory: ComponentStory<typeof Menu> = () => {
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
    <div style={{ minHeight: "250px" }}>
      <Menu>{React.Children.map(responsiveMenuItems(), (items) => items)}</Menu>
    </div>
  );
};

ResponsiveCompositionStory.parameters = {
  chromatic: { disableSnapshot: true },
};

export const FullscreenViewStory: ComponentStory<typeof Menu> = () => {
  const [menuOpen, setMenuOpen] = useState({
    light: false,
    dark: false,
    white: false,
    black: false,
  });
  const fullscreenViewBreakPoint = useMediaQuery("(max-width: 1200px)");
  const responsiveMenuItems = (
    startPosition: "left" | "right",
    menu: MenuType
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
          <MenuItem submenu="Menu Item Five">
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
        <div key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            {React.Children.map(
              responsiveMenuItems("left", menuType),
              (items) => items
            )}
          </Menu>
        </div>
      ))}
    </Box>
  );
};

FullscreenViewStory.parameters = { chromatic: { disableSnapshot: true } };
