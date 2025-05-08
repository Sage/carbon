import React, { useState, useRef, useMemo, useCallback } from "react";
import { Meta, StoryObj } from "@storybook/react";

import generateStyledSystemProps from "../../../../.storybook/utils/styled-system-props";

import Button from "../../button";
import Dialog from "../../dialog";
import Box from "../../box";
import Icon from "../../icon";
import Typography from "../../typography";
import {
  CustomSelectChangeEvent,
  FilterableSelect,
  FilterableSelectProps,
  Option,
  OptionRow,
} from "..";

const styledSystemProps = generateStyledSystemProps({
  margin: true,
});

const meta: Meta<typeof FilterableSelect> = {
  title: "Select/Filterable",
  component: FilterableSelect,
  argTypes: {
    ...styledSystemProps,
  },
};

export default meta;
type Story = StoryObj<typeof FilterableSelect>;

export const Default: Story = () => {
  return (
    <Box height={220}>
      <FilterableSelect name="simple" id="simple" label="color">
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
      </FilterableSelect>
    </Box>
  );
};
Default.storyName = "Default";

export const ListPlacement: Story = () => {
  const [listPlacement, setListPlacement] =
    useState<FilterableSelectProps["listPlacement"]>("bottom-end");
  const [value, setValue] = useState<string>("");
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
        Bottom start
      </Button>
      <Box my="150px" ml="200px" width="200px">
        <FilterableSelect
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
        </FilterableSelect>
      </Box>
    </>
  );
};
ListPlacement.storyName = "List Placement";
ListPlacement.parameters = { chromatic: { disableSnapshot: true } };

export const ListHeight: Story = () => {
  return (
    <Box height={500}>
      <FilterableSelect
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
      </FilterableSelect>
    </Box>
  );
};
ListHeight.storyName = "List Height";

export const ListWidth: Story = () => {
  const [value, setValue] = useState<string>("");
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  };
  return (
    <Box height={200} width={200}>
      <FilterableSelect
        name="listWidth"
        id="listWidth"
        label="color"
        labelInline
        listWidth={350}
        listPlacement="bottom-start"
        value={value}
        onChange={handleChange}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue" value="3" />
      </FilterableSelect>
    </Box>
  );
};
ListWidth.storyName = "List Width";
ListWidth.parameters = { chromatic: { disableSnapshot: true } };

export const Controlled: Story = () => {
  const [value, setValue] = useState("");
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  function clearValue() {
    setValue("");
  }
  return (
    <Box height={300}>
      <Button onClick={clearValue} mb={2}>
        clear
      </Button>
      <FilterableSelect
        id="controlled"
        name="controlled"
        label="color"
        value={value}
        onChange={onChangeHandler}
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
      </FilterableSelect>
    </Box>
  );
};
Controlled.storyName = "Controlled";
Controlled.parameters = { chromatic: { disableSnapshot: true } };

export const OpenOnFocus: Story = () => {
  return (
    <Box height={250}>
      <FilterableSelect
        name="openOnFocus"
        id="openOnFocus"
        label="color"
        openOnFocus
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
      </FilterableSelect>
    </Box>
  );
};
OpenOnFocus.storyName = "Open on Focus";
OpenOnFocus.parameters = { chromatic: { disableSnapshot: true } };

export const Disabled: Story = () => {
  return (
    <FilterableSelect
      aria-label="disabled"
      name="disabled"
      id="disabled"
      defaultValue="3"
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
    </FilterableSelect>
  );
};
Disabled.storyName = "Disabled";

export const Readonly: Story = () => {
  return (
    <FilterableSelect
      aria-label="readonly"
      name="readonly"
      id="readonly"
      defaultValue="4"
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
    </FilterableSelect>
  );
};
Readonly.storyName = "Read Only";

