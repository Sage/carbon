import React, { useRef, useState, useEffect } from "react";
import NavigationBar, { NavigationBarProps } from ".";
import { Menu, MenuDivider, MenuItem } from "../menu";
import Pill from "../pill";
import Box from "../box";
import useMediaQuery from "../../hooks/useMediaQuery";

export default {
  title: "Navigation Bar/Test",
  includeStories: [
    "Variants",
    "DefaultStory",
    "NavigationBarWithSubmenuAndChangingHeight",
    "WithMediaQuery",
    "ResponsivePadding",
    "WithPills",
    "WithMenuAndWrappedText",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Variants = ({ children, ...args }: NavigationBarProps) => {
  return (
    <>
      <NavigationBar {...args}>{children} Default</NavigationBar>
      <br></br>
      <NavigationBar ariaLabel="Dark Theme" navigationType="dark">
        Dark theme
      </NavigationBar>
      <br></br>
      <NavigationBar ariaLabel="White Theme" navigationType="white">
        White theme
      </NavigationBar>
      <br></br>
      <NavigationBar ariaLabel="Light Theme" navigationType="light">
        Light theme
      </NavigationBar>
      <br></br>
      <NavigationBar ariaLabel="Black Theme" navigationType="black">
        Black theme
      </NavigationBar>
      <br></br>
      Loading state
      <NavigationBar ariaLabel="Loading" isLoading>
        <Menu>
          <MenuItem href="#">Menu Item One</MenuItem>
          <MenuItem href="#">Menu Item Two</MenuItem>
        </Menu>
      </NavigationBar>
      <br></br>
      With Menu
      <NavigationBar ariaLabel="Menu">
        <Menu>
          <MenuItem href="#">Menu Item One</MenuItem>
          <MenuItem href="#">Menu Item Two</MenuItem>
        </Menu>
      </NavigationBar>
      <br></br>
      With Menu Custom Spacing
      <NavigationBar ariaLabel="Menu Custom Spacing" py={2} px={7}>
        <Menu>
          <MenuItem href="#">menu item one</MenuItem>
          <MenuItem href="#">menu item two</MenuItem>
        </Menu>
      </NavigationBar>
      <br></br>
      Content Max Width Box
      <NavigationBar ariaLabel="Menu Max Width">
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
      <br></br>
    </>
  );
};

Variants.storyName = "Variants";
Variants.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};
export const NavigationBarWithSubmenuAndChangingHeight = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toggleHeight = () => {
    const navbarElement = wrapperRef.current?.querySelector("nav");
    if (navbarElement) {
      navbarElement.style.height =
        navbarElement.style.height === "100px" ? "40px" : "100px";
    }
  };
  return (
    <div ref={wrapperRef}>
      <NavigationBar position="fixed" orientation="top">
        <Menu menuType="dark">
          <MenuItem submenu="I'm long" clickToOpen>
            <MenuItem onClick={() => {}}>Foo 1</MenuItem>
            <MenuItem onClick={() => {}}>Foo 2</MenuItem>
            <MenuItem onClick={() => {}}>Foo 3</MenuItem>
            <MenuItem onClick={toggleHeight}>Change Height!</MenuItem>
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
    </div>
  );
};

export const WithMediaQuery = () => {
  const isLargeScreen = useMediaQuery("(min-width: 600px)");
  const rightPadding = isLargeScreen ? 2 : 1;
  const [error, setError] = useState("");
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      setError(e.message);
    };
    window.addEventListener("error", handleError);

    return () => window.removeEventListener("error", handleError);
  }, []);
  return (
    <>
      <NavigationBar pr={rightPadding} />
      <div id="error-div">{error}</div>
    </>
  );
};

export const ResponsivePadding = () => {
  return <NavigationBar>Example content</NavigationBar>;
};

ResponsivePadding.parameters = {
  chromatic: {
    disableSnapshot: false,
    viewports: [599, 959, 1259],
  },
};

export const WithPills = () => {
  return (
    <NavigationBar
      navigationType="light"
      position="fixed"
      orientation="top"
      offset="40px"
    >
      <Menu menuType="light">
        <MenuItem onClick={() => {}}>
          Menu 1
          <Pill pillRole="status" colorVariant="warning" fill ml={1} size="M">
            1
          </Pill>
        </MenuItem>
        <MenuItem href="#">
          Menu 2
          <Pill pillRole="status" colorVariant="warning" fill ml={1} size="M">
            1
          </Pill>
        </MenuItem>
      </Menu>
    </NavigationBar>
  );
};
WithPills.storyName = "With pills";
WithPills.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
};

export const WithMenuAndWrappedText = () => {
  return (
    <Box maxWidth="320px">
      <NavigationBar>
        <Menu>
          <MenuItem href="#">Menu Item One Menu Item One</MenuItem>
          <MenuItem href="#">
            Menu Item Two Menu Item Two Menu Item Two
          </MenuItem>
        </Menu>
      </NavigationBar>
    </Box>
  );
};
WithMenuAndWrappedText.storyName = "With menu and wrapped text";
WithMenuAndWrappedText.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
};
