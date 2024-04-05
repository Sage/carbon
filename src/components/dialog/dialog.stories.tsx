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
import { RadioButton, RadioButtonGroup } from "../radio-button";
import Loader from "../loader";
import Toast from "../toast";
import Textarea from "../textarea";
import CarbonProvider from "../carbon-provider";
import useMediaQuery from "../../hooks/useMediaQuery";

import type { DialogHandle } from ".";
import Dialog from ".";

const defaultOpenState = isChromatic();

const meta: Meta<typeof Dialog> = {
  title: "Dialog",
  component: Dialog,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    controls: { disable: true },
    chromatic: {
      modes: {
        desktop: allModes.chromatic,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        {defaultOpenState ? (
          <Box width="100%" height={900}>
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

export const DefaultStory: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
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
          height="500px"
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
DefaultStory.storyName = "Default";

export const Editable: Story = () => {
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
          height="500px"
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
Editable.storyName = "Editable";
Editable.parameters = { chromatic: { disableSnapshot: true } };

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
          height="500px"
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
          <Button forwardRef={ref} onClick={() => setIsOpenOne(false)}>
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

export const OverridingContentPadding: Story = () => {
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
          height="500px"
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
OverridingContentPadding.storyName = "Overriding Content Padding";

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
          height="500px"
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

export const GreyBackground: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Title"
        subtitle="Subtitle"
        greyBackground
      >
        <Form
          stickyFooter
          height="500px"
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
GreyBackground.storyName = "Grey Background";