export const WithMultipleColumns: Story = () => {
  return (
    <Box height={250}>
      <FilterableSelect
        name="withMultipleColumns"
        id="withMultipleColumns"
        label="clients"
        defaultValue="4"
        multiColumn
        tableHeader={
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Occupation</th>
          </tr>
        }
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
      </FilterableSelect>
    </Box>
  );
};
WithMultipleColumns.storyName = "With Multiple Columns";
WithMultipleColumns.parameters = { chromatic: { disableSnapshot: true } };

export const WithMultipleColumnsAndNested: Story = () => {
  return (
    <Box height={300}>
      <FilterableSelect
        name="withMultipleColumns"
        id="withMultipleColumns"
        label="clients"
        defaultValue="2"
        multiColumn
        openOnFocus
        tableHeader={
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Occupation</th>
          </tr>
        }
        listActionButton={
          <Button iconType="add" iconPosition="after">
            Add a New Element
          </Button>
        }
        // eslint-disable-next-line no-console
        onListAction={() => console.log("Action")}
      >
        <OptionRow id="1" value="1" text="John Doe">
          <td>John</td>
          <td>Doe</td>
          <td>
            <b>test</b>
          </td>
        </OptionRow>
        <OptionRow id="2" value="2" text="Joe Vick">
          <td>Joe</td>
          <td>Vick</td>
          <td>
            <b>Accountant</b>
          </td>
        </OptionRow>
        <OptionRow id="3" value="3" text="Jane Poe">
          <td>Jane</td>
          <td>Poe</td>
          <td>
            <b>Accountant</b>
          </td>
        </OptionRow>
        <OptionRow id="4" value="4" text="Jill Moe">
          <td>Jill</td>
          <td>Moe</td>
          <td>
            <b>Engineer</b>
          </td>
        </OptionRow>
        <OptionRow id="5" value="5" text="Bill Zoe">
          <td>Bill</td>
          <td>Zoe</td>
          <td>
            <b>Astronaut</b>
          </td>
        </OptionRow>
      </FilterableSelect>
    </Box>
  );
};
WithMultipleColumnsAndNested.storyName = "With Multiple Columns and Nested";
WithMultipleColumnsAndNested.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithActionButton: Story = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [optionList, setOptionList] = useState([
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
  ]);
  function addNew() {
    const counter = optionList.length.toString();
    setOptionList((previousOptionList) => [
      ...previousOptionList,
      <Option
        text={`New${counter}`}
        value={`val${counter}`}
        key={`New${counter}`}
      />,
    ]);
    setIsOpen(false);
    setValue(`val${counter}`);
  }
  return (
    <Box height={300}>
      <FilterableSelect
        name="action"
        id="action"
        label="color"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        listActionButton={
          <Button iconType="add" iconPosition="after">
            Add a New Element
          </Button>
        }
        onListAction={() => setIsOpen(true)}
      >
        {optionList}
      </FilterableSelect>
      <Dialog
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        title="Dialog component triggered on action"
      >
        <Button onClick={addNew}>Add new</Button>
      </Dialog>
    </Box>
  );
};
WithActionButton.storyName = "With Action Button";
WithActionButton.parameters = { chromatic: { disableSnapshot: true } };

export const WithIsLoadingProp: Story = () => {
  const preventLoading = useRef(false);
  const [value, setValue] = useState("");
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
    setValue("");
    preventLoading.current = false;
  }
  return (
    <Box height={300}>
      <Button onClick={clearData} mb={2}>
        reset
      </Button>
      <FilterableSelect
        name="isLoading"
        id="isLoading"
        label="color"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onOpen={() => loadList()}
        isLoading={isLoading}
      >
        {optionList}
      </FilterableSelect>
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
      <FilterableSelect
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
      </FilterableSelect>
    </Box>
  );
};
WithInfiniteScroll.storyName = "With Infinite Scroll";
WithInfiniteScroll.parameters = { chromatic: { disableSnapshot: true } };

export const WithCustomMaxWidth: Story = () => {
  return (
    <Box height={250}>
      <FilterableSelect name="simple" id="simple" label="color" maxWidth="50%">
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
      </FilterableSelect>
    </Box>
  );
};
WithCustomMaxWidth.storyName = "With Custom Max Width";

