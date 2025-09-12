import React, { useEffect, useRef, useState } from "react";

import Dialog from ".";
import type { DialogHandle, DialogProps } from ".";

import Textbox from "../textbox";
import Button from "../button";
import Toast from "../toast";
import Box from "../box";
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
import Pill from "../pill";
import { Accordion } from "../accordion";
import Drawer from "../drawer/drawer.component";
import { Tabs, Tab } from "../tabs";
import Link from "../link";
import Icon from "../icon";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import { Dl, Dt, Dd } from "../definition-list";

const mainDialogTitle = "Main Dialog";
const nestedDialogTitle = "Nested Dialog";

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
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
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
      <Textbox onChange={() => {}} label="Textbox1" value="Textbox1" />
      <Textbox onChange={() => {}} label="Textbox2" value="Textbox2" />
      <Textbox onChange={() => {}} label="Textbox3" value="Textbox3" />
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
        <Textbox value="" onChange={() => {}} label="textbox" />
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
        <Textbox value="" onChange={() => {}} label="textbox" />
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
      <Dialog
        fullscreen
        open={isOpenDialogFullSreen}
        onCancel={() => setIsOpenDialogFullSreen(false)}
        title="Dialog fullscreen"
      >
        <Textbox value="" onChange={() => {}} label="Fullscreen textbox" />
      </Dialog>
      <Dialog
        open={isOpenDialog}
        onCancel={() => setIsOpenDialog(false)}
        title="Dialog"
        topModalOverride
      >
        <Textbox value="" onChange={() => {}} label="Dialog textbox" />
      </Dialog>
      <Sidebar
        open={isOpenSidebar}
        onCancel={() => setIsOpenSidebar(false)}
        header="sidebar"
      >
        <Textbox value="" onChange={() => {}} label="Sidebar textbox" />
      </Sidebar>
    </>
  );
};

