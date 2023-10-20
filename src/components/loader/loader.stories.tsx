import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Loader from ".";
import Button from "../button/button.component";
import Box from "../box";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Loader> = {
  title: "Loader",
  component: Loader,
  argTypes: {
    ...styledSystemProps,
  },
  parameters: { chromatic: { disableSnapshot: true } },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = () => {
  return <Loader />;
};
Default.storyName = "Default";

export const WithGradientVariant: Story = () => <Loader variant="gradient" />;
WithGradientVariant.storyName = "With Gradient Variant";

export const Small: Story = () => {
  return <Loader size="small" />;
};
Small.storyName = "Small";

export const Large: Story = () => {
  return <Loader size="large" />;
};
Large.storyName = "Large";

export const InsideButtons: Story = () => {
  return (
    <>
      <Button buttonType="primary" aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} buttonType="primary" destructive aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} destructive aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} buttonType="tertiary" aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} buttonType="secondary" aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Button ml={2} buttonType="dashed" aria-label="Loading">
        <Loader isInsideButton />
      </Button>
      <Box id="dark-background" mt={2} p={2} width="fit-content" bg="#000000">
        <Button m={2} buttonType="darkBackground" aria-label="Loading">
          <Loader isInsideButton />
        </Button>
      </Box>
    </>
  );
};
InsideButtons.storyName = "Inside Buttons";
