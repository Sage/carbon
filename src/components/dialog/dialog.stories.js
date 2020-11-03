import React, { useState } from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { dlsThemeSelector } from "../../../.storybook/theme-selectors";
import OptionsHelper from "../../utils/helpers/options-helper";
import Dialog from "./dialog.component";
import Form from "../form";
import Textbox from "../../__experimental__/components/textbox";
import Button from "../button";
import DateInput from "../../__experimental__/components/date";
import { Checkbox } from "../../__experimental__/components/checkbox";
import { Select, Option } from "../../__experimental__/components/select";

export default {
  title: "Dialog/Test",
  component: Dialog,
  parameters: {
    themeSelector: dlsThemeSelector,
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

export const Default = () => {
  const [date, setDate] = useState("2020-06-01");
  const [isOpen, setIsOpen] = useState(true);
  const height = text("height", "400");
  const title = text("title", "Example Dialog");
  const subtitle = text("subtitle", "Example Subtitle");
  const size = select(
    "size",
    OptionsHelper.sizesFull,
    Dialog.defaultProps.size
  );
  const showCloseIcon = boolean(
    "showCloseIcon",
    Dialog.defaultProps.showCloseIcon
  );
  const enableBackgroundUI = boolean("enableBackgroundUI", false);
  const disableEscKey = boolean("disableEscKey", false);
  const ariaRole = text("ariaRole", Dialog.defaultProps.ariaRole);
  const stickyFooter = boolean("Form component stickyFooter", false);

  const handleCancel = (evt) => {
    setIsOpen(false);
    action("cancel")(evt);
  };

  const handleOpen = (evt) => {
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
    <div>
      <Button onClick={handleOpen}>Open Dialog</Button>
      <Dialog
        open={isOpen}
        onCancel={handleCancel}
        height={height}
        title={title}
        subtitle={subtitle}
        size={size}
        showCloseIcon={showCloseIcon}
        enableBackgroundUI={enableBackgroundUI}
        disableEscKey={disableEscKey}
        ariaRole={ariaRole}
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
            onChange={(e) => setDate(e.target.value.rawValue)}
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
          <div>This is an example of a dialog with a Form as content</div>
        </Form>
      </Dialog>
    </div>
  );
};
