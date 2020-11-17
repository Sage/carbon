import React from "react";
import { text, boolean } from "@storybook/addon-knobs";
import { MenuList, MenuListItem } from "./menu-list";

export default {
  title: "MenuList/Test",
  component: MenuList,
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disabled: true,
    },
  },
};

export const basic = () => {
  const title = text("title", "");
  const collapsible = title ? boolean("collapsible", true) : undefined;
  const filterPlaceholder = text("filterPlaceholder", "");
  const initiallyOpen = boolean("initiallyOpen", true);
  const filter = boolean("filter", true);

  return (
    <MenuList
      title={title}
      collapsible={collapsible}
      initiallyOpen={initiallyOpen}
    >
      <MenuListItem>Menu Item One</MenuListItem>
      <MenuListItem>
        <MenuList
          title="Menu Item Two"
          filter={filter}
          filterPlaceholder={filterPlaceholder}
        >
          <MenuListItem name="First Sub Item">First Sub Item</MenuListItem>
          <MenuListItem name="Second Sub Item">Second Sub Item</MenuListItem>
          <MenuListItem name="Third Sub Item">Third Sub Item</MenuListItem>
        </MenuList>
      </MenuListItem>
      <MenuListItem>Menu Item Three</MenuListItem>
      <MenuListItem>Menu Item Four</MenuListItem>
    </MenuList>
  );
};

basic.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};
