import React, { useState, useRef } from "react";
import { StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DialogFullScreen, { DialogFullScreenProps } from ".";
import Dialog from "../dialog";
import Button from "../button";
import Form from "../form";
import Icon from "../icon";
import Textbox from "../textbox";
import Box from "../box";
import { StepFlow } from "../step-flow";

export default {
  title: "Dialog Full Screen/Test",
  component: DialogFullScreen,
  parameters: { themeProvider: { chromatic: { theme: "sage" } } },
};

type StoryType = StoryObj<typeof DialogFullScreen>;

export const Default: StoryType = {
  render: (args) => {
    const { children, ...rest } = args;
    return <DialogFullScreen {...rest}>{children}</DialogFullScreen>;
  },
  args: {
    children: <Button onClick={() => {}}>Button</Button>,
    open: true,
    title: "Example Dialog",
    subtitle: "Example Subtitle",
    showCloseIcon: true,
    onCancel: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ height: 900, width: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithStickyForm: StoryType = {
  render: (args) => {
    const DialogForm = () => (
      <Form
        stickyFooter
        leftSideButtons={<Button onClick={() => {}}>Cancel</Button>}
        saveButton={
          <Button buttonType="primary" type="submit">
            Save
          </Button>
        }
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
        <Textbox label="Textbox" onChange={() => {}} />
      </Form>
    );

    return (
      <DialogFullScreen {...args}>
        <DialogForm />
      </DialogFullScreen>
    );
  },
  args: {
    open: true,
    title: "Example Dialog",
    subtitle: "I have a sticky form!",
    showCloseIcon: true,
    onCancel: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ height: 900, width: "100%" }}>
        <Story />
      </div>
    ),
  ],
};

export const Nested: StoryType = () => {
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
Nested.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const WithStepFlowInHeader: StoryType = {
  render: (args) => {
    const { children, ...rest } = args;
    return <DialogFullScreen {...rest}>{children}</DialogFullScreen>;
  },
  args: {
    children: "Content",
    open: true,
    title: (
      <Box maxWidth="750px" width="100%" data-testid="test">
        <StepFlow
          category="category"
          title="title"
          currentStep={1}
          totalSteps={6}
          showProgressIndicator
        />
      </Box>
    ),
    showCloseIcon: false,
    onCancel: () => {},
  },
  decorators: [
    (Story) => (
      <Box height="900px" width="100%">
        <Story />
      </Box>
    ),
  ],
};
WithStepFlowInHeader.storyName = "with StepFlow in header";

export const WithTwoDifferentNodes: StoryType = ({
  ...props
}: Partial<DialogFullScreenProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <DialogFullScreen
        focusFirstElement={ref}
        open={isOpen}
        showCloseIcon
        title="Example Dialog Full Screen"
        subtitle={
          <>
            <Icon type="add" />
            <br />
            Subtitle line 2
          </>
        }
        onCancel={() => setIsOpen(false)}
        {...props}
      >
        <Textbox label="Textbox1" value="Textbox1" />
        <Textbox label="Textbox2" value="Textbox2" />
        <Textbox label="Textbox3" value="Textbox3" />
      </DialogFullScreen>
    </>
  );
};

WithTwoDifferentNodes.storyName = "with two different nodes in subtitle";
WithTwoDifferentNodes.decorators = [
  (Story) => (
    <div style={{ height: 900, width: "100%" }}>
      <Story />
    </div>
  ),
];
WithTwoDifferentNodes.parameters = {
  layout: "fullscreen",
};

export const WithWrappedStickyForm: StoryType = {
  args: {
    children: (
      <Box p="0px 40px" minHeight="0">
        <Form
          stickyFooter
          leftSideButtons={<Button onClick={() => {}}>Cancel</Button>}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
        </Form>
      </Box>
    ),
    open: true,
    onCancel: () => {},
    title: "Title",
    subtitle: "Subtitle",
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export const WithLongTitle: StoryType = {
  render: (args) => {
    const { children, ...rest } = args;
    return <DialogFullScreen {...rest}>{children}</DialogFullScreen>;
  },
  args: {
    children:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias labore nostrum quo deserunt repellendus accusamus facilis voluptatem? Dicta illo esse non! Corrupti suscipit reprehenderit ea nesciunt delectus. Non voluptate expedita, repellendus ea vitae dolor nobis aperiam ullam unde ducimus aliquam quidem veniam necessitatibus, suscipit eaque exercitationem aut corrupti, qui ipsa.",
    open: true,
    title:
      "Really long title for Dialog Full Screen that should wrap in small screens",
    subtitle: "Subtitle",
    showCloseIcon: true,
    onCancel: () => {},
  },
};

WithLongTitle.storyName = "With Long Title";
WithLongTitle.parameters = {
  chromatic: { disableSnapshot: false, viewports: [500] },
  themeProvider: { chromatic: { theme: "sage" } },
};
