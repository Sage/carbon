import React, { useEffect, useState } from "react";
import Alert from ".";
import Button from "../button";
import Dialog from "../dialog";
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
  const [textboxValue, setTextboxValue] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setIsOpenSidebar(true);
    }, 10);
  }, []);

  return (
    <>
      <Dialog
        fullscreen
        open={isOpenDialog}
        onCancel={() => setIsOpenDialog(false)}
        title="Dialog fullscreen"
      >
        <Textbox
          label="Fullscreen textbox"
          value={textboxValue}
          onChange={(e) => setTextboxValue(e.target.value)}
        />
      </Dialog>
      <Alert
        open={isOpenAlert}
        onCancel={() => setIsOpenAlert(false)}
        title="Alert"
        topModalOverride
      >
        <Textbox
          label="Alert textbox"
          value={textboxValue}
          onChange={(e) => setTextboxValue(e.target.value)}
        />
      </Alert>
      <Sidebar
        open={isOpenSidebar}
        onCancel={() => setIsOpenSidebar(false)}
        header="sidebar"
      >
        <Textbox
          label="Sidebar textbox"
          value={textboxValue}
          onChange={(e) => setTextboxValue(e.target.value)}
        />
      </Sidebar>
    </>
  );
};
