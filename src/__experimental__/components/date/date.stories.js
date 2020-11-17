import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { StateDecorator, Store, State } from "@sambego/storybook-state";
import { boolean, text } from "@storybook/addon-knobs";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../../.storybook/theme-selectors";
import DateInput from "./date.component";
import { OriginalTextbox } from "../textbox";
import Button from "../../../components/button";
import { getCommonTextboxProps } from "../textbox/textbox.stories";
import { notes, info } from "./documentation";
import getDocGenInfo from "../../../utils/helpers/docgen-info";

DateInput.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /date\.component(?!spec)/
);

OriginalTextbox.__docgenInfo = getDocGenInfo(
  require("../textbox/docgenInfo.json"),
  /textbox\.component(?!spec)/
);

const store = new Store({
  value: "2019-04-04",
});

const setValue = (ev) => {
  action("onChange")(ev);
  store.set({ value: ev.target.value.rawValue });
};

const dateComponent = () => {
  const minDate = text("minDate", "");
  const maxDate = text("maxDate", "");
  const allowEmptyValue = boolean("allowEmptyValue", false);
  const autoFocus = boolean("autoFocus", false);

  return (
    <DateInput
      {...getCommonTextboxProps({ inputWidthEnabled: false })}
      name="dateinput"
      autoFocus={autoFocus}
      minDate={minDate}
      maxDate={maxDate}
      value={store.get("value")}
      onChange={setValue}
      onBlur={(ev) => action("onBlur")(ev)}
      onKeyDown={(ev) => action("onKeyDown")(ev)}
      allowEmptyValue={allowEmptyValue}
    />
  );
};

const autoFocusDateComponent = () => {
  boolean("autoFocus", true);
  return dateComponent();
};

function makeStory(name, themeSelector, component, disableChromatic = false) {
  const metadata = {
    themeSelector,
    info: {
      text: info,
      propTables: [OriginalTextbox, DateInput],
      propTablesExclude: [State],
      excludedPropTypes: [
        "children",
        "leftChildren",
        "inputIcon",
        "placeholder",
        "inputWidth",
      ],
    },
    chromatic: {
      disable: disableChromatic,
    },
    knobs: { escapeHTML: false },
    notes: { markdown: notes },
  };

  return [name, component, metadata];
}

const ValidationDateComponent = () => {
  const validationTypes = ["error", "warning", "info"];

  const [date, setDate] = useState("2019-04-04");
  const setDateValue = (ev) => setDate(ev.target.value.rawValue);

  return (
    <>
      <h4>Validation as string</h4>
      <h6>On component</h6>
      {validationTypes.map((validation) => (
        <DateInput
          name="dateinput"
          key={`${validation}-string-component`}
          placeholder={text("placeholder")}
          label="Label"
          {...{ [validation]: "Message" }}
          value={date}
          onChange={setDateValue}
          onBlur={(ev) => action("onBlur")(ev)}
          allowEmptyValue={boolean("allowEmptyValue", false)}
        />
      ))}
      <h6>readOnly</h6>
      <DateInput
        name="dateinput"
        placeholder={text("placeholder")}
        label="Label"
        error="Message"
        readOnly
        value={date}
        onChange={setDateValue}
        onBlur={(ev) => action("onBlur")(ev)}
        allowEmptyValue={boolean("allowEmptyValue", false)}
      />

      <h6>On label</h6>
      {validationTypes.map((validation) => (
        <DateInput
          name="dateinput"
          key={`${validation}-string-label`}
          placeholder={text("placeholder")}
          label="Label"
          validationOnLabel
          {...{ [validation]: "Message" }}
          value={date}
          onChange={setDateValue}
          onBlur={(ev) => action("onBlur")(ev)}
          allowEmptyValue={boolean("allowEmptyValue", false)}
        />
      ))}
      <h6>readOnly</h6>
      <DateInput
        name="dateinput"
        placeholder={text("placeholder")}
        label="Label"
        error="Message"
        readOnly
        validationOnLabel
        value={date}
        onChange={setDateValue}
        onBlur={(ev) => action("onBlur")(ev)}
        allowEmptyValue={boolean("allowEmptyValue", false)}
      />

      <h4>Validation as boolean</h4>
      {validationTypes.map((validation) => (
        <DateInput
          name="dateinput"
          key={`${validation}-boolean-label`}
          placeholder={text("placeholder")}
          label="Label"
          {...{ [validation]: true }}
          value={date}
          onChange={setDateValue}
          onBlur={(ev) => action("onBlur")(ev)}
          allowEmptyValue={boolean("allowEmptyValue", false)}
        />
      ))}
    </>
  );
};

const EmptyDateComponent = () => {
  const [date, setDate] = useState("2019-04-04");
  const handleDate = (ev) => {
    setDate(ev.target.value.rawValue);
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Button onClick={() => setDate("")}>Set empty date</Button>
        <Button onClick={() => setDate("2019-04-01")}>Set 2019-04-01</Button>
      </div>
      <DateInput
        {...getCommonTextboxProps({ inputWidthEnabled: false })}
        label="Date"
        name="dateinput"
        value={date}
        onChange={handleDate}
        allowEmptyValue
      />
    </>
  );
};

const RequiredDateComponent = () => {
  return <DateInput label="Date of Birth" required />;
};

const DisablePortalDateComponent = () => {
  return <DateInput label="Date of Birth" disablePortal />;
};

storiesOf("Experimental/Date Input", module)
  .addDecorator(StateDecorator(store))
  .add(...makeStory("default", dlsThemeSelector, dateComponent))
  .add(...makeStory("classic", classicThemeSelector, dateComponent, true))
  .add(...makeStory("empty", dlsThemeSelector, EmptyDateComponent))
  .add(...makeStory("validations", dlsThemeSelector, ValidationDateComponent))
  .add(
    ...makeStory("autoFocus", dlsThemeSelector, autoFocusDateComponent, true)
  )
  .add(...makeStory("required", dlsThemeSelector, RequiredDateComponent))
  .add(
    ...makeStory(
      "disablePortal",
      dlsThemeSelector,
      DisablePortalDateComponent,
      true
    )
  );
