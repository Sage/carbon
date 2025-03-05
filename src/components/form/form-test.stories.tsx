/* eslint-disable no-console */
import React, { useState } from "react";

import { StoryObj } from "@storybook/react/*";
import Form from ".";
import Button from "../button";
import { Tab, Tabs } from "../tabs";
import Box from "../box";
import Textbox from "../textbox";
import Textarea, { TextareaProps } from "../textarea";
import Fieldset from "../fieldset";
import DateInput from "../date";
import DateRange from "../date-range";
import { Select, MultiSelect, Option, FilterableSelect } from "../select";
import { RadioButton, RadioButtonGroup } from "../radio-button";
import { Checkbox, CheckboxGroup } from "../checkbox";
import Switch from "../switch";
import Decimal from "../decimal";
import Number from "../number";
import GroupedCharacter from "../grouped-character";
import { SimpleColorPicker, SimpleColor } from "../simple-color-picker";
import NumeralDate from "../numeral-date";
import Hr from "../hr";
import InlineInputs from "../inline-inputs";
import Pager from "../pager";
import Password from "../password";
import Search, { SearchProps } from "../search";
import { Time } from "../time";
import TextEditor from "../text-editor";
import CarbonProvider from "../carbon-provider";

export default {
  title: "Form/Test",
  excludeStories: ["FormComponent"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    fieldSpacing: {
      options: ["0", "1", "2", "3", "4", "5", "6", "7"],
      control: {
        type: "select",
      },
    },
  },
};

type StoryType = StoryObj<typeof Form>;

export const AllInputs: StoryType = ({ ...props }) => (
  <CarbonProvider validationRedesignOptIn>
    <Textbox label="Outside of Form" characterLimit={100} />
    <Textbox label="Outside of Form" characterLimit={100} />
    <Hr />
    <Form
      onSubmit={() => console.log("submit")}
      leftSideButtons={
        <Button onClick={() => console.log("cancel")}>Cancel</Button>
      }
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      {...props}
    >
      <Box>
        <Textbox label="Textbox" characterLimit={100} />
        <Number label="Number" />
        <Decimal label="Decimal" />
        <GroupedCharacter
          label="GroupedCharacter"
          groups={[2, 3, 2]}
          separator="-"
        />
        <Password label="Password" characterLimit={100} />
        <Fieldset legend="Fieldset">
          <Textbox label="Textbox in Fieldset" />
          <Checkbox label="Checkbox in Fieldset" />
          <Select
            name="simple-select"
            id="simple-select"
            label="Select in Fieldset"
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
          </Select>
        </Fieldset>
        <Hr />
        <Time
          value={{
            hours: "",
            minutes: "",
          }}
          onChange={() => {}}
          label="Time"
        />
        <NumeralDate label="Numeral Date" />
        <RadioButtonGroup name="legend" legend="RadioButtonGroup">
          <RadioButton
            id="group-1-input-1"
            value="group-1-input-1"
            label="Radio Option 1"
          />
          <RadioButton
            id="group-1-input-2"
            value="group-1-input-2"
            label="Radio Option 2"
          />
        </RadioButtonGroup>
        <Checkbox label="Checkbox" />
        <CheckboxGroup legend="Checkbox Group">
          <Checkbox label="Checkbox-1" />
          <Checkbox label="Checkbox-2" />
        </CheckboxGroup>
        <DateInput name="date" label="Date" value="" onChange={() => {}} />
        <DateRange
          name="date"
          startLabel="Start Date"
          endLabel="End Date"
          value={["", ""]}
          onChange={() => {}}
        />
        <InlineInputs label="Inline inputs">
          <Textbox onChange={() => {}} />
          <Textbox onChange={() => {}} />
          <Textbox onChange={() => {}} />
        </InlineInputs>
        <Search value="" onChange={() => {}} />
        <Select name="simple-select" id="simple-select" label="Simple Select">
          <Option text="Amber" value="1" />
          <Option text="Black" value="2" />
          <Option text="Blue" value="3" />
        </Select>
        <FilterableSelect
          name="filterable-select"
          id="filterable-select"
          label="Filterable Select"
        >
          <Option text="Amber" value="1" />
          <Option text="Black" value="2" />
          <Option text="Blue" value="3" />
        </FilterableSelect>
        <MultiSelect name="multi-select" id="multi-select" label="Multi Select">
          <Option text="Amber" value="1" />
          <Option text="Black" value="2" />
          <Option text="Blue" value="3" />
        </MultiSelect>
        <Textarea label="Textarea" name="textarea" characterLimit={100} />
        <TextEditor labelText="Text Editor" characterLimit={100} />
        <SimpleColorPicker
          name="simple-color-picker"
          legend="Simple Color Picker"
        >
          {[
            { color: "transparent", label: "transparent" },
            { color: "#0073C1", label: "blue" },
            { color: "#582C83", label: "purple" },
          ].map(({ color, label }) => (
            <SimpleColor
              value={color}
              key={color}
              aria-label={label}
              id={color}
            />
          ))}
        </SimpleColorPicker>
        <Switch name="switch" label="Switch" onChange={() => {}} />
      </Box>
    </Form>
  </CarbonProvider>
);