export const DialogWithAutoFocusSelect = () => {
  return (
    <Dialog open title="My dialog" onCancel={() => {}}>
      <Select autoFocus label="select" value="1" onChange={() => {}}>
        <Option value="1" text="one" />
      </Select>
      <Textbox value="" onChange={() => {}} label="textbox" />
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
          <Textbox value="" onChange={() => {}} label="First Name" />
        </Box>
        <Box>
          <Textbox value="" onChange={() => {}} label="Surname" />
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
  restoreFocusOnClose,
}: {
  open?: boolean;
  restoreFocusOnClose?: boolean;
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
        restoreFocusOnClose={restoreFocusOnClose}
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
          <Textbox value="" onChange={() => {}} label="First Name" />
          <Textbox value="" onChange={() => {}} label="Middle Name" />
          <Textbox value="" onChange={() => {}} label="Surname" />
          <Textbox value="" onChange={() => {}} label="Birth Place" />
          <Textbox value="" onChange={() => {}} label="Favourite Colour" />
          <Textbox value="" onChange={() => {}} label="Address" />
          <Textbox value="" onChange={() => {}} label="First Name" />
          <Textbox value="" onChange={() => {}} label="Middle Name" />
          <Textbox value="" onChange={() => {}} label="Surname" />
          <Textbox value="" onChange={() => {}} label="Birth Place" />
          <Textbox value="" onChange={() => {}} label="Favourite Colour" />
          <Textbox value="" onChange={() => {}} label="Address" />
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
          <Textbox value="" onChange={() => {}} label="Nested Dialog Textbox" />
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
            <Textbox
              value=""
              onChange={() => {}}
              labelInline
              label="Property Name"
            />
            <Fieldset>
              <Textbox
                value=""
                onChange={() => {}}
                labelInline
                label="Address Line 1"
              />
              <Textbox
                value=""
                onChange={() => {}}
                labelInline
                label="Address Line 2"
              />
              <Textbox value="" onChange={() => {}} labelInline label="Town" />
              <Textbox value="" onChange={() => {}} labelInline label="City" />
              <Textbox
                value=""
                onChange={() => {}}
                labelInline
                label="Postcode"
              />
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
            <Textbox
              value=""
              onChange={() => {}}
              labelInline
              label="Property Name"
            />
            <Fieldset>
              <Textbox
                value=""
                onChange={() => {}}
                labelInline
                label="Address Line 1"
              />
              <Textbox
                value=""
                onChange={() => {}}
                labelInline
                label="Address Line 2"
              />
              <Textbox value="" onChange={() => {}} labelInline label="Town" />
              <Textbox value="" onChange={() => {}} labelInline label="City" />
              <Textbox
                value=""
                onChange={() => {}}
                labelInline
                label="Postcode"
              />
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
            <Textbox
              value=""
              onChange={() => {}}
              label="Textbox 1"
              labelInline
              autoFocus
            />
            <Textbox
              value=""
              onChange={() => {}}
              label="Textbox 2"
              labelInline
            />
            <Textbox
              value=""
              onChange={() => {}}
              label="Textbox 3"
              labelInline
            />
            <Textbox
              value=""
              onChange={() => {}}
              label="Textbox 4"
              labelInline
            />
            <Textbox
              value=""
              onChange={() => {}}
              label="Textbox 5"
              labelInline
            />
            <Textbox
              value=""
              onChange={() => {}}
              label="Textbox 6"
              labelInline
            />
            <Textbox
              value=""
              onChange={() => {}}
              label="Textbox 7"
              labelInline
            />
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
        <Textbox value="" onChange={() => {}} label="Not focused" />
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
        <Textbox
          value=""
          onChange={() => {}}
          autoFocus
          label="This should be focused first now"
        />
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
          <Textbox value="" onChange={() => {}} label="First Name" />
          <Textbox value="" onChange={() => {}} label="Middle Name" />
          <Textbox value="" onChange={() => {}} label="Surname" />
          <Textbox value="" onChange={() => {}} label="Birth Place" />
          <Textbox value="" onChange={() => {}} label="Favourite Colour" />
          <Textbox value="" onChange={() => {}} label="Address" />
          <Textbox value="" onChange={() => {}} label="First Name" />
          <Textbox value="" onChange={() => {}} label="Middle Name" />
          <Textbox value="" onChange={() => {}} label="Surname" />
          <Textbox value="" onChange={() => {}} label="Birth Place" />
          <Textbox value="" onChange={() => {}} label="Favourite Colour" />
          <Textbox value="" onChange={() => {}} label="Address" />
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
          <Textbox value="" onChange={() => {}} label="First Name" />
          <Textbox value="" onChange={() => {}} label="Middle Name" />
          <Textbox value="" onChange={() => {}} label="Surname" />
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
          <Textbox value="" onChange={() => {}} label="First Name" />
          <Textbox value="" onChange={() => {}} label="Middle Name" />
          <Textbox value="" onChange={() => {}} label="Surname" />
          <Textbox value="" onChange={() => {}} label="Birth Place" />
          <Textbox value="" onChange={() => {}} label="Favourite Colour" />
          <Textbox value="" onChange={() => {}} label="Address" />
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
              value=""
              onChange={() => {}}
            />
          </Form>
        )}
      </Dialog>
    </CarbonProvider>
  );
};

export const FullScreenDialogComponent = ({
  children = "This is an example",
  contentPadding,
  open = true,
  ...props
}: Partial<DialogProps>) => {
  const [isOpen, setIsOpen] = useState(open);
  const ref = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog Full Screen</Button>
      <Dialog
        fullscreen
        focusFirstElement={ref}
        open={isOpen}
        showCloseIcon
        title="Full Screen Dialog"
        aria-label="aria-label"
        onCancel={() => setIsOpen(false)}
        contentPadding={contentPadding}
        {...props}
      >
        <Button onClick={() => setIsOpen(false)}>Not focused</Button>
        <Button ref={ref} onClick={() => setIsOpen(false)}>
          This should be focused first now
        </Button>

        <Textbox label="Textbox1" value="Textbox1" onChange={() => {}} />
        <Textbox label="Textbox2" value="Textbox2" onChange={() => {}} />
        <Textbox label="Textbox3" value="Textbox3" onChange={() => {}} />
        <Form>{children}</Form>
      </Dialog>
    </>
  );
};

