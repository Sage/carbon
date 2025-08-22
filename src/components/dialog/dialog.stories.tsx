import React, { useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import isChromatic from "../../../.storybook/isChromatic";
import { allModes } from "../../../.storybook/modes";

import Box from "../box";
import Button from "../button";
import Form from "../form";
import Typography from "../typography";
import Textbox from "../textbox";
import Fieldset from "../fieldset";
import Loader from "../loader";
import Toast from "../toast";
import Message from "../message";
import Textarea from "../textarea";
import CarbonProvider from "../carbon-provider";
import useMediaQuery from "../../hooks/useMediaQuery";

import type { DialogHandle, DialogProps } from ".";
import Dialog from ".";

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    layout: isChromatic() ? "fullscreen" : "padded",
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
      <>
        {isChromatic() ? (
          <Box width="100vw" height="100vh">
            <Story />
          </Box>
        ) : (
          <Story />
        )}
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const defaultOpenState = isChromatic();

export const DefaultStory: Story = {
  name: "Default",
  args: {
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
  },
  render: function DefaultStory({ onCancel, ...args }: Partial<DialogProps>) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(args.open || false);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Dialog
          {...args}
          open={open}
          onCancel={(ev) => {
            onCancel?.(ev);
            setOpen(false);
            setTimeout(() => buttonRef.current?.focus(), 0);
          }}
        >
          <Form
            stickyFooter
            leftSideButtons={
              <Button onClick={() => setOpen(false)}>Cancel</Button>
            }
            saveButton={
              <Button buttonType="primary" type="submit">
                Save
              </Button>
            }
          >
            <Typography>
              This is an example of a dialog with a Form as content
            </Typography>
            <Textbox label="First Name" />
            <Textbox label="Middle Name" />
            <Textbox label="Surname" />
            <Textbox label="Birth Place" />
            <Textbox label="Favourite Colour" />
            <Textbox label="Address" />
            <Textbox label="First Name" />
            <Textbox label="Middle Name" />
            <Textbox label="Surname" />
            <Textbox label="Birth Place" />
            <Textbox label="Favourite Colour" />
            <Textbox label="Address" />
          </Form>
        </Dialog>
      </>
    );
  },
};

export const RestoreFocusOnCloseStory: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const messageRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen(true);
          setShowMessage(false);
        }}
        mb={showMessage ? 5 : 0}
      >
        Open Dialog
      </Button>
      {showMessage && (
        <Message
          ref={messageRef}
          variant="error"
          onDismiss={() => setShowMessage(false)}
        >
          Some custom message
        </Message>
      )}
      <Dialog
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setShowMessage(true);
          setTimeout(() => messageRef.current?.focus(), 1);
        }}
        title="Title"
        subtitle="Subtitle"
        restoreFocusOnClose={false}
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
          <Typography>
            This is an example of a dialog with a Form as content
          </Typography>
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
        </Form>
      </Dialog>
    </>
  );
};
RestoreFocusOnCloseStory.storyName = "With Restore Focus On Close";
RestoreFocusOnCloseStory.parameters = { chromatic: { disableSnapshot: true } };

export const MaxSize: Story = {
  ...DefaultStory,
  name: "With Max Size",
  args: {
    ...DefaultStory.args,
    size: "maximise",
  },
  parameters: {
    chromatic: {
      modes: {
        xsm: allModes.xsm,
        lg: allModes.lg,
      },
    },
  },
};

export const WithHelp: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Add an address"
        help="Some help text"
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
          <Box p="24px" bg="slateTint90" ml="88px">
            <Textbox labelInline label="Property Name" />
            <Fieldset>
              <Textbox labelInline label="Address Line 1" />
              <Textbox labelInline label="Address Line 2" />
              <Textbox labelInline label="Town" />
              <Textbox labelInline label="City" />
              <Textbox labelInline label="Postcode" />
            </Fieldset>
          </Box>
        </Form>
      </Dialog>
    </>
  );
};
WithHelp.storyName = "With Help";

