import React, { useState, useRef, useEffect, useCallback } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import isChromatic from "../../../.storybook/isChromatic";
import { allModes } from "../../../.storybook/modes";

import { Accordion } from "../accordion";
import Box from "../box";
import Button from "../button";
import Form from "../form";
import Textbox from "../textbox";
import Pill from "../pill";
import Drawer from "../drawer/drawer.component";
import Message from "../message";
import { Tabs, Tab } from "../tabs";
import useMediaQuery from "../../hooks/useMediaQuery";
import addFocusStyling from "../../style/utils/add-focus-styling";
import Link from "../link";
import Icon from "../icon";
import { ActionPopover, ActionPopoverItem } from "../action-popover";
import Typography from "../typography";
import { Dl, Dt, Dd } from "../definition-list";
import Toast from "../toast";
import Hr from "../hr";

import DialogFullScreen from ".";

const defaultOpenState = isChromatic();

const meta: Meta<typeof DialogFullScreen> = {
  title: "Dialog Full Screen",
  component: DialogFullScreen,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
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
type Story = StoryObj<typeof DialogFullScreen>;

export const Default: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Open DialogFullScreen
      </Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setTimeout(() => buttonRef.current?.focus(), 0);
        }}
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
Default.storyName = "Default";
Default.parameters = { chromatic: { disableSnapshot: true } };

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
        Open DialogFullScreen
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
      <DialogFullScreen
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
      </DialogFullScreen>
    </>
  );
};
RestoreFocusOnCloseStory.storyName = "With Restore Focus On Close";
RestoreFocusOnCloseStory.parameters = { chromatic: { disableSnapshot: true } };

