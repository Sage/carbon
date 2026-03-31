import React from "react";
import { StoryObj, StoryFn } from "@storybook/react";
import { userEvent } from "@storybook/test";

import Box from "../box";
import Search from "./search.component";
import Card from "../card";
import Typography from "../typography";

import { allowInteractions } from "../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";

type Story = StoryObj<typeof Search>;

export default {
  title: "Search/Interactions",
  component: Search,
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
    chromatic: {
      disableSnapshot: false,
    },
  },
  decorators: [
    (StoryToRender: StoryFn) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const SearchIsCovered: Story = {
  render: () => (
    <Box display="flex" flexDirection="column">
      <Box position="sticky" top={0} width="100%">
        <Card mx={0} my={0} width="auto" spacing="small">
          <Box height="80px" display="flex" alignItems="center">
            <Typography variant="b">Sticky area</Typography>
          </Box>
        </Card>
      </Box>
      <Box width="100%" maxWidth="400px" height="1700px">
        <Search
          placeholder="Search..."
          searchButton
          aria-label="Search"
          value=""
          onChange={() => {}}
        />
      </Box>
    </Box>
  ),
  play: async ({}) => {
    if (!allowInteractions()) return;

    const user = userEvent.setup();

    await user.keyboard("{Tab}");
    await user.keyboard("{Tab}");

    window.scrollTo(0, 125);
  },
};
SearchIsCovered.storyName = "Search is covered by sticky item";
