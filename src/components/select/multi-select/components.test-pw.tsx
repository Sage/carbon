import React, { useState } from "react";
import {
  MultiSelect,
  Option,
  MultiSelectProps,
  CustomSelectChangeEvent,
} from "..";
import OptionRow from "../option-row/option-row.component";
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

export const WithVirtualScrolling = () => {
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
  const [isOpen, setIsOpen] = useState(true);
  const [values, setValues] = useState<string[]>(["1", "2"]);
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValues(event.target.value as unknown as string[]);
  }

  return (
    <Dialog open={isOpen} onCancel={() => setIsOpen(false)} title="Dialog">
      <MultiSelect
        openOnFocus={openOnFocus}
        autoFocus={autofocus}
        name="testSelect"
        id="testSelect"
        label="Select a color"
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
