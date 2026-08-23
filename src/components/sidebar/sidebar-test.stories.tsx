import React, { useEffect, useState } from "react";
import { action } from "storybook/actions";
import { Meta, StoryObj } from "@storybook/react-vite";
import isChromatic from "../../../.storybook/isChromatic";
import allModes from "../../../.storybook/modes";

import Box from "../box";
import Button from "../button";
import Form from "../form";
import Sidebar, { SidebarProps } from ".";
import { SIDEBAR_ALIGNMENTS, SIDEBAR_SIZES } from "./sidebar.config";
import { StepFlow } from "../step-flow";
import Textbox from "../textbox";
import Typography from "../typography";
import Link from "../link";

const meta: Meta<typeof Sidebar> = {
  component: Sidebar,
  title: "Sidebar/Test",
  parameters: {
    themeProvider: { chromatic: { theme: "none" } },
  },
  decorators: [
    (Story) => (
      <Box width="100%" height={900}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    open: { control: { disable: true } },
    "aria-label": { table: { disable: true }, control: { disable: true } },
    "aria-labelledby": {
      table: { disable: true },
      control: { disable: true },
    },
    "aria-describedby": {
      table: { disable: true },
      control: { disable: true },
    },
    children: { table: { disable: true }, control: { disable: true } },
    header: { table: { disable: true }, control: { disable: true } },
    role: { table: { disable: true }, control: { disable: true } },
    focusableContainers: {
      table: { disable: true },
      control: { disable: true },
    },
    position: {
      options: SIDEBAR_ALIGNMENTS,
      control: {
        type: "select",
      },
    },
    size: {
      options: SIDEBAR_SIZES,
      control: {
        type: "select",
      },
    },
    enableBackgroundUI: {
      control: {
        type: "boolean",
      },
    },
    disableEscKey: {
      control: {
        type: "boolean",
      },
    },
    width: {
      control: {
        type: "text",
      },
    },
    padding: {
      control: {
        type: "text",
      },
    },
    paddingX: {
      control: {
        type: "text",
      },
    },
    paddingRight: {
      control: {
        type: "text",
      },
    },
  },
};

export default meta;

const InteractiveSidebar = ({ children, ...props }: Partial<SidebarProps>) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar {...props} open={isOpen} onCancel={() => setIsOpen(false)}>
        {children}
      </Sidebar>
    </>
  );
};

export const Default = (args: Partial<SidebarProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const onCancel = () => {
    setIsOpen(false);
    action("cancel")();
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar {...args} aria-label="sidebar" open={isOpen} onCancel={onCancel}>
        <Box mb={2}>
          <Button buttonType="primary">Test</Button>
          <Button buttonType="secondary" ml={2}>
            Last
          </Button>
        </Box>
        <Box mb="3000px">Main content</Box>
      </Sidebar>
    </>
  );
};

Default.storyName = "default";
Default.args = {
  enableBackgroundUI: false,
  disableEscKey: false,
};
Default.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const WithStickyForm: StoryObj<typeof Sidebar> = {
  render: (args) => (
    <InteractiveSidebar {...args} header="With sticky form">
      <Form
        fieldSpacing={2}
        leftSideButtons={<Button buttonType="tertiary">Cancel</Button>}
        saveButton={<Button buttonType="primary">Save</Button>}
        stickyFooter
        onSubmit={(ev) => ev.preventDefault()}
      >
        <Textbox label="Textbox" value="" onChange={() => {}} />
        <Textbox label="Textbox" value="" onChange={() => {}} />
        <Textbox label="Textbox" value="" onChange={() => {}} />
        <Textbox label="Textbox" value="" onChange={() => {}} />
        <Textbox label="Textbox" value="" onChange={() => {}} />
        <Textbox label="Textbox" value="" onChange={() => {}} />
        <Textbox label="Textbox" value="" onChange={() => {}} />
      </Form>
    </InteractiveSidebar>
  ),
};

