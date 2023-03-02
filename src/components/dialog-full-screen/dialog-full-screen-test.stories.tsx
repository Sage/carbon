import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import DialogFullScreen, { DialogFullScreenProps } from ".";
import Dialog from "../dialog";
import Button from "../button";
import Form from "../form";
import Textbox from "../textbox";
import Pill from "../pill";
import Box from "../box";
import CarbonProvider from "../carbon-provider";

export default {
  title: "Dialog Full Screen/Test",
  includeStories: "DefaultStory",
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

export const mainDialogTitle = "Main Dialog";
export const nestedDialogTitle = "Nested Dialog";
export const DialogFullScreenComponent = ({
  // eslint-disable-next-line react/prop-types
  children = "This is an example",
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const ref = React.useRef(null);
  return (
    <>
      <DialogFullScreen
        open={isOpen}
        showCloseIcon
        onCancel={() => setIsOpen(false)}
        focusFirstElement={ref}
        {...props}
      >
        <Button onClick={() => setIsOpen(false)}>Not focused</Button>
        <Button forwardRef={ref} onClick={() => setIsOpen(false)}>
          This should be focused first now
        </Button>

        <Textbox label="Textbox1" value="Textbox1" />
        <Textbox label="Textbox2" value="Textbox2" />
        <Textbox label="Textbox3" value="Textbox3" />
        <Form>{children}</Form>
      </DialogFullScreen>
    </>
  );
};

export const NestedDialog = () => {
  const [mainDialogOpen, setMainDialogOpen] = React.useState(false);
  const [nestedDialogOpen, setNestedDialogOpen] = React.useState(false);

  const handleMainDialogOpen = () => {
    setMainDialogOpen(true);
  };

  const handleMainDialogCancel = () => {
    setMainDialogOpen(false);
  };

  const handleNestedDialogOpen = () => {
    setNestedDialogOpen(true);
  };

  const handleNestedDialogCancel = () => {
    setNestedDialogOpen(false);
  };

  return (
    <>
      <Button onClick={handleMainDialogOpen}>Open Main Dialog</Button>
      <DialogFullScreen
        open={mainDialogOpen}
        onCancel={handleMainDialogCancel}
        title={mainDialogTitle}
      >
        <Button onClick={handleNestedDialogOpen}>Open Nested Dialog</Button>
        <Dialog
          open={nestedDialogOpen}
          onCancel={handleNestedDialogCancel}
          title={nestedDialogTitle}
        >
          Nested Dialog Content
        </Dialog>
      </DialogFullScreen>
    </>
  );
};

export const MultipleDialogsInDifferentProviders = () => {
  const [isModal1Open, setIsModal1Open] = React.useState(false);
  const [isModal2Open, setIsModal2Open] = React.useState(false);
  return (
    <>
      <CarbonProvider>
        <Box>
          <Button onClick={() => setIsModal1Open(true)}>Open Modal 1</Button>
          <DialogFullScreen
            title="Full Screen Dialog"
            open={isModal1Open}
            onCancel={() => setIsModal1Open(false)}
          >
            This is Modal 1
            <Button onClick={() => setIsModal2Open(true)}>Open Modal 2</Button>
          </DialogFullScreen>
        </Box>
      </CarbonProvider>
      <CarbonProvider>
        <Box>
          <Dialog open={isModal2Open} onCancel={() => setIsModal2Open(false)}>
            This is Modal 2
          </Dialog>
        </Box>
      </CarbonProvider>
    </>
  );
};

export const DialogFullScreenWithHeaderChildren = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const HeaderChildren = (
    <div
      style={{
        margin: `$min-width: 568px 0 26px`,
      }}
    >
      <Pill fill>A pill</Pill>
      <Pill fill ml={2} mr={1}>
        Another pill
      </Pill>
    </div>
  );
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open DialogFullScreen</Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="An example of a long header"
        subtitle="Subtitle"
        headerChildren={HeaderChildren}
      >
        <Form
          stickyFooter
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <div>
            This is an example of a full screen Dialog with a Form as content
          </div>
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
        </Form>
      </DialogFullScreen>
    </>
  );
};
