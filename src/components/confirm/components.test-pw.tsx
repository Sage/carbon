import React, { useState } from "react";

import Button from "../button";
import Confirm, { ConfirmProps } from "./confirm.component";

export const ConfirmComponent = (props: Partial<ConfirmProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const ref = React.useRef(null);
  return (
    <>
      <Button onClick={() => setIsOpen(!isOpen)}>Open Confirm</Button>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        showCloseIcon
        open={isOpen}
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
        focusFirstElement={ref}
        {...props}
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
  const ref = React.useRef(null);
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
        <Button forwardRef={ref} onClick={() => setIsOpenOne(false)}>
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
