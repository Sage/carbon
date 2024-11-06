import React, { useEffect, useRef, useState } from "react";

import Dialog from ".";
import type { DialogHandle, DialogProps } from ".";

import Textbox from "../textbox";
import Button from "../button";
import Toast from "../toast";
import Box from "../box";
import DialogFullScreen from "../dialog-full-screen";
import Sidebar from "../sidebar";
import { Select, Option } from "../select";
import Typography from "../typography";
import Loader from "../loader";
import Form from "../form";
import RadioButton, { RadioButtonGroup } from "../radio-button";
import isChromatic from "../../../.storybook/isChromatic";
import CarbonProvider from "../carbon-provider";
import Textarea from "../textarea";
import Fieldset from "../../__internal__/fieldset";
import useMediaQuery from "../../hooks/useMediaQuery";

const defaultOpenState = isChromatic();

export const DialogComponent = (props: Partial<DialogProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog
      open={isOpen}
      title="My dialog"
      showCloseIcon
      onCancel={() => setIsOpen(false)}
      {...props}
    >
      <Textbox label="Textbox1" value="Textbox1" />
      <Textbox label="Textbox2" value="Textbox2" />
      <Textbox label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogWithFirstFocusableElement = (
  props: Partial<DialogProps>,
) => {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <Dialog open title="My dialog" focusFirstElement={ref} {...props}>
      <Button ref={ref} onClick={() => {}}>
        Press me
      </Button>
      <Textbox label="Textbox1" value="Textbox1" />
      <Textbox label="Textbox2" value="Textbox2" />
      <Textbox label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

export const DialogWithToast = () => {
  const toastRef = useRef<HTMLDivElement>(null);
  const [openToast, setOpenToast] = useState(false);
  return (
    <>
      <Toast
        ref={toastRef}
        open={openToast}
        onDismiss={() => setOpenToast(false)}
      >
        Toast message 1
      </Toast>
      <Dialog open title="My dialog">
        <Button onClick={() => setOpenToast(true)}>Open Toast</Button>
      </Dialog>
    </>
  );
};

export const DialogBackgroundScrollTest = () => {
  return (
    <Box height="2000px" position="relative">
      <Box height="100px" position="absolute" bottom="0px">
        I should not be scrolled into view
      </Box>
      <Dialog open title="My dialog" onCancel={() => {}}>
        <Textbox label="textbox" />
      </Dialog>
    </Box>
  );
};

export const DialogWithOpenToastsBackgroundScrollTest = () => {
  const toast1Ref = useRef<HTMLDivElement>(null);
  const toast2Ref = useRef<HTMLDivElement>(null);
  return (
    <Box height="2000px" position="relative">
      <Box height="100px" position="absolute" bottom="0px">
        I should not be scrolled into view
      </Box>
      <Dialog
        open
        title="My dialog"
        onCancel={() => {}}
        focusableContainers={[toast1Ref, toast2Ref]}
      >
        <Textbox label="textbox" />
      </Dialog>
      <Toast open onDismiss={() => {}} ref={toast1Ref} targetPortalId="stacked">
        Toast message 1
      </Toast>
      <Toast open onDismiss={() => {}} ref={toast2Ref} targetPortalId="stacked">
        Toast message 2
      </Toast>
    </Box>
  );
};

export const TopModalOverride = () => {
  const [isOpenDialogFullSreen, setIsOpenDialogFullSreen] = useState(true);
  const [isOpenDialog, setIsOpenDialog] = useState(true);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpenSidebar(true);
    }, 10);
  }, []);

  return (
    <>
      <DialogFullScreen
        open={isOpenDialogFullSreen}
        onCancel={() => setIsOpenDialogFullSreen(false)}
        title="Dialog fullscreen"
      >
        <Textbox label="Fullscreen textbox" />
      </DialogFullScreen>
      <Dialog
        open={isOpenDialog}
        onCancel={() => setIsOpenDialog(false)}
        title="Dialog"
        topModalOverride
      >
        <Textbox label="Dialog textbox" />
      </Dialog>
      <Sidebar
        open={isOpenSidebar}
        onCancel={() => setIsOpenSidebar(false)}
        header="sidebar"
      >
        <Textbox label="Sidebar textbox" />
      </Sidebar>
    </>
  );
};

