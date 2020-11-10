import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, number, select } from "@storybook/addon-knobs";
import { Store, State } from "@sambego/storybook-state";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../../.storybook/theme-selectors";
import OptionsHelper from "../../../utils/helpers/options-helper";
import info from "./documentation/info";
import { Checkbox } from "../checkbox";
import Decimal from "../decimal";
import GroupedCharacter from "../grouped-character";
import NumberInput from "../number";
import DateInput from "../date";
import { RadioButtonGroup, RadioButton } from "../radio-button";
import { Select, Option } from "../select";
import Switch from "../switch";
import Textarea from "../textarea";

const store = new Store({
  numberInputValue: "",
  groupedCharacterValue: "",
  checkboxChecked: false,
  dateValue: "2009-12-12",
  switchValue: "",
});

const getCommonKnobs = () => {
  const percentageRange = {
    range: true,
    min: 0,
    max: 100,
    step: 1,
  };
  const labelInline = boolean("labelInline", false);
  const labelWidth = labelInline
    ? number("labelWidth", 30, percentageRange)
    : undefined;
  const inputWidth = labelInline
    ? number("inputWidth", 70, percentageRange)
    : undefined;
  const labelAlign = labelInline
    ? select("labelAlign", OptionsHelper.alignBinary)
    : undefined;

  return {
    labelInline,
    labelWidth,
    inputWidth,
    labelAlign,
    disabled: boolean("disabled", false),
    readOnly: boolean("readOnly", false),
    size: select("size", OptionsHelper.sizesRestricted, "medium"),
  };
};

const InputIntegration = () => {
  const commonKnobs = getCommonKnobs();
  const disableFieldHelp = boolean("disable fieldHelp", false);
  const disableLabelHelp = boolean("disable labelHelp", false);
  const disableLabelWidth = boolean(
    "disable labelWidth (checkable inputs)",
    false
  );
  const reverse = boolean("reverse (checkable inputs)", true);
  const fieldHelpInline = disableFieldHelp
    ? ""
    : boolean("fieldHelpInline (checkable inputs)", false);

  return (
    <State store={store}>
      {(state) => (
        <>
          <Decimal
            id="decimal"
            label="Decimal Component"
            labelHelp={disableLabelHelp ? "" : "labelHelp"}
            fieldHelp={disableFieldHelp ? "" : "Decimal component fieldHelp"}
            {...commonKnobs}
          />
          <NumberInput
            id="number"
            label="Number Input Component"
            labelHelp={disableLabelHelp ? "" : "labelHelp"}
            fieldHelp={
              disableFieldHelp ? "" : "Number Input component fieldHelp"
            }
            onChange={(ev) => store.set({ numberInputValue: ev.target.value })}
            value={state.numberInputValue}
            {...commonKnobs}
          />
          <GroupedCharacter
            id="grouped-character"
            label="Grouped Character Component"
            labelHelp={disableLabelHelp ? "" : "labelHelp"}
            separator="-"
            groups={[2, 2, 4]}
            onChange={(ev) =>
              store.set({ groupedCharacterValue: ev.target.value.rawValue })
            }
            fieldHelp={
              disableFieldHelp ? "" : "Grouped Character Component fieldHelp"
            }
            value={state.groupedCharacterValue}
            {...commonKnobs}
          />
          <Select
            ariaLabel="singleSelect"
            label="Select"
            labelHelp={disableLabelHelp ? "" : "labelHelp"}
            fieldHelp={disableFieldHelp ? "" : "Select Component fieldHelp"}
            {...commonKnobs}
          >
            <Option key="option1" text="Option 1" value="option1" />
            <Option key="option2" text="Option 2" value="option2" />
            <Option key="option3" text="Option 3" value="option3" />
          </Select>
          <Textarea
            name="textarea"
            label="Textarea"
            labelHelp={disableLabelHelp ? "" : "labelHelp"}
            fieldHelp={disableFieldHelp ? "" : "Textarea fieldHelp"}
            {...commonKnobs}
          />
          <Checkbox
            id="checkbox"
            name="my-checkbox"
            label="Checkbox"
            labelHelp={disableLabelHelp ? "" : "labelHelp"}
            fieldHelp={disableFieldHelp ? "" : "Checkbox field help"}
            value="checkbox-val"
            reverse={reverse}
            fieldHelpInline={fieldHelpInline}
            onChange={(ev) => store.set({ checkboxChecked: ev.target.checked })}
            checked={state.checkboxChecked}
            {...commonKnobs}
            inputWidth={undefined}
            labelWidth={disableLabelWidth ? undefined : commonKnobs.labelWidth}
          />
          <RadioButtonGroup
            name="radio-button-group"
            legend="Please select an option"
            onChange={(ev) => store.set({ dateValue: ev.target.value })}
          >
            {[1, 2, 3].map((num) => (
              <RadioButton
                key={`radio${num}`}
                label={`Radio ${num}`}
                labelHelp={disableLabelHelp ? "" : "labelHelp"}
                fieldHelp={disableFieldHelp ? "" : `Radio ${num} field help`}
                value={`radio${num}`}
                reverse={reverse}
                fieldHelpInline={fieldHelpInline}
                {...commonKnobs}
                inputWidth={undefined}
                labelWidth={
                  disableLabelWidth ? undefined : commonKnobs.labelWidth
                }
                size={
                  commonKnobs.size === "medium" ? "small" : commonKnobs.size
                }
              />
            ))}
          </RadioButtonGroup>
          <Switch
            name="switch"
            label="Switch"
            labelHelp={disableLabelHelp ? "" : "labelHelp"}
            fieldHelp={disableFieldHelp ? "" : "Switch field help"}
            reverse={reverse}
            fieldHelpInline={fieldHelpInline}
            value={state.switchValue}
            {...commonKnobs}
            inputWidth={undefined}
            labelWidth={disableLabelWidth ? undefined : commonKnobs.labelWidth}
          />
          <DateInput
            id="date"
            name="my-date"
            label="Date"
            labelHelp={disableLabelHelp ? "" : "labelHelp"}
            fieldHelp={disableFieldHelp ? "" : "Date field help"}
            onChange={(ev) =>
              store.set({ dateValue: ev.target.value.rawValue })
            }
            value={state.dateValue}
            {...commonKnobs}
          />
        </>
      )}
    </State>
  );
};

function makeStory(name, themeSelector, component, disableChromatic = false) {
  const metadata = {
    themeSelector,
    info: {
      text: info,
      source: false,
      propTablesExclude: [State],
    },
    chromatic: {
      disable: disableChromatic,
    },
  };

  return [name, component, metadata];
}

storiesOf("Experimental/Input Integration", module)
  .add(...makeStory("default", dlsThemeSelector, InputIntegration))
  .add(...makeStory("classic", classicThemeSelector, InputIntegration, true));