export const FullScreenNestedDialog = ({ ...props }: Partial<DialogProps>) => {
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
      <Dialog
        open={mainDialogOpen}
        onCancel={handleMainDialogCancel}
        title={mainDialogTitle}
        fullscreen
        {...props}
      >
        <Button onClick={handleNestedDialogOpen}>Open Nested Dialog</Button>
        <Dialog
          open={nestedDialogOpen}
          onCancel={handleNestedDialogCancel}
          title={nestedDialogTitle}
        >
          Nested Dialog Content
        </Dialog>
      </Dialog>
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
          <Dialog
            fullscreen
            title="Full Screen Dialog"
            open={isModal1Open}
            onCancel={() => setIsModal1Open(false)}
          >
            This is Modal 1
            <Button onClick={() => setIsModal2Open(true)}>Open Modal 2</Button>
          </Dialog>
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

export const FullScreenWithHeaderChildren = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const HeaderChildren = (
    <Box margin="$min-width: 568px 0 26px">
      <Pill fill>A pill</Pill>
      <Pill fill ml={2} mr={1}>
        Another pill
      </Pill>
    </Box>
  );
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="An example of a long header"
        subtitle="Subtitle"
        aria-label="aria-label"
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
          <Textbox label="First Name" onChange={() => {}} value="" />
          <Textbox label="Middle Name" onChange={() => {}} value="" />
          <Textbox label="Surname" onChange={() => {}} value="" />
          <Textbox label="Birth Place" onChange={() => {}} value="" />
          <Textbox label="Favourite Colour" onChange={() => {}} value="" />
          <Textbox label="Address" onChange={() => {}} value="" />
        </Form>
      </Dialog>
    </>
  );
};

export const FullScreenBackgroundScrollTestComponent = () => {
  return (
    <Dialog fullscreen open onCancel={() => {}}>
      <Textbox label="textbox" onChange={() => {}} value="" />
      <Box height="2000px" position="relative">
        <Box height="100px" position="absolute" bottom="0px">
          I should not be scrolled into view
        </Box>
      </Box>
    </Dialog>
  );
};

export const FullScreenBackgroundScrollWithOtherFocusableContainers = () => {
  const toast1Ref = useRef(null);
  const toast2Ref = useRef(null);
  return (
    <Form>
      <Dialog
        fullscreen
        open
        onCancel={() => {}}
        focusableContainers={[toast1Ref, toast2Ref]}
      >
        <Textbox label="textbox" onChange={() => {}} value="" />
        <Box height="2000px" position="relative">
          <Box height="100px" position="absolute" bottom="0px">
            I should not be scrolled into view
          </Box>
        </Box>
      </Dialog>
      <Toast open onDismiss={() => {}} ref={toast1Ref} targetPortalId="stacked">
        Toast message 1
      </Toast>
      <Toast open onDismiss={() => {}} ref={toast2Ref} targetPortalId="stacked">
        Toast message 2
      </Toast>
    </Form>
  );
};

export const FullScreenWithHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="An example of a long header"
        subtitle="Subtitle"
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
          <div>
            This is an example of a full screen Dialog with a Form as content
          </div>
          <Textbox label="First Name" onChange={() => {}} value="" />
          <Textbox label="Middle Name" onChange={() => {}} value="" />
          <Textbox label="Surname" onChange={() => {}} value="" />
          <Textbox label="Birth Place" onChange={() => {}} value="" />
          <Textbox label="Favourite Colour" onChange={() => {}} value="" />
          <Textbox label="Address" onChange={() => {}} value="" />
        </Form>
      </Dialog>
    </>
  );
};

export const FullScreenWithHideableHeaderChildren = () => {
  const [isOpen, setIsOpen] = useState(false);
  const aboveBreakpoint = useMediaQuery("(min-width: 568px)");
  const verticalMargin = aboveBreakpoint ? "26px" : 0;
  const HeaderChildrenAboveBreakpoint = (
    <Box margin={`$min-width: ${verticalMargin} 0 26px`}>
      <Pill fill>A pill</Pill>
      <Pill fill ml={2} mr={1}>
        Another pill
      </Pill>
    </Box>
  );
  const HeaderChildrenBelowBreakpoint = (
    <Accordion
      title="More info"
      openTitle="Less info"
      borders="none"
      aria-label="aria-label"
      disableContentPadding
      ml="-13px"
    >
      <Box py="16px" pl="14px">
        <Pill fill>A pill</Pill>
        <Pill fill ml={2} mr={1}>
          Another pill
        </Pill>
      </Box>
    </Accordion>
  );
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="An example of a long header"
        subtitle="Subtitle"
        headerChildren={
          aboveBreakpoint
            ? HeaderChildrenAboveBreakpoint
            : HeaderChildrenBelowBreakpoint
        }
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
          <Textbox label="First Name" onChange={() => {}} value="" />
          <Textbox label="Middle Name" onChange={() => {}} value="" />
          <Textbox label="Surname" onChange={() => {}} value="" />
          <Textbox label="Birth Place" onChange={() => {}} value="" />
          <Textbox label="Favourite Colour" onChange={() => {}} value="" />
          <Textbox label="Address" onChange={() => {}} value="" />
        </Form>
      </Dialog>
    </>
  );
};

