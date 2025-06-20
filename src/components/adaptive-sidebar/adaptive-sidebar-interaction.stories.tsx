import { StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/test";
import React, { useState } from "react";

import AdaptiveSidebar from ".";
import Box from "../box";
import Button from "../button";
import { Checkbox } from "../checkbox";
import DateInput, { DateChangeEvent } from "../date";
import Form from "../form";
import { Select, Option } from "../select";
import Textbox from "../textbox";

import Typography from "../typography";

import { allowInteractions } from "../../../.storybook/reduced-motion";
import DefaultDecorator from "../../../.storybook/utils/default-decorator";
import userInteractionPause from "../../../.storybook/utils/user-interaction-pause";

type Story = StoryObj<typeof AdaptiveSidebar>;

const selectOptions = [
  {
    id: "1",
    name: "Orange",
  },
  {
    id: "2",
    name: "Blue",
  },
  {
    id: "3",
    name: "Green",
  },
  {
    id: "4",
    name: "Black",
  },
  {
    id: "5",
    name: "Yellow",
  },
  {
    id: "6",
    name: "White",
  },
  {
    id: "7",
    name: "Magenta",
  },
  {
    id: "8",
    name: "Cyan",
  },
  {
    id: "9",
    name: "Red",
  },
  {
    id: "10",
    name: "Grey",
  },
  {
    id: "11",
    name: "Purple",
  },
];

const SimpleForm = () => {
  const [date, setDate] = useState("01/06/1994");
  const [petDate, setPetDate] = useState("14/09/2020");
  return (
    <Form
      m={2}
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
    >
      <Textbox label="First Name" data-component="first-name" />
      <Textbox label="Middle Name" data-component="middle-name" />
      <Textbox label="Surname" data-component="surname" />
      <Textbox label="Birth Place" data-component="place-of-birth" />

      <Textbox label="Address" data-component="Address" />
      <DateInput
        data-component="birthday-input"
        name="date"
        label="Birthday"
        value={date}
        onChange={(e: DateChangeEvent) =>
          setDate(e.target.value.formattedValue)
        }
      />
      <Select label="Favourite Colour" data-role="favourite-colour">
        {selectOptions.map((option) => (
          <Option key={option.name} value={option} text={option.name} />
        ))}
      </Select>
      <Textbox label="Pet Name" data-component="pet-name" />
      <DateInput
        data-component="pet-birthday-input"
        name="date"
        label="Pet's birthday"
        value={petDate}
        onChange={(e: DateChangeEvent) =>
          setPetDate(e.target.value.formattedValue)
        }
      />
      <Checkbox
        name="checkbox"
        label="Check this box to agree to our terms and conditions"
        data-component="tc-checkbox"
      />
    </Form>
  );
};

const SimpleAdaptiveSidebar = ({
  backgroundColor = "black",
  children,
  defaultOpenState = false,
}: {
  backgroundColor?: "white" | "black" | "app";
  children?: React.ReactNode;
  defaultOpenState?: boolean;
}) => {
  const [adaptiveSidebarOpen, setAdaptiveSidebarOpen] =
    useState(defaultOpenState);
  const bodyText =
    "Praesent vulputate accumsan quam eget pellentesque. Sed condimentum, diam ut dapibus ornare, enim sem gravida dolor, vel molestie arcu nulla eget orci. Mauris vulputate in massa eu ornare. Aenean condimentum ligula a quam mattis, sit amet cursus augue consectetur. Mauris mollis tristique ex, vitae dapibus sapien bibendum at. Fusce blandit, tellus sit amet commodo vehicula, velit ipsum viverra urna, at feugiat magna ante non est. Nullam malesuada urna et varius rhoncus. Fusce ac blandit leo.";

  return (
    <Box display="flex" flexDirection="row" width="100%" height="100%">
      <Box>
        <Button
          onClick={() => setAdaptiveSidebarOpen(!adaptiveSidebarOpen)}
          mb={2}
        >
          {adaptiveSidebarOpen ? "Close" : "Open"}
        </Button>
        <Typography variant="p">{bodyText}</Typography>
      </Box>
      <AdaptiveSidebar
        backgroundColor={backgroundColor}
        open={adaptiveSidebarOpen}
        width="300px"
      >
        <Box p={2} display="flex" flexDirection="column">
          <Button
            onClick={() => setAdaptiveSidebarOpen(false)}
            mb={2}
            buttonType="primary"
          >
            Hide
          </Button>
          {children}
        </Box>
      </AdaptiveSidebar>
    </Box>
  );
};

export default {
  title: "Adaptive Sidebar/Interactions",
  parameters: {
    themeProvider: { chromatic: { theme: "sage" } },
  },
};

export const LaunchFromButton: Story = {
  render: () => (
    <SimpleAdaptiveSidebar>
      <Typography variant="p">
        This is a simple adaptive sidebar that can be opened and closed.
      </Typography>
    </SimpleAdaptiveSidebar>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const adaptiveSidebarToggle = canvas.getAllByRole("button");

    await userEvent.click(adaptiveSidebarToggle[0]);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

export const CloseWithOriginalLauncher: Story = {
  render: () => (
    <SimpleAdaptiveSidebar defaultOpenState>
      <Typography variant="p">
        This is a simple adaptive sidebar that can be opened and closed.
      </Typography>
    </SimpleAdaptiveSidebar>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const adaptiveSidebarToggle = canvas.getAllByRole("button");

    await userEvent.click(adaptiveSidebarToggle[0]);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

CloseWithOriginalLauncher.storyName = "Close With Original Launcher";

export const CloseFromWithin: Story = {
  render: () => (
    <SimpleAdaptiveSidebar defaultOpenState>
      <Typography variant="p">
        This is a simple adaptive sidebar that can be opened and closed.
      </Typography>
    </SimpleAdaptiveSidebar>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const adaptiveSidebarToggle = canvas.getAllByRole("button", {
      name: "Hide",
    });

    await userEvent.click(adaptiveSidebarToggle[0]);
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

CloseFromWithin.storyName = "Close From Within";

export const NestedComponentInteractions: Story = {
  render: () => (
    <SimpleAdaptiveSidebar backgroundColor="app">
      <SimpleForm />
    </SimpleAdaptiveSidebar>
  ),
  play: async ({ canvasElement }) => {
    if (!allowInteractions()) {
      return;
    }

    const canvas = within(canvasElement);
    const adaptiveSidebarToggle = canvas.getAllByRole("button", {
      name: "Open",
    });

    await userEvent.click(adaptiveSidebarToggle[0]);

    const firstNameInput = canvas.getByLabelText("First Name");
    await userEvent.type(firstNameInput, "John", { delay: 100 });

    const middleNameInput = canvas.getByLabelText("Middle Name");
    await userEvent.type(middleNameInput, "Jacob", { delay: 100 });

    const surnameInput = canvas.getByLabelText("Surname");
    await userEvent.type(surnameInput, "Jingleheimer-Schmidt", { delay: 100 });

    const placeOfBirthInput = canvas.getByLabelText("Birth Place");
    await userEvent.type(placeOfBirthInput, "London", { delay: 100 });

    const addressInput = canvas.getByLabelText("Address");
    await userEvent.type(addressInput, "123 Main St, London, UK", {
      delay: 100,
    });

    const birthdayInput = canvas.getByLabelText("Birthday");
    await userEvent.click(birthdayInput);

    await userInteractionPause(100);
    const calendarDays = document.querySelectorAll(
      `[aria-label="Friday, June 3rd, 1994"]`,
    );
    await userEvent.click(calendarDays[0]);

    const favouriteColourSelect = canvas.getByTestId("select-text");
    await userEvent.click(favouriteColourSelect);

    await userInteractionPause(1000);

    const listOfColours = document.querySelectorAll("li");

    const favouriteColourOption = Array.from(listOfColours).find(
      (item) => item?.textContent?.trim() === "Red",
    );
    if (favouriteColourOption) await userEvent.click(favouriteColourOption);

    const petNameInput = canvas.getByLabelText("Pet Name");
    await userEvent.type(petNameInput, "Fluffy", { delay: 100 });

    const petBirthdayInput = canvas.getByLabelText("Pet's birthday");
    await userEvent.click(petBirthdayInput);

    await userInteractionPause(100);
    const petCalendarDays = document.querySelectorAll(
      `[aria-label="Wednesday, September 23rd, 2020"]`,
    );
    await userEvent.click(petCalendarDays[0]);

    const tcCheckbox = canvas.getByLabelText(
      "Check this box to agree to our terms and conditions",
    );
    await userEvent.click(tcCheckbox);

    const saveButton = canvas.getAllByRole("button", {
      name: "Save",
    });
    saveButton[0].focus();
  },
  decorators: [
    (StoryToRender) => (
      <DefaultDecorator>
        <StoryToRender />
      </DefaultDecorator>
    ),
  ],
};

NestedComponentInteractions.storyName = "Nested Component Interactions";
