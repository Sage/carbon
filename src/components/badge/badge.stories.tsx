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
  const counter = 9;
  return (
    <Box margin="40px">
      <Badge
        counter={counter}
        onClick={() => {}}
        aria-label={`Remove ${counter} filters.`}
      >
        <Button mr={0} buttonType="tertiary">
          Filter
        </Button>
      </Badge>
    </Box>
  );
};
Default.storyName = "Default";

export const WithThreeDigits: Story = () => {
  const counter = 130;
  return (
    <Box margin="40px">
      <Badge
        counter={counter}
        onClick={() => {}}
        aria-label={`Remove ${counter} filters.`}
      >
        <Button mr={0} buttonType="tertiary">
          Filter
        </Button>
      </Badge>
    </Box>
  );
};
WithThreeDigits.storyName = "With Three Digits";

export const WithCounterZero: Story = () => {
  const counter = 0;
  return (
    <Box margin="40px">
      <Badge
        counter={counter}
        onClick={() => {}}
        aria-label={`Remove ${counter} filters.`}
      >
        <Button mr={0} buttonType="tertiary">
          Filter
        </Button>
      </Badge>
    </Box>
  );
};
WithCounterZero.storyName = "With Counter Zero";

export const DisplayOnly: Story = () => {
  const counter = 9;
  return (
    <Box margin="40px">
      <Badge counter={counter} id="badge-1">
        <Button mr={0} buttonType="tertiary" aria-describedby="badge-1">
          Filter
        </Button>
      </Badge>
    </Box>
  );
};
DisplayOnly.storyName = "Display Only";

export const CustomColor: Story = () => {
  const counter = 9;
  return (
    <Box margin="40px">
      <Badge
        counter={counter}
        onClick={() => {}}
        aria-label={`Remove ${counter} filters.`}
        color="--colorsSemanticNegative500"
      >
        <Button mr={0} buttonType="tertiary" destructive>
          Filter
        </Button>
      </Badge>
    </Box>
  );
};
CustomColor.storyName = "Custom Color";
