import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Store, State } from "@sambego/storybook-state";
import LinkTo from "@storybook/addon-links/react";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../../.storybook/theme-selectors";
import { Select, Option } from ".";
import { OriginalTextbox } from "../textbox";
import OptionsHelper from "../../../utils/helpers/options-helper";
import getDocGenInfo from "../../../utils/helpers/docgen-info";
import docgenInfo from "./docgenInfo.json";
import AutoFocus from "../../../utils/helpers/auto-focus";
import DeprecationWarning from "../../../__internal__/DeprecationWarning";

const SelectDeprecationWarning = () => (
  <DeprecationWarning>
    This component is no longer maintained and will be removed in a future
    version. To upgrade please use the{" "}
    <LinkTo kind="Design System/Select" story="basic">
      Design System/Select
    </LinkTo>{" "}
    component.
  </DeprecationWarning>
);

Select.__docgenInfo = getDocGenInfo(docgenInfo, /select\.component(?!spec)/);

Option.__docgenInfo = getDocGenInfo(docgenInfo, /option\.component(?!spec)/);

const singleSelectStore = new Store({
  value: "",
});

const multiSelectStore = new Store({
  value: [],
});

const commonKnobs = (
  store,
  enableMultiSelect = false,
  autoFocusDefault = false
) => {
  const filterable = boolean("filterable", Select.defaultProps.filterable);
  const typeAhead =
    filterable && boolean("typeAhead", Select.defaultProps.typeAhead);
  const label = text("label", "Label");
  const previous = {
    key: "select",
    autoFocus: autoFocusDefault,
  };
  const autoFocus = boolean("autoFocus", autoFocusDefault);
  const isLoopable = boolean("isLoopable", false);
  const preventFocusAutoOpen = boolean("preventFocusAutoOpen", false);
  const key = AutoFocus.getKey(autoFocus, previous);

  const knobs = {
    key,
    disabled: boolean("disabled", false),
    onBlur: (ev) => action("blur")(ev),
    onKeyDown: (ev) => action("keyDown")(ev),
    onChange: (ev) => {
      const optionsObjects = ev.target.value;
      let value = optionsObjects.map(
        (optionObject) => optionObject.optionValue
      );
      if (!enableMultiSelect) {
        value = value[0];
      }
      store.set({ value });
      action("change")(ev);
    },
    placeholder: text("placeholder", ""),
    readOnly: boolean("readOnly", false),
    size: select(
      "size",
      OptionsHelper.sizesRestricted,
      OptionsHelper.sizesRestricted[1]
    ),
    transparent: boolean("transparent", false),
    filterable,
    typeAhead,
    autoFocus,
    label,
    isLoopable,
    preventFocusAutoOpen,
  };

  if (label.length) {
    knobs.labelAlign = select(
      "labelAlign",
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    );
    knobs.labelInline = boolean("labelInline", false);
  }

  return knobs;
};

