import React, { useState } from "react";
import { StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { EditorState } from "draft-js";

import Dialog, { DialogProps } from "./dialog.component";
import { DIALOG_SIZES } from "./dialog.config";

import Form from "../form";
import Textbox from "../textbox";
import Button from "../button";
import Icon from "../icon";
import DateInput, { DateChangeEvent } from "../date";
import { Checkbox } from "../checkbox";
import { Select, Option } from "../select";
import TextEditor from "../text-editor";

export default {
  title: "Dialog/Test",
  component: Dialog,
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const handleEditorChange = (newState: EditorState) => {
    setEditorState(newState);
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
    <div>
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
            onChange={(e: DateChangeEvent) =>
              setDate(e.target.value.formattedValue)
            }
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
            onChange={(e: DateChangeEvent) =>
              setDate(e.target.value.formattedValue)
            }
          />
          <TextEditor
            onChange={handleEditorChange}
            value={editorState}
            labelText="Additonal notes"
            mb={1}
          />
          <Checkbox name="checkbox" label="Do you like my Dog" />
          <div>This is an example of a dialog with a Form as content</div>
        </Form>
      </Dialog>
    </div>
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

type StoryType = StoryObj<typeof Dialog>;

export const WithTwoDifferentNodes: StoryType = (
  props: Partial<DialogProps>
) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog
      open={isOpen}
      title="Example Dialog"
      subtitle={
        <>
          <Icon type="add" />
          <br />
          Subtitle line 2
        </>
      }
      showCloseIcon
      onCancel={() => setIsOpen(false)}
      {...props}
    >
      <Textbox label="Textbox1" value="Textbox1" />
      <Textbox label="Textbox2" value="Textbox2" />
      <Textbox label="Textbox3" value="Textbox3" />
    </Dialog>
  );
};

WithTwoDifferentNodes.storyName = "with two different nodes in subtitle";
WithTwoDifferentNodes.decorators = [
  (Story) => (
    <div style={{ height: 400, width: "100%" }}>
      <Story />
    </div>
  ),
];
WithTwoDifferentNodes.parameters = { chromatic: { disableSnapshot: false } };
