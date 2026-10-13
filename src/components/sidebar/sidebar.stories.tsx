import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import isChromatic from "../../../.storybook/isChromatic";
import allModes from "../../../.storybook/modes";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Button from "../button/__next__";
import Typography from "../typography";
import Form from "../form";
import Textbox from "../textbox";
import Box from "../box";
import Dialog from "../dialog";
import Message from "../message";

import Sidebar, { SidebarProps } from ".";

const styledSystemProps = generateStyledSystemProps({
  padding: true,
  width: true,
});

const defaultOpenState = isChromatic();

const meta: Meta<typeof Sidebar> = {
  title: "Sidebar",
  component: Sidebar,
  argTypes: {
    ...styledSystemProps,
  },
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
type Story = StoryObj<typeof Sidebar>;

export const DefaultStory: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Open sidebar
      </Button>
      <Sidebar
        aria-label="sidebar"
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setTimeout(() => buttonRef.current?.focus(), 0);
        }}
      >
        <Box mb={2}>
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
};
DefaultStory.storyName = "Default";

export const ResponsiveBehavior: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Responsive sidebar"
      >
        <Form
          leftSideButtons={<Button variantType="tertiary">Cancel</Button>}
          saveButton={<Button variantType="primary">Save</Button>}
          stickyFooter
          onSubmit={(event) => event.preventDefault()}
        >
          <Box height="1000px">Long content</Box>
        </Form>
      </Sidebar>
    </>
  );
};
ResponsiveBehavior.storyName = "Sticky Form Footer: Responsive Behavior";
ResponsiveBehavior.parameters = {
  chromatic: {
    modes: {
      aboveBreakpoint: {
        ...allModes.chromatic,
        viewport: { ...allModes.chromatic.viewport, width: 769 },
      },
      atBreakpoint: {
        ...allModes.chromatic,
        viewport: { ...allModes.chromatic.viewport, width: 768 },
      },
    },
  },
};

export const CustomFooter: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar with custom footer"
        footer={
          <>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variantType="primary">Save</Button>
          </>
        }
        stickyFooter
      >
        <Box height="1000px">Long content</Box>
      </Sidebar>
    </>
  );
};
CustomFooter.storyName = "Custom Footer (Sticky)";

export const NonStickyCustomFooter: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar with non-sticky custom footer"
        footer={
          <>
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button variantType="primary">Save</Button>
          </>
        }
      >
        <Box height="1000px">Long content</Box>
      </Sidebar>
    </>
  );
};
NonStickyCustomFooter.storyName = "Custom Footer (Non-sticky)";

export const SmallScreenBehavior: Story = {
  name: "Custom Footer: Disable Sticky on Small Screens",
  args: {
    open: isChromatic(),
    header: "Small screen sidebar",
    disableStickyOnSmallScreen: true,
  },
  render: function SmallScreenBehaviorRender({
    onCancel,
    ...args
  }: Partial<SidebarProps>) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState(args.open || false);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open sidebar
        </Button>
        <Typography mt={2}>
          Although <code>stickyFooter</code> is enabled{" "}
          <code>disableStickyOnSmallScreen</code>
          disables sticky behavior on small screens at 768px and below. The
          header, content, and custom footer then scroll together
        </Typography>
        <Sidebar
          {...args}
          open={open}
          onCancel={(ev) => {
            onCancel?.(ev);
            setOpen(false);
            setTimeout(() => buttonRef.current?.focus(), 0);
          }}
          footer={
            <>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variantType="primary">Save</Button>
            </>
          }
          stickyFooter
        >
          <Box height="1000px">Long content</Box>
        </Sidebar>
      </>
    );
  },
  parameters: {
    chromatic: {
      modes: {
        atBreakpoint: {
          ...allModes.chromatic,
          viewport: { ...allModes.chromatic.viewport, width: 768 },
        },
      },
    },
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
        Open sidebar
      </Button>
      {showMessage && (
        <Message
          ref={messageRef}
          variant="info"
          onDismiss={() => setShowMessage(false)}
        >
          Sidebar closed; focus moved to this message.
        </Message>
      )}
      <Sidebar
        aria-label="sidebar"
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setShowMessage(true);
          setTimeout(() => messageRef.current?.focus(), 1);
        }}
        restoreFocusOnClose={false}
      >
        <Box mb={2}>
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
};
RestoreFocusOnCloseStory.storyName = "Without Automatic Focus Restoration";
RestoreFocusOnCloseStory.parameters = { chromatic: { disableSnapshot: true } };

export const CustomPaddingAroundContent: Story = {
  args: {
    p: "var(--global-space-comp-xl)",
  },
  parameters: {
    controls: { include: ["p"] },
  },
  render: function CustomPaddingAroundContentRender({
    p,
  }: Partial<SidebarProps>) {
    const [isOpen, setIsOpen] = useState(defaultOpenState);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
        <Typography mt={2}>
          Use the <code>p</code> control to override the default content
          padding. Set it to <code>var(--global-space-comp-none)</code> for
          edge-to-edge content.
        </Typography>
        <Sidebar
          aria-label="Sidebar with custom content padding"
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          p={p}
        >
          <Box mb={2}>
            <Button variantType="primary">Test</Button>
            <Button variantType="secondary" ml={2}>
              Last
            </Button>
          </Box>
          Main Content
        </Sidebar>
      </>
    );
  },
};
CustomPaddingAroundContent.storyName = "Content Padding (p Prop)";

export const WithHeader: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar header"
      >
        <Box mb={2}>
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
};
WithHeader.storyName = "With Header";

