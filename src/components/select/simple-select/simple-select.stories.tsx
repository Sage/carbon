import React, { useState, useRef, useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";

import {
  Select,
  Option,
  OptionRow,
  OptionGroupHeader,
  CustomSelectChangeEvent,
} from "..";
import Button from "../../button";
import Icon, { IconType } from "../../icon";
import Box from "../../box";
import Typography from "../../typography";
import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

import SimpleSelect, { SimpleSelectProps } from "./simple-select.component";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof SimpleSelect> = {
  title: "Select",
  component: SimpleSelect,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof SimpleSelect>;

export const Default: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box height={250}>
      <Select
        name="simple"
        id="simple"
        label="Color"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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
    </Box>
  );
};
Default.storyName = "Default";

export const Required: Story = () => {
  const [value, setValue] = useState("");

  return (
    <Box height={250}>
      <Select
        name="required-select"
        id="required-select"
        label="Foreground Color"
        required
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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
    </Box>
  );
};
Required.storyName = "Required";

export const IsOptional = () => {
  const [value, setValue] = useState("");

  return (
    <Box height={250}>
      <Select
        name="optional"
        id="optional"
        label="Foreground Color"
        isOptional
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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
    </Box>
  );
};
IsOptional.storyName = "IsOptional";

export const ListPlacement: Story = () => {
  const [listPlacement, setListPlacement] =
    useState<SimpleSelectProps["listPlacement"]>("bottom-end");
  const [value, setValue] = useState("");
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };
  return (
    <>
      <Button mr={1} onClick={() => setListPlacement("top-end")}>
        Top end
      </Button>
      <Button mr={1} onClick={() => setListPlacement("bottom-end")}>
        Bottom end
      </Button>
      <Button mr={1} onClick={() => setListPlacement("top-start")}>
        Top start
      </Button>
      <Button onClick={() => setListPlacement("bottom-start")}>
        Bottom Start
      </Button>
      <Box my="150px" ml="200px" width="200px">
        <Select
          name="listWidth"
          id="listWidth"
          label="color"
          labelInline
          listWidth={350}
          listPlacement={listPlacement}
          value={value}
          onChange={handleChange}
        >
          <Option text="Amber" value="1" />
          <Option text="Black" value="2" />
          <Option text="Blue" value="3" />
        </Select>
      </Box>
    </>
  );
};
ListPlacement.storyName = "List Placement";
ListPlacement.parameters = { chromatic: { disableSnapshot: true } };

export const ListHeight: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box height={500}>
      <Select
        listMaxHeight={2000}
        name="list height"
        id="list-height"
        label="List height"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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
    </Box>
  );
};
ListHeight.storyName = "List Height";

export const ListWidth: Story = () => {
  const [value, setValue] = useState("");
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };
  return (
    <Box height={200} width={200}>
      <Select
        name="listWidth"
        id="listWidth"
        label="color"
        listWidth={350}
        listPlacement="bottom-start"
        value={value}
        onChange={handleChange}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
    </Box>
  );
};
ListWidth.storyName = "List Width";
ListWidth.parameters = { chromatic: { disableSnapshot: true } };

export const Sizes: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box height={350}>
      <Select
        name="size-small"
        id="size-small"
        label="Small"
        size="small"
        mb={2}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <Select
        name="size-medium"
        id="size-medium"
        label="Medium"
        size="medium"
        mb={2}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
      <Select
        name="size-large"
        id="size-large"
        label="Large"
        size="large"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </Select>
    </Box>
  );
};
Sizes.storyName = "Sizes";

export const WithObjectAsValue: Story = () => {
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
    <Box height={300}>
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
    </Box>
  );
};
WithObjectAsValue.storyName = "With Object as Value";
WithObjectAsValue.parameters = { chromatic: { disableSnapshot: true } };

export const WithCustomMaxWidth: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box height={250}>
      <Select
        name="simple"
        id="simple"
        label="color"
        maxWidth="100%"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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
    </Box>
  );
};
WithCustomMaxWidth.storyName = "With Custom Max Width";

export const WithIsLoadingProp: Story = () => {
  const preventLoading = useRef(false);
  const [value, setValue] = useState("black");
  const [isLoading, setIsLoading] = useState(true);
  const asyncList = [
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ];
  const [optionList, setOptionList] = useState([
    <Option text="Black" value="black" key="Black" />,
  ]);
  function loadList() {
    if (preventLoading.current) {
      return;
    }
    preventLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOptionList(asyncList);
    }, 2000);
  }
  function clearData() {
    setOptionList([<Option text="Black" value="black" key="Black" />]);
    setValue("black");
    preventLoading.current = false;
  }
  return (
    <Box height={300}>
      <Button onClick={clearData} mb={2}>
        reset
      </Button>
      <Select
        name="isLoading"
        id="isLoading"
        label="color"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onOpen={() => loadList()}
        isLoading={isLoading}
      >
        {optionList}
      </Select>
    </Box>
  );
};
WithIsLoadingProp.storyName = "With isLoading prop";
WithIsLoadingProp.parameters = { chromatic: { disableSnapshot: true } };

