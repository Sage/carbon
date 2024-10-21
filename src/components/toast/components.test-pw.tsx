import React, { useState } from "react";
import Toast, { ToastProps } from ".";
import Button from "../button";
import Dialog from "../dialog";

export const ToastComponent = ({
  children = "Toast",
  onDismiss,
  ...props
}: Partial<ToastProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Toast
      variant="info"
      id="toast"
      open={isOpen}
      onDismiss={(ev) => {
        onDismiss?.(ev);
        setIsOpen(!isOpen);
      }}
      {...props}
    >
      {children}
    </Toast>
  );
};

export const ToastWhenOtherModalRenders = ({
  children = "Toast",
  ...props
}: Partial<ToastProps>) => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen1(true)}>Open Toast</Button>
      <Button onClick={() => setIsOpen2(true)}>Open Dialog</Button>

      <Toast
        variant="info"
        id="toast"
        open={isOpen1}
        onDismiss={() => setIsOpen1(!isOpen1)}
        {...props}
      >
        {children}
      </Toast>

      <Dialog
        title="dialog"
        open={isOpen2}
        onCancel={() => setIsOpen2(!isOpen2)}
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

export const ToastAllAlign = ({ ...props }: Partial<ToastProps>) => {
  return (
    <>
      <Toast align="left" alignY="top" open {...props}>
        Toast 1
      </Toast>

      <Toast align="center" alignY="top" open {...props}>
        Toast 2
      </Toast>

      <Toast align="right" alignY="top" open {...props}>
        Toast 3
      </Toast>

      <Toast align="left" alignY="center" open {...props}>
        Toast 4
      </Toast>

      <Toast align="center" alignY="center" open {...props}>
        Toast 5
      </Toast>

      <Toast align="right" alignY="center" open {...props}>
        Toast 6
      </Toast>

      <Toast align="left" alignY="bottom" open {...props}>
        Toast 7
      </Toast>

      <Toast align="center" alignY="bottom" open {...props}>
        Toast 8
      </Toast>

      <Toast align="right" alignY="bottom" open {...props}>
        Toast 9
      </Toast>
    </>
  );
};
