import React, { useState, useEffect } from "react";
import carbonlogo from "../../../logo/carbon-logo.png";
import GlobalHeader, { GlobalHeaderProps } from "./global-header.component";
import { Menu, MenuItem, MenuDivider } from "../menu";
import NavigationBar from "../navigation-bar";

export const FullMenuExample = () => (
  <>
    <GlobalHeader>
      <Menu menuType="black" flex="1">
        <MenuItem flex="1" submenu="Product Switcher">
          <MenuItem href="#">Product A</MenuItem>
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Parent Menu 1">
          <MenuItem href="#">Child Item 1</MenuItem>
          <MenuItem href="#">Child Item 2</MenuItem>
          <MenuItem href="#">Child Item 3</MenuItem>
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Parent Menu 2">
          <MenuItem href="#">Child Item</MenuItem>
        </MenuItem>
      </Menu>
    </GlobalHeader>
    <NavigationBar position="fixed" orientation="top" offset="40px">
      <Menu flex="1">
        <MenuItem flex="1" href="#">
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
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </NavigationBar>
  </>
);

export const GlobalHeaderWithErrorHandler = ({
  ...props
}: GlobalHeaderProps) => {
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
      <GlobalHeader {...props} />
      <div id="error-div">{error}</div>
    </>
  );
};

export const GlobalHeaderWithLogo = () => {
  const logoHeight = 41;
  const logo = (
    <img
      data-element="logo"
      height={logoHeight}
      src={carbonlogo}
      alt="Carbon logo"
    />
  );
  return (
    <>
      <GlobalHeader logo={logo}>Example</GlobalHeader>
    </>
  );
};
