import React, { useRef, useState } from "react";
import { action } from "@storybook/addon-actions";
import { EditorState } from "draft-js";

import Dialog, { DialogProps } from "./dialog.component";
import Form from "../form";
import Textbox from "../textbox";
import Button from "../button";
import DateInput, { DateChangeEvent } from "../date";
import Toast from "../toast";
import { Checkbox } from "../checkbox";
import { Select, Option } from "../select";
import TextEditor from "../text-editor";
import Box from "../box";
import { DIALOG_SIZES } from "./dialog.config";

export default {
  title: "Dialog/Test",
  includeStories: ["Default"],
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

export const DialogComponent = ({
  children = "This is an example of a dialog",
  ...props
}: Partial<DialogProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef<HTMLButtonElement | null>(null);
  return (
    <>
      <Dialog
        open={isOpen}
        showCloseIcon
        onCancel={() => setIsOpen(false)}
        focusFirstElement={ref}
        {...props}
      >
        {children}
        <Button onClick={() => setIsOpen(false)}>Not focused</Button>
        <Button forwardRef={ref} onClick={() => setIsOpen(false)}>
          This should be focused first now
        </Button>

        <Textbox label="Textbox1" value="Textbox1" />
        <Textbox label="Textbox2" value="Textbox2" />
        <Textbox label="Textbox3" value="Textbox3" />
      </Dialog>
    </>
  );
};

export const DialogComponentWithToast = () => {
  const toastRef = useRef(null);
  const [openToast, setOpenToast] = useState(false);
  return (
    <>
      <Toast
        ref={toastRef}
        open={openToast}
        onDismiss={() => setOpenToast(false)}
      >
        Toast message 1
      </Toast>
      <Dialog open>
        <Button onClick={() => setOpenToast(true)}>Open Toast</Button>
      </Dialog>
    </>
  );
};

export const DialogComponentWithTextEditor = ({
  ...props
}: Partial<DialogProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState(EditorState.createEmpty());
  return (
    <>
      <Dialog
        open={isOpen}
        showCloseIcon
        onCancel={() => setIsOpen(false)}
        {...props}
      >
        <Textbox label="Textbox1" value="Textbox1" />
        <Textbox label="Textbox2" value="Textbox2" />
        <TextEditor
          onChange={(state) => setValue(state)}
          value={value}
          labelText="Text Editor Label"
        />
        <Textbox label="Textbox3" value="Textbox3" />
      </Dialog>
    </>
  );
};

export const DialogBackgroundScrollTestComponent = () => {
  return (
    <Box height="2000px" position="relative">
      <Box height="100px" id="bottom-box" position="absolute" bottom="0px">
        I should not be scrolled into view
      </Box>
      <Dialog open onCancel={() => {}}>
        <Textbox label="textbox" />
      </Dialog>
    </Box>
  );
};

export const DialogBackgroundScrollWithOtherFocusableContainers = () => {
  const toast1Ref = useRef(null);
  const toast2Ref = useRef(null);
  return (
    <Box height="2000px" position="relative">
      <Box height="100px" id="bottom-box" position="absolute" bottom="0px">
        I should not be scrolled into view
      </Box>
      <Dialog
        open
        onCancel={() => {}}
        focusableContainers={[toast1Ref, toast2Ref]}
      >
        <Textbox label="textbox" />
      </Dialog>
      <Toast open onDismiss={() => {}} ref={toast1Ref} targetPortalId="stacked">
        Toast message 1
      </Toast>
      <Toast open onDismiss={() => {}} ref={toast2Ref} targetPortalId="stacked">
        Toast message 2
      </Toast>
    </Box>
  );
};
