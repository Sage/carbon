import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Badge from ".";
import Button from "../button";
import Box from "../box";

const meta: Meta<typeof Badge> = {
  title: "Badge",
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = () => {
  return (
    <Box margin="40px">
      <Badge counter={9} onClick={() => {}}>
        <Button mr={0} buttonType="tertiary">
          Filter
        </Button>
      </Badge>
    </Box>
  );
};
Default.storyName = "Default";

export const WithThreeDigits: Story = () => {
  return (
    <Box margin="40px">
      <Badge counter={130} onClick={() => {}}>
        <Button mr={0} buttonType="tertiary">
          Filter
        </Button>
      </Badge>
    </Box>
  );
};
WithThreeDigits.storyName = "With Three Digits";

export const WithCounterZero: Story = () => {
  return (
    <Box margin="40px">
      <Badge counter={0} onClick={() => {}}>
        <Button buttonType="tertiary">Filter</Button>
      </Badge>
    </Box>
  );
};
WithCounterZero.storyName = "With Counter Zero";

export const DisplayOnly: Story = () => {
  return (
    <Box margin="40px">
      <Badge counter={9} aria-label="The counter is currently displaying 9">
        <Button mr={0} buttonType="tertiary">
          Filter
        </Button>
      </Badge>
    </Box>
  );
};
DisplayOnly.storyName = "Display Only";

export const CustomColor: Story = () => {
  return (
    <Box margin="40px">
      <Badge counter={9} onClick={() => {}} color="--colorsSemanticNegative500">
        <Button mr={0} buttonType="tertiary" destructive>
          Filter
        </Button>
      </Badge>
    </Box>
  );
};
CustomColor.storyName = "Custom Color";
