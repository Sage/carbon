import React from "react";
import { StoryFn, StoryObj } from "@storybook/react";
import { userEvent, within, expect, waitFor } from "@storybook/test";

import TextEditor, { Mention, MentionsPlugin } from ".";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof TextEditor>;

export default {
  title: "Text Editor/Interactions",
  component: TextEditor,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [(StoryToRender: StoryFn) => <StoryToRender />],
};

const mentionsData: Mention[] = [
  {
    id: "1",
    name: "Amanda Ball",
  },
  {
    id: "2",
    name: "Anaya Underwood",
    initials: "AU",
  },
  {
    id: "3",
    name: "Alastair Cox",
    initials: "AC",
  },
  {
    id: "4",
    name: "Anwar al-Awlaki",
    src: "https://loremfaces.net/24/id/2.jpg",
  },
  {
    id: "5",
    name: "Angela Alabaster",
    src: "https://loremfaces.net/24/id/1.jpg",
  },
  {
    id: "6",
    name: "Alfred Jones",
    iconType: "accessibility_web",
  },
];

const renderMentionsEditor = () => (
  <TextEditor
    namespace="storybook-mentions-interaction"
    labelText="Text Editor"
    inputHint="Type '@' to mention someone"
    customPlugins={[
      <MentionsPlugin
        namespace="storybook-mentions-interaction"
        searchOptions={mentionsData}
      />,
    ]}
  />
);

const openMentionsAndHighlightOption = async (
  canvasElement: HTMLElement,
  optionIndex: number,
  query = "@a",
) => {
  if (!allowInteractions()) {
    return;
  }

  const canvas = within(canvasElement);
  const textbox = canvas.getByRole("textbox");

  await userEvent.click(textbox);
  await userEvent.type(textbox, query, { delay: 75 });

  await waitFor(() => {
    const mentionList = canvasElement.ownerDocument.querySelector(
      "ul[data-role='mention-list']",
    );

    expect(mentionList).toBeVisible();
  });

  for (let i = 0; i < optionIndex; i += 1) {
    await userEvent.keyboard("{ArrowDown}");
  }
};

export const OpenMentionsPopoverDefaultAvatar: Story = {
  render: renderMentionsEditor,
  play: async ({ canvasElement }) => {
    await openMentionsAndHighlightOption(canvasElement, 0);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

OpenMentionsPopoverDefaultAvatar.storyName =
  "Open Mentions Popover - Highlight Default Avatar";
OpenMentionsPopoverDefaultAvatar.parameters = {
  chromatic: { disableSnapshot: false },
};

export const OpenMentionsPopoverInitials: Story = {
  render: renderMentionsEditor,
  play: async ({ canvasElement }) => {
    await openMentionsAndHighlightOption(canvasElement, 1);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

OpenMentionsPopoverInitials.storyName =
  "Open Mentions Popover - Highlight Initials";
OpenMentionsPopoverInitials.parameters = {
  chromatic: { disableSnapshot: false },
};

export const OpenMentionsPopoverProfileImage: Story = {
  render: renderMentionsEditor,
  play: async ({ canvasElement }) => {
    await openMentionsAndHighlightOption(canvasElement, 2, "@an");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

OpenMentionsPopoverProfileImage.storyName =
  "Open Mentions Popover - Highlight Profile Image";
OpenMentionsPopoverProfileImage.parameters = {
  chromatic: { disableSnapshot: false },
};
