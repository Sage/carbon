import React from "react";
import { Meta, StoryObj } from "@storybook/react-vite";
import { action } from "storybook/actions";

import LinkPreview from ".";

const meta: Meta<typeof LinkPreview> = {
  title: "Link Preview",
  component: LinkPreview,
};

export default meta;
type Story = StoryObj<typeof LinkPreview>;

export const DefaultStory: Story = () => {
  return (
    <LinkPreview
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Captain, why are we out here chasing comets?"
    />
  );
};
DefaultStory.storyName = "Default";

export const LinkPreviewLoadingState: Story = () => {
  return <LinkPreview isLoading />;
};
LinkPreviewLoadingState.storyName = "Link Preview Loading State";

export const LinkPreviewCloseIcon: Story = () => {
  return (
    <LinkPreview
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Captain, why are we out here chasing comets?"
      as="div"
      onClose={(url) => action("close icon clicked")(url)}
    />
  );
};
LinkPreviewCloseIcon.storyName = "Link Preview Close Icon";