export const FullScreenWithBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Title"
        subtitle="Subtitle"
      >
        <Box p="0px 40px">
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
            <Textbox label="First Name" onChange={() => {}} value="" />
            <Textbox label="Middle Name" onChange={() => {}} value="" />
            <Textbox label="Surname" onChange={() => {}} value="" />
            <Textbox label="Birth Place" onChange={() => {}} value="" />
            <Textbox label="Favourite Colour" onChange={() => {}} value="" />
            <Textbox label="Address" onChange={() => {}} value="" />
          </Form>
        </Box>
      </Dialog>
    </>
  );
};

export const FullScreenFocusingADifferentFirstElement = () => {
  const [isOpenOne, setIsOpenOne] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <Button onClick={() => setIsOpenOne(true)}>
        Open Demo using focusFirstElement
      </Button>
      <Dialog
        fullscreen
        focusFirstElement={ref}
        open={isOpenOne}
        onCancel={() => setIsOpenOne(false)}
        title="Title"
        subtitle="Subtitle"
      >
        <p>Focus an element that doesnt support autofocus</p>
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
        <Textbox label="Not Focused" onChange={() => {}} value="" />
      </Dialog>
      <Button ml={2} onClick={() => setIsOpenTwo(true)}>
        Open Demo using autoFocus
      </Button>
      <Dialog
        fullscreen
        disableAutoFocus
        open={isOpenTwo}
        onCancel={() => setIsOpenTwo(false)}
        title="Title"
        subtitle="Subtitle"
      >
        <p>Focus an element that supports autoFocus</p>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-around"
          height="150px"
        >
          <Button onClick={() => setIsOpenTwo(false)}>Not focused</Button>
          <Button onClick={() => setIsOpenTwo(false)}>Not focused</Button>
        </Box>
        <Textbox
          label="This should be focused first now"
          autoFocus
          onChange={() => {}}
          value=""
        />
      </Dialog>
    </>
  );
};

