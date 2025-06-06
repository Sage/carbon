import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../.storybook/utils/styled-system-props";

import Loader from ".";
import Button from "../button/button.component";

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

export const InsideButton: Story = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mimicLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  const handleButtonClick = () => {
    mimicLoading();
  };
  const buttonContent = isLoading ? <Loader isInsideButton /> : "Click me";

  return (
    <div aria-live="polite">
      <Button m={2} buttonType="primary" onClick={handleButtonClick}>
        {buttonContent}
      </Button>
    </div>
  );
};
InsideButton.storyName = "Inside Button";

export const ConditionalRendering = () => {
  const [isLoading, setIsLoading] = useState(false);
  const mimicLoading = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  const handleButtonClick = () => {
    mimicLoading();
  };

  return (
    <div aria-live="polite">
      <Button m={2} buttonType="primary" onClick={handleButtonClick}>
        Render Loader
      </Button>

      {isLoading ? <Loader /> : "Content to Load"}
    </div>
  );
};
ConditionalRendering.storyName = "Conditional Rendering";
