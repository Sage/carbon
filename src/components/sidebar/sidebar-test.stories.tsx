import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { Meta, StoryObj } from "@storybook/react";
import isChromatic from "../../../.storybook/isChromatic";
import allModes from "../../../.storybook/modes";

import Box from "../box";
import Icon from "../icon";
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
  position: "right",
  size: "medium",
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
    <Sidebar
      {...args}
      header={<Typography variant="h3">With sticky form</Typography>}
      open
      onCancel={() => {}}
    >
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
    </Sidebar>
  ),
};

export const WithForm: StoryObj<typeof Sidebar> = {
  render: (args) => (
    <Sidebar
      {...args}
      header={<Typography variant="h3">With form</Typography>}
      open
      onCancel={() => {}}
    >
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
    </Sidebar>
  ),
};

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

export const DarkHeaderExampleImplementation = () => {
  const headerNode = (
    <Box display="flex" alignItems="center" gap="8px">
      <Icon type="chat" color="white" />
      <Typography variant="h2" color="white">
        Sidebar header
      </Typography>
    </Box>
  );
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
    <Sidebar
      header={headerNode}
      headerVariant="dark"
      subHeader={
        <Button iconType="chevron_left_thick" buttonType="tertiary">
          Action
        </Button>
      }
      open
      onCancel={() => {}}
    >
      <Form
        stickyFooterVariant="grey"
        footerChildren={footerNode}
        stickyFooter
      />
    </Sidebar>
  );
};
