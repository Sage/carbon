import React from "react";
import { StoryObj } from "@storybook/react";
import LinkPreview from ".";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import { action } from "@storybook/addon-actions";
type Story = StoryObj<typeof LinkPreview>;

export default {
  title: "Link Preview/Interactions",
  parameters: {
    info: { disable: true },
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: {
      disableSnapshot: false,
    },
  },
};

export const Focus: Story = {
  render: () => (
    <LinkPreview
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Captain, why are we out here chasing comets?"
    />
  ),
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
Focus.storyName = "Focus and hover state";
Focus.parameters = {
  pseudo: {
    focus: true,
    hover: true,
  },
};

export const closeIconFocus: Story = {
  render: () => (
    <LinkPreview
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Captain, why are we out here chasing comets?"
      as="div"
      onClose={(url) => action("close icon clicked")(url)}
    />
  ),
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
closeIconFocus.storyName = "Close Icon Focus";
closeIconFocus.parameters = {
  pseudo: {
    focus: true,
  },
};
