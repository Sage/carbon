import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Button from "../button";
import Skeleton from "../skeleton";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Skeleton> = {
  title: "Skeleton",
  component: Skeleton,
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = () => {
  return <Skeleton loading />;
};
Default.storyName = "Default";

export const WithLines: Story = () => {
  return <Skeleton loading lines={6} />;
};
WithLines.storyName = "With Lines";

export const WithChildren: Story = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleOnClick = () => {
    setIsLoading(!isLoading);
  };
  return (
    <>
      <Skeleton loading={isLoading} lines={3}>
        This the where the children are rendered
      </Skeleton>
      <Button mt={2} onClick={handleOnClick}>
        {isLoading ? "Click to preview children" : "Click to see loading state"}
      </Button>
    </>
  );
};
WithChildren.storyName = "With Children";

export const WithWidth: Story = () => {
  return <Skeleton loading width="256px" />;
};
WithWidth.storyName = "With Width";

export const WithHeight: Story = () => {
  return <Skeleton loading height="256px" />;
};
WithHeight.storyName = "With Height";

export const Shapes: Story = () => {
  return (
    <>
      <Skeleton mb={2} loading shape="rectangle-moderate" />
      <Skeleton mb={2} loading shape="rectangle-curved" />
      <Skeleton loading shape="circle" />
    </>
  );
};
Shapes.storyName = "Shapes";

export const DisableAnimation: Story = () => {
  return <Skeleton loading disableAnimation />;
};
DisableAnimation.storyName = "Disable Animation";

export const HeightPresets: Story = () => {
  return (
    <>
      <Skeleton loading height="h1" />
      <Skeleton loading height="h2" />
      <Skeleton loading height="h3" />
      <Skeleton loading height="h4" />
      <Skeleton loading height="paragraph" />
      <Skeleton loading height="button" />
    </>
  );
};
HeightPresets.storyName = "Height Presets";
