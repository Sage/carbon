/* eslint-disable no-console */
import React from "react";
import Form from ".";
import Button from "../button";
import { Tab, Tabs } from "../tabs";
import Box from "../box";
import Textbox from "../textbox";
import Textarea from "../textarea";
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

export default {
  title: "Form/Test",
  excludeStories: ["FormComponent"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultWithStickyFooter = () => (
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
  </Form>
);

DefaultWithStickyFooter.storyName = "default";

export const FormAlignmentCustomMarginsTextInputs = () => {
  return (
    <Form onSubmit={() => console.log("submit")} fieldSpacing={4} px="25%">
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

export const FormAlignmentCustomMarginNonTextInputs = () => {
  return (
    <Form onSubmit={() => console.log("submit")} fieldSpacing={4} px="25%">
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
