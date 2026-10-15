import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import allModes from "../../../../../.storybook/modes";
import isChromatic from "../../../../../.storybook/isChromatic";

import Box from "../../../box";
import Button from "../../../button/__next__/";
import Typography from "../../../typography";
import Textbox from "../../../textbox";

import Dialog from "./dialog.component";
import DialogHeader from "./dialog-header/dialog-header.component";
import { Form } from "../../../..";

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
  <Box display="flex" flexDirection="column" gap={2}>
    <Typography>
      This is an example of a dialog with a Form as content
    </Typography>
    <Textbox m={0} label="First Name" value="" onChange={() => {}} />
    <Textbox m={0} label="Middle Name" value="" onChange={() => {}} />
    <Textbox m={0} label="Surname" value="" onChange={() => {}} />
    <Textbox m={0} label="Birth Place" value="" onChange={() => {}} />
    <Textbox m={0} label="Favourite Colour" value="" onChange={() => {}} />
  </Box>
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

export const HeadingSubtle: StoryObj<typeof Dialog> = {
  name: "Heading Subtle",
  render: () => (
    <Dialog
      open
      title={
        <DialogHeader
          title="Dialog with subtle icon"
          subtitle="Subheading"
          status="subtle"
        />
      }
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </Dialog>
  ),
};

export const HeadingPositive: StoryObj<typeof Dialog> = {
  name: "Heading Positive",
  render: () => (
    <Dialog
      open
      title={
        <DialogHeader
          title="Dialog with positive icon"
          subtitle="Subheading"
          status="positive"
        />
      }
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </Dialog>
  ),
};

export const HeadingNegative: StoryObj<typeof Dialog> = {
  name: "Heading Negative",
  render: () => (
    <Dialog
      open
      title={
        <DialogHeader
          title="Dialog with negative icon"
          subtitle="Subheading"
          status="negative"
        />
      }
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </Dialog>
  ),
};

export const HeadingCaution: StoryObj<typeof Dialog> = {
  name: "Heading Caution",
  render: () => (
    <Dialog
      open
      title={
        <DialogHeader
          title="Dialog with caution icon"
          subtitle="Subheading"
          status="caution"
        />
      }
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </Dialog>
  ),
};

export const HeadingInfo: StoryObj<typeof Dialog> = {
  name: "Heading Info",
  render: () => (
    <Dialog
      open
      title={
        <DialogHeader
          title="Dialog with info icon"
          subtitle="Subheading"
          status="info"
        />
      }
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </Dialog>
  ),
};

export const DialogStickyFormSmallScreen: Story = {
  name: "Fullscreen Dialog Sticky Form Small Screen",
  parameters: {
    chromatic: {
      modes: {
        xsm: allModes.xsm,
        lg: allModes.lg,
      },
    },
  },
  render: () => {
    const [isOpen, setIsOpen] = useState(isChromatic());

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog
          disableStickyOnSmallScreen
          onCancel={() => setIsOpen(false)}
          open={isOpen}
          size="fullscreen"
          subtitle="To test this behaviour, please make sure you have the viewport set to extra small in Storybook."
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
              <Box display="flex" flexDirection="column" gap={2}>
                <Textbox
                  m={0}
                  label="First Name"
                  onChange={() => ""}
                  value=""
                />
                <Textbox
                  m={0}
                  label="Middle Name"
                  onChange={() => ""}
                  value=""
                />
                <Textbox m={0} label="Surname" onChange={() => ""} value="" />
                <Textbox
                  m={0}
                  label="Birth Place"
                  onChange={() => ""}
                  value=""
                />
                <Textbox
                  m={0}
                  label="Favourite Colour"
                  onChange={() => ""}
                  value=""
                />
                <Textbox m={0} label="Address" onChange={() => ""} value="" />
                <Textbox
                  m={0}
                  label="First Name"
                  onChange={() => ""}
                  value=""
                />
                <Textbox
                  m={0}
                  label="Middle Name"
                  onChange={() => ""}
                  value=""
                />
                <Textbox m={0} label="Surname" onChange={() => ""} value="" />
                <Textbox
                  m={0}
                  label="Birth Place"
                  onChange={() => ""}
                  value=""
                />
                <Textbox
                  m={0}
                  label="Favourite Colour"
                  onChange={() => ""}
                  value=""
                />
                <Textbox m={0} label="Address" onChange={() => ""} value="" />
              </Box>
            </>
          </Form>
        </Dialog>
      </>
    );
  },
};

export const WrappedHeaderWithIcon: StoryObj<typeof Dialog> = {
  name: "Wrapped Header With Icon",
  parameters: {
    chromatic: {
      modes: {
        // as we are constraining width anyways we only need to test the desktop mode for Chromatic
        desktop: allModes.chromatic,
      },
    },
  },
  render: () => (
    <Dialog
      open
      size="small"
      title={
        <DialogHeader
          status="info"
          subtitle="Subtitle"
          title="Really really really really really really really really really really really really really really really really really really really really really really really really long title."
        />
      }
      onCancel={() => {}}
      footer={<Buttons />}
    >
      {dialogContent}
    </Dialog>
  ),
};
