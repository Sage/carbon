import React, { useState, useRef } from "react";
import { action } from "@storybook/addon-actions";

import DialogFullScreen from ".";
import { Accordion } from "../accordion";
import Box from "../box";
import Button from "../button";
import Form from "../form";
import Textbox from "../textbox";
import Pill from "../../components/pill";
import Drawer from "../drawer/drawer.component";
import { Tabs, Tab } from "../tabs";
import useMediaQuery from "../../hooks/useMediaQuery";
import Link from "../link";
import IconButton from "../icon-button/icon-button.component";
import Icon from "../icon";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import Typography from "../typography";
import { Dl, Dt, Dd } from "../definition-list";
import Toast from "../toast";
import isChromatic from "../../../.storybook/isChromatic";

const defaultOpenState = isChromatic();

export const Default = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open DialogFullScreen</Button>
      <DialogFullScreen
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
      </DialogFullScreen>
    </>
  );
};
Default.parameters = { chromatic: { disable: true } };

export const WithComplexExample = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
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
  const isLargerScreen = useMediaQuery("(min-width: 411px)");

  const HeaderChildren = (
    <Box margin={`${isLargerScreen ? "26px" : 0} 0px`}>
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
                <IconButton onAction={() => {}} aria-label="flag-button">
                  <Icon type="flag" />
                </IconButton>
                <ActionPopover>
                  <ActionPopoverItem onClick={() => {}}>
                    Example Item
                  </ActionPopoverItem>
                </ActionPopover>
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
                <IconButton onAction={() => {}} aria-label="flag-button">
                  <Icon type="flag" />
                </IconButton>
                <ActionPopover>
                  <ActionPopoverItem onClick={() => {}}>
                    Example Item
                  </ActionPopoverItem>
                </ActionPopover>
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
                <IconButton onAction={() => {}} aria-label="flag-button">
                  <Icon type="flag" />
                </IconButton>
                <ActionPopover>
                  <ActionPopoverItem onClick={() => {}}>
                    Example Item
                  </ActionPopoverItem>
                </ActionPopover>
              </Box>
            </Box>
          }
        >
          Content for tab 3
        </Tab>
      </Tabs>
      <Button
        ml={setCorrectPadding()}
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
                <IconButton onAction={() => {}} aria-label="flag-button">
                  <Icon type="flag" />
                </IconButton>
                <ActionPopover>
                  <ActionPopoverItem onClick={() => {}}>
                    Example Item
                  </ActionPopoverItem>
                </ActionPopover>
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
                  <Typography fontWeight="bold">Example text</Typography>
                </Box>
                <IconButton onAction={() => {}} aria-label="flag-button">
                  <Icon type="flag" />
                </IconButton>
                <ActionPopover>
                  <ActionPopoverItem onClick={() => {}}>
                    Example Item
                  </ActionPopoverItem>
                </ActionPopover>
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
                <ActionPopover>
                  <ActionPopoverItem onClick={() => {}}>
                    Example Item
                  </ActionPopoverItem>
                </ActionPopover>
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
        <Box>Example Product Content</Box>
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
        <Box>Example Product Content</Box>
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
        <Box>Example Product Content</Box>
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
    action("cancel")();
  };
  const handleOpen = () => {
    setIsOpen(true);
    action("open")();
  };

  return (
    <Box>
      <Button onClick={handleOpen}>Open DialogFullScreen</Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={handleCancel}
        title="Dialog Title"
        subtitle="Dialog subtitle"
        headerChildren={HeaderChildren}
        enableBackgroundUI={false}
        disableEscKey={false}
        showCloseIcon
        disableContentPadding
        {...props}
      >
        <Drawer sidebar={SidebarContent}>
          <Box p={5}>{showCorrectContent()}</Box>
        </Drawer>
      </DialogFullScreen>
    </Box>
  );
};

export const WithDisableContentPadding = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open DialogFullScreen</Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Title"
        subtitle="Subtitle"
        disableContentPadding
        {...props}
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
          <Box>
            This is an example of a full screen Dialog with a Form as content
          </Box>
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
WithDisableContentPadding.parameters = { chromatic: { disable: true } };