const selectOptionsLabels = [
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

const selectOptions = selectOptionsLabels.map((label, index) => (
  <Option key={label} text={label} value={String(index + 1)} />
));

const objectOptions = [
  {
    name: "Book collection",
    link: "ediBuchungserfassung.Sage.Rewe",
    synonyms: ["payment received", "bank", "payed", "bill payed"],
  },
  {
    name: "Document entry",
    link: "ediVKBelegerfassung.Sage.Wawi",
    synonyms: ["New Document", "Opportunity", "Lead", "Offer"],
  },
  {
    name: "Articles",
    link: "ediArtikelstamm.Sage.Wawi",
    synonyms: ["piece", "thing"],
  },
];

const defaultComponent = (autoFocus = false) => () => {
  return (
    <State store={singleSelectStore}>
      <SelectDeprecationWarning />
      <Select
        ariaLabel="singleSelect"
        {...commonKnobs(singleSelectStore, false, autoFocus)}
      >
        {selectOptions}
      </Select>
    </State>
  );
};

const customFilterComponent = () => {
  const complexCustomFilter = (value, filter, item) => {
    if (value.includes(filter)) return true;
    if (
      item.synonyms.filter((synonym) => synonym.toLowerCase().includes(filter))
        .length > 0
    ) {
      return true;
    }
    return false;
  };

  return (
    <State store={singleSelectStore}>
      <SelectDeprecationWarning />
      <p key="description">
        For example type &apos;piece&apos;, article will be shown because that
        is a synonym
      </p>
      <Select
        key="select"
        ariaLabel="customFilter"
        customFilter={complexCustomFilter}
        typeAhead={false}
        {...commonKnobs(singleSelectStore)}
      >
        {objectOptions.map((item) => (
          <Option
            key={`globalSearch.${item.name}`}
            text={item.name}
            value={item}
          />
        ))}
      </Select>
    </State>
  );
};

function makeStory(name, themeSelector, component, disableChromatic = false) {
  const metadata = {
    themeSelector,
    chromatic: {
      disable: disableChromatic,
    },
  };

  return [name, component, metadata];
}

function makeMultipleStory(name, themeSelector) {
  const component = () => {
    return (
      <State store={multiSelectStore}>
        <SelectDeprecationWarning />
        <Select
          ariaLabel="multiSelect"
          enableMultiSelect
          {...commonKnobs(multiSelectStore, true)}
        >
          {selectOptions}
        </Select>
      </State>
    );
  };

  const metadata = {
    themeSelector,
  };

  return [name, component, metadata];
}

const validationTypes = ["error", "warning", "info"];

function makeValidationsStory(name, themeSelector) {
  const component = () => {
    return (
      <>
        <SelectDeprecationWarning />
        <h4>Single select - validations as string</h4>
        <h6>On component</h6>
        {validationTypes.map((validation) => (
          <Select
            ariaLabel="singleSelect"
            {...commonKnobs(singleSelectStore)}
            key={`single-${validation}-string-component`}
            {...{ [validation]: "Message" }}
          >
            {selectOptions}
          </Select>
        ))}

        <h6>Read Only</h6>
        <Select
          ariaLabel="singleSelect"
          {...commonKnobs(singleSelectStore)}
          error="Message"
          readOnly
        >
          {selectOptions}
        </Select>

        <h6>On label</h6>
        {validationTypes.map((validation) => (
          <Select
            ariaLabel="singleSelect"
            {...commonKnobs(singleSelectStore)}
            key={`single-${validation}-string-label`}
            {...{ [validation]: "Message" }}
            validationOnLabel
          >
            {selectOptions}
          </Select>
        ))}

        <h6>Read Only</h6>
        <Select
          ariaLabel="singleSelect"
          {...commonKnobs(singleSelectStore)}
          error="Message"
          validationOnLabel
          readOnly
        >
          {selectOptions}
        </Select>

        <h4>Single select - validations as boolean</h4>
        {validationTypes.map((validation) => (
          <Select
            ariaLabel="singleSelect"
            {...commonKnobs(singleSelectStore)}
            key={`single-${validation}-boolean-label`}
            {...{ [validation]: true }}
          >
            {selectOptions}
          </Select>
        ))}

        <h4>Multi select - validations as string</h4>
        <h6>On component</h6>
        {validationTypes.map((validation) => (
          <Select
            ariaLabel="multiSelect"
            enableMultiSelect
            {...commonKnobs(multiSelectStore, true)}
            key={`multi-${validation}-string-component`}
            {...{ [validation]: "Message" }}
          >
            {selectOptions}
          </Select>
        ))}
        <h6>On label</h6>
        {validationTypes.map((validation) => (
          <Select
            ariaLabel="multiSelect"
            enableMultiSelect
            {...commonKnobs(multiSelectStore, true)}
            key={`multi-${validation}-string-label`}
            {...{ [validation]: "Message" }}
            validationOnLabel
          >
            {selectOptions}
          </Select>
        ))}

        <h4>Multi select - validations as boolean</h4>
        {validationTypes.map((validation) => (
          <Select
            ariaLabel="multiSelect"
            enableMultiSelect
            {...commonKnobs(multiSelectStore, true)}
            key={`multi-${validation}-boolean-label`}
            {...{ [validation]: true }}
          >
            {selectOptions}
          </Select>
        ))}
      </>
    );
  };

  const metadata = {
    themeSelector,
    info: {
      source: false,
      propTablesExclude: [Select, Option],
    },
  };

  return [name, component, metadata];
}

storiesOf("Experimental/Select", module)
  .addParameters({
    info: {
      propTablesExclude: [State],
      propTables: [Select, OriginalTextbox, Option],
    },
    knobs: { escapeHTML: false },
  })
  .add(...makeStory("default", dlsThemeSelector, defaultComponent()))
  .add(...makeStory("classic", classicThemeSelector, defaultComponent(), true))
  .add(...makeMultipleStory("multiple", dlsThemeSelector))
  .add(...makeValidationsStory("validations", dlsThemeSelector))
  .add(
    ...makeStory("autoFocus", dlsThemeSelector, defaultComponent(true), true)
  )
  .add(...makeStory("customFilter", dlsThemeSelector, customFilterComponent));
