import React, { useRef, useState } from "react";
import Textbox from "../../../textbox";
import Button from "../../../button";
import Dialog, { withDialogHeader, DialogProps } from "./dialog.component";

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

const DialogWithHeadingVariant = withDialogHeader(Dialog);

export const DialogWithHeadingVariantPositive = (
  props: Partial<DialogProps>,
) => {
  return (
    <DialogWithHeadingVariant
      open
      title="Dialog with positive icon"
      subtitle="Subheading"
      statusIcon="positive"
      onCancel={() => {}}
      {...props}
    >
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </DialogWithHeadingVariant>
  );
};

export const DialogWithHeadingVariantSubtle = (props: Partial<DialogProps>) => {
  return (
    <DialogWithHeadingVariant
      open
      title="Dialog with subtle icon"
      subtitle="Subheading"
      statusIcon="subtle"
      onCancel={() => {}}
      {...props}
    >
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </DialogWithHeadingVariant>
  );
};

export const DialogWithHeadingVariantNegative = (
  props: Partial<DialogProps>,
) => {
  return (
    <DialogWithHeadingVariant
      open
      title="Dialog with negative icon"
      subtitle="Subheading"
      statusIcon="negative"
      onCancel={() => {}}
      {...props}
    >
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </DialogWithHeadingVariant>
  );
};

export const DialogWithHeadingVariantCaution = (
  props: Partial<DialogProps>,
) => {
  return (
    <DialogWithHeadingVariant
      open
      title="Dialog with caution icon"
      subtitle="Subheading"
      statusIcon="caution"
      onCancel={() => {}}
      {...props}
    >
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </DialogWithHeadingVariant>
  );
};

export const DialogWithHeadingVariantInfo = (props: Partial<DialogProps>) => {
  return (
    <DialogWithHeadingVariant
      open
      title="Dialog with info icon"
      subtitle="Subheading"
      statusIcon="info"
      onCancel={() => {}}
      {...props}
    >
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
    </DialogWithHeadingVariant>
  );
};
