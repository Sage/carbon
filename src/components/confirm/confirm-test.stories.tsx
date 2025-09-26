import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import Button from "../button";
import Confirm, { ConfirmProps } from "./confirm.component";
import { CONFIRM_SIZES } from "./confirm.config";

export default {
  title: "Deprecated/Confirm/Test",
  includeStories: ["Default"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    size: {
      options: CONFIRM_SIZES,
      control: {
        type: "select",
      },
    },
    iconType: {
      options: ["error", "warning", null],
      control: {
        type: "select",
      },
    },
    cancelButtonType: {
      options: ["primary", "secondary", "tertiary"],
      control: {
        type: "select",
      },
    },
  },
};

export const Default = ({
  cancelLabel,
  confirmLabel,
  subtitle,
  title,
  children,
  ...args
}: Partial<ConfirmProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCancel = () => {
    setIsOpen(false);
    action("cancel")();
  };
  const handleOpen = () => {
    setIsOpen(true);
    action("open")();
  };
  const handleConfirm = () => {
    setIsOpen(false);
    action("confirm")();
  };
  return (
    <>
      <Button onClick={handleOpen}>Open Confirm</Button>
      <Confirm
        open={isOpen}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        cancelLabel={cancelLabel}
        confirmLabel={confirmLabel}
        subtitle={subtitle}
        title={title}
        {...args}
      >
        {children}
      </Confirm>
    </>
  );
};

Default.storyName = "default";
Default.args = {
  children: "This is an example of a confirm.",
  title: "Are you sure?",
  disableEscKey: false,
  height: "",
  subtitle: "",
  size: "extra-small",
  showCloseIcon: false,
  disableAutoFocus: false,
  confirmLabel: "",
  cancelLabel: "",
  iconType: null,
  isLoadingConfirm: false,
  disableConfirm: false,
  disableCancel: false,
  cancelButtonType: "secondary",
  closeButtonDataProps: {},
};
