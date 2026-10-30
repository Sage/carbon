import React, { useState } from "react";
import { StoryObj } from "@storybook/react-vite";
import Form, { FormProps } from ".";
import {
  Composition as CompositionStory,
  ValidationSummary as ValidationSummaryStory,
} from "./form.stories";
import Button from "../button/__next__";
import Textbox from "../textbox";
import Dialog from "../dialog";

export const FormComponent = (props: Partial<FormProps>) => {
  return (
    <Form
      saveButton={
        <Button variant="default" variantType="primary" type="submit">
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

export const DeprecatedErrorAndWarningCountSummary = () => (
  <Form
    onSubmit={() => "submit"}
    leftSideButtons={
      <Button variant="default" variantType="subtle" onClick={() => "cancel"}>
        Cancel
      </Button>
    }
    saveButton={
      <Button variant="default" variantType="primary" type="submit">
        Save
      </Button>
    }
    errorCount={1}
    warningCount={1}
  >
    <Textbox value="" onChange={() => {}} label="Textbox" />
  </Form>
);

type Story = StoryObj<typeof Form>;

// Reuses the docs stories' render functions so these tests cover the same examples.
const renderStory = (story: Story, args: Partial<FormProps> = {}) =>
  story.render?.(args, {} as Parameters<NonNullable<Story["render"]>>[1]);

export const Composition = () =>
  renderStory(CompositionStory, { onSubmit: (ev) => ev.preventDefault() });

export const ValidationSummary = ({ onSubmit }: { onSubmit?: () => void }) =>
  renderStory(ValidationSummaryStory, { onSubmit });

export const DeprecatedStickyFooter = () => (
  <Form
    stickyFooter
    height="200px"
    saveButton={
      <Button variant="default" variantType="primary" type="submit">
        Save
      </Button>
    }
  >
    <Textbox value="" onChange={() => {}} label="Textbox1" />
    <Textbox value="" onChange={() => {}} label="Textbox2" />
    <Textbox value="" onChange={() => {}} label="Textbox3" />
    <Textbox value="" onChange={() => {}} label="Textbox4" />
  </Form>
);

export const FooterButtonsInDialog = () => {
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
            <Button
              variant="default"
              variantType="subtle"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          }
          saveButton={
            <Button
              variant="default"
              variantType="primary"
              onClick={() => "save"}
            >
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
