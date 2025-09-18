import React, { useState, useRef } from "react";
import { MultiSelect, Option, MultiSelectProps } from "..";
import partialAction from "../../../../.storybook/utils/partial-action";
import OptionRow from "../option-row/option-row.component";
import Button from "../../button/button.component";

import Box from "../../box";
import CarbonProvider from "../../carbon-provider/carbon-provider.component";
import Typography from "../../typography";
import Dialog from "../../dialog";

export default {
  component: MultiSelect,
  title: "Select/MultiSelect/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
    controls: {
      exclude: [
        "onChange",
        "onChangeDeferred",
        "onFilterChange",
        "onListScrollBottom",
        "onOpen",
        "onBlur",
        "onClick",
        "onFocus",
        "onKeyDown",
        "onMouseDown",
        "iconOnClick",
        "iconOnMouseDown",
        "children",
        "value",
        "defaultValue",
        "tableHeader",
        "multiColumn",
        "leftChildren",
        "as",
      ],
    },
  },
  argTypes: {
    error: {
      control: {
        type: "text",
      },
    },
    warning: {
      control: {
        type: "text",
      },
    },
    info: {
      control: {
        type: "text",
      },
    },
    fieldHelp: {
      control: {
        type: "text",
      },
    },
    labelHelp: {
      control: {
        type: "text",
      },
    },
  },
};

export const Default = (props: Partial<MultiSelectProps>) => {
  const MAX_SELECTIONS_ALLOWED = 2;
  const [selectedPills, setSelectedPills] = useState([] as string[]);
  const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= MAX_SELECTIONS_ALLOWED) {
      setSelectedPills(event.target.value as unknown as string[]);
      partialAction("onChange")();
    }
  };
  return (
    <MultiSelect
      name="testing"
      value={selectedPills}
      onChange={handleActivityChange}
      onOpen={partialAction("onOpen")}
      onClick={partialAction("onClick")}
      onFilterChange={partialAction("onFilterChange")}
      onFocus={partialAction("onFocus")}
      onBlur={partialAction("onBlur")}
      onKeyDown={partialAction("onKeyDown")}
      openOnFocus
      label="Test"
      placeholder=" "
      {...props}
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
      <Option value="10" text="Ten" />
    </MultiSelect>
  );
};
Default.storyName = "Default";

