import React, { useState, useEffect } from "react";
import NavigationBar, { NavigationBarProps } from ".";
import { Menu, MenuDivider, MenuItem } from "../menu";
import Box from "../box";
import useMediaQuery from "../../hooks/useMediaQuery";

export const NavigationBarComponent = ({
  children,
  ...props
}: NavigationBarProps) => {
  const isChildren = children !== null ? children : "Playwright tests";
  return <NavigationBar {...props}>{isChildren}</NavigationBar>;
};

export const Default = () => <NavigationBar>Example content</NavigationBar>;

export const DarkTheme = () => (
  <NavigationBar navigationType="dark">Example content</NavigationBar>
);

export const WhiteTheme = () => (
  <NavigationBar navigationType="white">Example content</NavigationBar>
);

export const BlackTheme = () => (
  <NavigationBar navigationType="black">Example content</NavigationBar>
);

export const ExampleWithMenu = () => (
  <NavigationBar>
    <Menu>
      <MenuItem href="#">Menu Item One</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
    </Menu>
  </NavigationBar>
);

export const IsLoading = () => (
  <NavigationBar isLoading>
    <Menu>
      <MenuItem href="#">Menu Item One</MenuItem>
      <MenuItem href="#">Menu Item Two</MenuItem>
    </Menu>
  </NavigationBar>
);

export const WithCustomSpacing = () => (
  <NavigationBar py={2} px={7}>
    <Menu>
      <MenuItem href="#">menu item one</MenuItem>
      <MenuItem href="#">menu item two</MenuItem>
    </Menu>
  </NavigationBar>
);

export const ContentMaxWidthBox = () => (
  <div style={{ height: 200 }}>
    <NavigationBar>
      <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
        <Menu flex="1">
          <MenuItem flex="1" onClick={() => {}}>
            Menu Item One
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Two
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Menu Item Three">
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
            <MenuDivider />
            <MenuItem icon="settings" href="#">
              Item Submenu Three
            </MenuItem>
            <MenuItem href="#">Item Submenu Four</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Menu Item Four">
            <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </Box>
    </NavigationBar>
  </div>
);

export const Sticky = () => (
  <div id="sticky-container" style={{ height: "250px" }}>
    <NavigationBar
      position="sticky"
      orientation="top"
      offset="25px"
      aria-label="header"
    >
      <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
        <Menu flex="1">
          <MenuItem flex="1" onClick={() => {}}>
            Menu Item One
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Two
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Menu Item Three">
            <MenuItem href="#">Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
            <MenuDivider />
            <MenuItem icon="settings" href="#">
              Item Submenu Three
            </MenuItem>
            <MenuItem href="#">Item Submenu Four</MenuItem>
          </MenuItem>
          <MenuItem flex="0 0 auto" submenu="Menu Item Four">
            <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
            <MenuItem href="#">Item Submenu Two</MenuItem>
          </MenuItem>
        </Menu>
      </Box>
    </NavigationBar>
    <div
      style={{
        height: "1000px",
        background: "green",
      }}
    />
    <NavigationBar
      position="sticky"
      orientation="bottom"
      offset="25px"
      aria-label="footer"
    >
      <Box display="flex" flex="1" maxWidth="1000px" margin="0 auto">
        <Menu flex="1">
          <MenuItem flex="1" onClick={() => {}}>
            Menu Item One
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Two
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Three
          </MenuItem>
          <MenuItem flex="0 0 auto" href="#">
            Menu Item Four
          </MenuItem>
        </Menu>
      </Box>
    </NavigationBar>
  </div>
);
Sticky.parameters = { docs: { inlineStories: false, iframeHeight: 250 } };

export const Fixed = () => (
  <div>
    <NavigationBar
      position="fixed"
      orientation="top"
      offset="25px"
      aria-label="header"
    >
      <Menu flex="1">
        <MenuItem flex="1" onClick={() => {}}>
          Menu Item One
        </MenuItem>
        <MenuItem flex="0 0 auto" href="#">
          Menu Item Two
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Menu Item Three">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
          <MenuDivider />
          <MenuItem icon="settings" href="#">
            Item Submenu Three
          </MenuItem>
          <MenuItem href="#">Item Submenu Four</MenuItem>
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Menu Item Four">
          <MenuItem onClick={() => {}}>Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </NavigationBar>
    <div
      style={{
        height: "1000px",
        background: "green",
      }}
    />
    <NavigationBar
      position="fixed"
      orientation="bottom"
      offset="25px"
      aria-label="footer"
    >
      <Menu flex="1">
        <MenuItem flex="1" onClick={() => {}}>
          Menu Item One
        </MenuItem>
        <MenuItem flex="0 0 auto" href="#">
          Menu Item Two
        </MenuItem>
        <MenuItem flex="0 0 auto" href="#">
          Menu Item Three
        </MenuItem>
        <MenuItem flex="0 0 auto" href="#">
          Menu Item Four
        </MenuItem>
      </Menu>
    </NavigationBar>
  </div>
);
Fixed.parameters = {
  docs: { inlineStories: false, iframeHeight: 200 },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NavigationBarWithErrorHandler = ({
  ...props
}: NavigationBarProps) => {
  const isLargeScreen = useMediaQuery("(min-width: 600px)");
  const rightPadding = isLargeScreen ? 2 : 1;
  const [error, setError] = useState("");
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      setError(e.message);
    };
    window.addEventListener("error", handleError);

    return () => window.removeEventListener("error", handleError);
  });
  return (
    <>
      <NavigationBar pr={rightPadding} {...props} />
      <div id="error-div">{error}</div>
    </>
  );
};
