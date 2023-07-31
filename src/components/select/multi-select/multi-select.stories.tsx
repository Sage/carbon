import React, { useState, useRef } from "react";
import { MultiSelect, Option, OptionRow } from "..";
import Button from "../../button";
import CarbonProvider from "../../carbon-provider";
import Box from "../../box";

export const Default = () => (
  <MultiSelect name="simple" id="simple" label="color" labelInline>
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

export const ListPlacement = () => (
  <MultiSelect
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
  </MultiSelect>
);

export const ListHeight = () => (
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
);

export const Controlled = () => {
  const [value, setValue] = useState<string[]>([]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue((event.target.value as unknown) as string[]);
  }
  return (
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
  );
};

Controlled.parameters = { chromatic: { disableSnapshot: true } };

export const OpenOnFocus = () => (
  <MultiSelect name="openOnFocus" id="openOnFocus" openOnFocus label="color">
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

OpenOnFocus.parameters = { chromatic: { disableSnapshot: true } };

export const Disabled = () => (
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

export const Readonly = () => (
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

export const WithDisabledPortal = () => (
  <MultiSelect
    disablePortal
    name="withDisabledPortal"
    id="withDisabledPortal"
    defaultValue={["1", "3"]}
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
);

WithDisabledPortal.parameters = { chromatic: { disableSnapshot: true } };

export const WithMultipleColumns = () => (
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
);

WithMultipleColumns.parameters = { chromatic: { disableSnapshot: true } };

export const Required = () => (
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
);

export const WithObjectAsValue = () => {
  const [value, setValue] = useState<Record<string, unknown>[]>([
    { id: "Green", value: 5, text: "Green" },
  ]);
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
    setValue((event.target.value as unknown) as Record<string, unknown>[]);
  }
  function clearValue() {
    setValue([]);
  }
  return (
    <>
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
        {optionList.current}
      </MultiSelect>
    </>
  );
};

WithObjectAsValue.parameters = { chromatic: { disableSnapshot: true } };

export const WithIsLoadingProp = () => {
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
    <>
      <Button onClick={clearData} mb={2}>
        reset
      </Button>
      <MultiSelect
        name="isLoading"
        id="isLoading"
        label="color"
        value={value}
        onChange={(event) =>
          setValue((event.target.value as unknown) as string[])
        }
        onOpen={() => loadList()}
        isLoading={isLoading}
      >
        {optionList}
      </MultiSelect>
    </>
  );
};

WithIsLoadingProp.parameters = { chromatic: { disableSnapshot: true } };

export const WithCustomColoredPills = () => (
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
);

export const WithCustomMaxWidth = () => (
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
);

export const ValidationsStringNewDesign = () => (
  <CarbonProvider validationRedesignOptIn>
    {["error", "warning"].map((validationType) =>
      (["small", "medium", "large"] as const).map((size) => (
        <Box width="296px" key={`${validationType}-${size}`}>
          <MultiSelect
            name="multi"
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
          </MultiSelect>
          <MultiSelect
            name="multi - readOnly"
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
          </MultiSelect>
        </Box>
      ))
    )}
  </CarbonProvider>
);

export const PillsWithLongText = () => (
  <Box maxWidth="200px">
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
  );
};
