import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import styled from "styled-components";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Box from "../box";
import Icon from "../icon";
import Dialog from "../dialog";
import Button from "../button";
import { Tile, TileContent } from "../tile";
import Content from "../content";
import { GridContainer, GridItem } from "../grid";
import { Menu, MenuItem } from "../menu";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableHeader,
  FlatTableRow,
  FlatTableCell,
} from "../flat-table";
import Form from "../form";
import Textbox from "../textbox";

import Divider from "./divider.component";
import Typography from "../typography";

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
    <Box bg="#000000" p={5}>
      <Typography color="#fff">Typical (default)</Typography>
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
      <Typography color="#fff">Prominent</Typography>
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
    </Box>
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
    <Box display="inline-block" width={620} height="auto" my={0} mx={180}>
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
InANonFlexContainer.parameters = { chromatic: { disableSnapshot: true } };

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
InADialog.parameters = { chromatic: { disableSnapshot: true } };

export const InATile: Story = () => {
  return (
    <Tile width={800} orientation="vertical">
      <TileContent>
        <Content title="Test Title One">Test Body One</Content>
      </TileContent>
      <TileContent>
        <Box display="inline-flex">
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} mr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <Divider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
        </Box>
      </TileContent>
    </Tile>
  );
};
InATile.storyName = "In a Tile";

export const InGridContainer: Story = () => {
  return (
    <GridContainer>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="1"
        gridRow="1 / 2"
      >
        <Square size="40px" />
        <Divider h={100} />
        <Square size="40px" />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="3 / 4"
        gridRow="1 /2 "
      >
        <Divider h={180} />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="5 / 6"
        gridRow="1 / 2"
      >
        <Square size="40px" />
        <Divider h={100} />
        <Square size="40px" />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="7 / 8"
        gridRow="1 / 2"
      >
        <Divider h={180} />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="9 / 10"
        gridRow="1 / 2"
      >
        <Square size="40px" />
        <Divider h={100} />
        <Square size="40px" />
      </GridItem>
    </GridContainer>
  );
};
InGridContainer.storyName = "In Grid Container";

export const InATable: Story = () => {
  return (
    <FlatTable>
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Dish Name</FlatTableHeader>
          <FlatTableHeader>Ingredients</FlatTableHeader>
          <FlatTableHeader>Cooking Time</FlatTableHeader>
          <FlatTableHeader>Prep Time</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>Pancakes</FlatTableCell>
          <FlatTableCell>
            Eggs
            <Divider displayInline />
            Flour
            <Divider displayInline />
            Milk
          </FlatTableCell>
          <FlatTableCell>5 minutes</FlatTableCell>
          <FlatTableCell>5 minutes</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
InATable.storyName = "In a Table";

export const InAMenu: Story = () => {
  return (
    <Box minHeight={120}>
      <Menu menuType="dark">
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
  return (
    <Form
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      stickyFooter={false}
    >
      <Textbox label="Textbox" value="" onChange={() => {}} />
      <Textbox label="Textbox" value="" onChange={() => {}} />
      <Divider type="horizontal" mb={7} mt={7} />
      <Textbox label="Textbox" value="" onChange={() => {}} />
    </Form>
  );
};
InsideForm.storyName = "Inside Form";

export const InsideFormInlineLabels: Story = () => {
  return (
    <Form
      leftSideButtons={<Button>Cancel</Button>}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      stickyFooter={false}
    >
      <Textbox
        label="Textbox"
        labelAlign="right"
        labelInline
        labelWidth={10}
        inputWidth={50}
        value=""
        onChange={() => {}}
      />
      <Textbox
        label="Textbox"
        labelAlign="right"
        labelInline
        labelWidth={10}
        inputWidth={50}
        value=""
        onChange={() => {}}
      />
      <Box ml="10%" mr="40%">
        <Divider type="horizontal" mb={7} mt={7} />
      </Box>
      <Textbox
        label="Textbox"
        labelAlign="right"
        labelInline
        labelWidth={10}
        inputWidth={50}
        value=""
        onChange={() => {}}
      />
    </Form>
  );
};
InsideFormInlineLabels.storyName = "Inside Form with Inline Labels";

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
EnablingAdaptiveBehaviour.parameters = { chromatic: { disableSnapshot: true } };
