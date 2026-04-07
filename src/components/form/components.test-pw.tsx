import React, { useState } from "react";
import Form, { FormProps } from ".";
import Button from "../button";
import Textbox from "../textbox";
import Dialog from "../dialog";
import Box from "../box";

export const FormComponent = (props: Partial<FormProps>) => {
  return (
    <Form
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      {...props}
    >
      <Textbox value="" onChange={() => {}} label="Textbox1" />
      <Textbox value="" onChange={() => {}} label="Textbox2" />
      <Textbox value="" onChange={() => {}} label="Textbox3" />
    </Form>
  );
};

export const WithErrorsSummary = () => (
  <Form
    onSubmit={() => "submit"}
    leftSideButtons={<Button onClick={() => "cancel"}>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    errorCount={1}
  >
    <Textbox value="" onChange={() => {}} label="Textbox" />
  </Form>
);

export const WithBothErrorsAndWarningsSummary = () => (
  <Form
    onSubmit={() => "submit"}
    leftSideButtons={<Button onClick={() => "cancel"}>Cancel</Button>}
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    errorCount={1}
    warningCount={1}
  >
    <Textbox value="" onChange={() => {}} label="Textbox" />
  </Form>
);

export const InDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Form
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" onClick={() => "save"}>
              Submit
            </Button>
          }
        >
          <Textbox value="" onChange={() => {}} label="Textbox" />
        </Form>
      </Dialog>
    </>
  );
};

export const InDialogFullScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Preview</Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Form in Dialog"
        subtitle="Subtitle"
      >
        <Box p="0px 40px">
          <Form
            leftSideButtons={
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            }
            saveButton={
              <Button buttonType="primary" onClick={() => "save"}>
                Submit
              </Button>
            }
          >
            <Textbox value="" onChange={() => {}} label="Textbox" />
          </Form>
        </Box>
      </Dialog>
    </>
  );
};
