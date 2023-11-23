import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Toast, { ToastProps } from ".";
import Button from "../button";
import Icon from "../icon";
import { TOAST_COLORS } from "./toast.config";
import Dialog from "../dialog";

export default {
  title: "Toast/Test",
  includeStories: ["Default", "Visual", "ToastWhenOtherModalRenders"],
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

export const AllAlign = () => {
  const [isOpen, setIsOpen] = useState(true);
  const onDismissClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Toast
        align="left"
        alignY="top"
        isCenter={false}
        variant="warning"
        id="left-top"
        targetPortalId="left-top"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>

      <Toast
        align="center"
        alignY="top"
        isCenter={false}
        variant="warning"
        id="center-top"
        targetPortalId="center-top"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>

      <Toast
        align="right"
        alignY="top"
        isCenter={false}
        variant="warning"
        id="right-top"
        targetPortalId="right-top"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>

      <Toast
        align="left"
        alignY="center"
        isCenter={false}
        variant="warning"
        id="left-center"
        targetPortalId="left-center"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>

      <Toast
        align="center"
        alignY="center"
        isCenter={false}
        variant="warning"
        id="center-center"
        targetPortalId="center-center"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>

      <Toast
        align="right"
        alignY="center"
        isCenter={false}
        variant="warning"
        id="right-center"
        targetPortalId="right-center"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>

      <Toast
        align="left"
        alignY="bottom"
        isCenter={false}
        variant="warning"
        id="left-bottom"
        targetPortalId="left-bottom"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>

      <Toast
        align="center"
        alignY="bottom"
        isCenter={false}
        variant="warning"
        id="center-bottom"
        targetPortalId="center-bottom"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>

      <Toast
        align="right"
        alignY="bottom"
        isCenter={false}
        variant="warning"
        id="right-bottom"
        targetPortalId="right-bottom"
        open={isOpen}
        onDismiss={onDismissClick}
      >
        My text
      </Toast>
    </div>
  );
};

AllAlign.storyName = "all align";

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
      <Toast id="toast-a" variant="success" open={isOpen} isCenter alignY="top">
        My Toast A
      </Toast>
      <Toast
        id="toast-b"
        variant="warning"
        open={isOpen}
        isCenter
        alignY="bottom"
      >
        My Toast B
      </Toast>
    </>
  );
};

TopAndBottom.storyName = "top and bottom";

export const ToastComponent = ({
  children = "Toast",
  ...props
}: Partial<ToastProps>) => {
  const [isOpen, setIsOpen] = useState(true);

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

export const ToastWhenOtherModalRenders = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen1(true)}>Open Toast</Button>
      <Button onClick={() => setIsOpen2(true)}>Open Dialog</Button>
      <Toast
        variant="info"
        id="toast-cypress"
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
