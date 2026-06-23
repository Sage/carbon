import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableCell,
} from ".";

const meta: Meta<typeof FlatTable> = {
  title: "Flat Table/Color theming",
  component: FlatTable,
};

export default meta;
type Story = StoryObj<typeof FlatTable>;

export const TransparentWhiteTheme: Story = () => {
  return (
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
  );
};

TransparentWhiteTheme.storyName = "With white header row";

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
TransparentBaseTheme.storyName = "With light grey header row";

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

LightTheme.storyName = "With grey header row";

export const MinimalDesign = () => {
  return (
    <FlatTable
      colorTheme="transparent-white"
      hasOuterVerticalBorders={false}
      bottomBorderRadius="borderRadius000"
    >
      <FlatTableHead>
        <FlatTableRow horizontalBorderSize="medium">
          <FlatTableHeader px="0">Header a</FlatTableHeader>
          <FlatTableHeader px="0">Header b</FlatTableHeader>
          <FlatTableHeader px="0">Header c</FlatTableHeader>
          <FlatTableHeader px="0">Header d</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow horizontalBorderColor="--colorsUtilityMajor050">
          <FlatTableCell px="0">Cell a</FlatTableCell>
          <FlatTableCell px="0">Cell b</FlatTableCell>
          <FlatTableCell px="0">Cell c</FlatTableCell>
          <FlatTableCell px="0">Cell d</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow horizontalBorderColor="--colorsUtilityMajor050">
          <FlatTableCell px="0">Cell a</FlatTableCell>
          <FlatTableCell px="0">Cell b</FlatTableCell>
          <FlatTableCell px="0">Cell c</FlatTableCell>
          <FlatTableCell px="0">Cell d</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow horizontalBorderColor="--colorsUtilityMajor050">
          <FlatTableCell px="0">Cell a</FlatTableCell>
          <FlatTableCell px="0">Cell b</FlatTableCell>
          <FlatTableCell px="0">Cell c</FlatTableCell>
          <FlatTableCell px="0">Cell d</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow horizontalBorderColor="--colorsUtilityMajor050">
          <FlatTableCell px="0">Cell a</FlatTableCell>
          <FlatTableCell px="0">Cell b</FlatTableCell>
          <FlatTableCell px="0">Cell c</FlatTableCell>
          <FlatTableCell px="0">Cell d</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
MinimalDesign.storyName = "Minimal Design";
MinimalDesign.parameters = { chromatic: { disableSnapshot: false } };
