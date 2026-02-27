import React, { useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import isChromatic from "../../../../../.storybook/isChromatic";
import allModes from "../../../../../.storybook/modes";

import Box from "../../../box";
import Button from "../../../button/__next__/";
import type { ButtonHandle } from "../../../button/__next__/button.component";
import Form from "../../../form";
import Typography from "../../../typography";
import Textbox from "../../../textbox";
import Message from "../../../message";

import type { DialogProps } from "./dialog.component";
import Dialog, { withDialogHeader } from "./dialog.component";

const DialogWithHeadingVariant = withDialogHeader(Dialog);

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

const Buttons = () => (
  <Box display="flex" flexDirection="column" alignItems="flex-end">
    <Box display="flex" gap={1}>
      <Button>Cancel</Button>
      <Button variantType="primary">Save</Button>
    </Box>
  </Box>
);

const dialogContent = (
  <>
    <Typography>
      This is an example of a dialog with a Form as content
    </Typography>
    <Textbox label="First Name" value="" onChange={() => {}} />
    <Textbox label="Middle Name" value="" onChange={() => {}} />
    <Textbox label="Surname" value="" onChange={() => {}} />
    <Textbox label="Birth Place" value="" onChange={() => {}} />
    <Textbox label="Favourite Colour" value="" onChange={() => {}} />
  </>
);

export const NextDefaultStory: Story = {
  name: "Default",
  args: {
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
  },
  render: function DefaultStory({ onCancel, ...args }: DialogProps) {
    const buttonRef = useRef<ButtonHandle>(null);
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
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          footer={<Buttons />}
        >
          {dialogContent}
        </Dialog>
      </>
    );
  },
};

export const NextDefaultStoryWithForm: Story = {
  name: "Default with form",
  args: {
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
  },
  render: function DefaultStory({ onCancel, ...args }: DialogProps) {
    const buttonRef = useRef<ButtonHandle>(null);
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
            setTimeout(() => buttonRef.current?.focusButton(), 0);
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
            <Textbox label="First Name" value="" onChange={() => {}} />
            <Textbox label="Middle Name" value="" onChange={() => {}} />
            <Textbox label="Surname" value="" onChange={() => {}} />
            <Textbox label="Birth Place" value="" onChange={() => {}} />
            <Textbox label="Favourite Colour" value="" onChange={() => {}} />
            <Textbox label="Address" value="" onChange={() => {}} />
            <Textbox label="First Name" value="" onChange={() => {}} />
            <Textbox label="Middle Name" value="" onChange={() => {}} />
            <Textbox label="Surname" value="" onChange={() => {}} />
            <Textbox label="Birth Place" value="" onChange={() => {}} />
            <Textbox label="Favourite Colour" value="" onChange={() => {}} />
            <Textbox label="Address" value="" onChange={() => {}} />
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
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
        </Form>
      </Dialog>
    </>
  );
};
RestoreFocusOnCloseStory.storyName = "With Restore Focus On Close";
RestoreFocusOnCloseStory.parameters = { chromatic: { disableSnapshot: true } };

export const SmallSize: Story = {
  ...NextDefaultStory,
  name: "Size: Small (540px)",
  args: {
    ...NextDefaultStory.args,
    size: "small",
  },
};

export const GradientKeyLine: Story = {
  ...NextDefaultStory,
  name: "With Gradient Keyline",
  args: {
    ...NextDefaultStory.args,
    gradientKeyLine: true,
  },
};

export const MediumSize: Story = {
  ...NextDefaultStory,
  name: "Size: Medium (850px) - Default",
  args: {
    ...NextDefaultStory.args,
    size: "medium",
  },
};

export const LargeSize: Story = {
  ...NextDefaultStory,
  name: "Size: Large (1080px)",
  args: {
    ...NextDefaultStory.args,
    size: "large",
  },
};

export const FullScreenSize: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const buttonRef = useRef<ButtonHandle>(null);

  return (
    <>
      <Button ref={buttonRef} onClick={() => setIsOpen(true)}>
        Open Dialog
      </Button>
      <Dialog
        size="fullscreen"
        open={isOpen}
        onCancel={() => {
          setIsOpen(false);
          setTimeout(() => buttonRef.current?.focusButton(), 0);
        }}
        title="Title"
        subtitle="Subtitle"
        footer={<Buttons />}
      >
        {dialogContent}
      </Dialog>
    </>
  );
};
FullScreenSize.storyName = "Size: Full Screen";
FullScreenSize.parameters = { chromatic: { disableSnapshot: true } };