export const FullScreenOtherFocusableContainers = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isToast1Open, setIsToast1Open] = useState(false);
  const [isToast2Open, setIsToast2Open] = useState(false);
  const toast1Ref = useRef<HTMLDivElement | null>(null);
  const toast2Ref = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>Open Dialog</Button>
      <Dialog
        fullscreen
        open={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        title="Title"
        subtitle="Subtitle"
        focusableContainers={[toast1Ref, toast2Ref]}
      >
        <Form
          stickyFooter
          height="500px"
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
          <Textbox label="First Name" onChange={() => {}} value="" />
          <Textbox label="Middle Name" onChange={() => {}} value="" />
          <Textbox label="Surname" onChange={() => {}} value="" />
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

export const FullScreenWithTitleAsReactComponent = (
  props: Partial<DialogProps>,
) => {
  const TitleComponent = () => (
    <div>
      <span>Row1</span>
      <span>Row2</span>
    </div>
  );
  return (
    <Dialog
      fullscreen
      open
      title={<TitleComponent />}
      onCancel={() => {}}
      {...props}
    >
      <Textbox label="textbox" onChange={() => {}} value="" />
    </Dialog>
  );
};

export const FullScreenWithComplexExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("tab-1");
  const padding40 = useMediaQuery("(min-width: 1260px)");
  const padding32 = useMediaQuery("(min-width: 960px)");
  const padding24 = useMediaQuery("(min-width: 600px)");
  const setCorrectPadding = () => {
    if (padding40) {
      return 5;
    }
    if (padding32) {
      return 4;
    }
    if (padding24) {
      return 3;
    }
    return 2;
  };
  const aboveBreakpoint = useMediaQuery("(min-width: 411px)");
  const verticalMargin = aboveBreakpoint ? "26px" : 0;
  const HeaderChildren = (
    <Box margin={`${verticalMargin} 0 26px`}>
      <Box display="flex">
        <Pill fill>A pill</Pill>
        <Pill fill ml={2} mr={1}>
          Another pill
        </Pill>
        <ActionPopover>
          <ActionPopoverItem onClick={() => {}}>Example Item</ActionPopoverItem>
        </ActionPopover>
      </Box>
    </Box>
  );
  const SidebarContent = (
    <Box height="600px">
      <Box pl={setCorrectPadding()}>
        <Typography
          display="block"
          pt={5}
          pb={1}
          textTransform="uppercase"
          variant="b"
        >
          Organisations
        </Typography>
      </Box>
      <Tabs
        onTabChange={(id) => setActiveTab(id)}
        borders="no sides"
        align="left"
        selectedTabId={activeTab}
        position="left"
      >
        <Tab
          tabId="tab-1"
          title="Tab 1"
          key="tab-1"
          customLayout={
            <Box pl={setCorrectPadding()} pr={1} py={1}>
              <Box display="flex">
                <Box flexGrow={1}>
                  <Typography variant="b">Example text</Typography>
                  <Typography mb={0}>Example text without bold</Typography>
                </Box>
                <Icon mt={1} type="flag" />
              </Box>
            </Box>
          }
        >
          Content for tab 1
        </Tab>
        <Tab
          tabId="tab-2"
          title="Tab 2"
          key="tab-2"
          customLayout={
            <Box pl={setCorrectPadding()} pr={1} py={1}>
              <Box display="flex">
                <Box flexGrow={1}>
                  <Typography variant="b">Example text</Typography>
                  <Typography mb={0}>Example text without bold</Typography>
                </Box>
                <Icon mt={1} type="flag" />
              </Box>
            </Box>
          }
        >
          Content for tab 2
        </Tab>
        <Tab
          tabId="tab-3"
          title="Tab 3"
          key="tab-3"
          customLayout={
            <Box pl={setCorrectPadding()} pr={1} py={1}>
              <Box display="flex">
                <Box flexGrow={1}>
                  <Typography variant="b">Example text</Typography>
                  <Typography mb={0}>Example text without bold</Typography>
                </Box>
                <Icon mt={1} type="flag" />
              </Box>
            </Box>
          }
        >
          Content for tab 3
        </Tab>
      </Tabs>
      <Button
        ml={setCorrectPadding()}
        mt={1}
        p={0}
        buttonType="tertiary"
        iconType="plus"
        iconPosition="after"
      >
        Button Tertiary
      </Button>
      <Box pl={setCorrectPadding()}>
        <Typography
          display="block"
          pt={5}
          pb={1}
          textTransform="uppercase"
          variant="b"
        >
          Contacts
        </Typography>
      </Box>
      <Tabs
        onTabChange={(id) => setActiveTab(id)}
        borders="no sides"
        align="left"
        position="left"
        selectedTabId={activeTab}
      >
        <Tab
          tabId="tab-contact-4"
          title="Tab 4"
          key="tab-4"
          customLayout={
            <Box pl={setCorrectPadding()} pr={1} py={2}>
              <Box display="flex">
                <Box flexGrow={1} display="flex">
                  <Typography variant="b" pr={1}>
                    Example text
                  </Typography>
                  <Pill pillRole="status" size="S">
                    Primary
                  </Pill>
                </Box>
                <Icon type="flag" />
              </Box>
            </Box>
          }
        >
          Content for tab 1
        </Tab>
        <Tab
          tabId="tab-contact-5"
          title="Tab 5"
          key="tab-5"
          customLayout={
            <Box pl={setCorrectPadding()} pr={1} py={2}>
              <Box display="flex">
                <Box flexGrow={1}>
                  <Typography variant="b">Example text</Typography>
                </Box>
                <Icon type="flag" />
              </Box>
            </Box>
          }
        >
          Content for tab 2
        </Tab>
        <Tab
          tabId="tab-contact-6"
          title="Tab 6"
          key="tab-6"
          customLayout={
            <Box pl={setCorrectPadding()} pr={1} py={2}>
              <Box display="flex" justifyContent="space-between">
                <Box flexGrow={1}>
                  <Typography variant="b">Example text</Typography>
                </Box>
              </Box>
            </Box>
          }
        >
          Content for tab 3
        </Tab>
      </Tabs>
    </Box>
  );
  const ContentOne = (
    <Box>
      <Accordion
        borders="none"
        title={<Typography variant="h2">Example one details</Typography>}
      >
        <Dl dtTextAlign="right" ddTextAlign="left">
          <Dt>Type</Dt>
          <Dd>Example Type Text</Dd>
          <Dt>Display name</Dt>
          <Dd>Example Display Name</Dd>
          <Dt>Registered name</Dt>
          <Dd>Example Registered Name</Dd>
          <Dt>Email</Dt>
          <Dd>
            <Link href="mailto:example@email.com">example@mail.com </Link>
          </Dd>
          <Dt>Phone</Dt>
          <Dd>
            <Link href="tel: 000 000 000">000 000 000</Link>
          </Dd>
          <Dt>Main and registered address</Dt>
          <Dd>
            <Box>Example Text Address</Box>
            <Box>Example Text Address</Box>
            <Box>Example Text Address</Box>
            <Box>Example Text Address</Box>
            <Box py={2}>
              <Link
                href="https://www.google.com/"
                icon="link"
                iconAlign="right"
              >
                View in Google Maps
              </Link>
            </Box>
          </Dd>
        </Dl>
      </Accordion>
      <Accordion
        borders="none"
        title={<Typography variant="h2">Example one products</Typography>}
      >
        <Box mt={2}>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
      </Accordion>
    </Box>
  );
  const ContentTwo = (
    <Box>
      <Accordion
        borders="none"
        title={<Typography variant="h2">Example two details</Typography>}
      >
        <Dl dtTextAlign="right" ddTextAlign="left">
          <Dt>Type</Dt>
          <Dd>Example Type Text</Dd>
          <Dt>Display name</Dt>
          <Dd>Example Display Name</Dd>
          <Dt>Registered name</Dt>
          <Dd>Example Registered Name</Dd>
          <Dt>Email</Dt>
          <Dd>
            <Link href="mailto:example@email.com">example@mail.com </Link>
          </Dd>
          <Dt>Phone</Dt>
          <Dd>
            <Link href="tel: 000 000 000">000 000 000</Link>
          </Dd>
          <Dt>Main and registered address</Dt>
          <Dd>
            <Box>Example Text Address</Box>
            <Box>Example Text Address</Box>
            <Box>Example Text Address</Box>
            <Box>Example Text Address</Box>
            <Box padding="16px 0">
              <Link
                href="https://www.google.com/"
                icon="link"
                iconAlign="right"
              >
                View in Google Maps
              </Link>
            </Box>
          </Dd>
        </Dl>
      </Accordion>
      <Accordion
        borders="none"
        title={<Typography variant="h2">Example two products</Typography>}
      >
        <Box mt={2}>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
      </Accordion>
    </Box>
  );
  const ContentThree = (
    <Box>
      <Accordion
        borders="none"
        title={<Typography variant="h2">Example three details</Typography>}
      >
        <Dl dtTextAlign="right" ddTextAlign="left">
          <Dt>Type</Dt>
          <Dd>Example Type Text</Dd>
          <Dt>Display name</Dt>
          <Dd>Example Display Name</Dd>
          <Dt>Registered name</Dt>
          <Dd>Example Registered Name</Dd>
          <Dt>Email</Dt>
          <Dd>
            <Link href="mailto:example@email.com">example@mail.com </Link>
          </Dd>
          <Dt>Phone</Dt>
          <Dd>
            <Link href="tel: 000 000 000">000 000 000</Link>
          </Dd>
          <Dt>Main and registered address</Dt>
          <Dd>
            <Box>Example Text Address</Box>
            <Box>Example Text Address</Box>
            <Box>Example Text Address</Box>
            <Box>Example Text Address</Box>
            <Box padding="16px 0">
              <Link
                href="https://www.google.com/"
                icon="link"
                iconAlign="right"
              >
                View in Google Maps
              </Link>
            </Box>
          </Dd>
        </Dl>
      </Accordion>
      <Accordion
        borders="none"
        title={<Typography variant="h2">Example three products</Typography>}
      >
        <Box mt={2}>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
        <Box>Example Product Content</Box>
      </Accordion>
    </Box>
  );
  const showCorrectContent = () => {
    switch (activeTab) {
      case "tab-1":
        return ContentOne;
      case "tab-2":
        return ContentTwo;
      case "tab-3":
        return ContentThree;
      default:
        return "no content provided";
    }
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <Box>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <Dialog
        fullscreen
        open={isOpen}
        onCancel={handleCancel}
        title="Dialog Title"
        subtitle="Dialog subtitle"
        headerChildren={HeaderChildren}
        enableBackgroundUI={false}
        disableEscKey={false}
        showCloseIcon
        contentPadding={{ p: 0 }}
      >
        {/* Without a h2 in the DOM, the a11y checks fail */}
        <Typography variant="h2">A11y Heading Order Fix</Typography>
        <Drawer sidebar={SidebarContent}>
          <Box p={5}>{showCorrectContent()}</Box>
        </Drawer>
      </Dialog>
    </Box>
  );
};

