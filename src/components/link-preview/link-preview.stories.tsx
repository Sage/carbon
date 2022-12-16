import React from "react";
import { ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import LinkPreview from ".";

export const DefaultStory: ComponentStory<typeof LinkPreview> = () => {
  return (
    <LinkPreview
      title="This is an example of a title"
      url="https://www.sage.com"
      description="Captain, why are we out here chasing comets?"
    />
  );
};

export const LinkPreviewLoadingState: ComponentStory<
  typeof LinkPreview
> = () => <LinkPreview isLoading />;

export const LinkPreviewCloseIcon: ComponentStory<typeof LinkPreview> = () => {
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
