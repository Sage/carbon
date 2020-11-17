import React, { useState } from "react";
import { text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { dlsThemeSelector } from "../../../.storybook/theme-selectors";
import OptionsHelper from "../../utils/helpers/options-helper";
import Button from "../button";
import Confirm from ".";

export default {
  title: "Confirm/Test",
  component: Confirm,
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
  const children = text("children", "This is an example of a confirm.");
  const title = text("title", "Are you sure?");
  const enableBackgroundUI = boolean("enableBackgroundUI", false);
  const disableEscKey = boolean("disableEscKey", false);
  const ariaRole = text("ariaRole", Confirm.defaultProps.ariaRole);
  const height = text("height", "");
  const subtitle = text("subtitle", "");
  const size = select(
    "size",
    OptionsHelper.sizesFull,
    Confirm.defaultProps.size
  );
  const showCloseIcon = boolean(
    "showCloseIcon",
    Confirm.defaultProps.showCloseIcon
  );
  const autoFocus = boolean("autoFocus", Confirm.defaultProps.autoFocus);
  const confirmLabel = text("confirmLabel", "");
  const cancelLabel = text("cancelLabel", "");
  const destructive = boolean("destructive", false);
  const iconType = select("iconType", ["error", "warning", null], null);

  const handleCancel = () => {
    action("cancel")();
    setIsOpen(false);
  };

  const handleOpen = () => {
    action("open")();
    setIsOpen(true);
  };

  const handleConfirm = () => {
    action("confirm")();
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Confirm</Button>
      <Confirm
        title={title}
        open={isOpen}
        enableBackgroundUI={enableBackgroundUI}
        disableEscKey={disableEscKey}
        ariaRole={ariaRole}
        height={height}
        subtitle={subtitle}
        size={size}
        showCloseIcon={showCloseIcon}
        autoFocus={autoFocus}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        destructive={destructive}
        iconType={iconType}
      >
        {children}
      </Confirm>
    </>
  );
};