export const FullScreenTopModalOverride = () => {
  const [isOpenDialogFullScreen, setIsOpenDialogFullScreen] = useState(true);
  const [isOpenDialog, setIsOpenDialog] = useState(true);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsOpenSidebar(true);
    }, 10);
  }, []);

  return (
    <>
      <Dialog
        fullscreen
        open={isOpenDialogFullScreen}
        onCancel={() => setIsOpenDialogFullScreen(false)}
        title="Dialog fullscreen"
        topModalOverride
      >
        <Textbox label="Fullscreen textbox" onChange={() => {}} value="" />
      </Dialog>
      <Dialog
        open={isOpenDialog}
        onCancel={() => setIsOpenDialog(false)}
        title="Dialog"
      >
        <Textbox label="Dialog textbox" onChange={() => {}} value="" />
      </Dialog>
      <Sidebar
        open={isOpenSidebar}
        onCancel={() => setIsOpenSidebar(false)}
        header="sidebar"
      >
        <Textbox label="Sidebar textbox" onChange={() => {}} value="" />
      </Sidebar>
    </>
  );
};

export const FullScreenWithAutoFocusSelect = () => {
  return (
    <Dialog fullscreen open title="My dialog" onCancel={() => {}}>
      <Select autoFocus label="select" value={"1"} onChange={() => {}}>
        <Option value="1" text="one" />
      </Select>
      <Textbox label="textbox" onChange={() => {}} value="" />
    </Dialog>
  );
};