export const Required: Story = () => {
  return (
    <Box height={250}>
      <FilterableSelect
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
      </FilterableSelect>
    </Box>
  );
};
Required.storyName = "Required";

export const IsOptional: Story = () => (
  <Box height={250}>
    <FilterableSelect
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
    </FilterableSelect>
  </Box>
);
IsOptional.storyName = "IsOptional";

export const WithObjectAsValue: Story = () => {
  const optionListValues = useRef([
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
  ]);

  const [value, setValue] = useState<Record<string, unknown>>(
    optionListValues.current[4],
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
      <FilterableSelect
        id="with-object"
        name="with-object"
        label="color"
        value={value}
        onChange={onChangeHandler}
      >
        {optionListValues.current.map((option) => (
          <Option key={option.id} text={option.text} value={option} />
        ))}
      </FilterableSelect>
    </Box>
  );
};
WithObjectAsValue.storyName = "With Object as Value";
WithObjectAsValue.parameters = { chromatic: { disableSnapshot: true } };

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
      <FilterableSelect
        name="virtualised"
        id="virtualised"
        label="choose an option"
        labelInline
        enableVirtualScroll
        virtualScrollOverscan={20}
      >
        {options}
      </FilterableSelect>
    </Box>
  );
};
Virtualised.storyName = "Virtualised";

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
      <FilterableSelect
        onChange={(ev: CustomSelectChangeEvent) => {
          setValue(ev.target.value);
          setSelectionConfirmed(!!ev.selectionConfirmed);
        }}
        value={value}
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
      </FilterableSelect>
    </Box>
  );
};
SelectionConfirmedStory.storyName = "Selection Confirmed";
SelectionConfirmedStory.parameters = { chromatic: { disableSnapshot: true } };

export const CustomFilterAndOptionStyle: Story = () => {
  const [filterText, setFilterText] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | undefined>();

  const data = useMemo(
    () =>
      [
        { text: "Amber", color: "#FFBF00" },
        { text: "Black", color: "#000000" },
        { text: "Blue", color: "#0000FF" },
        { text: "Brown", color: "#A52A2A" },
        { text: "Green", color: "#008000" },
        { text: "Orange", color: "#FFA500" },
        { text: "Pink", color: "#FFC0CB" },
        { text: "Purple", color: "#800080" },
        { text: "Red", color: "#FF0000" },
        { text: "White", color: "#FFFFFF" },
        { text: "Yellow", color: "#FFFF00" },
      ].filter(
        ({ text }) =>
          !filterText ||
          (filterText.trim().length &&
            text.toLowerCase().includes(filterText.trim().toLowerCase())),
      ),
    [filterText],
  );

  const handleChange = useCallback((e: CustomSelectChangeEvent) => {
    if (e.selectionConfirmed && e.target?.value) {
      setSelectedColor(e.target.value as string);
    } else {
      setSelectedColor(undefined);
    }
  }, []);

  return (
    <Box height={280}>
      <Typography variant="strong" mb={2} display="block">
        Selected Color:{" "}
        {selectedColor ? (
          <Icon type="favourite" color={selectedColor} />
        ) : (
          "[none]"
        )}
      </Typography>
      <FilterableSelect
        onChange={handleChange}
        onFilterChange={setFilterText}
        name="Custom filter and option styles"
        id="custom-filter-and-option-styles"
        label="Color"
        disableDefaultFiltering
        leftChildren={
          selectedColor && (
            <Box display="flex" alignItems="center" ml={1}>
              <Icon type="favourite" color={selectedColor} />
            </Box>
          )
        }
      >
        {data.map(({ text, color }) => (
          <Option text={text} value={color} key={color}>
            <Icon type="favourite" color={color} mr={1} />
            {text}
          </Option>
        ))}
      </FilterableSelect>
    </Box>
  );
};
CustomFilterAndOptionStyle.storyName = "Custom Filter and Option Style";
CustomFilterAndOptionStyle.parameters = {
  chromatic: { disableSnapshot: true },
};