export const Validation = () => {
  const [values, setValues] = useState<string[]>([]);
  const [values2, setValues2] = useState<string[]>([]);
  const [values3, setValues3] = useState<string[]>([]);
  const [values4, setValues4] = useState<string[]>([]);
  const [values5, setValues5] = useState<string[]>([]);
  const [values6, setValues6] = useState<string[]>([]);
  const [values7, setValues7] = useState<string[]>([]);
  const [values8, setValues8] = useState<string[]>([]);
  const [values9, setValues9] = useState<string[]>([]);

  return (
    <>
      <MultiSelect
        name="multi"
        id="multi"
        label="MultiSelect"
        error="Error Message"
        value={values}
        onChange={(event) =>
          setValues(event.target.value as unknown as string[])
        }
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
      </MultiSelect>
      <MultiSelect
        name="multi"
        id="multi"
        label="MultiSelect"
        warning="Warning Message"
        value={values2}
        onChange={(event) =>
          setValues2(event.target.value as unknown as string[])
        }
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
      </MultiSelect>
      <MultiSelect
        name="multi"
        id="multi"
        label="MultiSelect"
        info="Info Message"
        value={values3}
        onChange={(event) =>
          setValues3(event.target.value as unknown as string[])
        }
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
      </MultiSelect>

      <MultiSelect
        name="multi"
        id="multi"
        label="MultiSelect"
        error="Error Message"
        validationOnLabel
        value={values4}
        onChange={(event) =>
          setValues4(event.target.value as unknown as string[])
        }
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
      </MultiSelect>
      <MultiSelect
        name="multi"
        id="multi"
        label="MultiSelect"
        warning="Warning Message"
        validationOnLabel
        value={values5}
        onChange={(event) =>
          setValues5(event.target.value as unknown as string[])
        }
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
      </MultiSelect>
      <MultiSelect
        name="multi"
        id="multi"
        label="MultiSelect"
        info="Info Message"
        validationOnLabel
        value={values6}
        onChange={(event) =>
          setValues6(event.target.value as unknown as string[])
        }
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
      </MultiSelect>

      <MultiSelect
        name="multi"
        id="multi"
        label="MultiSelect"
        error
        value={values7}
        onChange={(event) =>
          setValues7(event.target.value as unknown as string[])
        }
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
      </MultiSelect>
      <MultiSelect
        name="multi"
        id="multi"
        label="MultiSelect"
        warning
        value={values8}
        onChange={(event) =>
          setValues8(event.target.value as unknown as string[])
        }
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
      </MultiSelect>
      <MultiSelect
        name="multi"
        id="multi"
        label="MultiSelect"
        info
        value={values9}
        onChange={(event) =>
          setValues9(event.target.value as unknown as string[])
        }
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
      </MultiSelect>
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: true },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const NewValidation = () => {
  const [values, setValues] = useState<string[]>([]);
  const [values2, setValues2] = useState<string[]>([]);
  const [values3, setValues3] = useState<string[]>([]);
  const [values4, setValues4] = useState<string[]>([]);

  return (
    <CarbonProvider validationRedesignOptIn>
      <MultiSelect
        name="multi"
        id="multi"
        label="MultiSelect"
        error="Error Message"
        mb={2}
        value={values}
        onChange={(event) =>
          setValues(event.target.value as unknown as string[])
        }
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
      </MultiSelect>
      <MultiSelect
        name="multi"
        id="multi"
        label="MultiSelect"
        warning="Warning Message"
        mb={2}
        value={values2}
        onChange={(event) =>
          setValues2(event.target.value as unknown as string[])
        }
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
      </MultiSelect>
      <MultiSelect
        validationMessagePositionTop={false}
        name="multi"
        id="multi"
        label="MultiSelect"
        error="Error Message"
        mb={2}
        value={values3}
        onChange={(event) =>
          setValues3(event.target.value as unknown as string[])
        }
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
      </MultiSelect>
      <MultiSelect
        validationMessagePositionTop={false}
        name="multi"
        id="multi"
        label="MultiSelect"
        warning="Warning Message"
        mb={2}
        value={values4}
        onChange={(event) =>
          setValues4(event.target.value as unknown as string[])
        }
      >
        <Option value="1" text="One" />
        <Option value="2" text="Two" />
        <Option value="3" text="Three" />
      </MultiSelect>
    </CarbonProvider>
  );
};
NewValidation.storyName = "New Validation";
NewValidation.parameters = {
  chromatic: { disableSnapshot: true },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const MultiSelectLongPillComponent = (
  props: Partial<MultiSelectProps>,
) => {
  const [value, setValue] = useState<string[]>([]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }

  return (
    <Box maxWidth="200px">
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
    </Box>
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
  const [values, setValues] = useState<string[]>(["2"]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValues(event.target.value as unknown as string[]);
  }
  return (
    <MultiSelect
      multiColumn
      value={values}
      onChange={onChangeHandler}
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
  const [values, setValues] = useState<string[]>(["1", "3"]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValues(event.target.value as unknown as string[]);
  }
  return (
    <MultiSelect
      label="color"
      labelInline
      value={values}
      onChange={onChangeHandler}
      {...props}
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
  );
};

export const MultiSelectWithManyOptionsAndVirtualScrolling = () => {
  const [values, setValues] = useState<string[]>(["1", "2"]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValues(event.target.value as unknown as string[]);
  }

  return (
    <MultiSelect
      name="virtualised"
      id="virtualised"
      label="choose an option"
      labelInline
      enableVirtualScroll
      virtualScrollOverscan={10}
      value={values}
      onChange={onChangeHandler}
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
};

export const MultiSelectNestedInDialog = ({
  openOnFocus = false,
  autofocus = false,
}) => {
  const [values, setValues] = useState<string[]>(["1", "2"]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValues(event.target.value as unknown as string[]);
  }
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <MultiSelect
        openOnFocus={openOnFocus}
        autoFocus={autofocus}
        name="testSelect"
        id="testSelect"
        value={values}
        onChange={onChangeHandler}
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

export const MultiSelectWithDisabledOption = () => {
  const [value, setValue] = useState<string[]>([]);

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value as unknown as string[]);
  }

  return (
    <MultiSelect
      name="testing"
      value={value}
      onChange={onChangeHandler}
      openOnFocus
      label="Test"
      placeholder=" "
    >
      <Option value="1" text="One" />
      <Option value="2" text="Two" disabled />
      <Option value="3" text="Three" />
      <Option value="4" text="Four" />
    </MultiSelect>
  );
};

export const SingleOption = () => {
  const [selectedPills, setSelectedPills] = useState([] as string[]);
  const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPills(event.target.value as unknown as string[]);
    partialAction("onChange")();
  };
  return (
    <MultiSelect
      name="testing"
      value={selectedPills}
      onChange={handleActivityChange}
      onOpen={partialAction("onOpen")}
      onClick={partialAction("onClick")}
      onFilterChange={partialAction("onFilterChange")}
      onFocus={partialAction("onFocus")}
      onBlur={partialAction("onBlur")}
      onKeyDown={partialAction("onKeyDown")}
      openOnFocus
      label="Test"
      placeholder=" "
    >
      <Option value="1" text="One" />
    </MultiSelect>
  );
};

SingleOption.storyName = "Single Option";

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

export const OptionsWithSameName = () => {
  const [values, setValues] = useState<string[]>([]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValues(event.target.value as unknown as string[]);
  }
  return (
    <MultiSelect
      name="multi-options-with-same-name"
      id="multi-options-with-same-name"
      label="multi options with same name"
      value={values}
      onChange={onChangeHandler}
    >
      {optionListValues.map((option) => (
        <Option key={option.id} text={option.text} value={option} />
      ))}
    </MultiSelect>
  );
};
OptionsWithSameName.storyName = "Options with same name";

export const AriaDescribedByExample = () => {
  const MAX_SELECTIONS_ALLOWED = 2;
  const [selectedPills, setSelectedPills] = useState([] as string[]);
  const handleActivityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length <= MAX_SELECTIONS_ALLOWED) {
      setSelectedPills(event.target.value as unknown as string[]);
      partialAction("onChange")();
    }
  };
  return (
    <>
      <MultiSelect
        aria-describedby="combo-box-description"
        name="testing"
        value={selectedPills}
        onChange={handleActivityChange}
        onOpen={partialAction("onOpen")}
        onClick={partialAction("onClick")}
        onFilterChange={partialAction("onFilterChange")}
        onFocus={partialAction("onFocus")}
        onBlur={partialAction("onBlur")}
        onKeyDown={partialAction("onKeyDown")}
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
        <Option value="10" text="Ten" />
      </MultiSelect>
      <Typography my={5} id="combo-box-description">
        This is a description of the select textbox
      </Typography>
    </>
  );
};

interface WithPillStoryProps extends Partial<MultiSelectProps> {
  pillText: string;
}

export const WithVeryLongPillText = ({
  pillText,
  ...args
}: WithPillStoryProps) => {
  return (
    <MultiSelect
      maxWidth="200px"
      value={["1"]}
      onChange={() => {}}
      name="simple"
      id="simple"
      label="color"
      {...args}
    >
      <Option text={pillText} value="1" />
    </MultiSelect>
  );
};
WithVeryLongPillText.args = {
  pillText: "Veryveryveryveryveryveryverylongword",
};
