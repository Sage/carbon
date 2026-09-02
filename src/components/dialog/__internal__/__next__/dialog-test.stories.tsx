import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import allModes from "../../../../../.storybook/modes";

import Box from "../../../box";
import Button from "../../../button/__next__/";
import Typography from "../../../typography";
import Textbox from "../../../textbox";

import Dialog, { withDialogHeader } from "./dialog.component";
import { Form } from "../../../..";

const DialogWithHeadingVariant = withDialogHeader(Dialog);

const meta: Meta<typeof Dialog> = {
  title: "Dialog/Test",
  component: Dialog,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    layout: "fullscreen",
    controls: { disable: true },
    chromatic: {
      modes: {
        desktop: allModes.chromatic,
        lg: allModes.lg,
      },
    },
  },
  decorators: [
    (Story) => (
      <Box width="100vw" height="100vh">
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const Buttons = () => (
  <Box display="flex" flexDirection="column" alignItems="flex-end">
    <Box display="flex" gap={1}>
      <Button>Cancel</Button>
      <Button variantType="primary">Save</Button>
    </Box>
  </Box>
);

const dialogContent = (
  <>
    <Typography>
      This is an example of a dialog with a Form as content
    </Typography>
    <Textbox label="First Name" value="" onChange={() => {}} />
    <Textbox label="Middle Name" value="" onChange={() => {}} />
    <Textbox label="Surname" value="" onChange={() => {}} />
    <Textbox label="Birth Place" value="" onChange={() => {}} />
    <Textbox label="Favourite Colour" value="" onChange={() => {}} />
  </>
);

export const SizeSmall: Story = {
  name: "Size Small",
  render: () => (
    <Dialog
      open
      title="Small Dialog"
      subtitle="Subtitle"
      size="small"
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </Dialog>
  ),
};

export const SizeMedium: Story = {
  name: "Size Medium",
  render: () => (
    <Dialog
      open
      title="Medium Dialog"
      subtitle="Subtitle"
      size="medium"
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </Dialog>
  ),
};

export const SizeLarge: Story = {
  name: "Size Large",
  render: () => (
    <Dialog
      open
      title="Large Dialog"
      subtitle="Subtitle"
      size="large"
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </Dialog>
  ),
};

export const SizeFullScreen: Story = {
  name: "Size Full Screen",
  render: () => (
    <Dialog
      open
      title="Full Screen Dialog"
      subtitle="Subtitle"
      size="fullscreen"
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </Dialog>
  ),
};

export const HeadingSubtle: StoryObj<typeof DialogWithHeadingVariant> = {
  name: "Heading Subtle",
  render: () => (
    <DialogWithHeadingVariant
      open
      title="Dialog with subtle icon"
      subtitle="Subheading"
      statusIcon="subtle"
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </DialogWithHeadingVariant>
  ),
};

export const HeadingPositive: StoryObj<typeof DialogWithHeadingVariant> = {
  name: "Heading Positive",
  render: () => (
    <DialogWithHeadingVariant
      open
      title="Dialog with positive icon"
      subtitle="Subheading"
      statusIcon="positive"
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </DialogWithHeadingVariant>
  ),
};

export const HeadingNegative: StoryObj<typeof DialogWithHeadingVariant> = {
  name: "Heading Negative",
  render: () => (
    <DialogWithHeadingVariant
      open
      title="Dialog with negative icon"
      subtitle="Subheading"
      statusIcon="negative"
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </DialogWithHeadingVariant>
  ),
};

export const HeadingCaution: StoryObj<typeof DialogWithHeadingVariant> = {
  name: "Heading Caution",
  render: () => (
    <DialogWithHeadingVariant
      open
      title="Dialog with caution icon"
      subtitle="Subheading"
      statusIcon="caution"
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </DialogWithHeadingVariant>
  ),
};

export const HeadingInfo: StoryObj<typeof DialogWithHeadingVariant> = {
  name: "Heading Info",
  render: () => (
    <DialogWithHeadingVariant
      open
      title="Dialog with info icon"
      subtitle="Subheading"
      statusIcon="info"
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </DialogWithHeadingVariant>
  ),
};

// Please note:
// ensure that viewport is set to extra small in Storybook to see the bug.
export const DialogStickyFormSmallScreenBugDemo: Story = {
  name: "Dialog Sticky Form Small Screen Bug Demo",
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog
          disableStickyOnSmallScreen
          onCancel={() => setIsOpen(false)}
          open={isOpen}
          size="fullscreen"
          subtitle="Subtitle"
          title="Dialog with bug on small screen"
        >
          <Form
            leftSideButtons={<Button onClick={() => ""}>Cancel</Button>}
            saveButton={
              <Button variantType="primary" type="submit">
                Save
              </Button>
            }
            stickyFooter
          >
            <>
              <Textbox label="First Name" onChange={() => ""} value="" />
              <Textbox label="Middle Name" onChange={() => ""} value="" />
              <Textbox label="Surname" onChange={() => ""} value="" />
              <Textbox label="Birth Place" onChange={() => ""} value="" />
              <Textbox label="Favourite Colour" onChange={() => ""} value="" />
              <Textbox label="Address" onChange={() => ""} value="" />
              <Textbox label="First Name" onChange={() => ""} value="" />
              <Textbox label="Middle Name" onChange={() => ""} value="" />
              <Textbox label="Surname" onChange={() => ""} value="" />
              <Textbox label="Birth Place" onChange={() => ""} value="" />
              <Textbox label="Favourite Colour" onChange={() => ""} value="" />
              <Textbox label="Address" onChange={() => ""} value="" />
            </>
          </Form>
        </Dialog>
      </>
    );
  },
};
