import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Toast, { ToastProps } from ".";
import Button from "../button";
import Icon from "../icon";
import { TOAST_COLORS } from "./toast.config";
import Box from "../box";

export default {
  title: "Toast/Test",
  includeStories: ["Default", "Visual"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
};

interface DefaultStoryProps extends Partial<ToastProps> {
  scrollablePage?: boolean;
}

export const Default = ({
  children,
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
    action("open")(!isOpen);
  };
  if (scrollablePage) {
    return (
      <Box height="150vh" overflow="auto">
        <Button onClick={handleOpen}>Open Toast</Button>
        <Toast
          id="toast-dismissible"
          open={isOpen}
          onDismiss={onDismissClick}
          {...args}
        >
          {children}
        </Toast>
      </Box>
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
        {children}
      </Toast>
    </>
  );
};
Default.storyName = "default";
Default.args = {
  children: "My text",
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

export const Visual = ({ children, ...args }: Partial<ToastProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* centered examples */}
      <Toast
        variant="info"
        id="toast-quick-start"
        open={isOpen}
        onDismiss={onDismissClick}
        targetPortalId="visual"
        {...args}
      >
        {children}
      </Toast>
      <Toast variant="info" targetPortalId="visual" {...args}>
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
        {...args}
      >
        {children}
      </Toast>
      <Toast
        variant="info"
        targetPortalId="visual-left-aligned"
        open={isOpen}
        isCenter={false}
        {...args}
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
      <Toast
        onDismiss={onDismissClick}
        open={isOpen}
        targetPortalId="visual-notice"
        variant="notice"
      >
        <Icon type="warning" color="--colorsSemanticNeutralYang100" /> Notice
      </Toast>
    </>
  );
};

Visual.storyName = "visual";
Visual.args = {
  children: "My text",
};
Visual.parameters = {
  chromatic: {
    disable: false,
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const ToastComponent = ({
  children = "Toast",
  ...props
}: Partial<ToastProps>) => {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <>
      <Toast
        variant="info"
        id="toast-cypress"
        open={isOpen}
        onDismiss={() => setIsOpen(!isOpen)}
        {...props}
      >
        {children}
      </Toast>
    </>
  );
};
