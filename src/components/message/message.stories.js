import React, { useState } from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import OptionsHelper from "../../utils/helpers/options-helper";
import Button from "../button";
import Message from "./message.component";

export default {
  title: "Message/Test",
  component: Message,
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
  const variant = select("type", OptionsHelper.messages, "info");
  const title = text("title");
  const id = text("id", "custom-id");
  const transparent = boolean("transparent", false);
  const children = text(
    "children",
    "This is some information from the Message Component."
  );
  const showCloseIcon = boolean("showCloseIcon", true);
  const onDismiss = (evt) => {
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
      <Message
        variant={variant}
        open={isOpen}
        title={title}
        transparent={transparent}
        onDismiss={onDismiss}
        id={id}
        showCloseIcon={showCloseIcon}
      >
        {children}
      </Message>
    </>
  );
};

Default.story = {
  name: "default",
};
