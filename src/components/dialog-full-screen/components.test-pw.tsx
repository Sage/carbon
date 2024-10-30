import React, { useState, useRef, useEffect } from "react";
import DialogFullScreen, { DialogFullScreenProps } from ".";
import Dialog from "../dialog";
import Button from "../button";
import Form from "../form";
import Textbox from "../textbox";
import Pill from "../pill";
import Box from "../box";
import CarbonProvider from "../carbon-provider";
import Toast from "../toast";
import { Accordion } from "../accordion";
import useMediaQuery from "../../hooks/useMediaQuery";
import Typography from "../typography";
import Drawer from "../drawer/drawer.component";
import { Tabs, Tab } from "../tabs";
import Link from "../link";
import Icon from "../icon";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import { Dl, Dt, Dd } from "../definition-list";
import Sidebar from "../sidebar";
import { Select, Option } from "../select";

const mainDialogTitle = "Main Dialog";
const nestedDialogTitle = "Nested Dialog";

export const DialogFullScreenComponent = ({
  children = "This is an example",
  open = true,
  ...props
}: Partial<DialogFullScreenProps>) => {
  const [isOpen, setIsOpen] = useState(open);
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Dialog Full Screen</Button>
      <DialogFullScreen
        focusFirstElement={ref}
        open={isOpen}
        showCloseIcon
        title="Dialog Full Screen"
        aria-label="aria-label"
        onCancel={() => setIsOpen(false)}
        {...props}
      >
        <Button onClick={() => setIsOpen(false)}>Not focused</Button>
        <Button ref={ref} onClick={() => setIsOpen(false)}>
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

export const DialogFullScreenBackgroundScrollTestComponent = () => {
  return (
    <DialogFullScreen open onCancel={() => {}}>
      <Textbox label="textbox" />
      <Box height="2000px" position="relative">
        <Box height="100px" position="absolute" bottom="0px">
          I should not be scrolled into view
        </Box>
      </Box>
    </DialogFullScreen>
  );
};

export const DialogFullScreenBackgroundScrollWithOtherFocusableContainers = () => {
  const toast1Ref = useRef(null);
  const toast2Ref = useRef(null);
  return (
    <Form>
      <DialogFullScreen
        open
        onCancel={() => {}}
        focusableContainers={[toast1Ref, toast2Ref]}
      >
        <Textbox label="textbox" />
        <Box height="2000px" position="relative">
          <Box height="100px" position="absolute" bottom="0px">
            I should not be scrolled into view
          </Box>
        </Box>
      </DialogFullScreen>
      <Toast open onDismiss={() => {}} ref={toast1Ref} targetPortalId="stacked">
        Toast message 1
      </Toast>
      <Toast open onDismiss={() => {}} ref={toast2Ref} targetPortalId="stacked">
        Toast message 2
      </Toast>
    </Form>
  );
};

export const WithHelp = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open DialogFullScreen</Button>
      <DialogFullScreen
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

export const WithHideableHeaderChildren = () => {
  const [isOpen, setIsOpen] = useState(false);
  const aboveBreakpoint = useMediaQuery("(min-width: 568px)");
  const verticalMargin = aboveBreakpoint ? "26px" : 0;
  const HeaderChildrenAboveBreakpoint = (
    <div style={{ margin: `${verticalMargin} 0 26px` }}>
      <Pill fill>A pill</Pill>
      <Pill fill ml={2} mr={1}>
        Another pill
      </Pill>
    </div>
  );
  const HeaderChildrenBelowBreakpoint = (
    <Accordion
      title="More info"
      openTitle="Less info"
      scheme="transparent"
      borders="none"
      aria-label="aria-label"
      disableContentPadding
      buttonHeading
      buttonWidth="120px"
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

export const WithBox = () => {
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

export const FocusingADifferentFirstElement = () => {
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
      >
        <p>Focus an element that doesnt support autofocus</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "150px",
          }}
        >
          <Button onClick={() => setIsOpenOne(false)}>Not focused</Button>
          <Button ref={ref} onClick={() => setIsOpenOne(false)}>
            This should be focused first now
          </Button>
        </div>
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
        <p>Focus an element that supports autoFocus</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            height: "150px",
          }}
        >
          <Button onClick={() => setIsOpenTwo(false)}>Not focused</Button>
          <Button onClick={() => setIsOpenTwo(false)}>Not focused</Button>
        </div>
        <Textbox label="This should be focused first now" autoFocus />
      </DialogFullScreen>
    </>
  );
};

export const OtherFocusableContainers = () => {
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

export const DialogFullScreenWithTitleAsReactComponent = (
  props: Partial<DialogFullScreenProps>
) => {
  const TitleComponent = () => (
    <div>
      <span>Row1</span>
      <span>Row2</span>
    </div>
  );
  return (
    <DialogFullScreen
      open
      title={<TitleComponent />}
      onCancel={() => {}}
      {...props}
    >
      <Textbox label="textbox" />
    </DialogFullScreen>
  );
};

export const WithComplexExample = () => {
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
      >
        <Drawer sidebar={SidebarContent}>
          <Box p={5}>{showCorrectContent()}</Box>
        </Drawer>
      </DialogFullScreen>
    </Box>
  );
};

export const TopModalOverride = () => {
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
      <DialogFullScreen
        open={isOpenDialogFullScreen}
        onCancel={() => setIsOpenDialogFullScreen(false)}
        title="Dialog fullscreen"
        topModalOverride
      >
        <Textbox label="Fullscreen textbox" />
      </DialogFullScreen>
      <Dialog
        open={isOpenDialog}
        onCancel={() => setIsOpenDialog(false)}
        title="Dialog"
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

export const DialogFullScreenWithAutoFocusSelect = () => {
  return (
    <DialogFullScreen open title="My dialog" onCancel={() => {}}>
      <Select autoFocus label="select">
        <Option value="1" text="one" />
      </Select>
      <Textbox label="textbox" />
    </DialogFullScreen>
  );
};

export const DialogFSComponentFocusableSelectors = (
  props: Partial<DialogFullScreenProps>
) => {
  const [setIsDialogOpen] = React.useState(false);
  const [isToastOpen, setIsToastOpen] = React.useState(false);
  const toastRef = React.useRef(null);
  const CUSTOM_SELECTOR = "button, .focusable-container input";
  return (
    <>
      <DialogFullScreen
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
      </DialogFullScreen>
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
