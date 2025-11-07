import React from "react";
import { StoryFn, StoryObj } from "@storybook/react";
import Profile from ".";
import Box from "../box";
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
      <Box p={2} backgroundColor="white" width="190px" height="50px">
        <Profile
          email="email@email.com"
          initials="JD"
          name="John Doe"
          text="+33 657 22 34 71"
        />
      </Box>

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
    focus: true,
  },
};
