import React from "react";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { State, Store } from "@sambego/storybook-state";
import { notes, info } from "./documentation";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../../.storybook/theme-selectors";
import DateRange from "./date-range.component";

import getDocGenInfo from "../../../utils/helpers/docgen-info";

const ColumnsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

DateRange.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /date-range\.component(?!spec)/
);

const store = new Store({
  value: ["2016-10-01", "2016-10-30"],
});
const handleChange = (evt) => {
  const newValue = [evt.target.value[0].rawValue, evt.target.value[1].rawValue];
  store.set({ value: newValue });
  action("changed")(evt.target.value);
};

function makeStory(name, themeSelector, disableChromatic = false) {
  const component = () => {
    const startLabel = text("startLabel", "");
    const endLabel = text("endLabel", "");
    const labelsInline =
      startLabel || endLabel ? boolean("labelsInline", false) : undefined;

    return (
      <State store={store}>
        <DateRange
          onChange={handleChange}
          endLabel={endLabel}
          value={store.get("value")}
          startLabel={startLabel}
          labelsInline={labelsInline}
          onBlur={(ev) => action("blur")(ev)}
        />
      </State>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    info: {
      text: info,
      propTablesExclude: [State],
    },
    chromatic: {
      disable: disableChromatic,
    },
    knobs: { escapeHTML: false },
  };

  return [name, component, metadata];
}

function makeValidationStory(name, themeSelector) {
  const component = (labelsInline) => {
    const startLabel = text("startLabel", "From");
    const endLabel = text("endLabel", "To");

    return (
      <div>
        <h3>labelsInline prop {labelsInline.toString()}</h3>
        <h4>Validation as string</h4>
        <h6>On components</h6>
        {[
          { startError: "Start Error", endError: "End Error" },
          { startWarning: "Start Warning", endWarning: "End Warning" },
          { startInfo: "Start Info", endInfo: "End Info" },
        ].map((validation) => (
          <State
            store={store}
            key={`${Object.keys(validation)[0]}-string-component`}
          >
            <DateRange
              onChange={handleChange}
              endLabel={endLabel}
              value={store.get("value")}
              startLabel={startLabel}
              labelsInline={labelsInline}
              onBlur={(ev) => action("blur")(ev)}
              {...validation}
            />
          </State>
        ))}
        <h6>On components - only one input</h6>
        {[
          { startError: "Start Error" },
          { endWarning: "End Warning" },
          { startInfo: "Start Info" },
        ].map((validation) => (
          <State
            store={store}
            key={`${Object.keys(validation)[0]}-string-component`}
          >
            <DateRange
              onChange={handleChange}
              endLabel={endLabel}
              value={store.get("value")}
              startLabel={startLabel}
              labelsInline={labelsInline}
              onBlur={(ev) => action("blur")(ev)}
              {...validation}
            />
          </State>
        ))}

        <h6>On labels</h6>
        {[
          { startError: "Start Error", endError: "End Error" },
          { startWarning: "Start Warning", endWarning: "End Warning" },
          { startInfo: "Start Info", endInfo: "End Info" },
        ].map((validation) => (
          <State
            store={store}
            key={`${Object.keys(validation)[0]}-string-label`}
          >
            <DateRange
              onChange={handleChange}
              endLabel={endLabel}
              value={store.get("value")}
              startLabel={startLabel}
              labelsInline={labelsInline}
              onBlur={(ev) => action("blur")(ev)}
              validationOnLabel
              {...validation}
            />
          </State>
        ))}
        <h6>On labels - only one input</h6>
        {[
          { endError: "End Error" },
          { startWarning: "Start Warning" },
          { endInfo: "End Info" },
        ].map((validation) => (
          <State
            store={store}
            key={`${Object.keys(validation)[0]}-string-label`}
          >
            <DateRange
              onChange={handleChange}
              endLabel={endLabel}
              value={store.get("value")}
              startLabel={startLabel}
              labelsInline={labelsInline}
              onBlur={(ev) => action("blur")(ev)}
              validationOnLabel
              {...validation}
            />
          </State>
        ))}

        <h4>Validation as boolean</h4>
        <h6>On both inputs</h6>
        {[
          { startError: true, endError: true },
          { startWarning: true, endWarning: true },
          { startInfo: true, endInfo: true },
        ].map((validation) => (
          <State store={store} key={`${Object.keys(validation)[0]}-boolean`}>
            <DateRange
              onChange={handleChange}
              endLabel={endLabel}
              value={store.get("value")}
              startLabel={startLabel}
              labelsInline={labelsInline}
              onBlur={(ev) => action("blur")(ev)}
              {...validation}
            />
          </State>
        ))}
        <h6>On only one input</h6>
        {[{ startError: true }, { endWarning: true }, { startInfo: true }].map(
          (validation) => (
            <State store={store} key={`${Object.keys(validation)[0]}-boolean`}>
              <DateRange
                onChange={handleChange}
                endLabel={endLabel}
                value={store.get("value")}
                startLabel={startLabel}
                labelsInline={labelsInline}
                onBlur={(ev) => action("blur")(ev)}
                {...validation}
              />
            </State>
          )
        )}
      </div>
    );
  };

  const columns = () => {
    return (
      <ColumnsWrapper>
        {component(false)}
        {component(true)}
      </ColumnsWrapper>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    info: {
      text: info,
      propTables: [DateRange],
    },
  };

  return [name, columns, metadata];
}

storiesOf("Experimental/Date Range", module)
  .add(...makeStory("default", dlsThemeSelector))
  .add(...makeValidationStory("validations", dlsThemeSelector))
  .add(...makeStory("classic", classicThemeSelector, true));