export const WithForm: StoryObj<typeof Sidebar> = {
  render: (args) => (
    <InteractiveSidebar {...args} header="With form">
      <Form
        fieldSpacing={2}
        leftSideButtons={<Button buttonType="tertiary">Cancel</Button>}
        saveButton={<Button buttonType="primary">Save</Button>}
        onSubmit={(ev) => ev.preventDefault()}
      >
        <Textbox label="Textbox" value="" onChange={() => {}} />
        <Textbox label="Textbox" value="" onChange={() => {}} />
        <Textbox label="Textbox" value="" onChange={() => {}} />
        <Textbox label="Textbox" value="" onChange={() => {}} />
        <Textbox label="Textbox" value="" onChange={() => {}} />
        <Textbox label="Textbox" value="" onChange={() => {}} />
        <Textbox label="Textbox" value="" onChange={() => {}} />
      </Form>
    </InteractiveSidebar>
  ),
};
WithForm.parameters = { chromatic: { disableSnapshot: true } };

const WithStepFlowExample = () => {
  const [isOpen, setIsOpen] = useState(isChromatic());

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open sidebar</Button>
      <Sidebar
        aria-label="sidebar"
        onCancel={() => setIsOpen(false)}
        header={
          <Box width="100%">
            <StepFlow
              title="My Step Flow"
              totalSteps={2}
              currentStep={1}
              showProgressIndicator
            />
          </Box>
        }
        open={isOpen}
      >
        <Typography variant="p">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lectus
          massa, suscipit vitae pellentesque quis, facilisis non ante. Curabitur
          fringilla sapien non ante elementum venenatis. Curabitur viverra,
          massa ac congue imperdiet, purus ligula dictum quam, id tincidunt diam
          risus quis eros. Vivamus semper sem ac tempor malesuada. Proin nec
          sollicitudin mi. Nunc egestas ipsum ac lorem pretium blandit. Quisque
          ac ultricies lacus. Phasellus vel enim id est ornare finibus eget
          vitae ipsum. Maecenas non accumsan dolor. Morbi sed mauris mollis
          lorem finibus feugiat. Maecenas scelerisque nec orci ac finibus. Nulla
          dictum, quam vel gravida lobortis, nisl eros vulputate augue, eget
          malesuada lacus elit sed leo. In a ex id metus vulputate sollicitudin
          at eget neque. Aliquam cursus quis odio in consequat.
        </Typography>
      </Sidebar>
    </>
  );
};

export const WithStepFlow: StoryObj<typeof Sidebar> = {
  render: (args) => <WithStepFlowExample {...args} />,
  parameters: {
    chromatic: {
      themeProvider: { chromatic: { theme: "sage" } },
      disableSnapshot: false,
      modes: {
        desktop: allModes.chromatic,
      },
    },
  },
};

export const InverseHeaderExampleImplementation = () => {
  const footerNode = (
    <Box>
      <Typography>
        This is the footer text that will be added to provide information about
        the form content.
      </Typography>
      <Link icon="placeholder" href="#">
        This is a link
      </Link>
    </Box>
  );

  return (
    <InteractiveSidebar
      header="Sidebar header"
      headerVariant="inverse"
      subHeader={
        <Button iconType="chevron_left_thick" buttonType="tertiary">
          Action
        </Button>
      }
    >
      <Form
        stickyFooterVariant="grey"
        footerChildren={footerNode}
        stickyFooter
      />
    </InteractiveSidebar>
  );
};

export const WithLongHeader = () => {
  return (
    <InteractiveSidebar
      header="Really long header that should not overlap with the close button"
      width="460px"
    >
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint iure
      assumenda recusandae veniam deleniti adipisci dicta exercitationem
      delectus atque, quidem, eaque facilis dignissimos rem, minus cupiditate ad
      sed dolorem minima?
    </InteractiveSidebar>
  );
};

const DynamicWidthAfterMountComponent = (args: Partial<SidebarProps>) => {
  const [width, setWidth] = useState("320px");

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setWidth("480px");
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <InteractiveSidebar
      {...args}
      aria-label="sidebar"
      header="Dynamic width after mount"
      width={width}
    >
      <Typography variant="p">
        This story updates the sidebar width a little bit after the initial
        mount.
      </Typography>
    </InteractiveSidebar>
  );
};

export const DynamicWidthAfterMount: StoryObj<typeof Sidebar> = {
  render: (args) => <DynamicWidthAfterMountComponent {...args} />,
  parameters: { chromatic: { disableSnapshot: true } },
};

export const DynamicWidthAfterMountWithAnimation: StoryObj<typeof Sidebar> = {
  ...DynamicWidthAfterMount,
  args: {
    widthAnimation: true,
  },
};
