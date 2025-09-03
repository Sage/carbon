import React, { useState, useRef, useEffect } from "react";

import Button from "../button";
import Confirm, { ConfirmProps } from "./confirm.component";
import Dialog from "../dialog";
import Sidebar from "../sidebar";
import Textbox from "../textbox";

export const ConfirmComponent = ({
  onConfirm,
  onCancel,
  ...rest
}: Partial<ConfirmProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef(null);
  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Open Confirm</Button>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        showCloseIcon
        open={isOpen}
        onConfirm={(ev) => {
          setIsOpen(false);
          if (onConfirm) onConfirm(ev);
        }}
        onCancel={(ev) => {
          setIsOpen(false);
          if (onCancel) onCancel(ev);
        }}
        focusFirstElement={ref}
        {...rest}
      >
        <button data-element="default-focused" type="button">
          default focused
        </button>
        <button data-element="override-focused" type="button">
          override focused
        </button>
      </Confirm>
    </>
  );
};

export const ConfirmComponentFocusFirst = () => {
  const [isOpenOne, setIsOpenOne] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const ref = useRef(null);
  return (
    <>
      <Button onClick={() => setIsOpenOne(true)}>
        Open Demo using focusFirstElement
      </Button>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        focusFirstElement={ref}
        open={isOpenOne}
        onConfirm={() => setIsOpenOne(false)}
        onCancel={() => setIsOpenOne(false)}
      >
        <Button ref={ref} onClick={() => setIsOpenOne(false)}>
          This should be focused first now
        </Button>
        <Button onClick={() => setIsOpenOne(false)}>Not focused</Button>
      </Confirm>
      <Button ml={2} onClick={() => setIsOpenTwo(true)}>
        Open Demo using autoFocus
      </Button>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        disableAutoFocus
        open={isOpenTwo}
        onConfirm={() => setIsOpenTwo(false)}
        onCancel={() => setIsOpenTwo(false)}
      >
        <Button onClick={() => setIsOpenTwo(false)}>Not focused</Button>
        <Button onClick={() => setIsOpenTwo(false)}>Not focused</Button>
      </Confirm>
    </>
  );
};

export const TopModalOverride = () => {
  const [isOpenDialogFullScreen, setIsOpenDialogFullScreen] = useState(true);
  const [isOpenConfirm, setIsOpenConfirm] = useState(true);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpenSidebar(true);
    }, 10);
  }, []);

  return (
    <>
      <Dialog
        fullscreen
        open={isOpenDialogFullScreen}
        onCancel={() => setIsOpenDialogFullScreen(false)}
        title="Dialog fullscreen"
      >
        <Textbox label="Fullscreen textbox" />
      </Dialog>
      <Confirm
        open={isOpenConfirm}
        title="Confirm"
        topModalOverride
        onConfirm={() => setIsOpenConfirm(false)}
        onCancel={() => setIsOpenConfirm(false)}
      >
        <Textbox label="Confirm textbox" />
      </Confirm>
      <Sidebar
        open={isOpenSidebar}
        onCancel={() => setIsOpenSidebar(false)}
        header="sidebar"
      >
        <Textbox label="Sidebar textbox" />
      </Sidebar>
    </>
  );
};