export const WithInfiniteScroll: Story = () => {
  const preventLoading = useRef(false);
  const preventLazyLoading = useRef(false);
  const lazyLoadingCounter = useRef(0);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const asyncList = [
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ];
  const getLazyLoaded = () => {
    const counter = lazyLoadingCounter.current;
    return [
      <Option
        text={`Lazy Loaded A${counter}`}
        value={`lazyA${counter}`}
        key={`lazyA${counter}`}
      />,
      <Option
        text={`Lazy Loaded B${counter}`}
        value={`lazyB${counter}`}
        key={`lazyB${counter}`}
      />,
      <Option
        text={`Lazy Loaded C${counter}`}
        value={`lazyC${counter}`}
        key={`lazyC${counter}`}
      />,
    ];
  };
  const [optionList, setOptionList] = useState<React.ReactElement[]>([]);
  function loadList() {
    if (preventLoading.current) {
      return;
    }
    preventLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      setOptionList(asyncList);
      setIsLoading(false);
    }, 2000);
  }
  function onLazyLoading() {
    if (preventLazyLoading.current) {
      return;
    }
    preventLazyLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      preventLazyLoading.current = false;
      lazyLoadingCounter.current += 1;
      setOptionList((prevList) => [...prevList, ...getLazyLoaded()]);
      setIsLoading(false);
    }, 2000);
  }
  function clearData() {
    setOptionList([]);
    setValue("");
    preventLoading.current = false;
  }
  return (
    <Box height={300}>
      <Button onClick={clearData} mb={2}>
        reset
      </Button>
      <Select
        name="infiniteScroll"
        id="infiniteScroll"
        label="color"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onOpen={() => loadList()}
        isLoading={isLoading}
        onListScrollBottom={onLazyLoading}
      >
        {optionList}
      </Select>
    </Box>
  );
};
WithInfiniteScroll.storyName = "With infinite scroll";
WithInfiniteScroll.parameters = { chromatic: { disableSnapshot: true } };

export const OpenOnFocus: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box height={250}>
      <Select
        name="openOnFocus"
        id="openOnFocus"
        openOnFocus
        label="color"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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
    </Box>
  );
};
OpenOnFocus.storyName = "Open on Focus";
OpenOnFocus.parameters = { chromatic: { disableSnapshot: true } };

export const Disabled: Story = () => {
  const [value, setValue] = useState("3");
  return (
    <Select
      aria-label="disabled"
      name="disabled"
      id="disabled"
      disabled
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
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
  );
};
Disabled.storyName = "Disabled";

export const Readonly: Story = () => {
  const [value, setValue] = useState("4");
  return (
    <Select
      aria-label="readonly"
      name="readonly"
      id="readonly"
      readOnly
      value={value}
      onChange={(ev) => setValue(ev.target.value)}
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
  );
};
Readonly.storyName = "Readonly";

export const Transparent: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box height={250} width={200}>
      <Select
        name="transparent"
        id="transparent"
        placeholder="Please select a colour"
        transparent
        label="Choose a colour"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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
    </Box>
  );
};
Transparent.storyName = "Transparent";

export const TransparentDisabled: Story = () => {
  const [value, setValue] = useState("4");
  return (
    <Box height={250} width={150}>
      <Select
        name="transparent"
        id="transparent"
        transparent
        label="Choose a colour"
        disabled
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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
    </Box>
  );
};
TransparentDisabled.storyName = "Transparent disabled";

export const CustomOptionChildren: Story = () => {
  const [value, setValue] = useState("");

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  const options = [
    { value: "1", text: "Orange", iconType: "favourite", iconColor: "orange" },
    { value: "2", text: "Black", iconType: "bin", iconColor: "black" },
    { value: "3", text: "Blue", iconType: "individual", iconColor: "blue" },
    { value: "4", text: "Green", iconType: "tick_circle", iconColor: "green" },
  ];

  const renderLeftChildren = () => {
    const option = options.find((opt) => opt.value === value);
    return (
      option && (
        <Icon type={option.iconType as IconType} color={option.iconColor} />
      )
    );
  };

  return (
    <Box height={250}>
      <Select
        name="customOptionChildren"
        id="customOptionChildren"
        label="Pick your favourite color"
        value={value}
        onChange={onChangeHandler}
        leftChildren={
          value && (
            <Box display="flex" alignItems="center" ml={1}>
              {renderLeftChildren()}
            </Box>
          )
        }
      >
        {options.map((option) => (
          <Option key={option.value} text={option.text} value={option.value}>
            <Icon
              type={option.iconType as IconType}
              color={option.iconColor}
              mr={1}
            />
            {option.text}
          </Option>
        ))}
      </Select>
    </Box>
  );
};
CustomOptionChildren.storyName = "Custom Option Children";
CustomOptionChildren.parameters = { chromatic: { disableSnapshot: true } };

