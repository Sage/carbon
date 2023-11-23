import React, { useEffect, useState } from "react";
import Alert from ".";
import Button from "../button";
import DialogFullScreen from "../dialog-full-screen";
import Sidebar from "../sidebar";
import Textbox from "../textbox";

export const AlertComponent = ({
  children = "This is an example of an alert",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Alert</Button>
      <Alert
        onCancel={() => setIsOpen(false)}
        title="Title"
        disableEscKey={false}
        height=""
        subtitle=""
        showCloseIcon
        size="extra-small"
        open={isOpen}
        {...props}
      >
        {children}
      </Alert>
    </>
  );
};

export const TopModalOverride = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(true);
  const [isOpenAlert, setIsOpenAlert] = useState(true);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpenSidebar(true);
    }, 10);
  }, []);

  return (
    <>
      <DialogFullScreen
        open={isOpenDialog}
        onCancel={() => setIsOpenDialog(false)}
        title="Dialog fullscreen"
      >
        <Textbox label="Fullscreen textbox" />
      </DialogFullScreen>
      <Alert
        open={isOpenAlert}
        onCancel={() => setIsOpenAlert(false)}
        title="Alert"
        topModalOverride
      >
        <Textbox label="Alert textbox" />
      </Alert>
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
