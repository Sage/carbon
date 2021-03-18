import React, { useState } from "react";
import { boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import OptionsHelper from "../../utils/helpers/options-helper";
import Sidebar from ".";
import Button from "../button";

export default {
  title: "Sidebar/Test",
  component: Sidebar,
  parameters: {
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
        <div>
          <Button as="primary">Test</Button>
          <Button as="secondary" ml={2}>
            Last
          </Button>
        </div>
        <div style={{ marginBottom: 3000 }}>Main content</div>
      </Sidebar>
    </>
  );
};

Default.story = {
  name: "default",
};
