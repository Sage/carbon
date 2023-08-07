import React, { useState, useRef, useEffect } from "react";
import { action } from "@storybook/addon-actions";
import Button from "../button";
import Message, { MessageProps } from "./message.component";

export default {
  title: "Message/Test",
  includeStories: ["Default"],
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

export const MessageComponent = (props: MessageProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message open={isOpen} onDismiss={() => setIsOpen(false)} {...props}>
        Some custom message
      </Message>
    </div>
  );
};

export const MessageComponentWithRef = (props: MessageProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const messageRef: React.Ref<HTMLDivElement> = useRef(null);

  useEffect(() => {
    if (isOpen) messageRef.current?.focus();
  });

  return (
    <div>
      {!isOpen && <Button onClick={() => setIsOpen(true)}>Open Message</Button>}
      <Message
        open={isOpen}
        onDismiss={() => setIsOpen(false)}
        ref={messageRef}
        {...props}
      >
        Some custom message
      </Message>
    </div>
  );
};
