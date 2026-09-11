import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import isChromatic from "../../../.storybook/isChromatic";
import allModes from "../../../.storybook/modes";
import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Button from "../button";
import Typography from "../typography";
import Form from "../form";
import Toast from "../toast";
import Textbox from "../textbox";
import Box from "../box";
import Dialog from "../dialog";
import Confirm from "../confirm";
import Message from "../message";

import Sidebar from ".";

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
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
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
          leftSideButtons={<Button buttonType="tertiary">Cancel</Button>}
          saveButton={<Button buttonType="primary">Save</Button>}
          stickyFooter
          onSubmit={(event) => event.preventDefault()}
        >
          <Box height="1000px">Long content</Box>
        </Form>
      </Sidebar>
    </>
  );
};
ResponsiveBehavior.storyName = "Responsive Behavior";
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
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
};
RestoreFocusOnCloseStory.storyName = "With Restore Focus On Close";
RestoreFocusOnCloseStory.parameters = { chromatic: { disableSnapshot: true } };

export const CustomPaddingAroundContent: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  const [contentPadding, setContentPadding] = useState<"none" | "large">(
    "large",
  );

  return (
    <>
      <Button
        onClick={() => {
          setContentPadding("none");
          setIsOpen(true);
        }}
      >
        Open with no padding
      </Button>
      <Button
        ml={2}
        onClick={() => {
          setContentPadding("large");
          setIsOpen(true);
        }}
      >
        Open with 32px padding
      </Button>
      <Sidebar
        aria-label="Sidebar with custom content padding"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        p={contentPadding === "none" ? 0 : "var(--global-space-comp-2-xl)"}
      >
        <Box mb={2}>
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
};
CustomPaddingAroundContent.storyName = "Custom Padding Around Content";

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
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
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
          <Button iconType="chevron_left_thick" buttonType="tertiary">
            Action
          </Button>
        }
      >
        <Box mb={2}>
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
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
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
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
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
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

export const WithTypography: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        aria-label="sidebar"
        position="left"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar Header"
      >
        <Form
          rightSideButtons={<Button>Action button</Button>}
          stickyFooter
          buttonAlignment="right"
        >
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lectus
            massa, suscipit vitae pellentesque quis, facilisis non ante.
            Curabitur fringilla sapien non ante elementum venenatis. Curabitur
            viverra, massa ac congue imperdiet, purus ligula dictum quam, id
            tincidunt diam risus quis eros. Vivamus semper sem ac tempor
            malesuada. Proin nec sollicitudin mi. Nunc egestas ipsum ac lorem
            pretium blandit. Quisque ac ultricies lacus. Phasellus vel enim id
            est ornare finibus eget vitae ipsum. Maecenas non accumsan dolor.
            Morbi sed mauris mollis lorem finibus feugiat. Maecenas scelerisque
            nec orci ac finibus. Nulla dictum, quam vel gravida lobortis, nisl
            eros vulputate augue, eget malesuada lacus elit sed leo. In a ex id
            metus vulputate sollicitudin at eget neque. Aliquam cursus quis odio
            in consequat.
          </Typography>
          <Typography variant="p">
            In a finibus tellus, non rutrum est. Nam sed cursus diam. Sed
            commodo metus laoreet, tristique velit in, scelerisque lectus.
            Nullam suscipit eu nulla vel porttitor. Donec aliquet faucibus nunc
            consequat feugiat. Donec libero arcu, consequat in laoreet eu,
            maximus a nunc. Sed tincidunt nisl vitae diam dapibus, eu varius
            ipsum vestibulum. Suspendisse auctor mattis turpis, in placerat nunc
            ornare vitae. Phasellus id ante a mi ultricies pellentesque. Donec
            laoreet lectus sit amet blandit varius. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Nullam quis est tempus, posuere elit in, hendrerit risus.
          </Typography>
          <Typography variant="p">
            In ac nisi ante. Duis ut tellus lacus. Mauris vitae ultrices ipsum.
            Integer pretium non risus a convallis. Vivamus eu egestas magna, in
            blandit elit. In at efficitur urna. Quisque nec interdum nisi. Sed
            pharetra neque ac ipsum bibendum semper. Ut et egestas metus. Nullam
            nec porttitor turpis. Pellentesque a dapibus libero.
          </Typography>
          <Typography variant="p">
            Duis accumsan luctus risus. Ut eu nisi sed mi sodales sodales.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. Etiam id turpis et diam varius sollicitudin
            quis ullamcorper orci. Vivamus et est eget ante pellentesque
            commodo. Sed sed lacus vitae arcu ullamcorper fermentum et in
            mauris. Fusce tempor tellus vitae nibh sodales hendrerit. Cras erat
            purus, feugiat vitae tellus in, iaculis aliquet elit. In nec neque
            tristique, faucibus dui a, fermentum ipsum. Vestibulum rutrum, augue
            eget bibendum mattis, purus augue commodo urna, nec porta mi turpis
            eget risus. Curabitur ut tincidunt tellus. Fusce vel elit bibendum,
            varius eros sit amet, convallis nisl. Nunc venenatis sed lacus at
            consectetur. Etiam tincidunt varius lorem. Aliquam finibus finibus
            rutrum.
          </Typography>
          <Typography variant="p">
            Nam augue urna, congue ac dictum vel, porttitor ac tortor. Phasellus
            in dictum sem, ut fringilla nibh. Vivamus efficitur tortor auctor
            augue aliquet ullamcorper. Aliquam et velit ut turpis tempor rutrum
            at et erat. Nam imperdiet sapien eros, a mollis felis tristique
            quis. Suspendisse sed ipsum sit amet eros scelerisque volutpat quis
            non libero. Vivamus non venenatis orci, at consequat leo.
            Suspendisse non turpis quis odio malesuada vehicula dignissim non
            est. Ut eu tortor at ligula venenatis porttitor. Vestibulum euismod
            felis et elementum luctus. Integer in libero at turpis sodales
            aliquam. Donec pellentesque metus sit amet lorem ullamcorper, ac
            ullamcorper odio tincidunt.
          </Typography>
        </Form>
      </Sidebar>
    </>
  );
};
WithTypography.storyName = "With Typography";

