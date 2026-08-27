import React from "react";
import { StoryFn, StoryObj } from "@storybook/react-vite";
import { userEvent, within, expect, waitFor } from "storybook/test";

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

const renderMentionsEditor = ({ ...args }) => (
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
    {...args}
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

const headerButtons = (
  <>
    <button type="button">Header button 1</button>
    <button type="button">Header button 2</button>
    <button type="button">Header button 3</button>
  </>
);

const footerButtons = (
  <>
    <button type="button">Footer button 1</button>
    <button type="button">Footer button 2</button>
    <button type="button">Footer button 3</button>
  </>
);

const expectFocusAfterTab = async (element: HTMLElement) => {
  await userEvent.tab();
  await expect(element).toHaveFocus();
};

const testTabFocusOrder = async (
  canvasElement: HTMLElement,
  withSaveButton = false,
) => {
  if (!allowInteractions()) {
    return;
  }

  const canvas = within(canvasElement);
  const focusOrder = [
    canvas.getByRole("button", { name: "Header button 1" }),
    canvas.getByRole("button", { name: "Header button 2" }),
    canvas.getByRole("button", { name: "Header button 3" }),
    canvas.getByRole("combobox", { name: "Heading type" }),
    ...(withSaveButton ? [canvas.getByRole("button", { name: "Save" })] : []),
    canvas.getByRole("textbox"),
    canvas.getByRole("button", { name: "Footer button 1" }),
    canvas.getByRole("button", { name: "Footer button 2" }),
    canvas.getByRole("button", { name: "Footer button 3" }),
  ];

  for (const element of focusOrder) {
    await expectFocusAfterTab(element);
  }
};

export const BasicTabFocusOrder: Story = {
  render: () => (
    <TextEditor
      namespace="storybook-basic-tab-focus-order"
      labelText="Text Editor"
      header={headerButtons}
      footer={footerButtons}
    />
  ),
  play: async ({ canvasElement }) => {
    await testTabFocusOrder(canvasElement);
  },
};

BasicTabFocusOrder.storyName = "Basic Tab Focus Order";
BasicTabFocusOrder.parameters = { chromatic: { disableSnapshot: true } };

export const TabFocusOrderWithSave: Story = {
  render: () => (
    <TextEditor
      namespace="storybook-save-tab-focus-order"
      labelText="Text Editor"
      header={headerButtons}
      footer={footerButtons}
      onSave={() => undefined}
    />
  ),
  play: async ({ canvasElement }) => {
    await testTabFocusOrder(canvasElement, true);
  },
};

TabFocusOrderWithSave.storyName = "Tab Focus Order With Save";
TabFocusOrderWithSave.parameters = { chromatic: { disableSnapshot: true } };

export const ToolbarKeyboardNavigation: Story = {
  render: () => (
    <TextEditor
      namespace="storybook-toolbar-keyboard-navigation"
      labelText="Text Editor"
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const typographyButton = canvas.getByRole("combobox", {
      name: "Heading type",
    });
    const boldButton = canvas.getByRole("button", { name: "Bold" });
    const hyperlinkButton = canvas.getByRole("button", { name: "Hyperlink" });

    await expectFocusAfterTab(typographyButton);
    await userEvent.keyboard("{ArrowRight}");
    await expect(boldButton).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    await expect(typographyButton).toHaveFocus();
    await userEvent.keyboard("{End}");
    await expect(hyperlinkButton).toHaveFocus();
    await userEvent.keyboard("{Home}");
    await expect(typographyButton).toHaveFocus();
  },
};

ToolbarKeyboardNavigation.storyName = "Toolbar Keyboard Navigation";
ToolbarKeyboardNavigation.parameters = {
  chromatic: { disableSnapshot: true },
};

export const OpenMentionsPopoverDefaultAvatar: Story = {
  render: renderMentionsEditor,
  play: async ({ canvasElement }) => {
    await openMentionsAndHighlightOption(canvasElement, 0);
  },
  args: {
    size: "small",
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
  "Open Mentions Popover - Highlight Default Avatar (Small)";

export const OpenMentionsPopoverInitials: Story = {
  render: renderMentionsEditor,
  play: async ({ canvasElement }) => {
    await openMentionsAndHighlightOption(canvasElement, 1);
  },
  args: {
    size: "medium",
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
  "Open Mentions Popover - Highlight Initials (Medium)";

export const OpenMentionsPopoverProfileImage: Story = {
  render: renderMentionsEditor,
  play: async ({ canvasElement }) => {
    await openMentionsAndHighlightOption(canvasElement, 2, "@an");
  },
  args: {
    size: "large",
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
  "Open Mentions Popover - Highlight Profile Image (Large)";

export const OpenHyperlinkDialog: Story = {
  render: () => (
    <TextEditor
      namespace="storybook-hyperlink-interaction"
      labelText="Text Editor"
      inputHint="Click the link button to add a hyperlink"
      toolbarControls={["link"]}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const hyperlinkButton = canvasElement.ownerDocument.querySelector(
      "button[data-role='storybook-hyperlink-interaction-hyperlink-button']",
    );

    if (hyperlinkButton) {
      await userEvent.click(hyperlinkButton);
    }

    await waitFor(() => {
      const hyperlinkDialog = canvasElement.ownerDocument.querySelector(
        "div[data-role='storybook-hyperlink-interaction-hyperlink-dialog']",
      );

      expect(hyperlinkDialog).toBeVisible();
    });
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const OpenHyperlinkDialogWithErrors: Story = {
  render: () => (
    <TextEditor
      namespace="storybook-hyperlink-interaction"
      labelText="Text Editor"
      inputHint="Click the link button to add a hyperlink"
      toolbarControls={["link"]}
    />
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const hyperlinkButton = canvasElement.ownerDocument.querySelector(
      "button[data-role='storybook-hyperlink-interaction-hyperlink-button']",
    );

    if (hyperlinkButton) {
      await userEvent.click(hyperlinkButton);
    }

    await waitFor(() => {
      const hyperlinkDialog = canvasElement.ownerDocument.querySelector(
        "div[data-role='storybook-hyperlink-interaction-hyperlink-dialog']",
      );

      expect(hyperlinkDialog).toBeVisible();
    });

    const saveButton = canvasElement.ownerDocument.querySelector(
      "button[data-role='storybook-hyperlink-interaction-hyperlink-save-button']",
    );

    if (saveButton) {
      await userEvent.click(saveButton);
    }

    await waitFor(() => {
      const validationMessages = canvasElement.ownerDocument.querySelectorAll(
        "span[data-role='validation-message']",
      );

      expect(validationMessages).toHaveLength(2);
      validationMessages.forEach((message) => {
        expect(message).toBeVisible();
      });
    });
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const AppliesStylingCorrectly: Story = {
  render: () => (
    <TextEditor
      labelText="Text Editor"
      initialValue={createFromHTML(
        '<p><span>paragraph</span></p><p><span style="font-weight: 700; font-size: 24px; line-height: 30px;">title</span></p><p><span style="font-weight: 500; font-size: 21px; line-height: 26.25px;">subtitle</span></p><p><span style="font-weight: 500; font-size: 18px; line-height: 22.5px;">section header</span></p><p><span style="font-weight: 500; font-size: 16px; line-height: 20px;">section subheader&ZeroWidthSpace;</span></p>',
      )}
    />
  ),
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
