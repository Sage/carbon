import React, { useState, useRef } from "react";
import { StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DialogFullScreen, { DialogFullScreenProps } from ".";
import Dialog from "../dialog";
import Button from "../button";
import Form from "../form";
import Icon from "../icon";
import Textbox from "../textbox";

export default {
  title: "Dialog Full Screen/Test",
  includeStories: ["DefaultStory", "WithTwoDifferentNodes"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

interface DefaultProps extends Partial<DialogFullScreenProps> {
  stickyFooter?: boolean;
  formHeight?: number;
}

export const DefaultStory = ({
  stickyFooter,
  formHeight,
  children,
  title,
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
        title={title}
        subtitle={subtitle}
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
          {children || ""}
          <div style={{ height: formHeight }} />
        </Form>
      </DialogFullScreen>
    </>
  );
};

DefaultStory.storyName = "default";
DefaultStory.args = {
  title: "Example Dialog",
  subtitle: "Example Subtitle",
  children: "Text Content",
  disableEscKey: false,
  showCloseIcon: true,
  formHeight: "2000px",
  stickyFooter: false,
  disableContentPadding: false,
  closeButtonDataProps: {},
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

type StoryType = StoryObj<typeof DialogFullScreen>;

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
  chromatic: { disableSnapshot: false },
};
