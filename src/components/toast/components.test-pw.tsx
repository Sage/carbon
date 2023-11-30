import React, { useState } from "react";
import Toast, { ToastProps } from ".";
import Button from "../button";
import Dialog from "../dialog";

export const ToastComponent = ({
  children = "Toast",
  ...props
}: Partial<ToastProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Toast
      variant="info"
      id="toast"
      open={isOpen}
      onDismiss={() => setIsOpen(!isOpen)}
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

export const ToastAllAlign = ({
  children = "Toast",
  ...props
}: Partial<ToastProps>) => {
  return (
    <>
      <Toast align="left" alignY="top" isCenter={false} open {...props}>
        {children}
      </Toast>

      <Toast align="center" alignY="top" isCenter={false} open {...props}>
        {children}
      </Toast>

      <Toast align="right" alignY="top" isCenter={false} open {...props}>
        {children}
      </Toast>

      <Toast align="left" alignY="center" isCenter={false} open {...props}>
        {children}
      </Toast>

      <Toast align="center" alignY="center" isCenter={false} open {...props}>
        {children}
      </Toast>

      <Toast align="right" alignY="center" isCenter={false} open {...props}>
        {children}
      </Toast>

      <Toast align="left" alignY="bottom" isCenter={false} open {...props}>
        {children}
      </Toast>

      <Toast align="center" alignY="bottom" isCenter={false} open {...props}>
        {children}
      </Toast>

      <Toast align="right" alignY="bottom" isCenter={false} open {...props}>
        {children}
      </Toast>
    </>
  );
};