export const WithHeaderChildren = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const isLargeScreen = useMediaQuery("(min-width: 568px)");

  const HeaderChildren = (
    <Box margin={`${isLargeScreen ? "26px" : 0} 0 26px`}>
      <Pill fill>A pill</Pill>
      <Pill fill ml={2} mr={1}>
        Another pill
      </Pill>
    </Box>
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
        {...props}
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
          <Box>
            This is an example of a full screen Dialog with a Form as content
          </Box>
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
WithDisableContentPadding.parameters = { viewports: [500, 1400] };

export const WithHelp = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open DialogFullScreen</Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="An example of a long header"
        subtitle="Subtitle"
        help="Some help text"
        {...props}
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
          <Box>
            This is an example of a full screen Dialog with a Form as content
          </Box>
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

export const WithHideableHeaderChildren = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 568px)");

  const HeaderChildrenLargeScreenView = (
    <Box margin="26px 0 26px">
      <Pill fill>A pill</Pill>
      <Pill fill ml={2} mr={1}>
        Another pill
      </Pill>
    </Box>
  );
  const HeaderChildrenSmallScreenView = (
    <Accordion
      title="More info"
      openTitle="Less info"
      scheme="transparent"
      borders="none"
      disableContentPadding
      buttonHeading
      buttonWidth={120}
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
      <Button onClick={() => setIsOpen(true)}>Open DialogFullScreen</Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="An example of a long header"
        subtitle="Subtitle"
        headerChildren={
          isLargeScreen
            ? HeaderChildrenLargeScreenView
            : HeaderChildrenSmallScreenView
        }
        {...props}
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
          <Box>
            This is an example of a full screen Dialog with a Form as content
          </Box>
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
WithHideableHeaderChildren.parameters = { chromatic: { disable: true } };

export const WithBox = ({ ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open DialogFullScreen</Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Title"
        subtitle="Subtitle"
        {...props}
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
            <Box>
              This is an example of a full screen Dialog with a Form as content
            </Box>
            <Textbox label="First Name" />
            <Textbox label="Middle Name" />
            <Textbox label="Surname" />
            <Textbox label="Birth Place" />
            <Textbox label="Favourite Colour" />
            <Textbox label="Address" />
          </Form>
        </Box>
      </DialogFullScreen>
    </>
  );
};
WithBox.parameters = { chromatic: { disable: true } };

export const FocusingADifferentFirstElement = ({ ...props }) => {
  const [isOpenOne, setIsOpenOne] = useState(false);
  const [isOpenTwo, setIsOpenTwo] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <Button onClick={() => setIsOpenOne(true)}>
        Open Demo using focusFirstElement
      </Button>
      <DialogFullScreen
        focusFirstElement={ref}
        open={isOpenOne}
        onCancel={() => setIsOpenOne(false)}
        title="Title"
        subtitle="Subtitle"
        {...props}
      >
        <Typography>Focus an element that doesnt support autofocus</Typography>
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
        <Textbox label="Not Focused" />
      </DialogFullScreen>
      <Button ml={2} onClick={() => setIsOpenTwo(true)}>
        Open Demo using autoFocus
      </Button>
      <DialogFullScreen
        disableAutoFocus
        open={isOpenTwo}
        onCancel={() => setIsOpenTwo(false)}
        title="Title"
        subtitle="Subtitle"
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
        <Textbox label="This should be focused first now" autoFocus />
      </DialogFullScreen>
    </>
  );
};
FocusingADifferentFirstElement.parameters = { chromatic: { disable: true } };

export const OtherFocusableContainers = ({ ...props }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isToast1Open, setIsToast1Open] = useState(false);
  const [isToast2Open, setIsToast2Open] = useState(false);
  const toast1Ref = useRef<HTMLDivElement | null>(null);
  const toast2Ref = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <Button onClick={() => setIsDialogOpen(true)}>
        Open DialogFullScreen
      </Button>
      <DialogFullScreen
        open={isDialogOpen}
        onCancel={() => setIsDialogOpen(false)}
        title="Title"
        subtitle="Subtitle"
        focusableContainers={[toast1Ref, toast2Ref]}
        {...props}
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
      </DialogFullScreen>
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
OtherFocusableContainers.parameters = { chromatic: { disable: true } };