export const LoadingContent: Story = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  const handleOpen = () => {
    setIsLoading(true);
    setIsOpen(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  return (
    <>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <Dialog
        size="medium"
        open={isOpen}
        title="Dialog with dynamic content"
        onCancel={() => setIsOpen(false)}
      >
        {isLoading ? (
          <Loader isActive isInsideButton={false} size="small" />
        ) : (
          <>
            <Textbox label="Textbox 1" labelInline autoFocus />
            <Textbox label="Textbox 2" labelInline />
            <Textbox label="Textbox 3" labelInline />
            <Textbox label="Textbox 4" labelInline />
            <Textbox label="Textbox 5" labelInline />
            <Textbox label="Textbox 6" labelInline />
            <Textbox label="Textbox 7" labelInline />
          </>
        )}
      </Dialog>
    </>
  );
};
LoadingContent.storyName = "Loading Content";
LoadingContent.parameters = { chromatic: { disableSnapshot: true } };

export const FocusingADifferentFirstElement: Story = () => {
  const [isOpenOne, setIsOpenOne] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const ref = useRef(null);
  return (
    <>
      <Button onClick={() => setIsOpenOne(true)}>
        Open Demo using focusFirstElement
      </Button>
      <Dialog
        focusFirstElement={ref}
        open={isOpenOne}
        onCancel={() => setIsOpenOne(false)}
        aria-label="Demo using focusFirstElement"
      >
        <Typography>
          Focus an element that does not support autofocus
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          height="150px"
        >
          <Button onClick={() => setIsOpenOne(false)}>Not focused</Button>
          <Button ref={ref} onClick={() => setIsOpenOne(false)}>
            This should be focused first now
          </Button>
        </Box>
        <Textbox label="Not focused" />
      </Dialog>
      <Button ml={2} onClick={() => setIsOpenTwo(true)}>
        Open Demo using autoFocus
      </Button>
      <Dialog
        disableAutoFocus
        open={isOpenTwo}
        onCancel={() => setIsOpenTwo(false)}
        aria-label="Demo using autoFocus"
      >
        <Typography>Focus an element that supports autoFocus</Typography>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          height="150px"
        >
          <Button onClick={() => setIsOpenTwo(false)}>Not focused</Button>
          <Button onClick={() => setIsOpenTwo(false)}>Not focused</Button>
        </Box>
        <Textbox autoFocus label="This should be focused first now" />
      </Dialog>
    </>
  );
};
FocusingADifferentFirstElement.storyName = "Focusing a Different First Element";
FocusingADifferentFirstElement.parameters = {
  chromatic: { disableSnapshot: true },
};

export const OverridingContentPadding: Story = {
  ...DefaultStory,
  name: "Overriding Content Padding",
  args: {
    ...DefaultStory.args,
    contentPadding: { p: 0 },
  },
};

export const OtherFocusableContainers: Story = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isToast1Open, setIsToast1Open] = useState(false);
  const [isToast2Open, setIsToast2Open] = useState(false);
  const toast1Ref = useRef(null);
  const toast2Ref = useRef(null);

  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        title="Title"
        subtitle="Subtitle"
        focusableContainers={[toast1Ref, toast2Ref]}
      >
        <Form
          stickyFooter
          leftSideButtons={
            <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Typography>
            This is an example of a dialog with a Form as content
          </Typography>
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Button onClick={() => setIsToast1Open(true)}>
            Show first toast
          </Button>
          <Button
            ml={2}
            buttonType="primary"
            onClick={() => setIsToast2Open(true)}
          >
            Show second toast
          </Button>
        </Form>
      </Dialog>
      <Toast
        open={isToast1Open}
        onDismiss={() => setIsToast1Open(false)}
        ref={toast1Ref}
        targetPortalId="stacked"
      >
        Toast message 1
      </Toast>
      <Toast
        open={isToast2Open}
        onDismiss={() => setIsToast2Open(false)}
        ref={toast2Ref}
        targetPortalId="stacked"
      >
        Toast message 2
      </Toast>
    </>
  );
};
OtherFocusableContainers.storyName = "Other Focusable Containers";
OtherFocusableContainers.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Responsive: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const largeScreen = useMediaQuery("(min-width: 1260px)");
  const mediumScreen = useMediaQuery("(min-width: 960px)");
  const smallScreen = useMediaQuery("(min-width: 600px)");
  const setCorrectScreenSize = () => {
    if (largeScreen) return "large";
    if (mediumScreen) return "medium";
    if (smallScreen) return "small";
    return "auto";
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        size={setCorrectScreenSize()}
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Title"
        subtitle="Subtitle"
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
          <Typography>
            This is an example of a dialog with a Form as content
          </Typography>
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
        </Form>
      </Dialog>
    </>
  );
};
Responsive.storyName = "Responsive";

