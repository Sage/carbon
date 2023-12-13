import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import GlobalHeader from "./global-header.component";
import { Menu, MenuItem } from "../menu";
import VerticalDivider from "../vertical-divider";
import carbonLogo from "../../../logo/carbon-logo.png";

export default {
  title: "Global Header/Test",
  includeStories: ["MenuWithIconOnlyButtonsStory"], // exclude `FullMenuExample` from storybook
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
    docs: {
      inlineStories: false,
      iframeHeight: 200,
    },
  },
} as ComponentMeta<typeof GlobalHeader>;

export const MenuWithIconOnlyButtonsStory: ComponentStory<
  typeof GlobalHeader
> = () => {
  return (
    <GlobalHeader logo={<img height={28} src={carbonLogo} alt="Carbon logo" />}>
      <VerticalDivider h="100%" pt={1} pb={1} pr={0} pl={2} tint={100} />
      <Menu menuType="black" display="flex" flex="1">
        <MenuItem flex="1" submenu="Product Switcher">
          <MenuItem href="#">Product A</MenuItem>
        </MenuItem>
        <MenuItem flex="0 0 auto" icon="person">
          User name
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Selected role">
          <MenuItem>Administrator</MenuItem>
        </MenuItem>
        <MenuItem ariaLabel="search" icon="search" href="#" />
        <MenuItem ariaLabel="alert" icon="alert" href="#" />
        <MenuItem ariaLabel="settings" icon="settings" href="#" />
        <MenuItem ariaLabel="logout" icon="logout" href="#" />
      </Menu>
    </GlobalHeader>
  );
};
MenuWithIconOnlyButtonsStory.storyName = "menu with icon-only buttons";
MenuWithIconOnlyButtonsStory.parameters = {
  docs: {
    description: {
      story:
        "Disclaimer: use of Icon-only buttons is not recommended due to poor accessibility",
    },
  },
};
