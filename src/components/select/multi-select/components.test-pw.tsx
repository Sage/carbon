import React, { useState, useRef } from "react";
import {
  MultiSelect,
  Option,
  MultiSelectProps,
  CustomSelectChangeEvent,
} from "..";
import OptionRow from "../option-row/option-row.component";
import Button from "../../button/button.component";
import Dialog from "../../dialog";
import Box from "../../box";
import CarbonProvider from "../../carbon-provider/carbon-provider.component";

export const MultiSelectComponent = (props: Partial<MultiSelectProps>) => {
  const [value, setValue] = useState<string[]>([]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }
  return (
    <MultiSelect
      label="color"
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
    </MultiSelect>
  );
};

export const MultiSelectDefaultValueComponent = (
  props: Partial<MultiSelectProps>,
) => {
  return (
    <MultiSelect label="color" labelInline {...props}>
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

export const MultiSelectLongPillComponent = (
  props: Partial<MultiSelectProps>,
) => {
  const [value, setValue] = useState<string[]>([]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }
  return (
    <div
      style={{
        maxWidth: "200px",
      }}
    >
      <MultiSelect
        label="color"
        labelInline
        value={value}
        onChange={onChangeHandler}
        {...props}
      >
        <Option text="Amber" value="1" />
        <Option text="Black" value="2" />
        <Option text="Blue as the sky on a summer's day" value="3" />
        <Option text="Brown" value="4" />
        <Option text="Green as the grass in a spring meadow" value="5" />
        <Option text="Orange" value="6" />
        <Option text="Pink" value="7" />
        <Option text="Purple" value="8" />
        <Option text="Red" value="9" />
        <Option text="White" value="10" />
        <Option text="Yellow" value="11" />
      </MultiSelect>
    </div>
  );
};

export const MultiSelectWithLazyLoadingComponent = (
  props: Partial<MultiSelectProps>,
) => {
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
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
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
    <MultiSelect
      label="color"
      value={value}
      onChange={onChangeHandler}
      onOpen={() => loadList()}
      isLoading={isLoading}
      {...props}
    >
      {optionList}
    </MultiSelect>
  );
};

export const MultiSelectLazyLoadTwiceComponent = (
  props: Partial<MultiSelectProps>,
) => {
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
    <div>
      <Button onClick={clearData} mb={2} data-element="reset-button">
        reset
      </Button>
      <MultiSelect
        label="color"
        value={value}
        onChange={(event) =>
          setValue(event.target.value as unknown as string[])
        }
        onOpen={() => loadList()}
        isLoading={isLoading}
        {...props}
      >
        {optionList}
      </MultiSelect>
    </div>
  );
};

export const MultiSelectWithInfiniteScrollComponent = (
  props: Partial<MultiSelectProps>,
) => {
  const preventLoading = useRef(false);
  const preventLazyLoading = useRef(false);
  const lazyLoadingCounter = useRef(0);
  const [value, setValue] = useState<string[]>([]);
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
    setValue(event.target.value as unknown as string[]);
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
    <MultiSelect
      label="color"
      value={value}
      onChange={onChangeHandler}
      onOpen={() => loadList()}
      isLoading={isLoading}
      onListScrollBottom={onLazyLoading}
      {...props}
    >
      {optionList}
    </MultiSelect>
  );
};

export const MultiSelectObjectAsValueComponent = (
  props: Partial<MultiSelectProps>,
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

  const [value, setValue] = useState<Record<string, unknown>[]>([
    optionListValues[4],
  ]);

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as Record<string, unknown>[]);
  }
  return (
    <MultiSelect
      label="color"
      value={value}
      onChange={onChangeHandler}
      {...props}
    >
      {optionListValues.map((option) => (
        <Option key={option.id} text={option.text} value={option} />
      ))}
    </MultiSelect>
  );
};

export const MultiSelectMultiColumnsComponent = (
  props: Partial<MultiSelectProps>,
) => {
  return (
    <MultiSelect
      multiColumn
      defaultValue={["2"]}
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
    </MultiSelect>
  );
};

