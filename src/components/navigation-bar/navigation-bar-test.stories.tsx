import React, { useRef, useState, useEffect } from "react";
import NavigationBar, { NavigationBarProps } from ".";
import { Menu, MenuItem } from "../menu";
import Pill from "../pill";
import Box from "../box";
import useMediaQuery from "../../hooks/useMediaQuery";

export default {
  title: "Navigation Bar/Test",
  includeStories: [
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

export const DefaultStory = ({ children, ...args }: NavigationBarProps) => {
  return <NavigationBar {...args}>{children}</NavigationBar>;
};

DefaultStory.storyName = "default";
DefaultStory.args = {
  navigationType: "light",
  isLoading: false,
  children: "Example content",
  ariaLabel: "",
  position: "",
  orientation: "",
  offset: "0",
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