export const WithMultipleColumns: Story = () => {
  const [value, setValue] = useState("2");
  return (
    <Box height={250}>
      <Select
        name="withMultipleColumns"
        id="withMultipleColumns"
        multiColumn
        tableHeader={
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Occupation</th>
          </tr>
        }
        label="With multiple columns"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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
      </Select>
    </Box>
  );
};
WithMultipleColumns.storyName = "With Multiple Columns";
WithMultipleColumns.parameters = { chromatic: { disableSnapshot: true } };

export const OptionGroups: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box height={250}>
      <Select
        name="optGroups"
        id="optGroups"
        label="color"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <OptionGroupHeader label="Group one" icon="individual" />
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <OptionGroupHeader label="Group two" icon="shop" />
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <OptionGroupHeader label="Group three" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  );
};
OptionGroups.storyName = "Option Groups";
OptionGroups.parameters = { chromatic: { disableSnapshot: true } };

export const OptionGroupsWithComposedChildren: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box height={250}>
      <Select
        name="optGroups"
        id="optGroups"
        label="color"
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        <OptionGroupHeader>
          <Icon type="individual" /> <h4>Group One Composed</h4>
        </OptionGroupHeader>
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <OptionGroupHeader>
          <Icon type="shop" /> <h4>Group Two Composed</h4>
        </OptionGroupHeader>
        <Option text="Green" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <OptionGroupHeader>
          <h4>Group Three Composed</h4>
        </OptionGroupHeader>
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </Select>
    </Box>
  );
};
OptionGroupsWithComposedChildren.storyName =
  "Option Groups with composed children";
OptionGroupsWithComposedChildren.parameters = {
  chromatic: { disableSnapshot: true },
};

export const EnablingAdaptiveBehaviour: Story = () => {
  const [value, setValue] = useState("4");
  return (
    <Box height={220}>
      <Select
        name="adaptive"
        id="adaptive"
        label="color"
        adaptiveLabelBreakpoint={960}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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
    </Box>
  );
};
EnablingAdaptiveBehaviour.storyName = "Enabling Adaptive Behaviour";
EnablingAdaptiveBehaviour.parameters = { chromatic: { disableSnapshot: true } };

export const Virtualised: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box height={220}>
      <Select
        name="virtualised"
        id="virtualised"
        label="choose an option"
        labelInline
        enableVirtualScroll
        virtualScrollOverscan={20}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        {Array(10000)
          .fill(undefined)
          .map((_, index) => (
            <Option
              key={`option-${index + 1}`}
              value={`${index}`}
              text={`Option ${index + 1}`}
            />
          ))}
      </Select>
    </Box>
  );
};
Virtualised.storyName = "Virtualised";

export const WithMultipleColumnsAndVirtualisation: Story = () => {
  const [value, setValue] = useState("2");
  return (
    <Box height={250}>
      <Select
        name="withMultipleColumnsAndVirtualisation"
        id="withMultipleColumnsAndVirtualisation"
        label="choose an option"
        multiColumn
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
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
  );
};
WithMultipleColumnsAndVirtualisation.storyName =
  "With Multiple Columns and Virtualisation";

WithMultipleColumnsAndVirtualisation.parameters = {
  chromatic: { disableSnapshot: true },
};

export const SelectionConfirmedStory: Story = () => {
  const [selectionConfirmed, setSelectionConfirmed] = useState(false);
  const [value, setValue] = useState("");
  return (
    <Box height={280}>
      <Typography variant="strong">
        Selection Confirmed:{" "}
        {selectionConfirmed ? (
          <Icon type="tick" bg="primary" color="white" />
        ) : (
          <Icon type="cross" bg="red" color="white" />
        )}
      </Typography>
      <Select
        value={value}
        onChange={(ev: CustomSelectChangeEvent) => {
          setSelectionConfirmed(!!ev.selectionConfirmed);
          setValue(ev.target.value);
        }}
        name="selection confirmed"
        id="selection confirmed"
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
    </Box>
  );
};
SelectionConfirmedStory.storyName = "Selection Confirmed";
SelectionConfirmedStory.parameters = { chromatic: { disableSnapshot: true } };

const options = ["A", "B", "C"];
const allOptions = ["All"];

export const SelectWithDynamicallyAddedOption: Story = () => {
  const [optionsList, setOptionsList] = useState(options);
  const [currentOption, setCurrentOption] = useState<string | null>(null);
  useEffect(() => {
    if (currentOption) {
      setOptionsList([...allOptions, ...options]);
    }
  }, [currentOption]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentOption(e.target.value);
  };
  return (
    <Box height={200}>
      <Select
        label="Choose your option"
        data-role="selector"
        onChange={handleChange}
        value={currentOption || ""}
      >
        {optionsList.map((opt) => (
          <Option
            data-role={`option-${opt}`}
            text={opt}
            value={opt}
            key={opt}
          />
        ))}
      </Select>
    </Box>
  );
};
SelectWithDynamicallyAddedOption.storyName = "Dynamically Adding Options";
