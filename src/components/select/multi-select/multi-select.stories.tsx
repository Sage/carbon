import React, { useState, useRef } from "react";
import { Meta, StoryObj } from "@storybook/react-vite";

import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

import Button from "../../button";
import Box from "../../box";
import { MultiSelect, MultiSelectProps, Option, OptionRow } from "..";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof MultiSelect> = {
  title: "Select/MultiSelect",
  component: MultiSelect,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Default: Story = () => {
  return (
    <Box height={220}>
      <MultiSelect name="simple" id="simple" label="color">
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
      </MultiSelect>
    </Box>
  );
};
Default.storyName = "Default";

export const ListPlacement: Story = () => {
  const [listPlacement, setListPlacement] =
    useState<MultiSelectProps["listPlacement"]>("bottom-end");
  const [value, setValue] = useState<string[]>([]);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value: updatedValue } = ev.target;

    if (Array.isArray(updatedValue)) {
      setValue(updatedValue);
    }
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
        Bottom start
      </Button>
      <Box my="150px" ml="200px" width="200px">
        <MultiSelect
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
        </MultiSelect>
      </Box>
    </>
  );
};
ListPlacement.storyName = "List Placement";
ListPlacement.parameters = { chromatic: { disableSnapshot: true } };

export const ListHeight: Story = () => {
  return (
    <Box height={500}>
      <MultiSelect
        listMaxHeight={2000}
        name="list height"
        id="list-height"
        label="List height"
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
      </MultiSelect>
    </Box>
  );
};
ListHeight.storyName = "List Height";

export const ListWidth: Story = () => {
  const [value, setValue] = useState<string[]>([]);
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { value: updatedValue } = ev.target;

    if (Array.isArray(updatedValue)) {
      setValue(updatedValue);
    }
  };
  return (
    <Box height={200} width={200}>
      <MultiSelect
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
      </MultiSelect>
    </Box>
  );
};
ListWidth.storyName = "List Width";
ListWidth.parameters = { chromatic: { disableSnapshot: true } };

export const Controlled: Story = () => {
  const [value, setValue] = useState<string[]>([]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }
  function clearValue() {
    setValue([]);
  }
  return (
    <Box height={300}>
      <Button onClick={clearValue} mb={2}>
        clear
      </Button>
      <MultiSelect
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
      </MultiSelect>
    </Box>
  );
};
Controlled.storyName = "Controlled";
Controlled.parameters = { chromatic: { disableSnapshot: true } };

export const OpenOnFocus: Story = () => {
  return (
    <Box height={250}>
      <MultiSelect
        name="openOnFocus"
        id="openOnFocus"
        openOnFocus
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
      </MultiSelect>
    </Box>
  );
};
OpenOnFocus.storyName = "Open on Focus";
OpenOnFocus.parameters = { chromatic: { disableSnapshot: true } };

export const Disabled: Story = () => {
  return (
    <MultiSelect
      aria-label="disabled"
      name="disabled"
      id="select-disabled"
      defaultValue={["1", "3"]}
      disabled
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
    </MultiSelect>
  );
};
Disabled.storyName = "Disabled";

export const Readonly: Story = () => {
  return (
    <MultiSelect
      aria-label="readonly"
      name="readonly"
      id="readonly"
      defaultValue={["1", "3"]}
      readOnly
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
    </MultiSelect>
  );
};
Readonly.storyName = "Read Only";

export const WithMultipleColumns: Story = () => {
  return (
    <Box height={250}>
      <MultiSelect
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
  );
};
WithMultipleColumns.storyName = "With Multiple Columns";
WithMultipleColumns.parameters = { chromatic: { disableSnapshot: true } };

export const Required: Story = () => {
  return (
    <Box height={250}>
      <MultiSelect
        name="required-select"
        id="required-select"
        label="Foreground Color"
        required
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
      </MultiSelect>
    </Box>
  );
};
Required.storyName = "Required";

export const IsOptional: Story = () => {
  return (
    <Box height={250}>
      <MultiSelect
        name="optional-select"
        id="optional-select"
        label="Foreground Color"
        isOptional
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
      </MultiSelect>
    </Box>
  );
};
IsOptional.storyName = "IsOptional";

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

  const [value, setValue] = useState<Record<string, unknown>[]>([
    optionListValues[4],
  ]);

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (typeof event.target.value === "object") {
      setValue(event.target.value);
    }
  }
  function clearValue() {
    setValue([]);
  }
  return (
    <Box height={300}>
      <Button onClick={clearValue} mb={2}>
        clear
      </Button>
      <MultiSelect
        id="with-object"
        name="with-object"
        value={value}
        onChange={onChangeHandler}
        label="color"
      >
        {optionListValues.map((option) => (
          <Option key={option.id} text={option.text} value={option} />
        ))}
      </MultiSelect>
    </Box>
  );
};
WithObjectAsValue.storyName = "With Object as Value";
WithObjectAsValue.parameters = { chromatic: { disableSnapshot: true } };

