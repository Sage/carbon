import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import Toast, { ToastProps } from ".";
import Button from "../button";
import Icon from "../icon";
import { TOAST_COLORS } from "./toast.config";

export default {
  title: "Toast/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    childrenSpecialCharacters: specialCharacters,
  },
};

interface DefaultStoryProps extends Partial<ToastProps> {
  childrenSpecialCharacters?: string;
  scrollablePage?: boolean;
}

export const Default = ({
  children,
  childrenSpecialCharacters,
  scrollablePage,
  ...args
}: DefaultStoryProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const onDismissClick = (
    ev?:
      | KeyboardEvent
      | React.KeyboardEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsOpen(!isOpen);
    action("click")(ev);
  };
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  if (scrollablePage) {
    return (
      <div style={{ height: "150vh", overflow: "auto" }}>
        <Button onClick={handleOpen}>Open Toast</Button>
        <Toast
          id="toast-dismissible"
          open={isOpen}
          onDismiss={onDismissClick}
          {...args}
        >
          {children || childrenSpecialCharacters}
        </Toast>
      </div>
    );
  }
  return (
    <>
      <Button onClick={handleOpen}>Open Toast</Button>
      <Toast
        id="toast-dismissible"
        open={isOpen}
        onDismiss={onDismissClick}
        {...args}
      >
        {children || childrenSpecialCharacters}
      </Toast>
    </>
  );
};
Default.storyName = "default";
Default.args = {
  children: "My text",
  childrenSpecialCharacters: undefined,
  timeout: 0,
  variant: "success",
  isCenter: true,
  scrollablePage: false,
};
Default.argTypes = {
  variant: {
    options: TOAST_COLORS,
    control: {
      type: "select",
    },
  },
};

interface VisualStoryProps extends Partial<ToastProps> {
  childrenSpecialCharacters?: string;
}
export const Visual = ({
  children,
  childrenSpecialCharacters,
  ...args
}: VisualStoryProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      {/* centered examples */}
      <Toast
        variant="info"
        id="toast-quick-start"
        open={isOpen}
        onDismiss={onDismissClick}
        targetPortalId="visual"
        {...args}
      >
        {children || childrenSpecialCharacters}
      </Toast>
      <Toast variant="info" targetPortalId="visual" {...args}>
        {children || childrenSpecialCharacters}
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
        {...args}
      >
        {children || childrenSpecialCharacters}
      </Toast>
      <Toast
        variant="info"
        targetPortalId="visual-left-aligned"
        open={isOpen}
        isCenter={false}
        {...args}
      >
        {children || childrenSpecialCharacters}
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
      <Toast
        onDismiss={onDismissClick}
        open={isOpen}
        targetPortalId="visual-notice"
        variant="notice"
      >
        <Icon type="warning" color="--colorsSemanticNeutralYang100" /> Notice
      </Toast>
    </div>
  );
};

Visual.storyName = "visual";
Visual.args = {
  children: "My text",
  childrenSpecialCharacters: undefined,
};
