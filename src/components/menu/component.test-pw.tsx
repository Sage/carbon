import React, { useState } from "react";
import {
  Menu,
  MenuDivider,
  MenuSegmentTitle,
  MenuTitleProps,
  ScrollableBlock,
  MenuItem,
  MenuWithChildren,
  MenuFullscreen,
  MenuProps,
  MenuDividerProps,
  ScrollableBlockProps,
} from ".";
import Search from "../search";
import Box from "../box/box.component";
import Portrait from "../portrait";
import Icon from "../icon";

export const MenuComponent = (props: Partial<MenuProps>) => {
  return (
    <Menu {...props}>
      <MenuItem href="#">Menu Item One</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
      <MenuItem submenu="Menu Item Three">
        <MenuItem href="#">Item Submenu One</MenuItem>
        <MenuItem href="#">Item Submenu Two</MenuItem>
        <MenuDivider />
        <MenuItem href="#">Item Submenu Three</MenuItem>
        <MenuItem href="#">Item Submenu Four</MenuItem>
      </MenuItem>
    </Menu>
  );
};

export const MenuComponentWithSubmenuNodes = (props: Partial<MenuProps>) => {
  const submenuNode = (initials: string, name: string) => (
    <Box display="flex" alignItems="baseline" gap="10px">
      <Portrait initials={initials} />
      {name}
    </Box>
  );
  return (
    <Menu {...props}>
      <MenuItem
        href="#"
        submenu={submenuNode("JD", "John Doe")}
        ariaLabel="John Doe"
      >
        <MenuItem>Item Submenu One</MenuItem>
        <MenuItem>Item Submenu Two</MenuItem>
      </MenuItem>
      <MenuItem
        href="#"
        submenu={submenuNode("JS", "Jane Smith")}
        ariaLabel="Jane Smith"
      >
        <MenuItem>Item Submenu One</MenuItem>
        <MenuItem>Item Submenu Two</MenuItem>
      </MenuItem>
      <MenuItem
        href="#"
        submenu={submenuNode("AB", "Alice Brown")}
        ariaLabel="Alice Brown"
      >
        <MenuItem>Item Submenu One</MenuItem>
        <MenuItem>Item Submenu Two</MenuItem>
      </MenuItem>
      <MenuItem
        href="#"
        submenu={submenuNode("BC", "Bob Clark")}
        ariaLabel="Bob Clark"
      >
        <MenuItem>Item Submenu One</MenuItem>
        <MenuItem>Item Submenu Two</MenuItem>
      </MenuItem>
    </Menu>
  );
};

export const MenuComponentScrollable = () => {
  return (
    <Menu>
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
    </Menu>
  );
};

export const MenuComponentSearch = (props: Partial<MenuProps>) => {
  const [searchValue, setSearchValue] = useState("");
  return (
    <Menu {...props}>
      <MenuItem submenu="Menu One">
        <MenuItem href="#">Item Submenu One</MenuItem>
        <MenuDivider size="large" />
        <MenuItem variant="alternate">
          <Search
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            inverse={props.variant == "black"}
          />
        </MenuItem>
        <MenuItem href="#">Item Submenu Two</MenuItem>
        <MenuItem href="#">Item Submenu Three</MenuItem>
      </MenuItem>
    </Menu>
  );
};

export const MenuWithChildrenUpdating = () => {
  const [show, setShow] = React.useState(false);
  return (
    <div
      onMouseOut={() => {}}
      onFocus={() => {}}
      onBlur={() => {}}
      onMouseOver={() => setTimeout(() => setShow(true), 500)}
    >
      <Menu>
        <MenuItem submenu="Submenu">
          <MenuItem href="#">Apple</MenuItem>
          {show && (
            <>
              <MenuItem href="#">Banana</MenuItem>
              <MenuItem href="#">Carrot</MenuItem>
            </>
          )}
          <MenuItem href="#">Broccoli</MenuItem>
        </MenuItem>
      </Menu>
    </div>
  );
};

export const MenuComponentFullScreen = ({
  open = true,
}: {
  open?: boolean;
}) => {
  const [menuOpen, setMenuOpen] = useState(open);

  return (
    <Menu>
      <MenuItem key="menu-item" onClick={() => setMenuOpen(true)}>
        Menu
      </MenuItem>
      <MenuFullscreen
        key="menu"
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      >
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
      </MenuFullscreen>
    </Menu>
  );
};

