import React, { useState } from "react";
import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { dlsThemeSelector } from "../../../.storybook/theme-selectors";
import DialogFullScreen from ".";
import Dialog from "../dialog";
import Button from "../button";
import Form from "../form";

export default {
  title: "Dialog Full Screen/Test",
  component: DialogFullScreen,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
  const [isOpen, setIsOpen] = useState(true);
  const title = text("title", "Example Dialog");
  const subtitle = text("subtitle", "Example Subtitle");
  const children = text("children", "Text Content");
  const enableBackgroundUI = boolean("enableBackgroundUI", false);
  const disableEscKey = boolean("disableEscKey", false);
  const showCloseIcon = boolean("showCloseIcon", true);
  const ariaRole = text("ariaRole", "dialog");
  const formHeight = text("form height", "2000px");
  const stickyFooter = boolean("Form component stickyFooter", false);
  const disableContentPadding = boolean("disableContentPadding", false);

  const handleCancel = () => {
    setIsOpen(false);
    action("cancel")();
  };

  const handleOpen = () => {
    setIsOpen(true);
    action("open")();
  };

  const handleClick = (evt) => {
    action("click")(evt);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={handleCancel}
        title={title}
        subtitle={subtitle}
        enableBackgroundUI={enableBackgroundUI}
        disableEscKey={disableEscKey}
        ariaRole={ariaRole}
        onClick={handleClick}
        showCloseIcon={showCloseIcon}
        disableContentPadding={disableContentPadding}
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
          {children}
          <div style={{ height: formHeight }} />
        </Form>
      </DialogFullScreen>
    </>
  );
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
