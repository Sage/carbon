import React, { useState } from "react";
import { boolean, text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { dlsThemeSelector } from "../../../.storybook/theme-selectors";
import OptionsHelper from "../../utils/helpers/options-helper";
import Button from "../button";
import Alert from ".";

export default {
  title: "Alert/Test",
  component: Alert,
  parameters: {
    themeSelector: dlsThemeSelector,
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
  const enableBackgroundUI = boolean("enableBackgroundUI", false);
  const disableEscKey = boolean("disableEscKey", false);
  const ariaRole = text("ariaRole", "dialog");
  const height = text("height", "");
  const showCloseIcon = boolean("showCloseIcon", true);
  const size = select("size", OptionsHelper.sizesFull, Alert.defaultProps.size);
  const stickyFormFooter = boolean("stickyFormFooter", false);

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
        enableBackgroundUI={enableBackgroundUI}
        disableEscKey={disableEscKey}
        ariaRole={ariaRole}
        height={height}
        showCloseIcon={showCloseIcon}
        size={size}
        stickyFormFooter={stickyFormFooter}
        subtitle={subtitle}
        open={isOpen}
      >
        {children}
      </Alert>
    </>
  );
};
