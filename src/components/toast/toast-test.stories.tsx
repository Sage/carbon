import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Toast, { ToastProps } from ".";
import Button from "../button";
import Icon from "../icon";
import { TOAST_COLORS } from "./toast.config";
import Dialog from "../dialog";

export default {
  title: "Deprecated/Toast/Test",
  excludeStories: ["TopAndBottom"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
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
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
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
      <div style={{ height: "150vh", overflow: "auto" }}>
        <Button onClick={handleOpen}>Open Toast</Button>
        <Toast
          id="toast-dismissible"
          open={isOpen}
          onDismiss={onDismissClick}
          {...args}
        >
          {children}
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
  scrollablePage: false,
  closeButtonDataProps: {},
};
Default.argTypes = {
  variant: {
    options: [...TOAST_COLORS, "notice"],
    control: {
      type: "select",
    },
  },
  align: {
    options: ["left", "center", "right"],
    control: {
      type: "select",
    },
  },
  alignY: {
    options: ["top", "center", "bottom"],
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
        align="left"
        {...args}
      >
        {children}
      </Toast>
      <Toast
        variant="info"
        targetPortalId="visual-left-aligned"
        open={isOpen}
        align="left"
        {...args}
      >
        {children}
      </Toast>
      <Toast
        variant="error"
        targetPortalId="visual-left-aligned"
        open={isOpen}
        align="left"
        onDismiss={onDismissClick}
      >
        My Error
      </Toast>
      <Toast
        variant="error"
        targetPortalId="visual-left-aligned"
        open={isOpen}
        align="left"
      >
        My Error
      </Toast>
      <Toast
        variant="warning"
        targetPortalId="visual-left-aligned"
        open={isOpen}
        align="left"
        onDismiss={onDismissClick}
      >
        My Warning
      </Toast>
      <Toast
        variant="warning"
        targetPortalId="visual-left-aligned"
        open={isOpen}
        align="left"
      >
        My Warning
      </Toast>
      <Toast
        variant="success"
        targetPortalId="visual-left-aligned"
        open={isOpen}
        align="left"
        onDismiss={onDismissClick}
      >
        My Success
      </Toast>
      <Toast
        variant="success"
        targetPortalId="visual-left-aligned"
        open={isOpen}
        align="left"
      >
        My Success
      </Toast>
      {/* right-aligned examples */}
      <Toast
        variant="info"
        id="toast-quick-start"
        open={isOpen}
        onDismiss={onDismissClick}
        targetPortalId="visual-right-aligned"
        align="right"
        {...args}
      >
        {children}
      </Toast>
      <Toast
        variant="info"
        targetPortalId="visual-right-aligned"
        open={isOpen}
        align="right"
        {...args}
      >
        {children}
      </Toast>
      <Toast
        variant="error"
        targetPortalId="visual-right-aligned"
        open={isOpen}
        align="right"
        onDismiss={onDismissClick}
      >
        My Error
      </Toast>
      <Toast
        variant="error"
        targetPortalId="visual-right-aligned"
        open={isOpen}
        align="right"
      >
        My Error
      </Toast>
      <Toast
        variant="warning"
        targetPortalId="visual-right-aligned"
        open={isOpen}
        align="right"
        onDismiss={onDismissClick}
      >
        My Warning
      </Toast>
      <Toast
        variant="warning"
        targetPortalId="visual-right-aligned"
        open={isOpen}
        align="right"
      >
        My Warning
      </Toast>
      <Toast
        variant="success"
        targetPortalId="visual-right-aligned"
        open={isOpen}
        align="right"
        onDismiss={onDismissClick}
      >
        My Success
      </Toast>
      <Toast
        variant="success"
        targetPortalId="visual-right-aligned"
        open={isOpen}
        align="right"
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
};
Visual.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const TopAndBottom = () => {
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = () => {
    setIsOpen(!isOpen);
    action("open")(!isOpen);
  };
  return (
    <>
      <Button id="button" key="button" onClick={handleOpen}>
        Open Toasts
      </Button>
      <Toast id="toast-a" variant="success" open={isOpen} alignY="top">
        My Toast A
      </Toast>
      <Toast id="toast-b" variant="warning" open={isOpen} alignY="bottom">
        My Toast B
      </Toast>
    </>
  );
};

TopAndBottom.storyName = "top and bottom";

export const ToastWhenOtherModalRenders = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen1(true)}>Open Toast</Button>
      <Button onClick={() => setIsOpen2(true)}>Open Dialog</Button>
      <Toast
        variant="info"
        id="toast-playwright"
        open={isOpen1}
        onDismiss={() => setIsOpen1((p) => !p)}
      >
        Toast
      </Toast>
      <Dialog
        title="dialog"
        open={isOpen2}
        onCancel={() => setIsOpen2((p) => !p)}
      >
        Dialog
      </Dialog>
    </>
  );
};

export const ToastWithConditionalContent = ({
  ...props
}: Partial<ToastProps>) => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen1(!isOpen1)}>Open Toast 1</Button>
      <Button onClick={() => setIsOpen2(!isOpen2)}>Open Toast 2</Button>

      <Toast open={isOpen1} {...props}>
        {isOpen1 && "Toast 1"}
      </Toast>
      <Toast open={isOpen2} {...props}>
        {isOpen2 && "Toast 2"}
      </Toast>
    </>
  );
};
