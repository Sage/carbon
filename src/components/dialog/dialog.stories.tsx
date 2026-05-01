import React, { useRef, useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import isChromatic from "../../../.storybook/isChromatic";
import allModes from "../../../.storybook/modes";

import Box from "../box";
import Button from "../button/__next__";
import Form from "../form";
import Typography from "../typography";
import Textbox from "../textbox";
import Loader from "../loader/__next__";
import Toast from "../toast";
import Message from "../message";

import type { DialogProps } from ".";
import Dialog from ".";
import { ButtonHandle } from "../button/__next__/button.component";

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
      <Button buttonType="primary">Save</Button>
    </Box>
  </Box>
);

const dialogContent = (
  <Box margin={2}>
    <Typography>
      This is an example of a dialog with a Form as content
    </Typography>
    <Textbox label="First Name" value="" onChange={() => {}} />
    <Textbox label="Middle Name" value="" onChange={() => {}} />
    <Textbox label="Surname" value="" onChange={() => {}} />
    <Textbox label="Birth Place" value="" onChange={() => {}} />
    <Textbox label="Favourite Colour" value="" onChange={() => {}} />
  </Box>
);

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
          <Loader loaderType="ring" />
        ) : (
          <>
            <Textbox
              label="Textbox 1"
              labelInline
              autoFocus
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 2"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 3"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 4"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 5"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 6"
              labelInline
              value=""
              onChange={() => {}}
            />
            <Textbox
              label="Textbox 7"
              labelInline
              value=""
              onChange={() => {}}
            />
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
        <Textbox label="Not focused" value="" onChange={() => {}} />
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
          autoFocus
          label="This should be focused first now"
          value=""
          onChange={() => {}}
        />
      </Dialog>
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
          <Textbox label="First Name" value="" onChange={() => {}} />
          <Textbox label="Middle Name" value="" onChange={() => {}} />
          <Textbox label="Surname" value="" onChange={() => {}} />
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

const childrenText = `At vero facilisis interdum sed vitae integer. Ut placerat morbi aenean sagittis nunc non feugiat. Est ac nulla dui tempus ullamcorper in id. Proin elementum vel magna feugiat luctus aliquam tristique ornare. Donec volutpat tempor accumsan est, vel ultrices lectus sed gravida. Mi commodo id dignissim posuere ultricies. Mauris tristique tincidunt sit amet senectus lectus vitae sollicitudin et. Sed fermentum id semper felis convallis tincidunt feugiat.
Fusce aliquam vel nec justo quisque sagittis habitasse dui. Vel hendrerit proin amet tempus consequat faucibus non. Mi convallis elementum diam suspendisse aliquet augue sed feugiat vestibulum. Risus mauris sem commodo feugiat suspendisse. Lectus scelerisque tincidunt facilisi non pharetra. Integer pulvinar accumsan diam eget. Nullam magna amet viverra luctus duis malesuada morbi. At lacus feugiat proin tortor lacus aliquet in.
Magna sed sapien risus mauris et aliquam tempus diam. Gravida amet non ornare suspendisse tempor. Tempor mattis aliquet massa imperdiet curabitur integer blandit laoreet. Sed convallis semper bibendum nisi neque aliquet felis imperdiet. Ultrices leo risus cursus est laoreet sociis. Id pretium congue ultricies donec aliquam sodales convallis auctor. Tincidunt viverra sem eleifend viverra id adipiscing eget cursus. Id diam eget tempus arcu.
`;
export const WithScrollableContent: Story = {
  render: function WithScrollableContentExample(args) {
    const { children, open, ...rest } = args;
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog open={isOpen} onCancel={() => setIsOpen(false)} {...rest}>
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
          <div tabIndex={0}>
            <Box margin={2}>{children}</Box>
          </div>
        </Dialog>
      </>
    );
  },
  args: {
    children: childrenText.repeat(2),
    title: "Dialog with scrollable content",
    subtitle: "amet non ornare suspendisse tempor.",
    height: "200px",
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  decorators: [
    (Story) => (
      <Box height="900px" width="100%">
        <Story />
      </Box>
    ),
  ],
};

export const DefaultStory: Story = {
  name: "Default",
  args: {
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
  },
  render: function DefaultRender({ onCancel, ...args }: DialogProps) {
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

export const DefaultWithForm: Story = {
  name: "Default with Form",
  args: {
    open: isChromatic(),
    title: "Title",
    subtitle: "Subtitle",
    size: "medium",
  },
  render: function DefaultWithFormRender({ onCancel, ...args }: DialogProps) {
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

export const RestoreFocusOnClose: Story = () => {
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
RestoreFocusOnClose.storyName = "With Restore Focus On Close";
RestoreFocusOnClose.parameters = { chromatic: { disableSnapshot: true } };

export const SmallSize: Story = {
  ...DefaultStory,
  name: "Size: Small (540px)",
  args: {
    ...DefaultStory.args,
    size: "small",
  },
};

export const GradientKeyLine: Story = {
  ...DefaultStory,
  name: "With Gradient Keyline",
  args: {
    ...DefaultStory.args,
    gradientKeyLine: true,
  },
};

export const MediumSize: Story = {
  ...DefaultStory,
  name: "Size: Medium (850px) - Default",
  args: {
    ...DefaultStory.args,
    size: "medium",
  },
};

export const LargeSize: Story = {
  ...DefaultStory,
  name: "Size: Large (1080px)",
  args: {
    ...DefaultStory.args,
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
  render: function ResponsiveBehaviorRender({
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
  render: function SmallScreenBehaviorRender({
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
  render: function StickyFooterRender({
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
  render: function StickyFooterWithFormRender({
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
  ...DefaultStory,
  name: "With Height",
  args: {
    ...DefaultStory.args,
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
  render: function WithHeaderChildrenRender({
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
  ...DefaultStory,
  name: "With Content Padding",
  args: {
    ...DefaultStory.args,
    contentPadding: { p: 0 },
  },
};

export const WithContentPaddingCustom: Story = {
  ...DefaultStory,
  name: "With Custom Content Padding",
  args: {
    ...DefaultStory.args,
    contentPadding: { py: 5, px: 8 },
  },
};
