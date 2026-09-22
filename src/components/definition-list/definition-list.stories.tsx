import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";
import { Dd, Dl, Dt } from ".";
import Box from "../box";
import Link from "../link";
import Pill from "../pill";

const styledSystemProps = generateStyledSystemProps({ spacing: true });

const meta: Meta<typeof Dl> = {
  title: "Definition List",
  component: Dl,
  argTypes: styledSystemProps,
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
          <Dt>Small spacing</Dt>
          <Dd>4px between pairs</Dd>
          <Dt>Account status</Dt>
          <Dd>Open</Dd>
        </Dl>
      </Box>
      <Box mb={4}>
        <Dl spacing="medium">
          <Dt>Medium spacing</Dt>
          <Dd>12px between pairs</Dd>
          <Dt>Account status</Dt>
          <Dd>Open</Dd>
        </Dl>
      </Box>
      <Box mb={4}>
        <Dl spacing="small" divider>
          <Dt>Small spacing with dividers</Dt>
          <Dd>4px between pairs</Dd>
          <Dt>Account status</Dt>
          <Dd>Open</Dd>
        </Dl>
      </Box>
      <Dl spacing="medium" divider>
        <Dt>Medium spacing with dividers</Dt>
        <Dd>12px between pairs</Dd>
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
      <Dd>Newcastle</Dd>
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
    <Dl divider>
      <Dt>Account holder</Dt>
      <Dd rightChildren={<Pill>Verified</Pill>}>Sage Ltd</Dd>
      <Dd rightChildren={<Link href="#">Edit</Link>}>123 North East Street</Dd>
      <Dd rightChildren={<Link href="#">Edit</Link>}>Newcastle</Dd>
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
