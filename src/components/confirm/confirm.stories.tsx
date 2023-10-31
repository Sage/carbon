import React, { useState } from "react";

import Confirm from ".";
import Button from "../button";
import isChromatic from "../../../.storybook/isChromatic";

const defaultOpenState = isChromatic();

export const Default = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
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

export const DefaultWithCustomDataTags = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
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
        cancelButtonDataProps={{
          "data-element": "bang",
          "data-role": "wallop",
        }}
        confirmButtonDataProps={{
          "data-element": "bar",
          "data-role": "wiz",
        }}
      >
        Content
      </Confirm>
    </>
  );
};

export const SingleAction = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
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

export const CancelButtonDestructive = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
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

export const ConfirmButtonDestructive = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
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

export const DisableConfirm = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
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

export const DisableCancel = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
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

export const CancelButtonType = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
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

export const ConfirmButtonType = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
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

export const ButtonsIcons = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
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

export const IsLoadingConfirm = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
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
