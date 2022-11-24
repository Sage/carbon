import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import Alert from ".";
import Button from "../button";
import isChromatic from "../../../.storybook/isChromatic";

const isOpenForChromatic = isChromatic();

export const AlertComponent: ComponentStory<typeof Alert> = () => {
  const [isOpen, setIsOpen] = useState(isOpenForChromatic);
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
      >
        This is an example of an alert
      </Alert>
    </>
  );
};

export const AlertComponentTest = ({
  // eslint-disable-next-line react/prop-types
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
