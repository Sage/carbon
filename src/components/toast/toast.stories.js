import React, { useState } from "react";
import { text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { dlsThemeSelector } from "../../../.storybook/theme-selectors";
import Toast from ".";
import Button from "../button";

export default {
  title: "Design System/Toast/Test",
  component: Toast,
  parameters: {
    themeSelector: dlsThemeSelector,
    docs: { page: null },
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onDismissClick = (evt) => {
    setIsOpen(!isOpen);
    action("click")(evt);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const children = text("children", "My text");
  const timeout = text("timeout", 0);

  return (
    <>
      <Button onClick={handleOpen}>Open Toast</Button>

      <Toast
        variant="warning"
        id="toast-dismissible"
        open={isOpen}
        onDismiss={onDismissClick}
        timeout={timeout}
      >
        {children}
      </Toast>
    </>
  );
};

Basic.story = {
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};

export const Visual = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const children = text("children", "My text");

  return (
    <div>
      <Toast
        variant="info"
        id="toast-quick-start"
        open={isOpen}
        onDismiss={onDismissClick}
        targetPortalId="visual"
      >
        {children}
      </Toast>
      <Toast variant="info" targetPortalId="visual">
        {children}
      </Toast>
      <Toast
        variant="error"
        targetPortalId="visual"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My Error
      </Toast>
      <Toast variant="error" targetPortalId="visual" open={isOpen}>
        My Error
      </Toast>
      <Toast variant="warning" targetPortalId="visual" open={isOpen}>
        My Warning
      </Toast>
      <Toast
        variant="success"
        targetPortalId="visual"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My Success
      </Toast>
      <Toast variant="success" targetPortalId="visual" open={isOpen}>
        My Success
      </Toast>
      <Toast
        variant="warning"
        targetPortalId="visual-center"
        open={isOpen}
        onDismiss={onDismissClick}
        isCenter
      >
        My text
      </Toast>
    </div>
  );
};

Visual.story = {
  name: "visual",
  parameters: {
    chromatic: {
      disable: false,
    },
  },
};
