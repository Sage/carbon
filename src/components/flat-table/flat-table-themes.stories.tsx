import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Box from "../box";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableCell,
} from ".";

const meta: Meta<typeof FlatTable> = {
  title: "Flat Table/Color Themes",
  component: FlatTable,
};

export default meta;
type Story = StoryObj<typeof FlatTable>;

export const TransparentWhiteTheme: Story = () => {
  return (
    <Box>
      <FlatTable colorTheme="transparent-white">
        <FlatTableHead>
          <FlatTableRow>
            <FlatTableHeader>Name</FlatTableHeader>
            <FlatTableHeader>Location</FlatTableHeader>
            <FlatTableHeader>Relationship Status</FlatTableHeader>
            <FlatTableHeader>Dependents</FlatTableHeader>
          </FlatTableRow>
        </FlatTableHead>
        <FlatTableBody>
          <FlatTableRow>
            <FlatTableCell>John Doe</FlatTableCell>
            <FlatTableCell>London</FlatTableCell>
            <FlatTableCell>Single</FlatTableCell>
            <FlatTableCell>0</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane Doe</FlatTableCell>
            <FlatTableCell>York</FlatTableCell>
            <FlatTableCell>Married</FlatTableCell>
            <FlatTableCell>2</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>John Smith</FlatTableCell>
            <FlatTableCell>Edinburgh</FlatTableCell>
            <FlatTableCell>Single</FlatTableCell>
            <FlatTableCell>1</FlatTableCell>
          </FlatTableRow>
          <FlatTableRow>
            <FlatTableCell>Jane Smith</FlatTableCell>
            <FlatTableCell>Newcastle</FlatTableCell>
            <FlatTableCell>Married</FlatTableCell>
            <FlatTableCell>5</FlatTableCell>
          </FlatTableRow>
        </FlatTableBody>
      </FlatTable>
    </Box>
  );
};

TransparentWhiteTheme.storyName = "Transparent White Theme";

export const TransparentBaseTheme: Story = () => {
  return (
    <FlatTable colorTheme="transparent-base">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
TransparentBaseTheme.storyName = "Transparent Base Theme";

export const LightTheme: Story = () => {
  return (
    <FlatTable colorTheme="light">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>Name</FlatTableHeader>
          <FlatTableHeader>Location</FlatTableHeader>
          <FlatTableHeader>Relationship Status</FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};

LightTheme.storyName = "Light Theme";
