import React from "react";
import { StoryFn, StoryObj } from "@storybook/react";
import { userEvent, within, expect, waitFor } from "@storybook/test";

import TextEditor, { createFromHTML, Mention, MentionsPlugin } from ".";
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

const renderInitialValueEditor = () => (
  <TextEditor
    labelText="Text Editor"
    initialValue={createFromHTML(
      '<p><span>paragraph</span></p><p><span style="font-weight: 700; font-size: 24px; line-height: 30px;">title</span></p><p><span style="font-weight: 500; font-size: 21px; line-height: 26.25px;">subtitle</span></p><p><span style="font-weight: 500; font-size: 18px; line-height: 22.5px;">section header</span></p><p><span style="font-weight: 500; font-size: 16px; line-height: 20px;">section subheader&ZeroWidthSpace;</span></p>',
    )}
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

const selectAllTextAndApplyStyles = async (canvasElement: HTMLElement) => {
  if (!allowInteractions()) {
    return;
  }

  const canvas = within(canvasElement);
  const textbox = canvas.getByRole("textbox");

  await userEvent.click(textbox);

  await userEvent.keyboard("{Control>}a{/Control}");

  await userEvent.keyboard("{Control>}b{/Control}");
  await userEvent.keyboard("{Control>}u{/Control}");
  await userEvent.keyboard("{Control>}i{/Control}");

  await userEvent.click(textbox);
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

export const AppliesStylingCorrectly: Story = {
  render: renderInitialValueEditor,
  play: async ({ canvasElement }) => {
    await selectAllTextAndApplyStyles(canvasElement);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

AppliesStylingCorrectly.storyName = "Applies Styling Correctly";
AppliesStylingCorrectly.parameters = {
  chromatic: { disableSnapshot: false },
};