export const WithIsLoadingProp: Story = () => {
  const preventLoading = useRef(false);
  const [value, setValue] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const asyncList = [
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ];
  const [optionList, setOptionList] = useState<React.ReactElement[]>([]);
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
    setOptionList([]);
    setValue([]);
    preventLoading.current = false;
  }
  return (
    <Box height={300}>
      <Button onClick={clearData} mb={2}>
        reset
      </Button>
      <MultiSelect
        name="isLoading"
        id="isLoading"
        label="color"
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
        onOpen={() => loadList()}
        isLoading={isLoading}
      >
        {optionList}
      </MultiSelect>
    </Box>
  );
};
WithIsLoadingProp.storyName = "With isLoading prop";
WithIsLoadingProp.parameters = { chromatic: { disableSnapshot: true } };

export const WithCustomColoredPills: Story = () => {
  return (
    <Box height={250}>
      <MultiSelect
        name="simple"
        id="simple"
        label="color"
        defaultValue={["1", "3"]}
      >
        <Option text="Amber" value="1" borderColor="#FFBF00" fill />
        <Option text="Black" value="2" borderColor="blackOpacity65" fill />
        <Option text="Blue" value="3" borderColor="productBlue" />
        <Option text="Brown" value="4" borderColor="brown" fill />
        <Option text="Green" value="5" borderColor="productGreen" />
        <Option text="Orange" value="6" borderColor="orange" />
        <Option text="Pink" value="7" borderColor="pink" />
        <Option text="Purple" value="8" borderColor="purple" />
        <Option text="Red" value="9" borderColor="red" fill />
        <Option text="White" value="10" borderColor="white" />
        <Option text="Yellow" value="11" borderColor="yellow" fill />
      </MultiSelect>
    </Box>
  );
};
WithCustomColoredPills.storyName = "With Custom Colored Pills";

export const WithInfiniteScroll: Story = () => {
  const preventLoading = useRef(false);
  const preventLazyLoading = useRef(false);
  const lazyLoadingCounter = useRef(0);

  const [value, setValue] = useState<string[]>([]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }
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
    setValue([]);
    preventLoading.current = false;
  }
  return (
    <Box height={300}>
      <Button onClick={clearData} mb={2}>
        reset
      </Button>
      <MultiSelect
        name="infiniteScroll"
        id="infiniteScroll"
        label="color"
        value={value}
        onChange={onChangeHandler}
        onOpen={() => loadList()}
        isLoading={isLoading}
        onListScrollBottom={onLazyLoading}
      >
        {optionList}
      </MultiSelect>
    </Box>
  );
};
WithInfiniteScroll.storyName = "With infinite scroll";
WithInfiniteScroll.parameters = { chromatic: { disableSnapshot: true } };

export const WithCustomMaxWidth: Story = () => {
  return (
    <Box height={250}>
      <MultiSelect name="simple" id="simple" maxWidth="50%" label="color">
        <Option text="Amber" value="1" borderColor="#FFBF00" fill />
        <Option text="Black" value="2" borderColor="blackOpacity65" fill />
        <Option text="Blue" value="3" borderColor="productBlue" />
        <Option text="Brown" value="4" borderColor="brown" fill />
        <Option text="Green" value="5" borderColor="productGreen" />
        <Option text="Orange" value="6" borderColor="orange" />
        <Option text="Pink" value="7" borderColor="pink" />
        <Option text="Purple" value="8" borderColor="purple" />
        <Option text="Red" value="9" borderColor="red" fill />
        <Option text="White" value="10" borderColor="white" />
        <Option text="Yellow" value="11" borderColor="yellow" fill />
      </MultiSelect>
    </Box>
  );
};
WithCustomMaxWidth.storyName = "With Custom Max Width";

export const PillsWithLongText: Story = () => {
  return (
    <Box height={250} maxWidth="200px">
      <MultiSelect
        name="long-pill-text-wrapped"
        id="long-pill-text-wrapped"
        label="long pill text wrapped"
        wrapPillText
        defaultValue={["1"]}
      >
        <Option text="Amber is the colour" value="1" />
        <Option text="Black is the colour" value="2" />
        <Option text="Blue" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green" value="5" />
      </MultiSelect>
    </Box>
  );
};
PillsWithLongText.storyName = "Pills with Long Text";

export const Virtualised: Story = () => {
  const colors = [
    "Amber",
    "Black",
    "Blue",
    "Brown",
    "Green",
    "Orange",
    "Pink",
    "Purple",
    "Red",
    "White",
    "Yellow",
  ];
  const options = Array(10000)
    .fill(undefined)
    .map((_, index) => (
      <Option
        key={`option-${index + 1}`}
        value={`${index}`}
        text={`${colors[index % colors.length]} - option ${index + 1}`}
      />
    ));
  return (
    <Box height={220}>
      <MultiSelect
        name="virtualised"
        id="virtualised"
        label="choose an option"
        labelInline
        enableVirtualScroll
        virtualScrollOverscan={20}
      >
        {options}
      </MultiSelect>
    </Box>
  );
};
Virtualised.storyName = "Virtualised";
