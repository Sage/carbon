import React, { useRef } from "react";
import NavigationBar, { NavigationBarProps } from ".";
import { Menu, MenuItem } from "../menu";

export default {
  title: "Navigation Bar/Test",
  includeStories: ["DefaultStory", "NavigationBarWithSubmenuAndChangingHeight"],
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
  ariaLabel: undefined,
  position: undefined,
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
