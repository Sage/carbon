import React, { useState } from "react";
import { action } from "@storybook/addon-actions";

import specialCharacters from "../../__internal__/utils/argTypes/specialCharacters";
import DialogFullScreen, { DialogFullScreenProps } from ".";
import Dialog from "../dialog";
import Button from "../button";
import Form from "../form";

export default {
  title: "Dialog Full Screen/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    titleSpecialCharacters: specialCharacters,
    subtitleSpecialCharacters: specialCharacters,
    childrenSpecialCharacters: specialCharacters,
  },
};

interface DefaultProps extends Partial<DialogFullScreenProps> {
  stickyFooter?: boolean;
  formHeight?: number;
  childrenSpecialCharacters?: string;
  titleSpecialCharacters?: string;
  subtitleSpecialCharacters?: string;
}

export const Default = ({
  stickyFooter,
  formHeight,
  childrenSpecialCharacters,
  children,
  titleSpecialCharacters,
  title,
  subtitleSpecialCharacters,
  subtitle,
  ...args
}: DefaultProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCancel = () => {
    setIsOpen(false);
    action("cancel")();
  };

  const handleOpen = () => {
    setIsOpen(true);
    action("open")();
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <DialogFullScreen
        onCancel={handleCancel}
        open={isOpen}
        title={title || titleSpecialCharacters}
        subtitle={subtitle || subtitleSpecialCharacters}
        {...args}
      >
        <Form
          stickyFooter={stickyFooter}
          leftSideButtons={<Button onClick={handleCancel}>Cancel</Button>}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          {children || childrenSpecialCharacters || ""}
          <div style={{ height: formHeight }} />
        </Form>
      </DialogFullScreen>
    </>
  );
};

Default.storyName = "default";
Default.args = {
  title: "Example Dialog",
  titleSpecialCharacters: undefined,
  subtitle: "Example Subtitle",
  subtitleSpecialCharacters: undefined,
  children: "Text Content",
  childrenSpecialCharacters: undefined,
  disableEscKey: false,
  showCloseIcon: true,
  formHeight: "2000px",
  stickyFooter: false,
  disableContentPadding: false,
};

export const Nested = () => {
  const [mainDialogOpen, setMainDialogOpen] = useState(false);

  const [nestedDialogOpen, setNestedDialogOpen] = useState(false);

  const handleMainDialogOpen = () => {
    setMainDialogOpen(true);
    action("main dialog open")();
  };

  const handleMainDialogCancel = () => {
    setMainDialogOpen(false);
    action("main dialog cancel")();
  };

  const handleNestedDialogOpen = () => {
    setNestedDialogOpen(true);
    action("nested dialog open")();
  };

  const handleNestedDialogCancel = () => {
    setNestedDialogOpen(false);
    action("nested dialog cancel")();
  };

  return (
    <>
      <Button onClick={handleMainDialogOpen}>Open Main Dialog</Button>
      <DialogFullScreen
        open={mainDialogOpen}
        onCancel={handleMainDialogCancel}
        title="Main Dialog"
      >
        <Button onClick={handleNestedDialogOpen}>Open Nested Dialog</Button>
        <Dialog
          open={nestedDialogOpen}
          onCancel={handleNestedDialogCancel}
          title="Nested Dialog"
        >
          Nested Dialog Content
        </Dialog>
      </DialogFullScreen>
    </>
  );
};

Nested.storyName = "nested";
