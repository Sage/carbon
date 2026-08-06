import React, { useState } from "react";
import { StoryObj, StoryFn } from "@storybook/react-vite";
import { userEvent, within } from "storybook/test";

import Box from "../box";
import Card from "../card";
import Search from ".";
import Icon from "../icon";
import Typography from "../typography";
import { SearchListGroup } from "./search.component";

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

const listData: SearchListGroup[] = [
  {
    heading: "Recent searches",
    icon: <Icon type="refresh_clock" />,
    items: [
      {
        value: "Selected option with bolded search term",
        label: "Selected option with bolded search term",
        selectedIcon: true,
      },
      {
        value: "Standard option with bolded search term",
        label: "Standard option with bolded search term",
      },
    ],
  },
];

const OpenWithInlineLabelAndErrorStory = () => {
  const [value, setValue] = useState("search term");
  const [dismissed, setDismissed] = useState(false);

  const shouldOpen = value.length > 0 && !dismissed;

  return (
    <Box width="900px" p={4} display="flex" flexDirection="column" gap={3}>
      <Search
        label="Search"
        labelInline
        error="Error message"
        inputWidth={75}
        open={shouldOpen}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          setDismissed(false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setValue("");
            setDismissed(true);
          }
        }}
        onFocus={() => setDismissed(false)}
        onListItemSelect={(selected) => {
          setValue(selected);
          setDismissed(true);
        }}
        onClose={() => setDismissed(true)}
        listData={listData}
        aria-label="Search dropdown open with error message and inline label"
      />
      <Search
        label="Search with a much longer inline label"
        labelInline
        error="Error message"
        inputWidth={75}
        open={false}
        value="search term"
        onChange={() => {}}
        onFocus={() => {}}
        onListItemSelect={() => {}}
        onClose={() => {}}
        listData={listData}
        aria-label="Search with long inline label and error message"
      />
    </Box>
  );
};

export const SelectedIconInlineErrorInteraction: Story = {
  render: () => <OpenWithInlineLabelAndErrorStory />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole("combobox", {
      name: "Search dropdown open with error message and inline label",
    });

    await userEvent.click(searchInput);
    await userEvent.keyboard("{ArrowDown}");
  },
};
SelectedIconInlineErrorInteraction.storyName =
  "Selected Icon Inline Error Interaction";
SelectedIconInlineErrorInteraction.parameters = {
  chromatic: { disableSnapshot: false },
};
