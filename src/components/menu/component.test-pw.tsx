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
  MenuFullscreenProps,
  MenuProps,
  MenuDividerProps,
  ScrollableBlockProps,
} from ".";
import Search, { SearchEvent } from "../search";
import GlobalHeader from "../global-header";
import Box from "../box/box.component";
import Typography from "../typography/typography.component";
import useMediaQuery from "../../hooks/useMediaQuery";
import Button from "../button";
import PopoverContainer from "../popover-container";
import Icon from "../icon";

import type { MenuType } from "./menu.types";

const menuTypes: MenuType[] = ["white", "light", "dark", "black"];

export const MenuComponent = (props: Partial<MenuProps> & MenuDividerProps) => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <div key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType} {...props}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuDivider size={props.size} />
              <MenuItem icon="settings" href="#">
                Item Submenu Three
              </MenuItem>
              <MenuItem href="#">Item Submenu Four</MenuItem>
            </MenuItem>
            <MenuItem submenu="Menu Item Four" onClick={() => {}}>
              <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
              <MenuSegmentTitle text="segment title" />
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </div>
      ))}
    </Box>
  );
};

export const MenuComponentScrollable = (
  props: Partial<ScrollableBlockProps>,
) => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <div key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem onClick={() => {}}>Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <ScrollableBlock height="200px" {...props}>
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
        </div>
      ))}
    </Box>
  );
};

export const MenuComponentScrollableWithSearch = () => {
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

export const MenuComponentSearch = () => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <div key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem submenu="Menu One">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuDivider size="large" />
              <MenuSegmentTitle text="segment title" />
              <MenuItem variant="alternate">
                <Search
                  placeholder="Dark variant"
                  variant="dark"
                  defaultValue=""
                />
              </MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuItem href="#">Item Submenu Three</MenuItem>
            </MenuItem>
          </Menu>
        </div>
      ))}
    </Box>
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

export const MenuComponentFullScreen = (
  props: Partial<MenuFullscreenProps>,
) => {
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
          {...props}
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
              (items) => items,
            )}
          </Menu>
        </div>
      ))}
    </Box>
  );
};

export const MenuComponentFullScreenSimple = ({
  open = true,
}: {
  open?: boolean;
}) => {
  const [menuOpen, setMenuOpen] = useState(open);

  return (
    <Menu menuType="light">
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

export const MenuComponentFullScreenWithLongSubmenuText = (
  props: Partial<MenuFullscreenProps>,
) => {
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
          {...props}
        >
          <MenuItem href="#">Menu Item One</MenuItem>
          <MenuItem
            onClick={() => {}}
            submenu="Menu item with a really long topic where the text should not be truncated but instead it should be wrapped"
          >
            <MenuItem href="#">
              Submenu item with a really long topic where the text should not be
              truncated but instead it should be wrapped
            </MenuItem>
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
      <MenuItem
        key="default-menu-item-2"
        submenu="Menu item with a really long topic where the text should not be truncated but instead it should be wrapped"
      >
        <MenuItem href="#">
          Submenu item with a really long topic where the text should not be
          truncated but instead it should be wrapped
        </MenuItem>
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
              (items) => items,
            )}
          </Menu>
        </div>
      ))}
    </Box>
  );
};

export const MenuFullScreenBackgroundScrollTest = () => {
  return (
    <Box height="2000px" position="relative">
      <Box height="100px" position="absolute" bottom="0px">
        I should not be scrolled into view
      </Box>
      <MenuFullscreen isOpen onClose={() => {}}>
        <MenuItem href="#">Menu Item One</MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
      </MenuFullscreen>
    </Box>
  );
};

export const MenuComponentItems = (
  props: MenuWithChildren & MenuDividerProps,
) => {
  return (
    <Box mb={150}>
      <Typography textTransform="capitalize" my={2} />
      <Menu menuType="white">
        <MenuItem submenu="Menu Item One" submenuDirection="right" {...props}>
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuDivider size={props.size} />
          <MenuItem icon="settings" href="#">
            Item Submenu Three
          </MenuItem>
          <MenuItem href="#">Item Submenu Four</MenuItem>
        </MenuItem>
        <MenuItem href="#">Menu Item Two</MenuItem>
        <MenuItem
          submenu="Menu Item Three"
          submenuDirection="left"
          onClick={() => {}}
          {...props}
        >
          <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export const MenuItems = (props: MenuWithChildren) => {
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
            <MenuItem submenu="With clickToOpen prop" {...props}>
              <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </Box>
      ))}
    </Box>
  );
};