export const DialogWithAutoFocusSelect = () => {
  return (
    <Dialog open title="My dialog" onCancel={() => {}}>
      <Select autoFocus label="select">
        <Option value="1" text="one" />
      </Select>
      <Textbox label="textbox" />
    </Dialog>
  );
};

export const DialogComponentFocusableSelectors = (
  props: Partial<DialogProps>,
) => {
  const [setIsDialogOpen] = React.useState(false);
  const [isToastOpen, setIsToastOpen] = React.useState(false);
  const toastRef = React.useRef(null);
  const CUSTOM_SELECTOR = "button, .focusable-container input";
  return (
    <>
      <Dialog
        open
        onCancel={() => setIsDialogOpen}
        title="Dialog Title"
        focusableContainers={[toastRef]}
        focusableSelectors={CUSTOM_SELECTOR}
        {...props}
      >
        <Box className="focusable-container">
          <Textbox label="First Name" />
        </Box>
        <Box>
          <Textbox label="Surname" />
        </Box>
        <Box className="focusable-container">
          <Button
            buttonType="primary"
            data-element="open-toast"
            onClick={() => setIsToastOpen(true)}
          >
            Show toast
          </Button>
        </Box>
      </Dialog>
      <Toast
        open={isToastOpen}
        onDismiss={() => setIsToastOpen(false)}
        ref={toastRef}
        targetPortalId="stacked"
        data-element="toast"
      >
        Toast Message
      </Toast>
    </>
  );
};

export const DefaultStory = ({
  open = defaultOpenState,
}: {
  open?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
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

export const DefaultNestedStory = () => {
  const [isFirstDialogOpen, setIsFirstDialogOpen] = useState(false);
  const [isNestedDialogOpen, setIsNestedDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsFirstDialogOpen(true)}>
        Open First Dialog
      </Button>
      <Dialog
        open={isFirstDialogOpen}
        onCancel={() => setIsFirstDialogOpen(false)}
        title="First Dialog"
      >
        <Button onClick={() => setIsNestedDialogOpen(true)}>
          Open Nested Dialog
        </Button>
        <Dialog
          open={isNestedDialogOpen}
          onCancel={() => setIsNestedDialogOpen(false)}
          title="Nested Dialog"
        >
          <Textbox label="Nested Dialog Textbox" />
        </Dialog>
      </Dialog>
    </>
  );
};

export const Editable = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [isDisabled, setIsDisabled] = useState(true);
  const [radioValue, setRadioValue] = useState("1");

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Add an address"
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
          <Typography variant="h2" mb="32px">
            Basic details
          </Typography>
          <Button onClick={() => setIsDisabled(!isDisabled)}>
            {isDisabled ? "Activate" : "Disable"} Address
          </Button>
          <RadioButtonGroup
            name="mybuttongroup"
            legend="How do you want to create this address?"
            legendInline
            onChange={({ target }) => setRadioValue(target.value)}
            value={radioValue}
            legendWidth={40}
          >
            <RadioButton
              value="1"
              label="Create a new Address"
              size="large"
              disabled={isDisabled}
            />
            <RadioButton
              value="2"
              label="Select an Existing address"
              size="large"
              disabled={isDisabled}
            />
          </RadioButtonGroup>
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

export const WithHelp = () => {
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

export const LoadingContent = () => {
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

export const FocusingADifferentFirstElement = () => {
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

export const OverridingContentPadding = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Title"
        subtitle="Subtitle"
        contentPadding={{ p: 0 }}
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

export const OtherFocusableContainers = () => {
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

export const Responsive = () => {
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

export const UsingHandle = () => {
  const dialogHandle = useRef<DialogHandle>(null);

  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setIsSubmitted(true);
    dialogHandle.current?.focus();
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
            />
          </Form>
        )}
      </Dialog>
    </CarbonProvider>
  );
};
