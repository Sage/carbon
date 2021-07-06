import React, { useState } from "react";
import { boolean, text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Button from "../button";
import Alert from ".";

export default {
  title: "Alert/Test",
  component: Alert,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(true);
  const title = text("title", "Attention");
  const subtitle = text("subtitle", "");
  const children = text("children", "This is an example of a alert.");
  const disableEscKey = boolean("disableEscKey", false);
  const height = text("height", "");
  const showCloseIcon = boolean("showCloseIcon", true);
  const size = select(
    "size",
    [
      "extra-small",
      "small",
      "medium-small",
      "medium",
      "medium-large",
      "large",
      "extra-large",
    ],
    Alert.defaultProps.size
  );

  const handleCancel = () => {
    setIsOpen(false);
    action("cancel")();
  };
  const handleOpen = () => {
    setIsOpen(true);
    action("open")();
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Alert</Button>
      <Alert
        onCancel={handleCancel}
        title={title}
        disableEscKey={disableEscKey}
        height={height}
        showCloseIcon={showCloseIcon}
        size={size}
        subtitle={subtitle}
        open={isOpen}
      >
        {children}
      </Alert>
    </>
  );
};

Default.story = {
  name: "default",
};
