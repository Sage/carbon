import React, { useState } from "react";
import { text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import OptionsHelper from "../../utils/helpers/options-helper";
import Button from "../button";
import Confirm from ".";

export default {
  title: "Confirm/Test",
  component: Confirm,
  parameters: {
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(true);
  const children = text("children", "This is an example of a confirm.");
  const title = text("title", "Are you sure?");
  const disableEscKey = boolean("disableEscKey", false);
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
  const isLoadingConfirm = boolean("isLoadingConfirm", false);
  const disableConfirm = boolean("disableConfirm", false);
  const disableCancel = boolean("disableCancel", false);
  const cancelButtonType = select(
    "cancelButtonType",
    ["primary", "secondary", "tertiary"],
    "secondary"
  );

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
        disableEscKey={disableEscKey}
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
        isLoadingConfirm={isLoadingConfirm}
        disableConfirm={disableConfirm}
        disableCancel={disableCancel}
        cancelButtonType={cancelButtonType}
      >
        {children}
      </Confirm>
    </>
  );
};

Default.story = {
  name: "default",
};
