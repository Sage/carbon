import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Button from "../button";
import Preview from "./preview.component";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof Preview> = {
  title: "Preview",
  component: Preview,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof Preview>;

export const Default: Story = () => {
  return <Preview loading />;
};
Default.storyName = "Default";

export const WithLines: Story = () => {
  return <Preview loading lines={6} />;
};
WithLines.storyName = "With Lines";

export const WithChildren: Story = () => {
  const [isLoading, setIsLoading] = useState(true);
  const handleOnClick = () => {
    setIsLoading(!isLoading);
  };
  return (
    <>
      <Preview loading={isLoading} lines={3}>
        This the where the children are rendered
      </Preview>
      <Button mt={2} onClick={handleOnClick}>
        {isLoading ? "Click to preview children" : "Click to see loading state"}
      </Button>
    </>
  );
};
WithChildren.storyName = "With Children";

export const WithWidth: Story = () => {
  return <Preview loading width="256px" />;
};
WithWidth.storyName = "With Width";

export const WithHeight: Story = () => {
  return <Preview loading height="256px" />;
};
WithHeight.storyName = "With Height";
