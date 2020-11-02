import React, { useState } from "react";
import { boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { dlsThemeSelector } from "../../../.storybook/theme-selectors";
import OptionsHelper from "../../utils/helpers/options-helper";
import { Sidebar, SidebarHeader } from ".";
import Button from "../button";

export default {
  title: "Sidebar/Test",
  component: Sidebar,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(true);
  const enableBackgroundUI = boolean(
    "enableBackgroundUI",
    Sidebar.defaultProps.enableBackgroundUI
  );
  const position = select(
    "position",
    OptionsHelper.alignBinary,
    Sidebar.defaultProps.position
  );
  const size = select(
    "size",
    OptionsHelper.sizesFull,
    Sidebar.defaultProps.size
  );

  const onCancel = () => {
    setIsOpen(false);
    action("cancel")();
  };

  const openSidebar = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Button onClick={openSidebar}>Open sidebar</Button>
      <Sidebar
        enableBackgroundUI={enableBackgroundUI}
        open={isOpen}
        position={position}
        size={size}
        onCancel={onCancel}
      >
        <SidebarHeader>Header Content</SidebarHeader>
        <div>
          <Button as="primary">Test</Button>
          <Button as="secondary">Last</Button>
        </div>
        Main Content
      </Sidebar>
    </>
  );
};
