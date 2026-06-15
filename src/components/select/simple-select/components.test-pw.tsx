import React, { useState } from "react";
import Typography from "../../../components/typography";
import Content from "../../../components/content";
import {
  CustomSelectChangeEvent,
  Select as SimpleSelect,
  Select,
  Option,
  SimpleSelectProps,
} from "../../../../src/components/select";
import OptionGroupHeader from "../option-group-header/option-group-header.component";
import Box from "../../box";
import Dialog from "../../dialog";
import Button from "../../button";

export const SimpleSelectComponent = (props: Partial<SimpleSelectProps>) => {
  const [value, setValue] = useState("");
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <SimpleSelect
      label="simple select"
      labelInline
      value={value}
      onChange={onChangeHandler}
      {...props}
    >
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
      <Option text="Orange" value="6" />
      <Option text="Pink" value="7" />
      <Option
        text="Like a lot of intelligent animals, most crows are quite social. For instance, American crows spend most of the year living in pairs or small family groups. During the winter months, they will congregate with hundreds or even thousands of their peers to sleep together at night"
        value="8"
      />
      <Option text="Red" value="9" />
      <Option text="White" value="10" />
      <Option text="Yellow" value="11" />
    </SimpleSelect>
  );
};

export const SimpleSelectObjectAsValueComponent = (
  props: Partial<SimpleSelectProps>,
) => {
  const optionListValues = [
    { id: "Amber", value: 1, text: "Amber" },
    { id: "Black", value: 2, text: "Black" },
    { id: "Blue", value: 3, text: "Blue" },
    { id: "Brown", value: 4, text: "Brown" },
    { id: "Green", value: 5, text: "Green" },
    { id: "Orange", value: 6, text: "Orange" },
    { id: "Pink", value: 7, text: "Pink" },
    { id: "Purple", value: 8, text: "Purple" },
    { id: "Red", value: 9, text: "Red" },
    { id: "White", value: 10, text: "White" },
    { id: "Yellow", value: 11, text: "Yellow" },
  ];

  const [value, setValue] = useState<Record<string, unknown>>(
    optionListValues[4],
  );

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as Record<string, unknown>);
  }
  return (
    <SimpleSelect
      id="withObject"
      name="withObject"
      value={value}
      onChange={onChangeHandler}
      {...props}
    >
      {optionListValues.map((option) => (
        <Option key={option.id} text={option.text} value={option} />
      ))}
    </SimpleSelect>
  );
};

export const WithVirtualScrolling = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <SimpleSelect
      name="Virtualised"
      id="Virtualised"
      value={value}
      onChange={onChangeHandler}
      label="Choose an option"
      enableVirtualScroll
      virtualScrollOverscan={1}
    >
      {Array(20)
        .fill(undefined)
        .map((_, index) => (
          <Option
            key={`Option-${index + 1}`}
            value={index.toString()}
            text={`Option ${index + 1}`}
          />
        ))}
    </SimpleSelect>
  );
};

export const SimpleSelectNestedInDialog = ({
  openOnFocus = false,
  autofocus = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [value, setValue] = useState("");
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <SimpleSelect
        openOnFocus={openOnFocus}
        autoFocus={autofocus}
        name="testSelect"
        id="testSelect"
        label="choose an option"
        value={value}
        onChange={onChangeHandler}
      >
        <Option value="opt1" text="red" />
        <Option value="opt2" text="green" />
        <Option value="opt3" text="blue" />
        <Option value="opt4" text="black" />
      </SimpleSelect>
    </Dialog>
  );
};

export const SelectWithOptionGroupHeader = () => {
  const reportGroup = [
    {
      id: 1,
      title: "There are 2 more options",
      content: "content",
    },
    {
      id: 2,
      title: "There is 1 more below",
      content: "content",
    },
    {
      id: 3,
      title: "This is the last",
      content: "content",
    },
  ];
  const [value, setValue] = useState("");
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <Box p={10}>
      <Select
        placeholder="Scroll does not reach the last option"
        value={value}
        onChange={onChangeHandler}
      >
        <OptionGroupHeader label="Scroll does not reach the last option" />
        {reportGroup.map(({ id, title, content }) => {
          return (
            <Option key={id} value={title} tabIndex={0} text={title}>
              <Content title={title}>
                <Typography>{content}</Typography>
              </Content>
            </Option>
          );
        })}
      </Select>
    </Box>
  );
};

export const SelectionConfirmed = () => {
  const [value, setValue] = useState("");
  const [confirmedSelection, setConfirmedSelection] = useState("");
  const handleChange = (event: CustomSelectChangeEvent) => {
    setValue(event.target.value);
    if (event.selectionConfirmed) {
      setConfirmedSelection(event.target.value);
    }
  };
  return (
    <>
      <Select
        name="testing"
        value={value}
        onChange={handleChange}
        openOnFocus
        label="Test"
        placeholder=" "
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
        <Option value="4" text="Four" />
        <Option value="5" text="Five" />
        <Option value="6" text="Six" />
        <Option value="7" text="Seven" />
        <Option value="8" text="Eight" />
        <Option value="9" text="Nine" />
      </Select>

      {confirmedSelection ? (
        <span data-element={`confirmed-selection-${confirmedSelection}`}>
          {confirmedSelection}
        </span>
      ) : null}
    </>
  );
};

export const SimpleSelectControlled = () => {
  const [value, setValue] = useState("5");
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  function clearValue() {
    setValue("");
  }
  return (
    <>
      <Button onClick={clearValue} mb={2}>
        clear
      </Button>
      <Select
        id="controlled"
        name="controlled"
        value={value}
        onChange={onChangeHandler}
        label="color"
      >
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
    </>
  );
};

export const WithObjectAsValue = () => {
  const optionListValues = [
    { id: "Amber", value: 1, text: "Amber" },
    { id: "Black", value: 2, text: "Black" },
    { id: "Blue", value: 3, text: "Blue" },
    { id: "Brown", value: 4, text: "Brown" },
    { id: "Green", value: 5, text: "Green" },
    { id: "Orange", value: 6, text: "Orange" },
    { id: "Pink", value: 7, text: "Pink" },
    { id: "Purple", value: 8, text: "Purple" },
    { id: "Red", value: 9, text: "Red" },
    { id: "White", value: 10, text: "White" },
    { id: "Yellow", value: 11, text: "Yellow" },
  ];

  const [value, setValue] = useState<Record<string, unknown>>(
    optionListValues[4],
  );

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (typeof event.target.value === "object") {
      setValue(event.target.value);
    }
  }
  function clearValue() {
    setValue({});
  }
  return (
    <>
      <Button onClick={clearValue} mb={2}>
        clear
      </Button>
      <Select
        id="with-object"
        name="with-object"
        value={value}
        onChange={onChangeHandler}
        label="color"
      >
        {optionListValues.map((option) => (
          <Option key={option.id} text={option.text} value={option} />
        ))}
      </Select>
    </>
  );
};
