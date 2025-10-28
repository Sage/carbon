import React from "react";
import { StoryFn, StoryObj } from "@storybook/react";
import { userEvent, within, expect } from "@storybook/test";
import Profile from ".";
import Box from "../box";
import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof Profile>;

export default {
  title: "Profile/Interactions",
  component: Profile,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
  decorators: [(StoryToRender: StoryFn) => <StoryToRender />],
};

export const DefaultAndDarkBackgroundFocus: Story = {
  render: () => (
    <Box display="flex" gap={2} flexDirection="column">
      <Profile
        email="email@email.com"
        initials="JD"
        name="John Doe"
        text="+33 657 22 34 71"
      />

      <Box
        p={2}
        backgroundColor="black"
        width="190px"
        height="50px"
        borderRadius="borderRadius200"
      >
        <Profile
          darkBackground
          email="email@email.com"
          initials="JD"
          name="John Doe"
          text="+33 657 22 34 71"
        />
      </Box>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;
    const canvas = within(canvasElement);
    const links = canvas.getAllByRole("link");
    await userEvent.tab();
    expect(links[0]).toHaveFocus();
    await userEvent.tab();
    expect(links[1]).toHaveFocus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
DefaultAndDarkBackgroundFocus.storyName = "Focus";
DefaultAndDarkBackgroundFocus.parameters = {
  pseudo: {
    hover: '[data-component="profile"] a:hover',
  },
};
