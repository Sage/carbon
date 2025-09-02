import { StoryObj } from "@storybook/react";
import React from "react";

import Loader from ".";

import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof Loader>;

export default {
  title: "Loader/Interactions",
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
    info: { disable: true },
    themeProvider: { chromatic: { theme: "sage" } },
  },
  argTypes: {},
};

export const WithReducedMotion: Story = {
  render: () => <Loader />,

  play: () => {
    /**
     * This play function does nothing. It is here to
     * allow the story to be rendered with motion disabled.
     */
  },
  decorators: [
    (StoryToRender) => {
      return (
        <DefaultDecorator>
          <StoryToRender />
        </DefaultDecorator>
      );
    },
  ],
};

WithReducedMotion.storyName = "With Reduced Motion";
WithReducedMotion.parameters = {
  reducedMotion: true,
};

export const WithMotion: Story = {
  render: () => <Loader />,
  play: () => {
    /**
     * This play function does nothing. It is here to
     * allow the story to be rendered with motion enabled.
     */
  },
  decorators: [
    (StoryToRender) => {
      return (
        <DefaultDecorator>
          <StoryToRender />
        </DefaultDecorator>
      );
    },
  ],
};

WithMotion.storyName = "With Motion";
WithMotion.parameters = {
  reducedMotion: false,
};
