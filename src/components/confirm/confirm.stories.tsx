import React, { useState } from "react";
import { StoryFn } from "@storybook/react";
import isChromatic from "../../../.storybook/isChromatic";

import Confirm from ".";
import Button from "../button";

const isOpenForChromatic = isChromatic();

export const Default: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(isOpenForChromatic);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirm</Button>
      <Confirm
        cancelButtonDestructive
        title="Are you sure?"
        subtitle="Subtitle"
        open={isOpen}
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        Content
      </Confirm>
    </>
  );
};
Default.storyName = "default";

export const SingleAction: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(isOpenForChromatic);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirm</Button>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        open={isOpen}
        onConfirm={() => setIsOpen(false)}
      >
        Content
      </Confirm>
    </>
  );
};
SingleAction.storyName = "single action";

export const CancelButtonDestructive = () => {
  const [isOpen, setIsOpen] = useState(isOpenForChromatic);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirm</Button>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        cancelButtonDestructive
        open={isOpen}
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        Content
      </Confirm>
    </>
  );
};
CancelButtonDestructive.storyName = "cancelButtonDestructive";

export const ConfirmButtonDestructive: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(isOpenForChromatic);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirm</Button>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        confirmButtonDestructive
        open={isOpen}
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        Content
      </Confirm>
    </>
  );
};
ConfirmButtonDestructive.storyName = "confirmButtonDestructive";

export const DisableConfirm: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(isOpenForChromatic);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirm</Button>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        confirmButtonDestructive
        cancelButtonDestructive
        disableConfirm
        open={isOpen}
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        Content
      </Confirm>
    </>
  );
};
DisableConfirm.storyName = "disableConfirm";

export const DisableCancel: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(isOpenForChromatic);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirm</Button>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        showCloseIcon
        disableCancel
        open={isOpen}
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        Content
      </Confirm>
    </>
  );
};
DisableCancel.storyName = "disableCancel";

export const CancelButtonType: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(isOpenForChromatic);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirm</Button>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        cancelButtonType="tertiary"
        open={isOpen}
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        Content
      </Confirm>
    </>
  );
};
CancelButtonType.storyName = "cancelButtonType";

export const ConfirmButtonType: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(isOpenForChromatic);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirm</Button>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        confirmButtonType="tertiary"
        open={isOpen}
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        Content
      </Confirm>
    </>
  );
};
ConfirmButtonType.storyName = "confirmButtonType";

export const ChangeButtonIcons: StoryFn = () => {
  const [isOpen, setIsOpen] = useState(isOpenForChromatic);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirm</Button>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        confirmButtonIconType="save"
        confirmButtonIconPosition="after"
        cancelButtonIconType="bin"
        open={isOpen}
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        Content
      </Confirm>
    </>
  );
};
ChangeButtonIcons.storyName = "buttonsIcons";

export const LoadingConfirmButton = () => {
  const [isOpen, setIsOpen] = useState(isOpenForChromatic);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Confirm</Button>
      <Confirm
        title="Are you sure?"
        subtitle="Subtitle"
        isLoadingConfirm
        open={isOpen}
        onConfirm={() => setIsOpen(false)}
        onCancel={() => setIsOpen(false)}
      >
        Content
      </Confirm>
    </>
  );
};
LoadingConfirmButton.storyName = "isLoadingConfirm";