AllInputs.storyName = "all inputs";
AllInputs.args = {
  stickyFooter: false,
  errorCount: 0,
  warningCount: 0,
  buttonAlignment: "right",
};
AllInputs.parameters = {
  themeProvider: {
    chromatic: { theme: "sage" },
  },
  chromatic: {
    disableSnapshot: false,
  },
};

export const FormAlignmentCustomMarginsTextInputs = ({ ...props }) => {
  return (
    <Form
      onSubmit={() => console.log("submit")}
      fieldSpacing={4}
      px="25%"
      {...props}
    >
      <Fieldset legend="Fieldset" mb={1}>
        <Textbox
          label="Textbox in Fieldset"
          labelInline
          labelAlign="right"
          labelWidth={30}
        />
        <Checkbox
          label="Checkbox in Fieldset"
          labelWidth={30}
          labelSpacing={2}
          reverse
        />
      </Fieldset>
      <Decimal
        label="Decimal"
        placeholder="placeholder"
        name="decimal"
        labelInline
        labelWidth={10}
        inputWidth={30}
        fieldHelp="This is some help text"
        mb={1}
      />
      <Textbox
        label="Textbox"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        labelSpacing={2}
        mb={1}
      />
      <Number
        label="Number"
        placeholder="placeholder"
        name="number"
        labelInline
        labelWidth={10}
        inputWidth={30}
        labelSpacing={2}
        mb={1}
      />
      <GroupedCharacter
        placeholder="placeholder"
        label="GroupedCharacter"
        name="grouped-character"
        labelInline
        groups={[2, 2, 3]}
        separator="-"
        mb={1}
      />
      <Textarea
        key="input-three"
        label="Textarea"
        placeholder="placeholder"
        name="textbox"
        labelInline
        labelWidth={10}
        inputWidth={30}
        mb={1}
      />
      <DateInput
        name="date"
        label="Date"
        labelInline
        labelWidth={10}
        value=""
        onChange={() => {}}
        mb={1}
      />
      <DateRange
        name="date"
        startLabel="Start Date"
        endLabel="End Date"
        startDateProps={{ labelInline: true }}
        endDateProps={{ labelInline: true }}
        value={["", ""]}
        onChange={() => {}}
        mb={1}
      />
      <Select
        mb={1}
        name="simple-select"
        id="simple-select"
        labelInline
        label="Simple Select"
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
      <FilterableSelect
        mb={1}
        name="fiterable-select"
        id="fiterable-select"
        labelInline
        label="Filterable Select"
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
      <MultiSelect
        mb={1}
        name="multi-select"
        id="multi-select"
        labelInline
        label="Multi Select"
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
      <NumeralDate label="Numeral date" labelInline mb={1} />
      <InlineInputs label="Inline inputs" mb={1}>
        <Textbox />
        <Textbox />
        <Textbox />
      </InlineInputs>
      <Hr mx={1} my={0} />
    </Form>
  );
};

FormAlignmentCustomMarginsTextInputs.storyName =
  "form alignment custom margins text inputs";
