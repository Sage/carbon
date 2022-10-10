import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import Button from "../button";
import Confirm from ".";
import CONFIRM_SIZES from "./confirm.config";
import { ConfirmProps } from "./confirm.component";

export default {
  title: "Confirm/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: false,
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
    childrenSpecialCharacters: specialCharacters,
    cancelLabelSpecialCharacters: specialCharacters,
    confirmLabelSpecialCharacters: specialCharacters,
    subtitleSpecialCharacters: specialCharacters,
    titleSpecialCharacters: specialCharacters,
  },
};

interface StoryProps {
  childrenSpecialCharacters?: string;
  cancelLabelSpecialCharacters?: string;
  confirmLabelSpecialCharacters?: string;
  subtitleSpecialCharacters?: string;
  titleSpecialCharacters?: string;
}

export const ConfirmStory = ({
  open,
  onConfirm,
  cancelLabel,
  cancelLabelSpecialCharacters,
  confirmLabel,
  confirmLabelSpecialCharacters,
  subtitle,
  subtitleSpecialCharacters,
  title,
  titleSpecialCharacters,
  children,
  childrenSpecialCharacters,
  ...args
}: ConfirmProps & StoryProps) => {
  const [isOpen, setIsOpen] = useState(true);
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
        open={typeof open === "undefined" ? isOpen : open}
        onConfirm={typeof onConfirm === "undefined" ? handleConfirm : onConfirm}
        onCancel={handleCancel}
        cancelLabel={cancelLabel || cancelLabelSpecialCharacters}
        confirmLabel={confirmLabel || confirmLabelSpecialCharacters}
        subtitle={subtitle || subtitleSpecialCharacters}
        title={title || titleSpecialCharacters}
        {...args}
      >
        {children || childrenSpecialCharacters}
      </Confirm>
    </>
  );
};

ConfirmStory.storyName = "default";
ConfirmStory.args = {
  children: "This is an example of a confirm.",
  childrenSpecialCharacters: undefined,
  title: "Are you sure?",
  titleSpecialCharacters: undefined,
  disableEscKey: false,
  height: "",
  subtitle: "",
  subtitleSpecialCharacters: undefined,
  size: "extra-small",
  showCloseIcon: false,
  disableAutoFocus: false,
  confirmLabel: "",
  confirmLabelSpecialCharacters: undefined,
  cancelLabel: "",
  cancelLabelSpecialCharacters: undefined,
  iconType: null,
  isLoadingConfirm: false,
  disableConfirm: false,
  disableCancel: false,
  cancelButtonType: "secondary",
};