export const OtherFocusableContainers: Story = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isToast1Open, setIsToast1Open] = useState(false);
  const [isToast2Open, setIsToast2Open] = useState(false);
  const toast1Ref = useRef(null);
  const toast2Ref = useRef(null);
  return (
    <>
      <Button onClick={() => setIsSidebarOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isSidebarOpen}
        onCancel={() => setIsSidebarOpen(false)}
        header="Sidebar header"
        focusableContainers={[toast1Ref, toast2Ref]}
      >
        <Form
          stickyFooter
          height="500px"
          leftSideButtons={
            <Button onClick={() => setIsSidebarOpen(false)}>Cancel</Button>
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
          <Textbox label="Middle Name" onChange={() => {}} value="" />
          <Textbox label="Surname" onChange={() => {}} value="" />
          <Box display="flex" gap={2}>
            <Button onClick={() => setIsToast1Open(true)}>
              Show first toast
            </Button>
            <Button buttonType="primary" onClick={() => setIsToast2Open(true)}>
              Show second toast
            </Button>
          </Box>
        </Form>
      </Sidebar>
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
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        Main Content
      </Sidebar>
    </>
  );
};
CustomWidth.storyName = "Custom Width";

export const CustomHeaderAndContentPadding: Story = () => {
  const [isOpen, setIsOpen] = useState(defaultOpenState);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        header="Sidebar Header — 16px padding"
        p="var(--global-space-comp-2-xl)"
        headerPadding={{ p: "var(--global-space-comp-l)" }}
      >
        <Form
          rightSideButtons={<Button>Action button</Button>}
          stickyFooter
          buttonAlignment="right"
        >
          <Box mb={2}>Content padding: 32px (--global-space-comp-2-xl).</Box>
          <Typography variant="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lectus
            massa, suscipit vitae pellentesque quis, facilisis non ante.
            Curabitur fringilla sapien non ante elementum venenatis. Curabitur
            viverra, massa ac congue imperdiet, purus ligula dictum quam, id
            tincidunt diam risus quis eros. Vivamus semper sem ac tempor
            malesuada. Proin nec sollicitudin mi. Nunc egestas ipsum ac lorem
            pretium blandit. Quisque ac ultricies lacus. Phasellus vel enim id
            est ornare finibus eget vitae ipsum. Maecenas non accumsan dolor.
            Morbi sed mauris mollis lorem finibus feugiat. Maecenas scelerisque
            nec orci ac finibus. Nulla dictum, quam vel gravida lobortis, nisl
            eros vulputate augue, eget malesuada lacus elit sed leo. In a ex id
            metus vulputate sollicitudin at eget neque. Aliquam cursus quis odio
            in consequat.
          </Typography>
        </Form>
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
      <Confirm
        open={isOpenDialogFullScreen && isOpenAll}
        onCancel={() => setIsOpenDialogFullScreen(false)}
        title="Confirm"
        onConfirm={() => {}}
      >
        <Textbox label="Confirm textbox" value="" onChange={() => {}} />
      </Confirm>
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
