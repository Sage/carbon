import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import styled from "styled-components";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import Icon from "../icon";
import Dialog from "../dialog";
import Button from "../button/__next__";
import { Menu, MenuItem } from "../menu";
import Form from "../form";
import Textbox from "../textbox";

import Divider from "./divider.component";
import Typography from "../typography";

const blackBackground: React.CSSProperties = {
  padding: "var(--global-space-layout-m)",
  backgroundColor: "rgb(0, 0, 0)",
};

const styledSystemProps = generateStyledSystemProps(
  {
    spacing: true,
  },
  { p: "1" },
);

const meta: Meta<typeof Divider> = {
  title: "Divider",
  component: Divider,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

interface SquareProps {
  size?: string;
}

const Square = styled.div<SquareProps>`
  height: ${({ size }) => size || "56px"};
  width: ${({ size }) => size || "56px"};
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const Default: Story = () => {
  return (
    <>
      <Box display="inline-flex">
        <Square />
        <Divider />
        <Square />
        <Divider />
      </Box>
      <Divider type="horizontal" />
      <Box display="inline-flex">
        <Square />
        <Divider />
        <Square />
        <Divider />
      </Box>
      <Divider type="horizontal" />
    </>
  );
};
Default.storyName = "Default";

export const Variants: Story = () => {
  return (
    <>
      <Typography>Typical (default)</Typography>
      <Box display="inline-flex">
        <Square />
        <Divider variant="typical" />
        <Square />
        <Divider variant="typical" />
      </Box>
      <Divider type="horizontal" />
      <Box display="inline-flex" mb={7}>
        <Square />
        <Divider />
        <Square />
        <Divider />
      </Box>
      <Typography>Prominent</Typography>
      <Box display="inline-flex">
        <Square />
        <Divider variant="prominent" />
        <Square />
        <Divider variant="prominent" />
      </Box>
      <Divider type="horizontal" variant="prominent" />
      <Box display="inline-flex">
        <Square />
        <Divider variant="prominent" />
        <Square />
        <Divider variant="prominent" />
      </Box>
    </>
  );
};
Variants.storyName = "Variants";

export const Inverse: Story = () => {
  return (
    <div style={blackBackground}>
      <Typography inverse>Typical (default)</Typography>
      <Box display="inline-flex">
        <Square />
        <Divider variant="typical" inverse />
        <Square />
        <Divider variant="typical" inverse />
      </Box>
      <Divider type="horizontal" inverse />
      <Box display="inline-flex" mb={7}>
        <Square />
        <Divider variant="typical" inverse />
        <Square />
        <Divider variant="typical" inverse />
      </Box>
      <Typography inverse>Prominent</Typography>
      <Box display="inline-flex">
        <Square />
        <Divider variant="prominent" inverse />
        <Square />
        <Divider variant="prominent" inverse />
      </Box>
      <Divider type="horizontal" variant="prominent" inverse />
      <Box display="inline-flex">
        <Square />
        <Divider variant="prominent" inverse />
        <Square />
        <Divider variant="prominent" inverse />
      </Box>
    </div>
  );
};
Inverse.storyName = "Inverse";

export const InAFlexContainer: Story = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height={24}>
      <Icon type="home" />
      <Divider h={16} />
      <Icon type="settings" />
      <Divider h={16} />
      <Icon type="add" />
      <Divider h={16} />
      <Icon type="minus" />
      <Divider h={16} />
      <Icon type="info" />
      <Divider h={16} />
      <Icon type="warning" />
      <Divider h={16} />
      <Icon type="chevron_up" />
      <Divider h={16} />
      <Icon type="chevron_down" />
      <Divider h={16} />
      <Icon type="edit" />
    </Box>
  );
};
InAFlexContainer.storyName = "In a Flex Container";

export const InANonFlexContainer: Story = () => {
  return (
    <Box display="inline-block" height="auto" mx={160}>
      <Icon type="home" />
      <Divider displayInline />
      <Icon type="settings" />
      <Divider displayInline />
      <Icon type="add" />
      <Divider displayInline />
      <Icon type="minus" />
      <Divider displayInline />
      <Icon type="info" />
      <Divider displayInline />
      <Icon type="warning" />
      <Divider displayInline />
      <Icon type="chevron_up" />
      <Divider displayInline />
      <Icon type="chevron_down" />
      <Divider displayInline />
      <Icon type="edit" />
    </Box>
  );
};
InANonFlexContainer.storyName = "In a Non Flex Container";

export const WithCustomSpacingHeight: Story = () => {
  return (
    <Box display="inline-flex">
      <Box>
        <Square />
        <Divider h="100px" pt={1} pb={1} />
        <Square />
      </Box>
      <Divider pl={1} pr={1} h={185} />
      <Box>
        <Square />
        <Divider h="100px" pt={2} pb={2} />
        <Square />
      </Box>
      <Divider pl={2} pr={2} h={200} />
      <Box>
        <Square />
        <Divider h="100px" pt={3} pb={3} />
        <Square />
      </Box>
      <Divider pl={3} pr={3} h={215} />
      <Box>
        <Square />
        <Divider h="100px" pt={4} pb={4} />
        <Square />
      </Box>
      <Divider pl={4} pr={4} h={230} />
      <Box>
        <Square />
        <Divider h="100px" pt={5} pb={5} />
        <Square />
      </Box>
      <Divider pl={5} pr={5} h={245} />
      <Box>
        <Square />
        <Divider h="100px" pt={6} pb={6} />
        <Square />
      </Box>
      <Divider pl={6} pr={6} h={260} />
      <Box>
        <Square />
        <Divider h="100px" pt={7} pb={7} />
        <Square />
      </Box>
    </Box>
  );
};
WithCustomSpacingHeight.storyName = "With Custom Spacing Height";

export const InADialog: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click Me</Button>
      <Dialog title="Title" open={isOpen} onCancel={() => setIsOpen(false)}>
        <Box display="inline-flex">
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
          <Divider />
          <Square />
        </Box>
      </Dialog>
    </>
  );
};
InADialog.storyName = "In a Dialog";

export const InAMenu: Story = () => {
  return (
    <Box minHeight={120}>
      <Menu variant="black">
        <MenuItem href="#">Menu Item One</MenuItem>
        <Divider height={24} p={1} />
        <MenuItem submenu="Menu Item Three">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
};
InAMenu.storyName = "In a Menu";

export const DifferentSpacing: Story = () => {
  return <Divider type="horizontal" mt={7} mb={7} />;
};
DifferentSpacing.storyName = "Different Spacing";

export const InsideForm: Story = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <Form
      leftSideButtons={<Button variantType="secondary">Cancel</Button>}
      saveButton={<Button type="submit">Save</Button>}
      stickyFooter={false}
    >
      <Textbox
        label="First name"
        value={firstName}
        onChange={(ev) => setFirstName(ev.target.value)}
      />
      <Textbox
        label="Last name"
        value={lastName}
        onChange={(ev) => setLastName(ev.target.value)}
      />
      <Divider type="horizontal" mb={7} mt={7} />
      <Textbox
        label="Email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
    </Form>
  );
};
InsideForm.storyName = "Inside Form";

export const EnablingAdaptiveBehaviour: Story = () => {
  return (
    <Divider
      type="horizontal"
      mb={7}
      mt={7}
      ml="10%"
      mr="40%"
      adaptiveMxBreakpoint={960}
    />
  );
};
EnablingAdaptiveBehaviour.storyName = "Enabling Adaptive Behaviour";
