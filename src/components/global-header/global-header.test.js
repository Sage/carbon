import React from "react";
import { Menu, MenuItem, MenuDivider } from "../menu";
import NavigationBar from "../navigation-bar";
import GlobalHeader from "./global-header.component";

import CypressMountWithProviders from "../../../cypress/support/component-helper/cypress-mount";

import carbonLogo from "../../../logo/carbon-logo.png";
import navigationBar from "../../../cypress/locators/navigation-bar";
import {
  globalHeader,
  globalHeaderLogo,
} from "../../../cypress/locators/global-header";

const FullMenuExample = () => (
  <>
    <GlobalHeader>
      <Menu menuType="black" display="flex" flex="1">
        <MenuItem flex="1" submenu="Product Switcher">
          <MenuItem href="#">Product A</MenuItem>
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Parent Menu 1">
          <MenuItem href="#">Child Item 1</MenuItem>
          <MenuItem href="#">Child Item 2</MenuItem>
          <MenuItem href="#">Child Item 3</MenuItem>
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Parent Menu 2">
          <MenuItem>Child Item</MenuItem>
        </MenuItem>
      </Menu>
    </GlobalHeader>
    <NavigationBar position="fixed" orientation="top" offset="40px">
      <Menu display="flex" flex="1">
        <MenuItem flex="1">Menu Item One</MenuItem>
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

context("Testing Global Header component", () => {
  it("should check that z-index of component is greater than that of NavigationBar", () => {
    CypressMountWithProviders(<FullMenuExample />);

    globalHeader()
      .invoke("css", "z-index")
      .then(parseInt)
      .then(($globalHeaderZIndex) => {
        navigationBar()
          .invoke("css", "z-index")
          .then(parseInt)
          .should(($navigationBarZIndex) => {
            expect($globalHeaderZIndex).to.be.greaterThan($navigationBarZIndex);
          });
      });
  });

  it("should check when logo prop is passed, the height of the logo element never exceeds the maximum height of the component", () => {
    const logoHeight = 41;
    const expectedHeight = 40;

    const logo = (
      <img
        data-element="logo"
        height={logoHeight}
        src={carbonLogo}
        alt="Carbon logo"
      />
    );
    CypressMountWithProviders(<GlobalHeader logo={logo}>Example</GlobalHeader>);

    globalHeaderLogo().should("have.css", "height", `${expectedHeight}px`);
  });
});
