import React from "react";
import { ComponentStory } from "@storybook/react";
import { RadioButtonGroup, RadioButton } from ".";

export default {
  title: "RadioButton/Test",
  includeStories: [
    "Required",
    "WithValidationsOnButtons",
    "WithValidationsOnRadioGroup",
    "WithTooltipPosition",
    "WithTooltipPositionOnRadioGroup",
  ],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const Required: ComponentStory<typeof RadioButton> = () => (
  <RadioButtonGroup name="required" legend="Radio group legend" required>
    <RadioButton id="radio-1" value="radio1" label="Radio Option 1" />
    <RadioButton id="radio-2" value="radio2" label="Radio Option 2" />
    <RadioButton id="radio-3" value="radio3" label="Radio Option 3" />
  </RadioButtonGroup>
);

Required.storyName = "required";

export const WithValidationsOnButtons: ComponentStory<
  typeof RadioButton
> = () => (
  <RadioButtonGroup
    name="validations-on-buttons-group"
    onChange={() => console.log("change")}
    legend="Radio group legend"
  >
    <RadioButton
      id="validations-on-buttons-radio-1"
      value="radio1"
      label="Radio Option 1"
      error="message"
      fieldHelp="Some help text for this input."
    />
    <RadioButton
      id="validations-on-buttons-radio-2"
      value="radio2"
      label="Radio Option 2"
      warning="message"
    />
    <RadioButton
      id="validations-on-buttons-radio-3"
      value="radio3"
      label="Radio Option 3"
      info="message"
    />
  </RadioButtonGroup>
);

WithValidationsOnButtons.storyName = "with validations on RadioButton";

export const WithValidationsOnRadioGroup: ComponentStory<
  typeof RadioButton
> = () => (
  <RadioButtonGroup
    name="validations-on-group"
    onChange={() => console.log("change")}
    legend="Radio group legend"
    error="Error message"
  >
    <RadioButton
      id="validations-on-group-radio-1"
      value="radio1"
      label="Radio Option 1"
    />
    <RadioButton
      id="validations-on-group-radio-2"
      value="radio2"
      label="Radio Option 2"
    />
    <RadioButton
      id="validations-on-group-radio-3"
      value="radio3"
      label="Radio Option 3"
    />
  </RadioButtonGroup>
);

WithValidationsOnRadioGroup.storyName = "with validations on RadioGroup";

export const WithTooltipPosition: ComponentStory<typeof RadioButton> = () => (
  <RadioButtonGroup
    name="tooltip-position"
    onChange={() => console.log("change")}
    legend="Radio group legend"
  >
    <RadioButton
      id="radio-1"
      value="radio1"
      label="Radio Option 1"
      error="message"
      tooltipPosition="right"
    />
  </RadioButtonGroup>
);

WithTooltipPosition.storyName = "with tooltip position";

export const WithTooltipPositionOnRadioGroup: ComponentStory<
  typeof RadioButton
> = () => (
  <RadioButtonGroup
    name="validations-on-group-group-tooltip-position-override"
    onChange={() => console.log("change")}
    legend="Radio group legend"
    error="Error message"
    tooltipPosition="top"
  >
    <RadioButton
      id="validations-on-group-radio-1-tooltip-position-override"
      value="radio1"
      label="Radio Option 1"
    />
    <RadioButton
      id="validations-on-group-radio-2-tooltip-position-override"
      value="radio2"
      label="Radio Option 2"
    />
    <RadioButton
      id="validations-on-group-radio-3-tooltip-position-override"
      value="radio3"
      label="Radio Option 3"
    />
  </RadioButtonGroup>
);

WithTooltipPositionOnRadioGroup.storyName =
  "with tooltip position on RadioGroup";

const radioContainerWidth = 400;

export const RadioButtonComponent = ({ ...props }) => {
  const [isChecked, setIsChecked] = React.useState(false);
  return (
    <>
      <div
        style={{
          marginTop: "64px",
          marginLeft: "64px",
          width: radioContainerWidth,
        }}
      >
        <RadioButton
          id="radio-1"
          value="radio1"
          label="Radiobutton 1"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          {...props}
        />
      </div>
    </>
  );
};

export const RadioButtonGroupComponent = ({
  children,
  ...props
}: {
  children: string;
}) => {
  return (
    <div
      style={{
        marginTop: "64px",
        marginLeft: "64px",
      }}
    >
      <RadioButtonGroup
        name="radiobuttongroup"
        legend="Radio group legend"
        {...props}
      >
        <RadioButton id="radio-1" value="radio1" label="Yes" />
        <RadioButton id="radio-2" value="radio2" label="No" />
        <RadioButton id="radio-3" value="radio3" label="Maybe" />

        <>{children}</>
      </RadioButtonGroup>
    </div>
  );
};
