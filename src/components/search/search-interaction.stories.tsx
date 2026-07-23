import React, { useState } from "react";
import { StoryObj, StoryFn } from "@storybook/react-vite";
import { userEvent, within } from "storybook/test";

import Box from "../box";
import Search from ".";
import Card from "../card";
import Typography from "../typography";
import Icon from "../icon";
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

const listDataWithSelectedIcon: SearchListGroup[] = [
  {
    heading: "Recent searches",
    icon: <Icon type="refresh_clock" />,
    items: [
      {
        value: "selected-icon-option",
        label: "Selected icon option with bolded search term",
        selectedIcon: true,
      },
      {
        value: "non-selected-icon-option",
        label: "Standard option with bolded search term",
      },
    ],
  },
];

const DropdownListDataSelectedIconInteractionStory = () => {
  const [value, setValue] = useState("search term");
  const [dismissed, setDismissed] = useState(false);

  const shouldOpen = value.length > 0 && !dismissed;

  return (
    <Box width="700px" p={4}>
      <Search
        label="Search"
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
        listData={listDataWithSelectedIcon}
        aria-label="Search dropdown list-data selected icon"
      />
    </Box>
  );
};

export const DropdownListDataSelectedIconInteraction: Story = {
  render: () => <DropdownListDataSelectedIconInteractionStory />,
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) return;

    const canvas = within(canvasElement);
    const searchInput = canvas.getByRole("combobox", {
      name: "Search dropdown list-data selected icon",
    });

    await userEvent.click(searchInput);
    await userEvent.keyboard("{ArrowDown}");
  },
};
DropdownListDataSelectedIconInteraction.storyName =
  "Dropdown List Data - Selected Icon";
DropdownListDataSelectedIconInteraction.parameters = {
  chromatic: { disableSnapshot: false },
};
