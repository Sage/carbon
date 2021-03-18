import React, { useState } from "react";
import { select, text, boolean, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Toast from ".";
import Button from "../button";
import OptionsHelper from "../../utils/helpers/options-helper";

export default {
  title: "Design System/Toast/Test",
  component: Toast,
  decorators: [withKnobs],
  parameters: {
    docs: { page: null },
    info: {
      disable: true,
    },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: true,
    },
  },
};

export const Default = () => {
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
        variant={select("variant", OptionsHelper.colors, "warning")}
        isCenter={boolean("isCenter", true)}
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

Default.story = {
  name: "default",
};

export const Visual = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  const children = text("children", "My text");

  return (
    <div>
      {/* centered examples */}
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
      <Toast
        variant="warning"
        targetPortalId="visual"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My Warning
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
      {/* left-aligned examples */}
      <Toast
        variant="info"
        id="toast-quick-start"
        open={isOpen}
        onDismiss={onDismissClick}
        targetPortalId="visual-left-aligned"
        isCenter={false}
      >
        {children}
      </Toast>
      <Toast
        variant="info"
        targetPortalId="visual-left-aligned"
        isOpen={isOpen}
        isCenter={false}
      >
        {children}
      </Toast>
      <Toast
        variant="error"
        targetPortalId="visual-left-aligned"
        isCenter={false}
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My Error
      </Toast>
      <Toast
        variant="error"
        targetPortalId="visual-left-aligned"
        isCenter={false}
        open={isOpen}
      >
        My Error
      </Toast>
      <Toast
        variant="warning"
        targetPortalId="visual-left-aligned"
        isCenter={false}
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My Warning
      </Toast>
      <Toast
        variant="warning"
        targetPortalId="visual-left-aligned"
        isCenter={false}
        open={isOpen}
      >
        My Warning
      </Toast>
      <Toast
        variant="success"
        targetPortalId="visual-left-aligned"
        isCenter={false}
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My Success
      </Toast>
      <Toast
        variant="success"
        targetPortalId="visual-left-aligned"
        isCenter={false}
        open={isOpen}
      >
        My Success
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
