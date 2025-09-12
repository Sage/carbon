import { StoryObj } from "@storybook/react";
import { userEvent, screen, within } from "@storybook/test";
import React from "react";

import SimpleSelect from "./simple-select.component";
import { Select, Option, OptionRow } from "..";
import OptionGroupHeader from "../option-group-header/option-group-header.component";

import Box from "../../box";
import Dialog from "../../dialog";
import Icon from "../../icon";
import Typography from "../../../components/typography";

import { allowInteractions } from "../../../../.storybook/interaction-toggle/reduced-motion";
import DefaultDecorator from "../../../../.storybook/utils/default-decorator";
import userInteractionPause from "../../../../.storybook/utils/user-interaction-pause";

type Story = StoryObj<typeof SimpleSelect>;

export default {
  title: "Select/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const OpenList: Story = {
  render: () => (
    <Box height={250}>
      <Select name="simple" id="simple" label="Color">
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: "Color" });
    await userEvent.click(select);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

OpenList.storyName = "Open List";

export const OpenComplexList: Story = {
  render: () => (
    <Box height={250}>
      <Select
        name="complex"
        id="complex"
        label="Employee"
        multiColumn
        defaultValue="2"
        enableVirtualScroll
        tableHeader={
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Occupation</th>
          </tr>
        }
      >
        {Array(500)
          .fill(undefined)
          .map((_, index) => (
            <OptionRow
              key={`option-${index + 1}`}
              id={`option-row-${index}`}
              value={`${index}`}
              text={`Option ${index + 1}`}
            >
              <td>{`John ${index + 1}`}</td>
              <td>{`Doe ${index + 1}`}</td>
              <td>{`Welder ${index + 1}`}</td>
            </OptionRow>
          ))}
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: "Employee" });
    await userEvent.click(select);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

OpenComplexList.storyName = "Open Complex List";

export const HighlightedItem: Story = {
  render: () => (
    <Box height={250}>
      <Select name="simple" id="simple" label="Color">
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: "Color" });
    await userEvent.click(select);

    await userInteractionPause(1000);

    const highlightedOption = canvas.getByRole("option", { name: "Green" });
    await userEvent.click(highlightedOption);

    await userInteractionPause(1000);
    await userEvent.click(select);
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

export const SelectedItemHover: Story = {
  render: () => (
    <Box height={250}>
      <Select name="simple" id="simple" label="Color">
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: "Color" });
    await userEvent.click(select);

    await userInteractionPause(1000);

    const highlightedOption = canvas.getByRole("option", { name: "Green" });
    await userEvent.click(highlightedOption);

    await userInteractionPause(1000);
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

SelectedItemHover.storyName = "Selected Item Hover";
SelectedItemHover.parameters = {
  pseudo: {
    hover: "[data-index='4']",
  },
};

export const NonSelectedItemHover: Story = {
  render: () => (
    <Box height={250}>
      <Select name="simple" id="simple" label="Color">
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: "Color" });
    await userEvent.click(select);

    await userInteractionPause(1000);

    const highlightedOption = canvas.getByRole("option", { name: "Green" });
    await userEvent.click(highlightedOption);

    await userInteractionPause(1000);
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

NonSelectedItemHover.storyName = "Non-Selected Item Hover";
NonSelectedItemHover.parameters = {
  pseudo: {
    hover: "[data-index='2']",
  },
};

export const FocusTransparent: Story = {
  render: () => (
    <Box height={250}>
      <Select name="simple" id="simple" label="Color" transparent>
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: "Color" });

    await select.focus();

    await userInteractionPause(1000);
    await userEvent.keyboard(" ");
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

FocusTransparent.storyName = "Transparent Focus";

export const FocusTransparentWithSelection: Story = {
  render: () => (
    <Box height={250}>
      <Select name="simple" id="simple" label="Color" transparent>
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);

    const select = canvas.getByRole("combobox", { name: "Color" });
    await userEvent.click(select);

    await userInteractionPause(1000);

    const highlightedOption = canvas.getByRole("option", { name: "Green" });
    await userEvent.click(highlightedOption);

    await userInteractionPause(1000);
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

FocusTransparentWithSelection.storyName = "Transparent Focus With Selection";

export const OptionGroupHeaders: Story = {
  render: () => (
    <Box height={250}>
      <SimpleSelect name="simple" id="simple" label="Color">
        <OptionGroupHeader
          id="groupHeader1"
          label="Group one"
          icon="individual"
          data-component="group-header"
          data-role="group-header"
          data-element="group-header"
        />
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <OptionGroupHeader id="groupHeader2" label="Group two" icon="shop" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <OptionGroupHeader id="groupHeader3" label="Group three" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </SimpleSelect>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox", { name: "Color" });
    await userEvent.click(select);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

OptionGroupHeaders.storyName = "Option Group Headers";

export const ComplexOptions: Story = {
  render: () => (
    <Box height={220}>
      <Select
        mb={0}
        key="key"
        id="id"
        label="Select"
        aria-label="aria label"
        name="name"
        value="value"
        isLoading={false}
        readOnly={false}
        placeholder="placeholder"
        onChange={() => {}}
        onOpen={() => {}}
        onListScrollBottom={() => {}}
      >
        <Option>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={2}
            mb={3}
            flexDirection="column"
          >
            <Box display="flex" mx={2}>
              <Icon type="error" color="errorRed" />
              <Box ml={1} width="100%">
                <Box mb={1}>
                  <Typography variant="b" color="errorRed">
                    Something went wrong
                  </Typography>
                </Box>
                <Typography variant="p" color="errorRed" mb={0}>
                  We couldn't load the data. Please try again later.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Option>
      </Select>
    </Box>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }
    const canvas = within(canvasElement);
    const select = canvas.getByRole("combobox");
    await userEvent.click(select);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

ComplexOptions.storyName = "Complex Options";

export const NestedInDialog: Story = {
  render: () => (
    <Box height={250}>
      <Dialog open onCancel={() => {}} title="Dialog">
        <SimpleSelect name="testSelect" id="testSelect">
          <Option value="opt1" text="red" />
          <Option value="opt2" text="green" />
          <Option value="opt3" text="blue" />
          <Option value="opt4" text="black" />
        </SimpleSelect>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in
          ornare neque. Maecenas pellentesque et erat tincidunt mollis. Etiam
          diam nisi, elementum efficitur ipsum et, imperdiet iaculis ligula.
          Cras eget lorem aliquam lorem mollis fringilla a sit amet nisl. Donec
          semper odio elit, tempus ultrices est molestie id. Ut sit amet
          sollicitudin ipsum, eu tristique ligula. Praesent velit velit, finibus
          ut odio sit amet, fringilla iaculis lacus. Aliquam facilisis libero
          nec ipsum tincidunt imperdiet. Ut commodo mi ac odio blandit, ac
          molestie ante dapibus. Ut molestie auctor turpis, quis ultrices ante
          aliquet eu. Aenean et condimentum arcu, non malesuada elit. Cras a
          magna vestibulum, semper tortor id, molestie eros.
        </Typography>
      </Dialog>
    </Box>
  ),
  play: async () => {
    if (!allowInteractions()) {
      return;
    }

    const dialog = await screen.findByRole("dialog");
    const combobox = within(dialog).getByRole("combobox");
    await userEvent.click(combobox);
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
