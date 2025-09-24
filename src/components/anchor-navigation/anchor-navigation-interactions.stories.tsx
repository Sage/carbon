import React from "react";
import { StoryObj, StoryFn } from "@storybook/react";
import { userEvent, within, expect, waitFor } from "@storybook/test";

import AnchorNavigation from "./anchor-navigation.component";
import { DefaultStory } from "./anchor-navigation.stories";

import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof AnchorNavigation>;

export default {
  title: "Anchor Navigation/Interactions",
  component: AnchorNavigation,
  parameters: {
    info: { disable: true },
    chromatic: { disableSnapshot: true },
  },
} as const;

const RenderFromDefault: StoryFn = () =>
  (DefaultStory as unknown as () => JSX.Element)();

export const NavFocusManagement: Story = {
  render: RenderFromDefault,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link");

    await userEvent.tab();
    await waitFor(() => expect(links[0]).toHaveFocus());

    await userEvent.tab();

    const expected = links[1] ?? links[0];
    await waitFor(() => expect(expected).toHaveFocus());
  },
  decorators: [
    (StoryToRender: StoryFn) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
NavFocusManagement.storyName = "Focus Management";
NavFocusManagement.parameters = {
  themeProvider: { chromatic: { theme: "sage" } },
  chromatic: { disableSnapshot: false },
};

export const ScrollAndFocusInput: Story = {
  render: RenderFromDefault,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const secondHeading = canvas.getByRole("heading", {
      name: /^second section$/i,
    });
    secondHeading.setAttribute("id", "second-section");

    const secondNavLink =
      canvas.queryByRole("link", { name: /^second$/i }) ??
      canvas.getAllByRole("link")[1] ??
      canvas.getAllByRole("link")[0];
    secondNavLink.setAttribute("href", "#second-section");

    await userEvent.click(secondNavLink);

    const sectionEl = secondHeading.closest(
      '[data-carbon-anchornav-ref="true"]',
    ) as HTMLElement | null;
    if (!sectionEl) return;

    await waitFor(() => expect(sectionEl).toHaveFocus());

    await userEvent.tab();

    const section = within(sectionEl);
    const secondInput = section.getByLabelText(/^second section$/i);

    await waitFor(() => expect(secondInput).toBeVisible());
    await waitFor(() => expect(secondInput).toHaveFocus());
  },
  decorators: [
    (StoryToRender: StoryFn) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
