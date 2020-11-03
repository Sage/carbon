import React from "react";
import { storiesOf } from "@storybook/react";
import { text, object, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { State, Store } from "@sambego/storybook-state";
import {
  dlsThemeSelector,
  classicThemeSelector,
} from "../../../../.storybook/theme-selectors";
import { SimpleColorPicker, SimpleColor } from ".";
import { notes, info } from "./documentation";
import getDocGenInfo from "../../../utils/helpers/docgen-info";

SimpleColorPicker.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /simple-color-picker\.component(?!spec)/
);

const store = new Store({
  selectedColor: null,
});

const onChange = (e) => {
  const { value } = e.target;
  store.set({
    selectedColor: value,
  });
  action(`Selected - ${value}`)(e);
};

// eslint-disable-next-line react/prop-types
const Component = ({ required }) => {
  const name = text("name", "basicPicker");
  const legend = text("legend", "Pick a colour");
  const demoColors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
    { color: "#E96400", label: "orange" },
    { color: "#99ADB6", label: "gray" },
    { color: "#C7384F", label: "flush mahogany" },
    { color: "#004500", label: "dark green" },
    { color: "#FFB500", label: "yellow" },
    { color: "#335C6D", label: "dark blue" },
    { color: "#00DC00", label: "light blue" },
  ];
  const availableColors = object("availableColors", demoColors);

  return (
    <State store={store}>
      <SimpleColorPicker
        name={name}
        legend={legend}
        onChange={onChange}
        onBlur={(ev) => action("Blur")(ev)}
        required={required || boolean("required", false)}
      >
        {availableColors.map(({ color, label }) => (
          <SimpleColor
            value={color}
            key={color}
            aria-label={label}
            id={color}
            defaultChecked={color === "#582C83"}
          />
        ))}
      </SimpleColorPicker>
    </State>
  );
};

const Required = () => {
  return <Component required name="required" />;
};

function makeStory(
  component,
  storyName,
  themeSelector,
  disableChromatic = false
) {
  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    knobs: { escapeHTML: false },
    chromatic: {
      disable: disableChromatic,
    },
  };

  return [storyName, component, metadata];
}

function makeValidationsStory(storyName, themeSelector) {
  const validationTypes = ["error", "warning", "info"];
  const component = () => {
    const demoColors = [
      { color: "transparent", label: "transparent" },
      { color: "#0073C1", label: "blue" },
      { color: "#582C83", label: "purple" },
      { color: "#E96400", label: "orange" },
      { color: "#99ADB6", label: "gray" },
      { color: "#C7384F", label: "flush mahogany" },
      { color: "#004500", label: "dark green" },
      { color: "#FFB500", label: "yellow" },
      { color: "#335C6D", label: "dark blue" },
      { color: "#00DC00", label: "light blue" },
    ];

    return (
      <>
        <h4>Validation as string</h4>
        <h6>On component</h6>
        {validationTypes.map((validation) => (
          <State store={store} key={`${validation}-string-component-state`}>
            <SimpleColorPicker
              name={`picker-${validation}-validation`}
              legend="Legend"
              {...{ [validation]: "Message" }}
              onChange={onChange}
              onBlur={(ev) => action("Blur")(ev)}
            >
              {demoColors.map(({ color, label }) => (
                <SimpleColor
                  value={color}
                  key={color}
                  aria-label={label}
                  id={color}
                  defaultChecked={color === "#582C83"}
                />
              ))}
            </SimpleColorPicker>
          </State>
        ))}

        <h6>On legend</h6>
        {validationTypes.map((validation) => (
          <State store={store} key={`${validation}-string-label-state`}>
            <SimpleColorPicker
              name={`picker-${validation}-validation-label`}
              legend="Legend"
              {...{ [validation]: "Message" }}
              validationOnLegend
              onChange={onChange}
              onBlur={(ev) => action("Blur")(ev)}
            >
              {demoColors.map(({ color, label }) => (
                <SimpleColor
                  value={color}
                  key={color}
                  aria-label={label}
                  id={color}
                  defaultChecked={color === "#582C83"}
                />
              ))}
            </SimpleColorPicker>
          </State>
        ))}

        <h4>Validation as boolean</h4>
        {validationTypes.map((validation) => (
          <State store={store} key={`${validation}-boolean-state`}>
            <SimpleColorPicker
              name={`picker-${validation}-validation-bool`}
              legend="Legend"
              {...{ [validation]: true }}
              onChange={onChange}
              onBlur={(ev) => action("Blur")(ev)}
            >
              {demoColors.map(({ color, label }) => (
                <SimpleColor
                  value={color}
                  key={color}
                  aria-label={label}
                  id={color}
                  defaultChecked={color === "#582C83"}
                />
              ))}
            </SimpleColorPicker>
          </State>
        ))}
      </>
    );
  };

  const metadata = {
    themeSelector,
    notes: { markdown: notes },
    knobs: { escapeHTML: false },
  };

  return [storyName, component, metadata];
}

storiesOf("Experimental/Simple Color Picker", module)
  .addParameters({
    info: {
      propTables: [SimpleColor, SimpleColorPicker],
      text: info,
    },
  })
  .add(...makeStory(Component, "default", dlsThemeSelector))
  .add(...makeValidationsStory("validations", dlsThemeSelector))
  .add(...makeStory(Required, "required", dlsThemeSelector))
  .add(...makeStory(Component, "classic", classicThemeSelector, true));
