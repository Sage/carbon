import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import { Dd, Dl, Dt } from ".";
import Box from "../box";
import Link from "../link";
import Pill from "../pill";
import { Tile } from "../tile";

const styledSystemProps = generateStyledSystemProps({ spacing: true });

const meta: Meta<typeof Dl> = {
  title: "Definition List",
  component: Dl,
  argTypes: styledSystemProps,
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof Dl>;

export const Horizontal: Story = {
  render: () => (
    <Dl>
      <Dt>Account number</Dt>
      <Dd>12345678</Dd>
      <Dt>Account type</Dt>
      <Dd>Business current account</Dd>
      <Dt>Account status</Dt>
      <Dd>Open</Dd>
    </Dl>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Dl asSingleColumn>
      <Dt>Account number</Dt>
      <Dd>12345678</Dd>
      <Dt>Account type</Dt>
      <Dd>Business current account</Dd>
      <Dt>Account status</Dt>
      <Dd>Open</Dd>
    </Dl>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <Dl divider>
      <Dt>Account number</Dt>
      <Dd>12345678</Dd>
      <Dt>Account type</Dt>
      <Dd>Business current account</Dd>
      <Dt>Account status</Dt>
      <Dd>Open</Dd>
    </Dl>
  ),
};

export const Spacing: Story = {
  render: () => (
    <Box>
      <Box mb={4}>
        <Dl spacing="small">
          <Dt>Small pair padding</Dt>
          <Dd>4px bottom padding per pair (4px between pair content)</Dd>
          <Dt>Account status</Dt>
          <Dd>Open</Dd>
        </Dl>
      </Box>
      <Box mb={4}>
        <Dl spacing="large">
          <Dt>Large pair padding</Dt>
          <Dd>12px bottom padding per pair (12px between pair content)</Dd>
          <Dt>Account status</Dt>
          <Dd>Open</Dd>
        </Dl>
      </Box>
      <Box mb={4}>
        <Dl spacing="small" divider>
          <Dt>Small pair padding with dividers</Dt>
          <Dd>4px top and bottom per pair (8px between pair content)</Dd>
          <Dt>Account status</Dt>
          <Dd>Open</Dd>
        </Dl>
      </Box>
      <Dl spacing="large" divider>
        <Dt>Large pair padding with dividers</Dt>
        <Dd>12px top and bottom per pair (24px between pair content)</Dd>
        <Dt>Account status</Dt>
        <Dd>Open</Dd>
      </Dl>
    </Box>
  ),
};

export const MultipleDescriptions: Story = {
  render: () => (
    <Dl divider>
      <Dt>Account holder</Dt>
      <Dd>Sage Ltd</Dd>
      <Dd>123 North East Street</Dd>
      <Dt>Account status</Dt>
      <Dd>Open</Dd>
      <Dt>Company number</Dt>
      <Dd>01234567</Dd>
      <Dt>VAT number</Dt>
      <Dd>123456789</Dd>
      <Dt>SIC</Dt>
      <Dd>01110</Dd>
    </Dl>
  ),
};

export const MultipleDescriptionsWithRightChildren: Story = {
  render: () => (
    <Box>
      <Tile mb={4}>
        <Dl divider>
          <Dt>Account holder</Dt>
          <Dd rightChildren={<Pill>Verified</Pill>}>Sage Ltd</Dd>
          <Dd rightChildren={<Link href="#">Edit</Link>}>
            123 North East Street
          </Dd>
          <Dt>Account status</Dt>
          <Dd>Open</Dd>
          <Dt>Company number</Dt>
          <Dd>01234567</Dd>
          <Dt>VAT number</Dt>
          <Dd>123456789</Dd>
          <Dt>SIC</Dt>
          <Dd>01110</Dd>
        </Dl>
      </Tile>
      <Tile>
        <Dl>
          <Dt>Registered address</Dt>
          <Dd rightChildren={<Pill>Verified</Pill>}>
            Sage Ltd, 123 North East Street, Newcastle upon Tyne, NE28 9EJ
          </Dd>
          <Dt>Account status</Dt>
          <Dd>Open</Dd>
          <Dt>Company number</Dt>
          <Dd>01234567</Dd>
          <Dt>VAT number</Dt>
          <Dd>123456789</Dd>
          <Dt>SIC</Dt>
          <Dd>01110</Dd>
        </Dl>
      </Tile>
    </Box>
  ),
};

export const WithRightChildren: Story = {
  render: () => (
    <Dl divider>
      <Dt>Term</Dt>
      <Dd rightChildren={<Pill>Pending</Pill>}>Description</Dd>
      <Dt>Account status</Dt>
      <Dd rightChildren={<Link href="#statements">View statements</Link>}>
        Open
      </Dd>
    </Dl>
  ),
};
