import React, { useEffect, useRef, useState } from "react";

import Dialog from ".";
import type { DialogProps } from ".";

import Textbox from "../textbox";
import Button from "../button";
import Toast from "../toast";
import Box from "../box";
import DialogFullScreen from "../dialog-full-screen";
import Sidebar from "../sidebar";
import { Select, Option } from "../select";
import { StepSequence, StepSequenceItem } from "../step-sequence";

export const DialogComponent = (props: Partial<DialogProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog
      open={isOpen}
      title="My dialog"
      showCloseIcon
      onCancel={() => setIsOpen(false)}
      {...props}
    >
      <Textbox label="Textbox1" value="Textbox1" />
      <Textbox label="Textbox2" value="Textbox2" />
      <Textbox label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogWithFirstFocusableElement = (
  props: Partial<DialogProps>
) => {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <Dialog open title="My dialog" focusFirstElement={ref} {...props}>
      <Button ref={ref} onClick={() => {}}>
        Press me
      </Button>
      <Textbox label="Textbox1" value="Textbox1" />
      <Textbox label="Textbox2" value="Textbox2" />
      <Textbox label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogWithToast = () => {
  const toastRef = useRef<HTMLDivElement>(null);
  const [openToast, setOpenToast] = useState(false);
  return (
    <>
      <Toast
        ref={toastRef}
        open={openToast}
        onDismiss={() => setOpenToast(false)}
      >
        Toast message 1
      </Toast>
      <Dialog open title="My dialog">
        <Button onClick={() => setOpenToast(true)}>Open Toast</Button>
      </Dialog>
    </>
  );
};

export const DialogBackgroundScrollTest = () => {
  return (
    <Box height="2000px" position="relative">
      <Box height="100px" position="absolute" bottom="0px">
        I should not be scrolled into view
      </Box>
      <Dialog open title="My dialog" onCancel={() => {}}>
        <Textbox label="textbox" />
      </Dialog>
    </Box>
  );
};

export const DialogWithOpenToastsBackgroundScrollTest = () => {
  const toast1Ref = useRef<HTMLDivElement>(null);
  const toast2Ref = useRef<HTMLDivElement>(null);
  return (
    <Box height="2000px" position="relative">
      <Box height="100px" position="absolute" bottom="0px">
        I should not be scrolled into view
      </Box>
      <Dialog
        open
        title="My dialog"
        onCancel={() => {}}
        focusableContainers={[toast1Ref, toast2Ref]}
      >
        <Textbox label="textbox" />
      </Dialog>
      <Toast open onDismiss={() => {}} ref={toast1Ref} targetPortalId="stacked">
        Toast message 1
      </Toast>
      <Toast open onDismiss={() => {}} ref={toast2Ref} targetPortalId="stacked">
        Toast message 2
      </Toast>
    </Box>
  );
};

export const TopModalOverride = () => {
  const [isOpenDialogFullSreen, setIsOpenDialogFullSreen] = useState(true);
  const [isOpenDialog, setIsOpenDialog] = useState(true);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpenSidebar(true);
    }, 10);
  }, []);

  return (
    <>
      <DialogFullScreen
        open={isOpenDialogFullSreen}
        onCancel={() => setIsOpenDialogFullSreen(false)}
        title="Dialog fullscreen"
      >
        <Textbox label="Fullscreen textbox" />
      </DialogFullScreen>
      <Dialog
        open={isOpenDialog}
        onCancel={() => setIsOpenDialog(false)}
        title="Dialog"
        topModalOverride
      >
        <Textbox label="Dialog textbox" />
      </Dialog>
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

export const DialogWithAutoFocusSelect = () => {
  return (
    <Dialog open title="My dialog" onCancel={() => {}}>
      <Select autoFocus label="select">
        <Option value="1" text="one" />
      </Select>
      <Textbox label="textbox" />
    </Dialog>
  );
};

export const DialogWithStepSequence = (props: Partial<DialogProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog
      open={isOpen}
      title="My dialog"
      showCloseIcon
      onCancel={() => setIsOpen(false)}
      {...props}
    >
      <StepSequence>
        <StepSequenceItem
          aria-label="Step 1 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="1"
          status="complete"
        >
          Name
        </StepSequenceItem>
        <StepSequenceItem
          aria-label="Step 2 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="2"
          status="complete"
        >
          Delivery Address
        </StepSequenceItem>
        <StepSequenceItem
          aria-label="Step 3 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="3"
          status="current"
        >
          Delivery Details
        </StepSequenceItem>
        <StepSequenceItem
          aria-label="Step 4 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="4"
          status="incomplete"
        >
          Payment
        </StepSequenceItem>
        <StepSequenceItem
          aria-label="Step 5 of 5"
          hiddenCompleteLabel="Complete"
          hiddenCurrentLabel="Current"
          indicator="5"
          status="incomplete"
        >
          Confirm
        </StepSequenceItem>
      </StepSequence>
    </Dialog>
  );
};