export const FullScreenComponentFocusableSelectors = (
  props: Partial<DialogProps>,
) => {
  const [setIsDialogOpen] = React.useState(false);
  const [isToastOpen, setIsToastOpen] = React.useState(false);
  const toastRef = React.useRef(null);
  const CUSTOM_SELECTOR = "button, .focusable-container input";
  return (
    <>
      <Dialog
        fullscreen
        open
        onCancel={() => setIsDialogOpen}
        title="Dialog Title"
        focusableContainers={[toastRef]}
        focusableSelectors={CUSTOM_SELECTOR}
        {...props}
      >
        <Box className="focusable-container">
          <Textbox label="First Name" onChange={() => {}} value="" />
        </Box>
        <Box>
          <Textbox label="Surname" onChange={() => {}} value="" />
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

export const FullScreenMultipleDialogsInDifferentProviders = () => {
  const [isModal1Open, setIsModal1Open] = React.useState(false);
  const [isModal2Open, setIsModal2Open] = React.useState(false);
  return (
    <>
      <CarbonProvider>
        <Box>
          <Button onClick={() => setIsModal1Open(true)}>Open Modal 1</Button>
          <Dialog
            fullscreen
            title="Full Screen Dialog"
            open={isModal1Open}
            onCancel={() => setIsModal1Open(false)}
          >
            This is Modal 1
            <Button onClick={() => setIsModal2Open(true)}>Open Modal 2</Button>
          </Dialog>
        </Box>
      </CarbonProvider>
      <CarbonProvider>
        <Box>
          <Dialog
            title="Modal Dialog"
            open={isModal2Open}
            onCancel={() => setIsModal2Open(false)}
          >
            This is Modal 2
          </Dialog>
        </Box>
      </CarbonProvider>
    </>
  );
};