export const MenuFullScreenWithSearchButton = ({
  searchValue,
}: {
  searchValue?: string;
}) => (
  <MenuFullscreen isOpen onClose={() => {}}>
    <MenuItem href="#">Menu Item before Search</MenuItem>
    <MenuItem variant="alternate">
      <Search
        placeholder="Dark variant"
        variant="dark"
        defaultValue={searchValue}
        searchButton
      />
    </MenuItem>
    <MenuItem variant="alternate" href="#">
      Menu Item after Search
    </MenuItem>
  </MenuFullscreen>
);

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
            parent={
              <Search
                placeholder="parent"
                value={searchString}
                onChange={handleTextChange}
              />
            }
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
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <div key={menuType}>
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
        </div>
      ))}
    </Box>
  );
};

export const MenuComponentButtonIcon = () => {
  return (
    <div
      style={{
        minHeight: "250px",
      }}
    >
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
    </div>
  );
};

export const MenuSegmentTitleComponent = (props: Partial<MenuTitleProps>) => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <div key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
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
              <MenuSegmentTitle {...props} text="segment title" />
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </div>
      ))}
    </Box>
  );
};

export const MenuSegmentTitleComponentWithAdditionalMenuItem = (
  props: Partial<MenuTitleProps>,
) => {
  return (
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <div key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
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
        </div>
      ))}
    </Box>
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
    <Box mb={150}>
      {menuTypes.map((menuType) => (
        <div key={menuType}>
          <Typography variant="h4" textTransform="capitalize" my={2}>
            {menuType}
          </Typography>
          <Menu menuType={menuType}>
            <MenuItem href="#">Menu Item One</MenuItem>
            <MenuItem href="#">Menu Item Two</MenuItem>
            <MenuItem submenu="Menu Item Three">
              <MenuItem href="#">Item Submenu One</MenuItem>
              <MenuItem href="#">Item Submenu Two</MenuItem>
              <MenuDivider {...props} />
              <MenuItem icon="settings" href="#">
                Item Submenu Three
              </MenuItem>
              <MenuItem href="#">Item Submenu Four</MenuItem>
            </MenuItem>
            <MenuItem submenu="Menu Item Four" onClick={() => {}}>
              <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
              <MenuSegmentTitle text="segment title" />
              <MenuItem href="#">Item Submenu Two</MenuItem>
            </MenuItem>
          </Menu>
        </div>
      ))}
    </Box>
  );
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

export const SubMenuWithVeryLongLabel = () => {
  return (
    <Box mb={150}>
      <Menu menuType="white">
        <MenuItem submenu="Menu Item One Has A Very Long Menu Title For No Reason Whatsoever">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem variant="alternate" href="#">
            Item Submenu Two
          </MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export const MenuItemWithPopoverContainerChild = () => {
  return (
    <Menu menuType="black">
      <MenuItem>
        <PopoverContainer
          disableAnimation
          containerAriaLabel="notifications"
          closeButtonAriaLabel="closeContainerAriaLabel"
          position="left"
          shouldCoverButton
          onOpen={() => {}}
          onClose={() => {}}
          open={false}
          renderOpenComponent={({ ref, onClick }) => (
            <Box data-role="gblnav-notificationui-bell">
              <Button aria-label="Notifications" ref={ref} onClick={onClick}>
                <Box alignItems="center" display="flex" px={2}>
                  <Icon type="alert" />
                  notifications
                </Box>
              </Button>
            </Box>
          )}
        >
          Content
        </PopoverContainer>
      </MenuItem>
    </Menu>
  );
};

export const SubmenuMaxWidth = () => (
  <Menu>
    <MenuItem
      maxWidth="240px"
      submenuMaxWidth="300px"
      submenu="This is a very long menu item title "
    >
      <MenuItem href="#">Item Submenu One</MenuItem>
      <MenuSegmentTitle text="segment title that should wrap when it will overflow">
        <MenuItem href="#">Item Two</MenuItem>
        <MenuItem href="#">
          This is a longer text string that will wrap when it will overflow the
          width of the submenu container
        </MenuItem>
      </MenuSegmentTitle>
    </MenuItem>
  </Menu>
);

export const WithNonInteractiveItem = () => (
  <Menu>
    <MenuItem>Non-interactive item</MenuItem>
  </Menu>
);

export const WithNonInteractiveSubmenuItem = () => (
  <Menu>
    <MenuItem submenu="Submenu">
      <MenuItem>Non-interactive item</MenuItem>
    </MenuItem>
  </Menu>
);

export const FullscreenWithNonInteractiveItem = () => (
  <Menu>
    <MenuFullscreen isOpen onClose={() => {}}>
      <MenuItem>Non-interactive item</MenuItem>
    </MenuFullscreen>
  </Menu>
);
