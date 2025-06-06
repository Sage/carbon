import React, { useState } from "react";
import { action } from "storybook/actions";
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
      options: ["info", "error", "success", "warning", "neutral", "ai"],
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
      | React.MouseEvent<HTMLButtonElement>,
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
      <Button mb={2} onClick={handleOpen}>
        Open Message
      </Button>
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
  width: "",
};

export const TitleWithLongText = (args: MessageProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Message
      open={isOpen}
      onDismiss={() => setIsOpen(false)}
      title="Title With Long Text"
      {...args}
    >
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book.
    </Message>
  );
};

TitleWithLongText.storyName = "Title With Long Text";

TitleWithLongText.parameters = {
  themeProvider: { chromatic: { disableSnapshot: false, theme: "sage" } },
};

export const Transparent = (args: MessageProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Message
      open={isOpen}
      onDismiss={() => setIsOpen(false)}
      transparent
      {...args}
    >
      Some custom message
    </Message>
  );
};

Transparent.storyName = "transparent";

Transparent.parameters = {
  themeProvider: { chromatic: { disableSnapshot: false, theme: "sage" } },
};

export const Ai = (args: MessageProps) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Message
      open={isOpen}
      onDismiss={() => setIsOpen(false)}
      variant="ai"
      {...args}
    >
      Some custom message
    </Message>
  );
};

Ai.storyName = "Ai";

Ai.parameters = {
  themeProvider: { chromatic: { disableSnapshot: false, theme: "sage" } },
};
