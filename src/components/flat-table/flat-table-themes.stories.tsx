import React from "react";
import {
  FlatTable,
  FlatTableHead,
  FlatTableBody,
  FlatTableRow,
  FlatTableHeader,
  FlatTableCell,
} from ".";
import Box from "../box";

export const TransparentWhiteTheme = () => {
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

TransparentWhiteTheme.storyName = "transparent-white theme";

export const TransparentBaseTheme = () => {
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

TransparentBaseTheme.storyName = "transparent-base theme";

export const LightTheme = () => {
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

LightTheme.storyName = "light theme";