export const FocusableOverflowContentStory: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const checkAndSetTabIndex = useCallback(() => {
    const contentContainer = document.querySelector(
      '[data-role="dialog-full-screen-content"]',
    );

    if (contentContainer) {
      const isContentContainerOverflowing =
        contentContainer.scrollHeight > contentContainer.clientHeight ||
        contentContainer.scrollWidth > contentContainer.clientWidth;

      setIsOverflowing(isContentContainerOverflowing);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(checkAndSetTabIndex, 0);

      window.addEventListener("resize", checkAndSetTabIndex);
      return () => {
        window.removeEventListener("resize", checkAndSetTabIndex);
      };
    }

    return () => {};
  }, [isOpen, checkAndSetTabIndex]);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Open DialogFullScreen
      </Button>
      <DialogFullScreen
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setTimeout(() => buttonRef.current?.focus(), 0);
        }}
        title="Title"
        subtitle="Subtitle"
      >
        <style>
          {`.focus-example {
            margin: 20px 0 20px 0;
            &:focus-visible {
            ${addFocusStyling()}
            }`}
        </style>
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
        <div className="focus-example" {...(isOverflowing && { tabIndex: 0 })}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum Contrary to popular belief, Lorem
          Ipsum is not simply random text. It has roots in a piece of classical
          Latin literature from 45 BC, making it over 2000 years old. Richard
          McClintock, a Latin professor at Hampden-Sydney College in Virginia,
          looked up one of the more obscure Latin words, consectetur, from a
          Lorem Ipsum passage, and going through the cites of the word in
          classical literature, discovered the undoubtable source. Lorem Ipsum
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC.
          This book is a treatise on the theory of ethics, very popular during
          the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
          amet..", comes from a line in section 1.10.32. The standard chunk of
          Lorem Ipsum used since the 1500s is reproduced below for those
          interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
          Malorum" by Cicero are also reproduced in their exact original form,
          accompanied by English versions from the 1914 translation by H.
          Rackham. It is a long established fact that a reader will be
          distracted by the readable content of a page when looking at its
          layout. The point of using Lorem Ipsum is that it has a more-or-less
          normal distribution of letters, as opposed to using 'Content here,
          content here', making it look like readable English. Many desktop
          publishing packages and web page editors now use Lorem Ipsum as their
          default model text, and a search for 'lorem ipsum' will uncover many
          web sites still in their infancy. Various versions have evolved over
          the years, sometimes by accident, sometimes on purpose (injected
          humour and the like). There are many variations of passages of Lorem
          Ipsum available, but the majority have suffered alteration in some
          form, by injected humour, or randomised words which don't look even
          slightly believable. If you are going to use a passage of Lorem Ipsum,
          you need to be sure there isn't anything embarrassing hidden in the
          middle of text. All the Lorem Ipsum generators on the Internet tend to
          repeat predefined chunks as necessary, making this the first true
          generator on the Internet. It uses a dictionary of over 200 Latin
          words, combined with a handful of model sentence structures, to
          generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
          is therefore always free from repetition, injected humour, or
          non-characteristic words etc.
        </div>
      </DialogFullScreen>
    </>
  );
};
FocusableOverflowContentStory.storyName = "With Navigable Content Overflow";
FocusableOverflowContentStory.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithComplexExample: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [activeTab1, setActiveTab1] = useState("tab-1");
  const [activeTab2, setActiveTab2] = useState("tab-contact-4");
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
        onTabChange={(id) => setActiveTab1(id)}
        borders="no sides"
        align="left"
        selectedTabId={activeTab1}
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
        onTabChange={(id) => setActiveTab2(id)}
        borders="no sides"
        align="left"
        position="left"
        selectedTabId={activeTab2}
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

  const showCorrectContent1 = () => {
    switch (activeTab1) {
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
  const showCorrectContent2 = () => {
    switch (activeTab2) {
      case "tab-contact-4":
        return "No content to display for tab-4";
      case "tab-contact-5":
        return "No content to display for tab-5";
      case "tab-contact-6":
        return "No content to display for tab-6";
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
      >
        <Drawer sidebar={SidebarContent}>
          <Box p={5}>{showCorrectContent1()}</Box>
          <Hr />
          <Box p={5}>{showCorrectContent2()}</Box>
        </Drawer>
      </DialogFullScreen>
    </Box>
  );
};
WithComplexExample.storyName = "With Complex Example";

export const WithDisableContentPadding: Story = () => {
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
WithDisableContentPadding.storyName = "With Disable Content Padding";
WithDisableContentPadding.parameters = { chromatic: { disableSnapshot: true } };

export const WithHeaderChildren: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const aboveBreakpoint = useMediaQuery("(min-width: 568px)");
  const verticalMargin = aboveBreakpoint ? "26px" : 0;
  const HeaderChildren = (
    <Box margin={`${verticalMargin} 0 26px`}>
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
WithHeaderChildren.storyName = "With Header Children";
WithDisableContentPadding.parameters = { viewports: [500, 1400] };

export const WithHelp: Story = () => {
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
WithHelp.storyName = "With Help";

export const WithHideableHeaderChildren: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  const aboveBreakpoint = useMediaQuery("(min-width: 568px)");
  const verticalMargin = aboveBreakpoint ? "26px" : 0;
  const HeaderChildrenAboveBreakpoint = (
    <Box margin={`${verticalMargin} 0 26px`}>
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
      disableContentPadding
      ml="-13px"
      variant="subtle"
      mb={1}
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
WithHideableHeaderChildren.storyName = "With Hideable Header Children";
WithHideableHeaderChildren.parameters = {
  chromatic: { disableSnapshot: true },
};

export const FocusingADifferentFirstElement: Story = () => {
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
        <p>Focus an element that doesn't support autofocus</p>
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
FocusingADifferentFirstElement.storyName = "Focusing a Different First Element";
FocusingADifferentFirstElement.parameters = {
  chromatic: { disableSnapshot: true },
};

export const OtherFocusableContainers: Story = () => {
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
OtherFocusableContainers.storyName = "Other Focusable Containers";
OtherFocusableContainers.parameters = { chromatic: { disableSnapshot: true } };

export const TopModalOverride = () => {
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
      <DialogFullScreen
        open={isOpenDialog1 && isOpenAll}
        onCancel={() => setIsOpenDialog1(false)}
        title="I rendered first"
        subtitle="Yet I am not the bottom modal"
        topModalOverride
      >
        <Textbox label="First Name" />
        <Textbox label="Middle Name" />
      </DialogFullScreen>
      <DialogFullScreen
        open={isOpenDialog2 && isOpenAll}
        onCancel={() => setIsOpenDialog2(false)}
        title="I rendered second"
        subtitle="Yet I am the top modal"
        topModalOverride
      >
        <Textbox label="First Name" />
        <Textbox label="Middle Name" />
      </DialogFullScreen>
      <DialogFullScreen
        open={isOpenDialog3 && isOpenAll}
        onCancel={() => setIsOpenDialog3(false)}
        title="I rendered last"
        subtitle="Yet I am the bottom modal"
      >
        <Textbox label="First Name" />
        <Textbox label="Middle Name" />
      </DialogFullScreen>
    </>
  );
};
