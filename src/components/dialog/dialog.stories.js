import React, { useState, useEffect } from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { ThemeProvider } from "styled-components";
import OptionsHelper from "../../utils/helpers/options-helper";
import Dialog from "./dialog.component";
import Form from "../form";
import Textbox from "../../__experimental__/components/textbox";
import Button from "../button";
import DateInput from "../../__experimental__/components/date";
import { Checkbox } from "../../__experimental__/components/checkbox";
import { Select, Option } from "../select";

import mintTheme from "../../style/themes/mint";
import GlobalStyle from "../../style/global-style";
import AppWrapper from "../app-wrapper";
import { TileSelect, TileSelectGroup } from "../tile-select";
import Pill from "../pill";
import Icon from "../icon";
import Loader from "../loader";

export default {
  title: "Dialog/Test",
  component: Dialog,
  parameters: {
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
  const height = text("height", "");
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
  const disableEscKey = boolean("disableEscKey", false);
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
        disableEscKey={disableEscKey}
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

const DialogContent = () => {
  const [dialogOneIsLoading, setDialogOneIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDialogOneIsLoading(false);
    }, 2000);
  }, []);

  if (dialogOneIsLoading) {
    return <Loader />;
  }

  return (
    <TileSelectGroup
      legend="Tile Select"
      description="Pick any number of available options"
      multiSelect={false}
    >
      <TileSelect
        customActionButton={() => <Button>Custom Button</Button>}
        value="1"
        name="multi-1"
        id="multi-1"
        aria-label="multi-1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
        checked
        disabled
        // onChange={(e) => setValue1(e.target.checked)}
      />
      <TileSelect
        value="2"
        name="multi-2"
        id="multi-2"
        aria-label="multi-2"
        subtitle="Subtitle"
        titleAdornment={<Pill>Message</Pill>}
        description="Short and descriptive description"
        checked={false}
        // onChange={(e) => setValue2(e.target.checked)}
      />
      <TileSelect
        value="3"
        name="multi-3"
        id="multi-3"
        aria-label="multi-3"
        disabled
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
            tooltipVisible={false}
          />
        }
        description="Short and descriptive description"
        checked
        // onChange={(e) => setValue3(e.target.checked)}
      />
      <TileSelect
        value="4"
        name="multi-4"
        id="multi-4"
        aria-label="multi-4"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        checked={false}
        // onChange={(e) => setValue4(e.target.checked)}
      />
    </TileSelectGroup>
  );
};

export const Issue = () => {
  const [dialogOneOpenState, setDialogOneOpenState] = useState(false);

  return (
    <ThemeProvider theme={mintTheme}>
      <GlobalStyle />
      <AppWrapper>
        <Button
          onClick={() => {
            setDialogOneOpenState(true);
          }}
        >
          Open with loading
        </Button>

        <Dialog
          open={dialogOneOpenState}
          showCloseIcon
          onCancel={() => setDialogOneOpenState(false)}
        >
          <DialogContent />
        </Dialog>
      </AppWrapper>
    </ThemeProvider>
  );
};

Default.story = {
  name: "default",
};
