import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Button from "../button";
import Message, { MessageProps } from "./message.component";

export default {
  title: "Message/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    variant: {
      options: ["info", "error", "success", "warning"],
      control: {
        type: "select",
      },
    },
  },
};

export const Default = ({ title, children, ...args }: MessageProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const onDismiss = (
    evt:
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsOpen(false);
    action("click")(evt);
  };
  const handleOpen = () => {
    setIsOpen(true);
    action("open")();
  };
  return (
    <>
      <Button onClick={handleOpen}>Open Message</Button>
      <Message open={isOpen} onDismiss={onDismiss} title={title} {...args}>
        {children}
      </Message>
    </>
  );
};

Default.storyName = "default";
Default.args = {
  variant: "info",
  title: "",
  id: "custom-id",
  transparent: false,
  children: "This is some information from the Message Component.",
  showCloseIcon: true,
};
