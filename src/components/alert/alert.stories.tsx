import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import Alert from ".";
import Button from "../button";

import isChromatic from "../../../.storybook/isChromatic";

const defaultOpenState = isChromatic();

// Added to avoid default export warning which causes storybook to not display `show code` examples - https://github.com/storybookjs/storybook/issues/8104
// eslint-disable-next-line import/prefer-default-export
export const DefaultAlert: ComponentStory<typeof Alert> = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Alert</Button>
      <Alert
        onCancel={() => setIsOpen(false)}
        title="Title"
        disableEscKey={false}
        height=""
        subtitle="Subtitle"
        showCloseIcon
        size="extra-small"
        open={isOpen}
      >
        This is an example of an alert
      </Alert>
    </>
  );
};