export const MenuFullScreenBackgroundScrollTest = () => {
  return (
    <Box height="2000px" position="relative">
      <Box height="100px" position="absolute" bottom="0px">
        I should not be scrolled into view
      </Box>
      <Menu>
        <MenuFullscreen isOpen onClose={() => {}}>
          <MenuItem href="#">Menu Item One</MenuItem>
          <MenuItem href="#">Menu Item Two</MenuItem>
        </MenuFullscreen>
      </Menu>
    </Box>
  );
};

export const MenuComponentItems = (props: Partial<MenuWithChildren>) => {
  return (
    <Menu>
      <MenuItem {...props}>Menu Item One</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
    </Menu>
  );
};

export const MenuFullScreenWithSearchButton = ({
  searchValue,
}: {
  searchValue?: string;
}) => {
  const [value, setValue] = useState(searchValue || "");

  return (
    <Menu>
      <MenuFullscreen isOpen onClose={() => {}}>
        <MenuItem href="#">Menu Item before Search</MenuItem>
        <MenuItem variant="alternate">
          <Search value={value} onChange={(e) => setValue(e.target.value)} />
        </MenuItem>
        <MenuItem variant="alternate" href="#">
          Menu Item after Search
        </MenuItem>
      </MenuFullscreen>
    </Menu>
  );
};

export const MenuComponentScrollableParent = (
  props: Partial<ScrollableBlockProps>,
) => {
  const items = ["apple", "banana", "carrot", "grapefruit", "melon", "orange"];
  const [itemSearch, setItemSearch] = React.useState(items);
  const [searchString, setSearchString] = React.useState("");

  const handleTextChange = (e: { target: { value: string } }) => {
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
            parent={<Search value={searchString} onChange={handleTextChange} />}
            {...props}
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

export const MenuComponentWithIcon = () => {
  return (
    <Menu>
      <MenuItem icon="home" href="#">
        Home
      </MenuItem>
      <MenuItem onClick={() => {}}>
        <Icon type="settings" /> Settings
      </MenuItem>
      <MenuItem icon="person" onClick={() => {}} ariaLabel="Account" />
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
  );
};

export const MenuSegmentTitleComponentWithAdditionalMenuItem = (
  props: Partial<MenuTitleProps>,
) => {
  return (
    <Menu>
      <MenuItem href="#">Menu Item One</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
      <MenuItem submenu="Menu Item Three">
        <MenuItem href="#">Item Submenu One</MenuItem>
        <MenuItem href="#">Item Submenu Two</MenuItem>
        <MenuItem icon="settings" href="#">
          Item Submenu Three
        </MenuItem>
        <MenuItem href="#">Item Submenu Four</MenuItem>
      </MenuItem>
      <MenuItem submenu="Menu Item Four" onClick={() => {}}>
        <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
        <MenuSegmentTitle {...props} text="segment title">
          <MenuItem href="#">Last Segment Child</MenuItem>
        </MenuSegmentTitle>
        <MenuItem href="#">Menu Item Five</MenuItem>
      </MenuItem>
    </Menu>
  );
};

export const ClosedMenuFullScreenWithButtons = () => {
  return (
    <>
      <button type="button" id="button-1">
        Button 1
      </button>
      <MenuFullscreen isOpen={false} onClose={() => {}}>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
      </MenuFullscreen>
      <button type="button" id="button-2">
        Button 2
      </button>
    </>
  );
};

export const MenuDividerComponent = (props: MenuDividerProps) => {
  return (
    <Menu>
      <MenuItem href="#">Menu Item One</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
      <MenuItem submenu="Submenu">
        <MenuItem href="#">Item Submenu One</MenuItem>
        <MenuItem href="#">Item Submenu Two</MenuItem>
        <MenuDivider {...props} />
        <MenuItem href="#">Item Submenu Three</MenuItem>
        <MenuItem href="#">Item Submenu Four</MenuItem>
      </MenuItem>
    </Menu>
  );
};

export const MenuWithSegmentTitle = (props: Partial<MenuProps>) => {
  return (
    <Menu {...props}>
      <MenuItem href="#">Menu Item One</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
      <MenuItem submenu="Submenu">
        <MenuItem href="#">Item Submenu One</MenuItem>
        <MenuItem href="#">Item Submenu Two</MenuItem>
        <MenuSegmentTitle text="segment title">
          <MenuItem href="#">Item Submenu Three</MenuItem>
          <MenuItem onClick={() => {}}>Item Submenu Four</MenuItem>
        </MenuSegmentTitle>
      </MenuItem>
    </Menu>
  );
};