export const MultiSelectMaxOptionsComponent = (
  props: Partial<MultiSelectProps>,
) => {
  const maxSelectionsAllowed = 2;
  const [selectedPills, setSelectedPills] = useState<string[]>([]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value.length <= maxSelectionsAllowed) {
      setSelectedPills(event.target.value as unknown as string[]);
    }
  }
  return (
    <MultiSelect
      value={selectedPills}
      onChange={onChangeHandler}
      openOnFocus
      label="color"
      {...props}
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

export const MultiSelectOnFilterChangeEventComponent = ({
  onChange,
  ...props
}: Partial<MultiSelectProps>) => {
  const [state, setState] = useState<string[]>([]);
  const setValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value as unknown as string[]);
    if (onChange) {
      onChange(event);
    }
  };
  return (
    <MultiSelect
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
    </MultiSelect>
  );
};

export const MultiSelectCustomColorComponent = (
  props: Partial<MultiSelectProps>,
) => {
  return (
    <MultiSelect label="color" labelInline defaultValue={["1", "3"]} {...props}>
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
  );
};

export const MultiSelectWithManyOptionsAndVirtualScrolling = () => (
  <MultiSelect
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
  </MultiSelect>
);

export const MultiSelectNestedInDialog = ({
  openOnFocus = false,
  autofocus = false,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <MultiSelect
        openOnFocus={openOnFocus}
        autoFocus={autofocus}
        name="testSelect"
        id="testSelect"
      >
        <Option value="opt1" text="red" />
        <Option value="opt2" text="green" />
        <Option value="opt3" text="blue" />
        <Option value="opt4" text="black" />
      </MultiSelect>
    </Dialog>
  );
};

export const MultiSelectErrorOnChangeNewValidation = () => {
  const [selectedPills, setSelectedPills] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length < 3) {
      setShowError(false);
      setSelectedPills(event.target.value as unknown as string[]);
    } else {
      setShowError(true);
    }
  };
  const handleError = showError ? "Error" : "";
  return (
    <CarbonProvider validationRedesignOptIn>
      Open dropdown and try to select more than 2 pills
      <Box width="300px" ml={10} mt={10}>
        <MultiSelect
          name="testing"
          value={selectedPills}
          onChange={handleOnChange}
          openOnFocus
          label="Test"
          placeholder="FooBar"
          error={handleError}
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
    </CarbonProvider>
  );
};

export const SelectionConfirmed = () => {
  const [value, setValue] = useState<string[]>([]);
  const [confirmedSelections, setConfirmedSelections] = useState<string[]>([]);
  const handleChange = (event: CustomSelectChangeEvent) => {
    setValue(event.target.value as unknown as string[]);
    if (event.selectionConfirmed) {
      setConfirmedSelections(event.target.value as unknown as string[]);
    }
  };
  return (
    <>
      <MultiSelect
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
      </MultiSelect>

      <div data-element="confirmed-selections">
        {confirmedSelections.map((cs) => (
          <span data-element={`confirmed-selection-${cs}`}>{cs}</span>
        ))}
      </div>
    </>
  );
};

export const MultiSelectWithDisabledOption = () => {
  const [value, setValue] = useState<string[]>([]);
  const [confirmedSelections, setConfirmedSelections] = useState<string[]>([]);

  const handleChange = (event: CustomSelectChangeEvent) => {
    setValue(event.target.value as unknown as string[]);
    if (event.selectionConfirmed) {
      setConfirmedSelections(event.target.value as unknown as string[]);
    }
  };
  return (
    <>
      <MultiSelect
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
      </MultiSelect>

      <div data-element="confirmed-selections">
        {confirmedSelections.map((cs) => (
          <span data-element={`confirmed-selection-${cs}`}>{cs}</span>
        ))}
      </div>
    </>
  );
};

const optionListValues = [
  {
    id: "Amber",
    value: 1,
    text: "Black",
  },
  {
    id: "Black",
    value: 2,
    text: "Black",
  },
  {
    id: "Blue",
    value: 3,
    text: "Blue",
  },
];

export const OptionsWithSameName = () => (
  <MultiSelect
    name="multi-options-with-same-name"
    id="multi-options-with-same-name"
    label="multi options with same name"
  >
    {optionListValues.map((option) => (
      <Option key={option.id} text={option.text} value={option} />
    ))}
  </MultiSelect>
);
