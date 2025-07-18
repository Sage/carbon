import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import React from "react";

import { MultiSelect, Option, OptionRow, OptionGroupHeader } from "..";
import Box from "../../box";

import { allowInteractions } from "../../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../../.storybook/utils/default-decorator";
import userInteractionPause from "../../../../.storybook/utils/user-interaction-pause";

type Story = StoryObj<typeof MultiSelect>;

export default {
  title: "Select/MultiSelect/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const HighlightedItem: Story = {
  render: () => (
    <Box height={250}>
      <MultiSelect name="multi" id="multi" label="Color">
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
      </MultiSelect>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: /Color/ });
    await userEvent.click(select);
    await userInteractionPause(1000);

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}"); // highlight option 2
    await userInteractionPause(1000);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
HighlightedItem.storyName = "Highlighted Item";

export const HoverItem: Story = {
  render: () => (
    <Box height={250}>
      <MultiSelect name="multi" id="multi" label="Color">
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
      </MultiSelect>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: /Color/ });
    await userEvent.click(select);
    await userInteractionPause(1000);

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}"); // highlight option 2
    await userInteractionPause(1000);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
HoverItem.storyName = "Hover Item";
HoverItem.parameters = {
  pseudo: {
    hover: ["[data-index='1']", "[data-index='3']"],
  },
};

export const MultiColumnList: Story = {
  render: () => (
    <Box height={250}>
      <MultiSelect
        name="multi"
        id="multi"
        label="Color"
        multiColumn
        defaultValue={["1", "2"]}
        tableHeader={
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Occupation</th>
          </tr>
        }
      >
        <OptionRow id="1" value="1" text="John Doe">
          <td>John</td>
          <td>Doe</td>
          <td>Welder</td>
        </OptionRow>
        <OptionRow id="2" value="2" text="Joe Vick">
          <td>Joe</td>
          <td>Vick</td>
          <td>Accountant</td>
        </OptionRow>
        <OptionRow id="3" value="3" text="Jane Poe">
          <td>Jane</td>
          <td>Poe</td>
          <td>Accountant</td>
        </OptionRow>
        <OptionRow id="4" value="4" text="Jill Moe">
          <td>Jill</td>
          <td>Moe</td>
          <td>Engineer</td>
        </OptionRow>
        <OptionRow id="5" value="5" text="Bill Zoe">
          <td>Bill</td>
          <td>Zoe</td>
          <td>Astronaut</td>
        </OptionRow>
      </MultiSelect>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: /Color/ });
    await userEvent.click(select);
    await userInteractionPause(1000);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
MultiColumnList.storyName = "Multi Column List";
MultiColumnList.parameters = {
  pseudo: {
    hover: "[data-index='1']",
  },
};

export const GroupedOptions: Story = {
  render: () => (
    <Box height={250}>
      <MultiSelect
        name="multi"
        id="multi"
        label="Color"
        defaultValue={["1", "2"]}
      >
        <OptionGroupHeader
          id="groupHeader1"
          label="Group one"
          icon="individual"
        />
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <OptionGroupHeader
          id="groupHeader2"
          label="Group two"
          icon="individual"
        />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
      </MultiSelect>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: /Color/ });
    await userEvent.click(select);
    await userInteractionPause(1000);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
GroupedOptions.storyName = "Grouped Options";
GroupedOptions.parameters = {
  pseudo: {
    hover: "[data-index='1']",
  },
};

export const WithCustomColoredPills: Story = {
  render: () => (
    <Box height={250}>
      <MultiSelect
        name="multi"
        id="multi"
        label="Color"
        defaultValue={["1", "2", "3", "4", "5", "6"]}
      >
        <Option text="Amber" value="1" borderColor="#FFBF00" fill />
        <Option text="Black" value="2" borderColor="blackOpacity65" fill />
        <Option text="Blue" value="3" borderColor="productBlue" />
        <Option text="Brown" value="4" borderColor="brown" fill />
        <Option text="Green" value="5" borderColor="productGreen" />
        <Option text="Orange" value="6" borderColor="orange" />
      </MultiSelect>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: /Color/ });
    await userEvent.click(select);
    await userInteractionPause(1000);

    await userEvent.tab({ shift: true });
    await userInteractionPause(1000);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};
WithCustomColoredPills.storyName = "With Custom Colored Pills";