export const ResponsiveBehavior: Story = {
  name: "Responsive Behavior",
  args: {
    open: isChromatic(),
    title: "Responsive Dialog",
    subtitle: "Dialog shrinks to fit viewport",
    size: "large",
  },
  render: function ResponsiveBehaviorStory({
    onCancel,
    ...args
  }: Partial<DialogProps>) {
    const buttonRef = useRef<ButtonHandle>(null);
    const [open, setOpen] = useState(args.open || false);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Typography mt={2}>
          Resize your browser window to see the dialog responsively shrink while
          staying centered. The dialog has a minimum width of 288px.
        </Typography>
        <Dialog
          {...args}
          open={open}
          onCancel={(ev) => {
            onCancel?.(ev);
            setOpen(false);
            setTimeout(() => buttonRef.current?.focusButton(), 0);
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
              This dialog will shrink responsively when the viewport is smaller
              than the dialog&apos;s max-width.
            </Typography>
            <Textbox label="First Name" value="" onChange={() => {}} />
            <Textbox label="Middle Name" value="" onChange={() => {}} />
            <Textbox label="Surname" value="" onChange={() => {}} />
          </Form>
        </Dialog>
      </>
    );
  },
  parameters: {
    chromatic: {
      modes: {
        xsm: allModes.xsm,
        sm: allModes.sm,
        md: allModes.md,
        lg: allModes.lg,
      },
    },
  },
};

export const SmallScreenBehavior: Story = {
  name: "Small Screen Behavior (Accessibility)",
  args: {
    open: isChromatic(),
    title: "Small Screen Dialog",
    subtitle: "Header and footer are not sticky on small screens",
    size: "medium",
    disableStickyOnSmallScreen: true,
  },
  render: function SmallScreenBehaviorStory({
    onCancel,
    ...args
  }: Partial<DialogProps>) {
    const buttonRef = useRef<ButtonHandle>(null);
    const [open, setOpen] = useState(args.open || false);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <Typography mt={2}>
          On small screen devices (below 600px), the dialog becomes full width,
          the dimmer is removed, and the header/footer are no longer sticky.
          This improves accessibility on mobile devices.
        </Typography>
        <Dialog
          {...args}
          open={open}
          onCancel={(ev) => {
            onCancel?.(ev);
            setOpen(false);
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          footer={<Buttons />}
        >
          <Typography>
            This dialog demonstrates small screen accessibility behavior.
          </Typography>
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
        </Dialog>
      </>
    );
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

export const StickyFooter: Story = {
  name: "Sticky Footer",
  args: {
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
    stickyFooter: true,
  },
  render: function StickyFooterStory({
    onCancel,
    ...args
  }: Partial<DialogProps>) {
    const buttonRef = useRef<ButtonHandle>(null);
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
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          footer={<Buttons />}
        >
          <Typography>
            This is an example of a dialog with a sticky footer using the
            Dialog&apos;s own <code>stickyFooter</code> and <code>footer</code>{" "}
            props.
          </Typography>
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
          <Textbox label="Birth Place" value="" onChange={() => {}} />
          <Textbox label="Favourite Colour" value="" onChange={() => {}} />
          <Textbox label="Address" value="" onChange={() => {}} />
        </Dialog>
      </>
    );
  },
};

export const StickyFooterWithForm: Story = {
  name: "Sticky Footer with Form",
  args: {
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
  },
  render: function StickyFooterWithFormStory({
    onCancel,
    ...args
  }: Partial<DialogProps>) {
    const buttonRef = useRef<ButtonHandle>(null);
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
            setTimeout(() => buttonRef.current?.focusButton(), 0);
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
              This is an example of a dialog using a Form component with its own
              sticky footer. The Form manages the footer internally.
            </Typography>
            <Textbox label="First Name" value="" onChange={() => {}} />
            <Textbox label="Middle Name" value="" onChange={() => {}} />
            <Textbox label="Surname" value="" onChange={() => {}} />
            <Textbox label="Birth Place" value="" onChange={() => {}} />
            <Textbox label="Favourite Colour" value="" onChange={() => {}} />
            <Textbox label="Address" value="" onChange={() => {}} />
            <Textbox label="First Name" value="" onChange={() => {}} />
            <Textbox label="Middle Name" value="" onChange={() => {}} />
            <Textbox label="Surname" value="" onChange={() => {}} />
            <Textbox label="Birth Place" value="" onChange={() => {}} />
            <Textbox label="Favourite Colour" value="" onChange={() => {}} />
            <Textbox label="Address" value="" onChange={() => {}} />
          </Form>
        </Dialog>
      </>
    );
  },
};

export const WithHeight: Story = {
  ...NextDefaultStory,
  name: "With Height",
  args: {
    ...NextDefaultStory.args,
    height: "500",
  },
};

export const WithHeaderChildren: Story = {
  name: "With Header Children",
  args: {
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
  },
  render: function WithHeaderChildrenStory({
    onCancel,
    ...args
  }: Partial<DialogProps>) {
    const buttonRef = useRef<ButtonHandle>(null);
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
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          headerChildren={
            <Box display="flex" gap={1} mt={2}>
              <Button>Action 1</Button>
              <Button>Action 2</Button>
            </Box>
          }
          footer={<Buttons />}
        >
          {dialogContent}
        </Dialog>
      </>
    );
  },
};

export const WithContentPadding: Story = {
  ...NextDefaultStory,
  name: "With Content Padding",
  args: {
    ...NextDefaultStory.args,
    contentPadding: { p: 0 },
  },
};

export const WithContentPaddingCustom: Story = {
  ...NextDefaultStory,
  name: "With Custom Content Padding",
  args: {
    ...NextDefaultStory.args,
    contentPadding: { py: 5, px: 8 },
  },
};

// --- Heading Variations ---

export const HeadingWithSubtleIcon: StoryObj<typeof DialogWithHeadingVariant> =
  {
    name: "Heading with Subtle Icon",
    render: function SubtleIconStory() {
      const buttonRef = useRef<ButtonHandle>(null);
      const [open, setOpen] = useState(defaultOpenState);
      return (
        <>
          <Button ref={buttonRef} onClick={() => setOpen(true)}>
            Open Dialog
          </Button>
          <DialogWithHeadingVariant
            open={open}
            onCancel={() => {
              setOpen(false);
              setTimeout(() => buttonRef.current?.focusButton(), 0);
            }}
            title="Dialog title with subtle icon"
            subtitle="Subheading"
            statusIcon="subtle"
            footer={<Buttons />}
          >
            {dialogContent}
          </DialogWithHeadingVariant>
        </>
      );
    },
  };

export const HeadingWithPositiveIcon: StoryObj<
  typeof DialogWithHeadingVariant
> = {
  name: "Heading with Positive Icon",
  render: function PositiveIconStory() {
    const buttonRef = useRef<ButtonHandle>(null);
    const [open, setOpen] = useState(defaultOpenState);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <DialogWithHeadingVariant
          open={open}
          onCancel={() => {
            setOpen(false);
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          title="Dialog title with positive icon"
          subtitle="Subheading"
          statusIcon="positive"
          footer={<Buttons />}
        >
          {dialogContent}
        </DialogWithHeadingVariant>
      </>
    );
  },
};

export const HeadingWithNegativeIcon: StoryObj<
  typeof DialogWithHeadingVariant
> = {
  name: "Heading with Negative Icon",
  render: function NegativeIconStory() {
    const buttonRef = useRef<ButtonHandle>(null);
    const [open, setOpen] = useState(defaultOpenState);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <DialogWithHeadingVariant
          open={open}
          onCancel={() => {
            setOpen(false);
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          title="Dialog title with negative icon"
          subtitle="Subheading"
          statusIcon="negative"
          footer={<Buttons />}
        >
          {dialogContent}
        </DialogWithHeadingVariant>
      </>
    );
  },
};

export const HeadingWithCautionIcon: StoryObj<typeof DialogWithHeadingVariant> =
  {
    name: "Heading with Caution Icon",
    render: function CautionIconStory() {
      const buttonRef = useRef<ButtonHandle>(null);
      const [open, setOpen] = useState(defaultOpenState);
      return (
        <>
          <Button ref={buttonRef} onClick={() => setOpen(true)}>
            Open Dialog
          </Button>
          <DialogWithHeadingVariant
            open={open}
            onCancel={() => {
              setOpen(false);
              setTimeout(() => buttonRef.current?.focusButton(), 0);
            }}
            title="Dialog title with caution icon"
            subtitle="Subheading"
            statusIcon="caution"
            footer={<Buttons />}
          >
            {dialogContent}
          </DialogWithHeadingVariant>
        </>
      );
    },
  };

export const HeadingWithInfoIcon: StoryObj<typeof DialogWithHeadingVariant> = {
  name: "Heading with Info Icon",
  render: function InfoIconStory() {
    const buttonRef = useRef<ButtonHandle>(null);
    const [open, setOpen] = useState(defaultOpenState);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <DialogWithHeadingVariant
          open={open}
          onCancel={() => {
            setOpen(false);
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          title="Dialog title with info icon"
          subtitle="Subheading"
          statusIcon="info"
          footer={<Buttons />}
        >
          {dialogContent}
        </DialogWithHeadingVariant>
      </>
    );
  },
};

export const HeadingWithCustomRenderer: StoryObj<
  typeof DialogWithHeadingVariant
> = {
  name: "Heading with Custom Renderer",
  render: function CustomRendererStory() {
    const buttonRef = useRef<ButtonHandle>(null);
    const [open, setOpen] = useState(defaultOpenState);
    return (
      <>
        <Button ref={buttonRef} onClick={() => setOpen(true)}>
          Open Dialog
        </Button>
        <DialogWithHeadingVariant
          open={open}
          onCancel={() => {
            setOpen(false);
            setTimeout(() => buttonRef.current?.focusButton(), 0);
          }}
          title="Custom Title"
          subtitle="Custom Subtitle"
          renderHeading={(title, subtitle) => (
            <Box>
              <Typography variant="h1">{title}</Typography>
              <Typography variant="p" color="blackOpacity65">
                {subtitle}
              </Typography>
            </Box>
          )}
          footer={<Buttons />}
        >
          {dialogContent}
        </DialogWithHeadingVariant>
      </>
    );
  },
};
