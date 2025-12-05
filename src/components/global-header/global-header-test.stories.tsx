import React from "react";
import { Meta, StoryFn } from "@storybook/react";

import GlobalHeader from "./global-header.component";
import Button from "../button";
import PopoverContainer from "../popover-container/popover-container.component";
import Box from "../box";
import { Menu, MenuItem } from "../menu";
import Divider from "../divider";
import carbonLogo from "../../../logo/carbon-logo.png";

export default {
  title: "Global Header/Test",
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
} as Meta<typeof GlobalHeader>;

export const MenuWithIconOnlyButtonsStory: StoryFn<
  typeof GlobalHeader
> = () => {
  return (
    <GlobalHeader logo={<img height={28} src={carbonLogo} alt="Carbon logo" />}>
      <Divider h="100%" pt={1} pb={1} pr={0} pl={2} />
      <Menu menuType="black" flex="1">
        <MenuItem flex="1" submenu="Product Switcher">
          <MenuItem href="#">Product A</MenuItem>
        </MenuItem>
        <MenuItem href="#" flex="0 0 auto" icon="person">
          User name
        </MenuItem>
        <MenuItem flex="0 0 auto" submenu="Selected role">
          <MenuItem href="#">Administrator</MenuItem>
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

export const GlobalHeaderWithPopover: StoryFn<typeof GlobalHeader> = () => {
  const [isContainerOpen, setIsContainerOpen] = React.useState(false);

  return (
    <GlobalHeader logo={<img height={28} src={carbonLogo} alt="Carbon logo" />}>
      <Button
        size="small"
        buttonType="primary"
        onClick={() => {
          setIsContainerOpen(true);
        }}
      >
        Notifications
      </Button>
      <PopoverContainer
        shouldCoverButton
        open={isContainerOpen}
        onClose={() => setIsContainerOpen(false)}
      >
        <Box height="300px" width="300px">
          content
        </Box>
      </PopoverContainer>
    </GlobalHeader>
  );
};
GlobalHeaderWithPopover.storyName = "global header with popover container";
GlobalHeaderWithPopover.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
