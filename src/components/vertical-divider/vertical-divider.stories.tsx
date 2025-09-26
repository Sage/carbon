import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import styled from "styled-components";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Dialog from "../dialog";
import Button from "../button";
import Box from "../box";
import { Tile, TileContent } from "../tile";
import Content from "../content";
import Icon from "../icon";
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
import VerticalDivider from ".";

const styledSystemProps = generateStyledSystemProps(
  {
    spacing: true,
  },
  { p: "3" },
);

const meta: Meta<typeof VerticalDivider> = {
  title: "Deprecated/Vertical Divider",
  component: VerticalDivider,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof VerticalDivider>;

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
    <Box display="inline-flex">
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
      <VerticalDivider />
      <Square />
    </Box>
  );
};
Default.storyName = "Default";

export const InAFlexContainer: Story = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height={24}>
      <Icon type="home" />
      <VerticalDivider h={16} />
      <Icon type="settings" />
      <VerticalDivider h={16} />
      <Icon type="add" />
      <VerticalDivider h={16} />
      <Icon type="minus" />
      <VerticalDivider h={16} />
      <Icon type="info" />
      <VerticalDivider h={16} />
      <Icon type="warning" />
      <VerticalDivider h={16} />
      <Icon type="chevron_up" />
      <VerticalDivider h={16} />
      <Icon type="chevron_down" />
      <VerticalDivider h={16} />
      <Icon type="edit" />
    </Box>
  );
};
InAFlexContainer.storyName = "In a Flex Container";

export const InANonFlexContainer: Story = () => {
  return (
    <Box display="inline-block" width={620} height="auto" my={0} mx={180}>
      <Icon type="home" />
      <VerticalDivider displayInline />
      <Icon type="settings" />
      <VerticalDivider displayInline />
      <Icon type="add" />
      <VerticalDivider displayInline />
      <Icon type="minus" />
      <VerticalDivider displayInline />
      <Icon type="info" />
      <VerticalDivider displayInline />
      <Icon type="warning" />
      <VerticalDivider displayInline />
      <Icon type="chevron_up" />
      <VerticalDivider displayInline />
      <Icon type="chevron_down" />
      <VerticalDivider displayInline />
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
        <VerticalDivider h="100px" pt={1} pb={1} />
        <Square />
      </Box>
      <VerticalDivider pl={1} pr={1} h={185} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={2} pb={2} />
        <Square />
      </Box>
      <VerticalDivider pl={2} pr={2} h={200} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={3} pb={3} />
        <Square />
      </Box>
      <VerticalDivider pl={3} pr={3} h={215} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={4} pb={4} />
        <Square />
      </Box>
      <VerticalDivider pl={4} pr={4} h={230} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={5} pb={5} />
        <Square />
      </Box>
      <VerticalDivider pl={5} pr={5} h={245} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={6} pb={6} />
        <Square />
      </Box>
      <VerticalDivider pl={6} pr={6} h={260} />
      <Box>
        <Square />
        <VerticalDivider h="100px" pt={7} pb={7} />
        <Square />
      </Box>
    </Box>
  );
};
WithCustomSpacingHeight.storyName = "With Custom Spacing Height";

export const WithCustomTint: Story = () => {
  return (
    <Box display="inline-flex">
      <Square />
      <VerticalDivider tint={20} />
      <Square />
      <VerticalDivider tint={75} />
      <Square />
      <VerticalDivider tint={80} />
      <Square />
      <VerticalDivider tint={90} />
      <Square />
    </Box>
  );
};
WithCustomTint.storyName = "With Custom Tint";

export const InADialog: Story = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Click Me</Button>
      <Dialog title="Title" open={isOpen} onCancel={() => setIsOpen(false)}>
        <Box display="inline-flex">
          <Square />
          <VerticalDivider />
          <Square />
          <VerticalDivider />
          <Square />
          <VerticalDivider />
          <Square />
          <VerticalDivider />
          <Square />
          <VerticalDivider />
          <Square />
          <VerticalDivider />
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
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
          <Square size="40px" />
          <VerticalDivider pt={1} pb={1} pl={3} pr={3} />
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
        <VerticalDivider h={100} />
        <Square size="40px" />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="3 / 4"
        gridRow="1 /2 "
      >
        <VerticalDivider h={180} />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="5 / 6"
        gridRow="1 / 2"
      >
        <Square size="40px" />
        <VerticalDivider h={100} />
        <Square size="40px" />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="7 / 8"
        gridRow="1 / 2"
      >
        <VerticalDivider h={180} />
      </GridItem>
      <GridItem
        alignSelf="stretch"
        justifySelf="stretch"
        gridColumn="9 / 10"
        gridRow="1 / 2"
      >
        <Square size="40px" />
        <VerticalDivider h={100} />
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
            <VerticalDivider displayInline />
            Flour
            <VerticalDivider displayInline />
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
        <VerticalDivider height={24} p={1} tint={20} />
        <MenuItem submenu="Menu Item Three">
          <MenuItem href="#">Item Submenu One</MenuItem>
          <MenuItem href="#">Item Submenu Two</MenuItem>
        </MenuItem>
      </Menu>
    </Box>
  );
};
InAMenu.storyName = "In a Menu";
