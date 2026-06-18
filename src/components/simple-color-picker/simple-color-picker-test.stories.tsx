import React, { useState } from "react";
import { action } from "storybook/actions";
import { SimpleColorPicker, SimpleColor } from ".";

export default {
  title: "Simple Color Picker/Test",
  includeStories: [
    "Default",
    "ValidationsStringComponent",
    "ValidationsStringLabel",
    "ValidationsBoolean",
    "Focused",
    "AllVariants",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

type DefaultStoryProps = {
  availableColors: Record<string, string>[];
  name: string;
  legend: string;
};

export const Default = ({
  availableColors,
  name,
  legend,
  ...args
}: DefaultStoryProps) => {
  const [state, setState] = useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setState(value);
    action(`Selected - ${value}`)(e);
  };
  return (
    <SimpleColorPicker
      onChange={onChange}
      onBlur={(ev) => action("Blur")(ev)}
      value={state}
      name={name}
      legend={legend}
      {...args}
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
  );
};

Default.storyName = "default";
Default.args = {
  required: false,
  name: "basicPicker",
  legend: "Pick a colour",
  availableColors: [
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
  ],
};

export const ValidationsStringComponent = () => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  const colors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
  ];

  return ["error", "warning", "info"].map((validationType) => (
    <SimpleColorPicker
      key={`${validationType}-string-component`}
      name={`picker-${validationType}-validation`}
      legend="Legend"
      onChange={onChange}
      {...{ [validationType]: "Message" }}
      value={state}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor
          value={color}
          key={color}
          aria-label={label}
          id={`${validationType}-${color}`}
        />
      ))}
    </SimpleColorPicker>
  ));
};

ValidationsStringComponent.storyName = "validations string component";

export const ValidationsStringLabel = () => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  const colors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
  ];

  return ["error", "warning", "info"].map((validationType) => (
    <SimpleColorPicker
      key={`${validationType}-string-legend`}
      name={`picker-${validationType}-validation-legend`}
      legend="Legend"
      validationOnLegend
      onChange={onChange}
      {...{ [validationType]: "Message" }}
      value={state}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor
          value={color}
          key={color}
          aria-label={label}
          id={`${validationType}-${color}`}
        />
      ))}
    </SimpleColorPicker>
  ));
};

ValidationsStringLabel.storyName = "validations string label";

export const ValidationsBoolean = () => {
  const [state, setState] = useState("transparent");

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  const colors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
  ];

  return ["error", "warning", "info"].map((validationType) => (
    <SimpleColorPicker
      key={`${validationType}-boolean-component`}
      name={`picker-${validationType}-validation-boolean`}
      legend="Legend"
      onChange={onChange}
      {...{ [validationType]: true }}
      value={state}
    >
      {colors.map(({ color, label }) => (
        <SimpleColor
          value={color}
          key={color}
          aria-label={label}
          id={`${validationType}-${color}`}
        />
      ))}
    </SimpleColorPicker>
  ));
};

ValidationsBoolean.storyName = "validations boolean";

export const Focused = () => {
  const [state, setState] = useState("transparent");
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setState(target.value);
  };

  return (
    <SimpleColorPicker
      name="focused-example"
      legend="Legend"
      onChange={onChange}
      value={state}
    >
      <SimpleColor
        value="transparent"
        aria-label="transparent"
        id="transparent"
        data-role="target"
      />
      <SimpleColor value="#0073C1" aria-label="blue" id="blue" />
      <SimpleColor value="#582C83" aria-label="purple" id="purple" />
    </SimpleColorPicker>
  );
};
Focused.storyName = "focused";

export const AllVariants = () => {
  const colors = [
    { color: "transparent", label: "transparent" },
    { color: "#0073C1", label: "blue" },
    { color: "#582C83", label: "purple" },
  ];

  const allColors = [
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
      {/* Default */}
      <SimpleColorPicker
        name="chr-default"
        legend="Default"
        onChange={() => {}}
        value="transparent"
      >
        {allColors.map(({ color, label }) => (
          <SimpleColor
            value={color}
            key={color}
            aria-label={label}
            id={`chr-default-${color}`}
          />
        ))}
      </SimpleColorPicker>

      {/* Disabled */}
      <SimpleColorPicker
        name="chr-disabled"
        legend="Disabled"
        onChange={() => {}}
        value="transparent"
      >
        {colors.map(({ color, label }) => (
          <SimpleColor
            value={color}
            key={color}
            aria-label={label}
            id={`chr-disabled-${color}`}
            disabled
          />
        ))}
      </SimpleColorPicker>

      {/* Required */}
      <SimpleColorPicker
        name="chr-required"
        legend="Required"
        required
        onChange={() => {}}
        value="transparent"
      >
        {colors.map(({ color, label }) => (
          <SimpleColor
            value={color}
            key={color}
            aria-label={label}
            id={`chr-required-${color}`}
          />
        ))}
      </SimpleColorPicker>

      {/* Validations as string on component */}
      {["error", "warning", "info"].map((validationType) => (
        <SimpleColorPicker
          key={`${validationType}-string-component`}
          name={`picker-${validationType}-validation`}
          legend="Legend"
          onChange={() => {}}
          {...{ [validationType]: "Message" }}
          value="transparent"
        >
          {colors.map(({ color, label }) => (
            <SimpleColor
              value={color}
              key={color}
              aria-label={label}
              id={`chr-${validationType}-${color}`}
            />
          ))}
        </SimpleColorPicker>
      ))}

      {/* Validations as string on legend */}
      {["error", "warning", "info"].map((validationType) => (
        <SimpleColorPicker
          key={`${validationType}-string-legend`}
          name={`picker-${validationType}-validation-legend`}
          legend="Legend"
          validationOnLegend
          onChange={() => {}}
          {...{ [validationType]: "Message" }}
          value="transparent"
        >
          {colors.map(({ color, label }) => (
            <SimpleColor
              value={color}
              key={color}
              aria-label={label}
              id={`chr-legend-${validationType}-${color}`}
            />
          ))}
        </SimpleColorPicker>
      ))}

      {/* Validations as boolean */}
      {["error", "warning", "info"].map((validationType) => (
        <SimpleColorPicker
          key={`${validationType}-boolean`}
          name={`picker-${validationType}-validation-boolean`}
          legend="Legend"
          onChange={() => {}}
          {...{ [validationType]: true }}
          value="transparent"
        >
          {colors.map(({ color, label }) => (
            <SimpleColor
              value={color}
              key={color}
              aria-label={label}
              id={`chr-bool-${validationType}-${color}`}
            />
          ))}
        </SimpleColorPicker>
      ))}

      {/* Focused state */}
      <SimpleColorPicker
        name="focused-example"
        legend="Legend"
        onChange={() => {}}
        value="transparent"
      >
        <SimpleColor
          value="transparent"
          aria-label="transparent"
          id="chr-focused-transparent"
          data-role="target"
        />
        <SimpleColor value="#0073C1" aria-label="blue" id="chr-focused-blue" />
        <SimpleColor
          value="#582C83"
          aria-label="purple"
          id="chr-focused-purple"
        />
      </SimpleColorPicker>
    </>
  );
};
AllVariants.storyName = "all variants";
AllVariants.parameters = {
  chromatic: { disableSnapshot: false },
  pseudo: { focus: "[data-role='target']" },
};