export const WithHeaderAndSubheader: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar header"
        subHeader={
          <Button iconType="chevron_left_thick" variantType="tertiary">
            Action
          </Button>
        }
      >
        <Box mb={2}>
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
};
WithHeaderAndSubheader.storyName = "With Header And Subheader";

export const WithInverseHeader: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar header"
        headerVariant="inverse"
      >
        <Box mb={2}>
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
};
WithInverseHeader.storyName = "With Inverse Header";

export const WithGradientKeyLine: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar header"
        gradientKeyLine
      >
        Main Content
      </Sidebar>
    </>
  );
};
WithGradientKeyLine.storyName = "With Gradient Keyline";

export const WithScroll: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar header"
      >
        <Box mb={2}>
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        <Box mb="3000px">Long content</Box>
      </Sidebar>
    </>
  );
};
WithScroll.storyName = "With Scroll";
WithScroll.parameters = { chromatic: { disableSnapshot: true } };

export const OtherFocusableContainers: Story = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMessage1Open, setIsMessage1Open] = useState(false);
  const [isMessage2Open, setIsMessage2Open] = useState(false);
  const message1Ref = useRef(null);
  const message2Ref = useRef(null);
  return (
    <>
      <Button onClick={() => setIsSidebarOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isSidebarOpen}
        onCancel={() => setIsSidebarOpen(false)}
        header="Sidebar header"
        focusableContainers={[message1Ref, message2Ref]}
      >
        <Form
          stickyFooter
          height="500px"
          leftSideButtons={
            <Button onClick={() => setIsSidebarOpen(false)}>Cancel</Button>
          }
          saveButton={
            <Button variantType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Typography>
            This is an example of a dialog with a Form as content
          </Typography>
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" onChange={() => {}} value="" />
          <Textbox label="Surname" onChange={() => {}} value="" />
          <Box display="flex" gap={2}>
            <Button onClick={() => setIsMessage1Open(true)}>
              Show first message
            </Button>
            <Button
              variantType="primary"
              onClick={() => setIsMessage2Open(true)}
            >
              Show second message
            </Button>
          </Box>
        </Form>
      </Sidebar>
      {(isMessage1Open || isMessage2Open) && (
        <Box mt={2}>
          <Message
            open={isMessage1Open}
            onDismiss={() => setIsMessage1Open(false)}
            ref={message1Ref}
          >
            Message 1
          </Message>
          <Message
            open={isMessage2Open}
            onDismiss={() => setIsMessage2Open(false)}
            ref={message2Ref}
          >
            Message 2
          </Message>
        </Box>
      )}
    </>
  );
};
OtherFocusableContainers.storyName = "Other Focusable Containers";
OtherFocusableContainers.parameters = { chromatic: { disableSnapshot: true } };

export const CustomWidth: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        aria-label="sidebar"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        width="25%"
        header="Sidebar"
      >
        <Box
          mb={2}
          display="flex"
          flexDirection="row"
          flexWrap="nowrap"
          gap={1}
        >
          <Button variantType="primary">Test</Button>
          <Button variantType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
};
CustomWidth.storyName = "Custom Width";

export const CustomHeaderPadding: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar Header"
        headerPadding={{ p: "var(--global-space-comp-l)" }}
      >
        <Typography variant="p">
          The header uses <code>headerPadding</code> with the compact
          <code>comp-l</code> token. Content retains the default padding.
        </Typography>
      </Sidebar>
    </>
  );
};
CustomHeaderPadding.storyName = "Header Padding";

export const CustomHeaderAndContentPadding: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar Header"
        headerPadding={{ p: "var(--global-space-comp-l)" }}
        p="var(--global-space-comp-none)"
      >
        <Typography variant="p">
          The header uses compact padding while the <code>p</code> prop removes
          content padding for edge-to-edge content.
        </Typography>
      </Sidebar>
    </>
  );
};
CustomHeaderAndContentPadding.storyName = "Custom Header and Content Padding";

export const TopModalOverride: Story = () => {
  const [isOpenAll, setIsOpenAll] = useState(defaultOpenState);
  const [isOpenDialogFullScreen, setIsOpenDialogFullScreen] = useState(true);
  const [isOpenSidebar, setIsOpenSidebar] = useState(true);
  const [isOpenDialog, setIsOpenDialog] = useState(true);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpenAll(true);
          setIsOpenDialogFullScreen(true);
          setIsOpenSidebar(true);
          setIsOpenDialog(true);
        }}
      >
        Open dialogs
      </Button>
      <Dialog
        open={isOpenDialogFullScreen && isOpenAll}
        onCancel={() => setIsOpenDialogFullScreen(false)}
        role="alertdialog"
        title="Confirm"
        showCloseIcon={false}
      >
        <Textbox label="Confirm textbox" value="" onChange={() => {}} />
        <Box mt="var(--spacing600)" display="flex" justifyContent="flex-end">
          <Button onClick={() => setIsOpenDialogFullScreen(false)}>
            Cancel
          </Button>
          <Button variantType="primary" ml="var(--spacing110)">
            Confirm
          </Button>
        </Box>
      </Dialog>
      <Sidebar
        open={isOpenSidebar && isOpenAll}
        onCancel={() => setIsOpenSidebar(false)}
        header="sidebar"
        topModalOverride
      >
        <Textbox label="Sidebar textbox" value="" onChange={() => {}} />
      </Sidebar>
      <Dialog
        open={isOpenDialog && isOpenAll}
        onCancel={() => setIsOpenDialog(false)}
        title="Dialog"
      >
        <Textbox label="Dialog textbox" value="" onChange={() => {}} />
      </Dialog>
    </>
  );
};
TopModalOverride.storyName = "Top Modal Override";
