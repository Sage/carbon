import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import Dialog, { DialogProps } from "./dialog.component";
import Form from "../form";
import Textbox from "../textbox";
import Button from "../button";
import DateInput from "../date";
import { Checkbox } from "../checkbox";
import { Select, Option } from "../select";
import { DIALOG_SIZES } from "./dialog.config";
import Box from "../box";
import Typography from "../typography";

export default {
  title: "Dialog/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
  argTypes: {
    size: {
      options: DIALOG_SIZES,
      control: {
        type: "select",
      },
    },
  },
};

interface StoryProps {
  stickyFooter: boolean;
}

export const Default = ({
  stickyFooter,
  title,
  subtitle,
  ...args
}: Partial<DialogProps> & StoryProps) => {
  const [date, setDate] = useState("01/06/2020");
  const [isOpen, setIsOpen] = useState(true);
  const handleCancel = (
    evt: React.KeyboardEvent<HTMLElement> | React.MouseEvent<HTMLElement>
  ) => {
    setIsOpen(false);
    action("cancel")(evt);
  };
  const handleOpen = (evt: React.MouseEvent<HTMLElement>) => {
    setIsOpen(true);
    action("open")(evt);
  };
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
  return (
    <Box>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        onCancel={handleCancel}
        title={title}
        subtitle={subtitle}
        {...args}
      >
        <Form
          stickyFooter={stickyFooter}
          leftSideButtons={<Button onClick={handleCancel}>Cancel</Button>}
          saveButton={
            <Button buttonType="primary" type="submit">
              Save
            </Button>
          }
        >
          <Textbox label="First Name" />
          <Textbox label="Middle Name" />
          <Textbox label="Surname" />
          <Textbox label="Birth Place" />
          <Textbox label="Favourite Colour" />
          <Textbox label="Address" />
          <DateInput
            name="date"
            label="Birthday"
            value={date}
            onChange={(e) => setDate(e.target.value.formattedValue)}
          />
          <Select label="Color">
            {selectOptions.map((option) => (
              <Option key={option.name} value={option} text={option.name} />
            ))}
          </Select>
          <Textbox label="Pet Name" />
          <DateInput
            name="date"
            label="Pet's birthday"
            value={date}
            onChange={(e) => setDate(e.target.value.rawValue)}
          />
          <Checkbox name="checkbox" label="Do you like my Dog" />
          <Typography>
            This is an example of a dialog with a Form as content
          </Typography>
        </Form>
      </Dialog>
    </Box>
  );
};

Default.storyName = "default";
Default.args = {
  height: "",
  title: "Example Dialog",
  subtitle: "Example Subtitle",
  size: "medium",
  showCloseIcon: true,
  disableEscKey: false,
  stickyFooter: false,
};