export const UsingHandle: Story = () => {
  const dialogHandle = useRef<DialogHandle>(null);

  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [state, setState] = useState("");

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setIsSubmitted(true);
    dialogHandle.current?.focus();
  }

  function setValue(ev: React.ChangeEvent<HTMLInputElement>) {
    setState(ev.target.value);
  }

  return (
    <CarbonProvider validationRedesignOptIn>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title={isSubmitted ? "Thank you for your feedback." : "Give feedback"}
        showCloseIcon
        ref={dialogHandle}
      >
        {isSubmitted ? (
          <Typography>
            Your feedback helps us continually improve our software.
          </Typography>
        ) : (
          <Form
            stickyFooter
            saveButton={<Button type="submit">Submit</Button>}
            onSubmit={handleSubmit}
          >
            <Textarea
              label="What would you like to tell us?"
              characterLimit={1000}
              value={state}
              onChange={setValue}
            />
          </Form>
        )}
      </Dialog>
    </CarbonProvider>
  );
};
UsingHandle.storyName = "Using Handle";

export const TopModalOverride: Story = () => {
  const [isOpenAll, setIsOpenAll] = useState(defaultOpenState);
  const [isOpenDialog1, setIsOpenDialog1] = useState(true);
  const [isOpenDialog2, setIsOpenDialog2] = useState(true);
  const [isOpenDialog3, setIsOpenDialog3] = useState(true);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpenAll(true);
          setIsOpenDialog1(true);
          setIsOpenDialog2(true);
          setIsOpenDialog3(true);
        }}
      >
        Open dialogs
      </Button>
      <Dialog
        open={isOpenDialog1 && isOpenAll}
        onCancel={() => setIsOpenDialog1(false)}
        title="I rendered first"
        subtitle="Yet I am not the bottom modal"
        topModalOverride
      >
        <Textbox label="First Name" />
        <Textbox label="Middle Name" />
      </Dialog>
      <Dialog
        open={isOpenDialog2 && isOpenAll}
        onCancel={() => setIsOpenDialog2(false)}
        title="I rendered second"
        subtitle="Yet I am the top modal"
        topModalOverride
      >
        <Textbox label="First Name" />
        <Textbox label="Middle Name" />
      </Dialog>
      <Dialog
        open={isOpenDialog3 && isOpenAll}
        onCancel={() => setIsOpenDialog3(false)}
        title="I rendered last"
        subtitle="Yet I am the bottom modal"
      >
        <Textbox label="First Name" />
        <Textbox label="Middle Name" />
      </Dialog>
    </>
  );
};
TopModalOverride.storyName = "Top Modal Override";

export const GreyBackground: Story = {
  ...DefaultStory,
  name: "Grey Background",
  args: {
    ...DefaultStory.args,
    greyBackground: true,
  },
};

export const HighlightVariant: Story = {
  ...DefaultStory,
  name: "With Highlight Variant",
  args: {
    ...DefaultStory.args,
    highlightVariant: "ai",
  },
};

export const FullScreenDefault: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Open Dialog
      </Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setTimeout(() => buttonRef.current?.focus(), 0);
        }}
        title="Title"
        subtitle="Subtitle"
      >
        <Form
          // stickyFooter
          leftSideButtons={
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Box>
            This is an example of a full screen Dialog with a Form as content
          </Box>
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
        </Form>
      </Dialog>
    </>
  );
};
FullScreenDefault.storyName = "Fullscreen: Default";
FullScreenDefault.parameters = { chromatic: { disableSnapshot: true } };
