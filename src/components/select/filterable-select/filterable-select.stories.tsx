import React, { useState, useRef } from "react";
import {
  CustomSelectChangeEvent,
  FilterableSelect,
  Option,
  OptionRow,
} from "..";
import Button from "../../button";
import Dialog from "../../dialog";
import CarbonProvider from "../../carbon-provider";
import Box from "../../box";
import Icon from "../../icon";
import Typography from "../../typography";

export const Default = () => (
  <FilterableSelect name="simple" id="simple" label="color" labelInline>
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

export const ListPlacement = () => (
  <FilterableSelect
    name="simple"
    id="simple"
    label="color"
    labelInline
    listPlacement="top"
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

export const ListHeight = () => (
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
);

export const Controlled = () => {
  const [value, setValue] = useState("");
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
    </>
  );
};

Controlled.parameters = { chromatic: { disableSnapshot: true } };

export const OpenOnFocus = () => (
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
);

OpenOnFocus.parameters = { chromatic: { disableSnapshot: true } };

export const Disabled = () => (
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

export const Readonly = () => (
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

export const WithDisabledPortal = () => (
  <FilterableSelect
    disablePortal
    name="withDisabledPortal"
    id="withDisabledPortal"
    label="color"
    defaultValue="4"
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

WithDisabledPortal.parameters = { chromatic: { disableSnapshot: true } };

export const WithMultipleColumns = () => (
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
);

WithMultipleColumns.parameters = { chromatic: { disableSnapshot: true } };

export const WithMultipleColumnsAndNested = () => (
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
);

WithMultipleColumnsAndNested.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithActionButton = () => {
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
    <>
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
    </>
  );
};

WithActionButton.parameters = { chromatic: { disableSnapshot: true } };

export const WithIsLoadingProp = () => {
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
    <>
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
    </>
  );
};

WithIsLoadingProp.parameters = { chromatic: { disableSnapshot: true } };

export const WithInfiniteScroll = () => {
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
    <>
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
    </>
  );
};

WithInfiniteScroll.parameters = { chromatic: { disableSnapshot: true } };

export const WithCustomMaxWidth = () => (
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
);

export const Required = () => (
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
);

export const WithObjectAsValue = () => {
  const [value, setValue] = useState<Record<string, unknown>>({
    id: "Green",
    value: 5,
    text: "Green",
  });
  const optionList = useRef([
    <Option
      text="Amber"
      key="Amber"
      value={{ id: "Amber", value: 1, text: "Amber" }}
    />,
    <Option
      text="Black"
      key="Black"
      value={{ id: "Black", value: 2, text: "Black" }}
    />,
    <Option
      text="Blue"
      key="Blue"
      value={{ id: "Blue", value: 3, text: "Blue" }}
    />,
    <Option
      text="Brown"
      key="Brown"
      value={{ id: "Brown", value: 4, text: "Brown" }}
    />,
    <Option
      text="Green"
      key="Green"
      value={{ id: "Green", value: 5, text: "Green" }}
    />,
    <Option
      text="Orange"
      key="Orange"
      value={{ id: "Orange", value: 6, text: "Orange" }}
    />,
    <Option
      text="Pink"
      key="Pink"
      value={{ id: "Pink", value: 7, text: "Pink" }}
    />,
    <Option
      text="Purple"
      key="Purple"
      value={{ id: "Purple", value: 8, text: "Purple" }}
    />,
    <Option
      text="Red"
      key="Red"
      value={{ id: "Red", value: 9, text: "Red" }}
    />,
    <Option
      text="White"
      key="White"
      value={{ id: "White", value: 10, text: "White" }}
    />,
    <Option
      text="Yellow"
      key="Yellow"
      value={{ id: "Yellow", value: 11, text: "Yellow" }}
    />,
  ]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue((event.target.value as unknown) as Record<string, unknown>);
  }
  function clearValue() {
    setValue({});
  }
  return (
    <>
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
        {optionList.current}
      </FilterableSelect>
    </>
  );
};

WithObjectAsValue.parameters = { chromatic: { disableSnapshot: true } };

export const ValidationsStringNewDesign = () => (
  <CarbonProvider validationRedesignOptIn>
    {["error", "warning"].map((validationType) =>
      (["small", "medium", "large"] as const).map((size) => (
        <Box width="296px" key={`${validationType}-${size}`}>
          <FilterableSelect
            name="filterable"
            id={`${size} - ${validationType}`}
            label={`${size} - ${validationType}`}
            labelInline
            size={size}
            {...{ [validationType]: "Message" }}
            m={4}
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
          <FilterableSelect
            name="filterable - readOnly"
            id={`readOnly - ${size} - ${validationType}`}
            label={`readOnly - ${size} - ${validationType}`}
            labelInline
            size={size}
            {...{ [validationType]: "Message" }}
            readOnly
            m={4}
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
      ))
    )}
  </CarbonProvider>
);

export const Virtualised = () => {
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
  );
};

export const SelectionConfirmedStory = () => {
  const [selectionConfirmed, setSelectionConfirmed] = useState(false);
  return (
    <Box p={1}>
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
          setSelectionConfirmed(!!ev.selectionConfirmed);
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
      </FilterableSelect>
    </Box>
  );
};

SelectionConfirmedStory.parameters = { chromatic: { disableSnapshot: true } };
