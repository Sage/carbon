import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import Badge from ".";
import Button from "../button";
import Box from "../box";
import Icon from "../icon";

const meta: Meta<typeof Badge> = {
  title: "Badge",
  component: Badge,
  argTypes: {
    counter: {
      control: {
        type: "text",
      },
    },
  },
  decorators: [
    (Story) => (
      <Box
        p={3}
        display="flex"
        justifyContent="center"
        gap={2}
        backgroundColor="--colorsUtilityMajor025"
      >
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = ({ ...args }) => {
  return (
    <>
      <Badge id="badge-default-1" counter={9} {...args} />
      <Badge id="badge-default-2" counter={99} {...args} />
      <Badge id="badge-default-3" counter="99+" {...args} />
      <Badge id="badge-default-4" counter="999+" {...args} />
    </>
  );
};
Default.storyName = "Default";

export const WithChildren: Story = ({ ...args }) => {
  return (
    <Badge id="badge-button" counter={99} {...args}>
      <Button buttonType="secondary" aria-describedby="badge-button">
        Filter
      </Button>
    </Badge>
  );
};
WithChildren.storyName = "With Children";

export const Sizes: Story = ({ ...args }) => {
  return (
    <>
      <Badge id="badge-small" counter={99} size="small" {...args}>
        <Icon type="alert" color="black" />
      </Badge>
      <Badge id="badge-medium" counter={99} size="medium" {...args} />
      <Badge id="badge-large" counter={99} size="large" {...args} />
    </>
  );
};
Sizes.storyName = "Sizes";

export const SubtleVariant: Story = ({ ...args }) => {
  return (
    <>
      <Badge id="badge-subtle-small" counter={99} size="small" {...args}>
        <Icon type="alert" color="black" />
      </Badge>
      <Badge id="badge-subtle-medium" counter={99} size="medium" {...args} />
      <Badge id="badge-subtle-large" counter={99} size="large" {...args} />
    </>
  );
};
SubtleVariant.storyName = "Subtle Variant";
SubtleVariant.args = {
  variant: "subtle",
};

export const Inverse: Story = ({ ...args }) => {
  return (
    <>
      <Badge id="badge-inverse-small" counter={99} size="small" {...args}>
        <Icon type="alert" color="white" />
      </Badge>
      <Badge id="badge-inverse-medium" counter={99} size="medium" {...args} />
      <Badge id="badge-inverse-large" counter={99} size="large" {...args} />

      <Badge
        id="badge-icon"
        counter={99}
        size="small"
        variant="subtle"
        {...args}
      >
        <Icon type="alert" color="white" />
      </Badge>
      <Badge
        id="badge-subtle-inverse-medium"
        counter={99}
        size="medium"
        variant="subtle"
        {...args}
      />
      <Badge
        id="badge-subtle-inverse-large"
        counter={99}
        size="large"
        variant="subtle"
        {...args}
      />
    </>
  );
};
Inverse.storyName = "Inverse";
Inverse.args = {
  inverse: true,
};
Inverse.decorators = [
  (Story) => (
    <Box p={3} display="flex" gap={2} backgroundColor="--colorsUtilityYin090">
      <Story />
    </Box>
  ),
];

export const WithOnClick: Story = ({ ...args }) => {
  const counter = 9;
  return (
    <Badge
      id="badge-onclick"
      counter={counter}
      onClick={() => {}}
      aria-label={`Remove ${counter} filters.`}
      {...args}
    >
      <Button aria-describedby="badge-onclick" buttonType="secondary">
        Filter
      </Button>
    </Badge>
  );
};
WithOnClick.storyName = "With OnClick";
WithOnClick.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};

export const CustomColor: Story = ({ ...args }) => {
  const counter = 9;
  return (
    <Badge
      id="badge-custom-color"
      counter={counter}
      onClick={() => {}}
      aria-label={`Remove ${counter} filters.`}
      color="--colorsSemanticNegative500"
      {...args}
    >
      <Button
        aria-describedby="badge-custom-color"
        buttonType="secondary"
        destructive
      >
        Filter
      </Button>
    </Badge>
  );
};
CustomColor.storyName = "Custom Color";
