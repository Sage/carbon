import React, { useState, useRef } from "react";
import {
  FilterableSelect,
  Option,
  FilterableSelectProps,
  CustomSelectChangeEvent,
} from "..";
import OptionRow from "../option-row/option-row.component";
import Dialog from "../../dialog";
import Button from "../../button";

export const FilterableSelectComponent = (
  props: Partial<FilterableSelectProps>,
) => {
  const [value, setValue] = useState("");
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
  return (
    <FilterableSelect
      label="filterable select"
      labelInline
      value={value}
      onChange={onChangeHandler}
      {...props}
    >
      <Option
        id="option1"
        text="Amber"
        value="1"
        data-role="option1"
        data-element="option1"
      />
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

export const FilterableSelectWithLazyLoadingComponent = (
  props: Partial<FilterableSelectProps>,
) => {
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
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
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
  return (
    <FilterableSelect
      label="color"
      value={value}
      onChange={onChangeHandler}
      onOpen={() => loadList()}
      isLoading={isLoading}
      {...props}
    >
      {optionList}
    </FilterableSelect>
  );
};

export const FilterableSelectLazyLoadTwiceComponent = (
  props: Partial<FilterableSelectProps>,
) => {
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
    <div>
      <Button onClick={clearData} mb={2} data-element="reset-button">
        reset
      </Button>
      <FilterableSelect
        label="color"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onOpen={() => loadList()}
        isLoading={isLoading}
        {...props}
      >
        {optionList}
      </FilterableSelect>
    </div>
  );
};

export const FilterableSelectWithInfiniteScrollComponent = (
  props: Partial<FilterableSelectProps>,
) => {
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
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }
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
  function onLazyLoading() {
    if (preventLazyLoading.current) {
      return;
    }
    preventLazyLoading.current = true;
    setIsLoading(true);
    setTimeout(() => {
      preventLazyLoading.current = false;
      lazyLoadingCounter.current += 1;
      setIsLoading(false);
      setOptionList((prevList) => [...prevList, ...getLazyLoaded()]);
    }, 2000);
  }
  return (
    <FilterableSelect
      label="color"
      value={value}
      onChange={onChangeHandler}
      onOpen={() => loadList()}
      isLoading={isLoading}
      onListScrollBottom={onLazyLoading}
      {...props}
    >
      {optionList}
    </FilterableSelect>
  );
};

export const FilterableSelectObjectAsValueComponent = (
  props: Partial<FilterableSelectProps>,
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
    <FilterableSelect
      label="color"
      value={value}
      onChange={onChangeHandler}
      {...props}
    >
      {optionListValues.map((option) => (
        <Option key={option.id} text={option.text} value={option} />
      ))}
    </FilterableSelect>
  );
};

export const FilterableSelectMultiColumnsComponent = (
  props: Partial<FilterableSelectProps>,
) => {
  return (
    <FilterableSelect
      multiColumn
      defaultValue="2"
      {...props}
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
      <OptionRow
        id="3"
        value="3"
        text="Jane Poe"
        data-component="option-row"
        data-role="option-row"
        data-element="option-row"
      >
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
};

export const FilterableSelectMultiColumnsNestedComponent = (
  props: Partial<FilterableSelectProps>,
) => {
  return (
    <FilterableSelect
      multiColumn
      defaultValue="2"
      {...props}
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
};

export const FilterableSelectWithActionButtonComponent = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [optionList, setOptionList] = useState([
    <Option text="Amber" value="amber" key="Amber" />,
    <Option text="Black" value="black" key="Black" />,
    <Option text="Blue" value="blue" key="Blue" />,
    <Option text="Brown" value="brown" key="Brown" />,
    <Option text="Green" value="green" key="Green" />,
    <Option text="Amber" value="amber1" key="Amber1" />,
    <Option text="Black" value="black1" key="Black1" />,
    <Option text="Blue" value="blue1" key="Blue1" />,
    <Option text="Brown" value="brown1" key="Brown1" />,
    <Option text="Green" value="green1" key="Green1" />,
  ]);
  function addNew() {
    const counter = optionList.length.toString();
    setOptionList((newOptionList) => [
      ...newOptionList,
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

export const FilterableSelectOnChangeEventComponent = ({
  onChange,
  ...props
}: Partial<FilterableSelectProps>) => {
  const [state, setState] = useState("");
  const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };
  return (
    <FilterableSelect
      label="color"
      value={state}
      labelInline
      onChange={setValue}
      {...props}
    >
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
    </FilterableSelect>
  );
};

export const FilterableSelectListActionEventComponent = (
  props: Partial<FilterableSelectProps>,
) => {
  const [value, setValue] = useState("");
  return (
    <FilterableSelect
      label="color"
      value={value}
      labelInline
      onChange={(event) => setValue(event.target.value)}
      {...props}
      listActionButton={
        <Button iconType="add" iconPosition="after">
          Add a New Element
        </Button>
      }
    >
      <Option text="Amber" value="1" />
      <Option text="Black" value="2" />
      <Option text="Blue" value="3" />
      <Option text="Brown" value="4" />
      <Option text="Green" value="5" />
    </FilterableSelect>
  );
};

export const FilterableSelectWithManyOptionsAndVirtualScrolling = () => (
  <FilterableSelect
    name="virtualised"
    id="virtualised"
    label="choose an option"
    labelInline
    enableVirtualScroll
    virtualScrollOverscan={10}
  >
    {Array(10000)
      .fill(undefined)
      .map((_, index) => (
        <Option
          key={`option-${index + 1}`}
          value={`${index}`}
          text={`Option ${index + 1}.`}
        />
      ))}
  </FilterableSelect>
);

export const FilterableSelectNestedInDialog = ({
  openOnFocus = false,
  autofocus = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <FilterableSelect
        openOnFocus={openOnFocus}
        autoFocus={autofocus}
        name="testSelect"
        id="testSelect"
      >
        <Option value="opt1" text="red" />
        <Option value="opt2" text="green" />
        <Option value="opt3" text="blue" />
        <Option value="opt4" text="black" />
      </FilterableSelect>
    </Dialog>
  );
};

export const SelectionConfirmed = () => {
  const [value, setValue] = useState("");
  const [confirmedSelection, setConfirmedSelection] = useState("");
  const [selectionConfirmed, setSelectionConfirmed] = useState(false);

  const handleChange = (event: CustomSelectChangeEvent) => {
    setValue(event.target.value);
    setSelectionConfirmed(!!event.selectionConfirmed);
    if (event.selectionConfirmed) {
      setConfirmedSelection(event.target.value);
    }
  };
  return (
    <>
      <FilterableSelect
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
      </FilterableSelect>

      {selectionConfirmed ? (
        <span data-element={`confirmed-selection-${confirmedSelection}`}>
          {confirmedSelection}
        </span>
      ) : null}
    </>
  );
};

export const FilterableSelectWithDisabledOption = () => {
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
      <FilterableSelect
        name="testing"
        value={value}
        onChange={handleChange}
        openOnFocus
        label="Test"
        placeholder=" "
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" disabled />
        <Option value="3" text="Three" />
        <Option value="4" text="Four" />
      </FilterableSelect>

      {confirmedSelection ? (
        <span data-element={`confirmed-selection-${confirmedSelection}`}>
          {confirmedSelection}
        </span>
      ) : null}
    </>
  );
};

export const FilterableSelectControlled = () => {
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

export const WithObjectAsValue = () => {
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
        {optionListValues.current.map((option) => (
          <Option key={option.id} text={option.text} value={option} />
        ))}
      </FilterableSelect>
    </>
  );
};