FormAlignmentCustomMarginsTextInputs.parameters = {
  chromatic: {
    disableSnapshot: false, // we want chromatic to capture this to catch any future regressions
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const FormAlignmentCustomMarginNonTextInputs = ({ ...props }) => {
  return (
    <Form
      onSubmit={() => console.log("submit")}
      fieldSpacing={4}
      px="25%"
      {...props}
    >
      <RadioButtonGroup
        name="legend"
        onChange={() => console.log("RADIO CHANGE")}
        legend="Radio group"
        legendInline
        legendWidth={10}
        legendSpacing={2}
        mb={1}
      >
        <RadioButton
          id="group-1-input-1"
          value="group-1-input-1"
          label="Radio Option 1"
          labelWidth={10}
        />
        <RadioButton
          id="group-1-input-2"
          value="group-1-input-2"
          label="Radio Option 2"
          labelWidth={10}
        />
      </RadioButtonGroup>
      <Checkbox
        name="checkbox1"
        onChange={() => console.log("CHECKBOX 1")}
        label="Checkbox 1"
        mb={1}
      />
      <CheckboxGroup legend="Checkbox Group" mb={1}>
        {["One", "Two", "Three"].map((label) => (
          <Checkbox
            id={`checkbox-group-${label}`}
            key={`checkbox-group-${label}`}
            name={`checkbox-group-${label}`}
            label={label}
          />
        ))}
      </CheckboxGroup>
      <Switch
        name="switch"
        label="Switch"
        labelInline
        onChange={() => console.log("SWITCH")}
        labelWidth={10}
        labelSpacing={2}
        mb={1}
      />
      <SimpleColorPicker
        name="picker-disabled-example"
        legend="Simple Color Picker"
        mb={1}
      >
        {[
          { color: "transparent", label: "transparent" },
          { color: "#0073C1", label: "blue" },
          { color: "#582C83", label: "purple" },
        ].map(({ color, label }) => (
          <SimpleColor
            value={color}
            key={color}
            aria-label={label}
            id={color}
            disabled
          />
        ))}
      </SimpleColorPicker>
      <Hr mx={1} my={0} />
    </Form>
  );
};

FormAlignmentCustomMarginNonTextInputs.storyName =
  "form alignment custom margin non-text inputs";
FormAlignmentCustomMarginNonTextInputs.parameters = {
  chromatic: {
    disableSnapshot: false, // we want chromatic to capture this to catch any future regressions
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const DefaultWithPager = () => (
  <Form
    onSubmit={() => console.log("submit")}
    leftSideButtons={
      <Button onClick={() => console.log("cancel")}>Cancel</Button>
    }
    saveButton={
      <Button buttonType="primary" type="submit">
        Save
      </Button>
    }
    stickyFooter
  >
    <Tabs mb={2}>
      <Tab
        pl="3px"
        customLayout={
          <Box mx="16px" my="10px">
            Tab1
          </Box>
        }
        tabId="tab1"
      />
    </Tabs>
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Textbox label="Textbox" />
    <Pager
      totalRecords={25}
      currentPage={1}
      pageSize={5}
      showPageSizeSelection={false}
      showFirstAndLastButtons={false}
      onNext={(e) => {
        console.log("on next");
        e.preventDefault();
      }}
      onPrevious={(e) => {
        console.log("on prev");
        e.preventDefault();
      }}
      onPagination={(page) => {
        console.log("on pagination", page);
      }}
    />
  </Form>
);

DefaultWithPager.storyName = "default with pager";

export const MockFormForAriaLiveDemo = () => {
  const [textareaValue, setTextareaValue] = useState("");
  const [textboxValue, setTextboxValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const resetValues = () => {
    setTextareaValue("");
    setTextboxValue("");
    setPasswordValue("");
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event?.preventDefault(); // prevents the page from changing
    console.log("Form has been submitted");
    resetValues();
  };

  return (
    <Form
      fieldSpacing={0}
      onSubmit={handleSubmit}
      leftSideButtons={
        <Button onClick={() => console.log("cancel")}>Cancel</Button>
      }
      saveButton={
        <Button buttonType="primary" type="submit">
          Save
        </Button>
      }
      stickyFooter
    >
      <Textarea
        mt={2}
        label="Textarea"
        value={textareaValue}
        characterLimit={100}
        onChange={(newValue: {
          target: { value: React.SetStateAction<string> };
        }) => {
          setTextareaValue(newValue.target.value);
        }}
      />
      <Textbox
        mt={5}
        label="Textbox"
        value={textboxValue}
        characterLimit={69}
        onChange={(newValue: {
          target: { value: React.SetStateAction<string> };
        }) => {
          setTextboxValue(newValue.target.value);
        }}
      />
      <TextEditor labelText="Text Editor Label" characterLimit={100} />
      <Password
        mt={5}
        mb={2}
        label="Password"
        characterLimit={20}
        value={passwordValue}
        onChange={(newValue: {
          target: { value: React.SetStateAction<string> };
        }) => {
          setPasswordValue(newValue.target.value);
        }}
      />
    </Form>
  );
};

MockFormForAriaLiveDemo.storyName = "Mock form for aria live demo";

export const MarginTest = () => {
  const [searchValue, setSearchValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const handleSearchChange: SearchProps["onChange"] = (e) => {
    setSearchValue(e.target.value);
  };
  const handleTextareaChange: TextareaProps["onChange"] = (e) => {
    setTextareaValue(e.target.value);
  };
  return (
    <Form fieldSpacing={0}>
      <Search value={searchValue} onChange={handleSearchChange} />
      <Textarea
        label="textarea"
        value={textareaValue}
        onChange={handleTextareaChange}
      />
      <Hr />
    </Form>
  );
};

MarginTest.storyName = "margin test";
MarginTest.parameters = {
  chromatic: {
    disableSnapshot: false, // we want chromatic to capture this to catch any future regressions
  },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const FullWidthWithLeftAndRight = () => {
  return (
    <Form
      fullWidthButtons
      onSubmit={() => console.log("submit")}
      leftSideButtons={
        <Button onClick={() => console.log("cancel")} fullWidth>
          Cancel
        </Button>
      }
      saveButton={
        <Button buttonType="primary" type="submit" fullWidth>
          Save
        </Button>
      }
      rightSideButtons={
        <Button onClick={() => console.log("other")} fullWidth>
          Other
        </Button>
      }
      errorCount={1}
      warningCount={2}
    >
      <Textbox label="Textbox" />
      <Textbox label="Textbox" />
    </Form>
  );
};

FullWidthWithLeftAndRight.storyName = "left and right fullWith buttons";
FullWidthWithLeftAndRight.parameters = {
  chromatic: {
    disableSnapshot: false,
  },
  themeProvider: { chromatic: { theme: "sage" }, viewports: [1200, 900, 320] },
};
