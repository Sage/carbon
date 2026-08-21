import React, { useRef, useState } from "react";
import Textbox from "../../../textbox";
import Button from "../../../button";
import Dialog, { DialogHeader, DialogProps } from "./dialog.component";

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
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogWithFirstFocusableElement = (
  props: Partial<DialogProps>,
) => {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <Dialog open title="My dialog" focusFirstElement={ref} {...props}>
      <Button ref={ref} onClick={() => {}}>
        Press me
      </Button>
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogFullscreen = (props: Partial<DialogProps>) => {
  return (
    <Dialog
      open
      title="My dialog"
      showCloseIcon
      onCancel={() => {}}
      size="fullscreen"
      {...props}
    >
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogWithHeadingVariantPositive = (
  props: Partial<DialogProps>,
) => {
  return (
    <Dialog
      open
      title={
        <DialogHeader
          title="Dialog with positive icon"
          subtitle="Subheading"
          status="positive"
        />
      }
      onCancel={() => {}}
      {...props}
    >
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogWithHeadingVariantSubtle = (props: Partial<DialogProps>) => {
  return (
    <Dialog
      open
      title={
        <DialogHeader
          title="Dialog with subtle icon"
          subtitle="Subheading"
          status="subtle"
        />
      }
      onCancel={() => {}}
      {...props}
    >
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogWithHeadingVariantNegative = (
  props: Partial<DialogProps>,
) => {
  return (
    <Dialog
      open
      title={
        <DialogHeader
          title="Dialog with negative icon"
          subtitle="Subheading"
          status="negative"
        />
      }
      onCancel={() => {}}
      {...props}
    >
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogWithHeadingVariantCaution = (
  props: Partial<DialogProps>,
) => {
  return (
    <Dialog
      open
      title={
        <DialogHeader
          title="Dialog with caution icon"
          subtitle="Subheading"
          status="caution"
        />
      }
      onCancel={() => {}}
      {...props}
    >
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogWithHeadingVariantInfo = (props: Partial<DialogProps>) => {
  return (
    <Dialog
      open
      title={
        <DialogHeader
          title="Dialog with info icon"
          subtitle="Subheading"
          status="info"
        />
      }
      onCancel={() => {}}
      {...props}
    >
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogWithHeadingNoSubtitle = (props: Partial<DialogProps>) => {
  return (
    <Dialog
      open
      title={<DialogHeader title="Dialog with info icon" status="info" />}
      onCancel={() => {}}
      {...props}
    >
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};
