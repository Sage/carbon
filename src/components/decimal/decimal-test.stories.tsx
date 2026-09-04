import React, { useState } from "react";
import { action } from "storybook/actions";
import { StoryFn, StoryObj } from "@storybook/react-vite";

import Decimal, { CustomEvent, DecimalProps } from "./decimal.component";
import Box from "../box";
import { Select, Option } from "../select";
import {
  CommonTextboxArgs,
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCharacters,
} from "../textbox/utils";

export default {
  title: "Decimal Input/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    align: {
      options: ["left", "right"],
      control: {
        type: "select",
      },
    },
    precision: {
      control: {
        type: "range",
        min: 0,
        max: 15,
        step: 1,
      },
    },
    ...commonTextboxArgTypes(),
  },
};

const commonArgs = {
  align: "right",
  precision: 2,
  allowEmptyValue: false,
  ...getCommonTextboxArgs(),
};

export const DecimalStory = (args: CommonTextboxArgs) => {
  const [state, setState] = useState("0.05");
  const handleChange = (ev: CustomEvent) => {
    action("onChange")(ev.target.value);
    setState(ev.target.value.rawValue);
  };
  const handleBlur = (event: CustomEvent) => {
    action("onBlur")(event.target.value);
  };
  return (
    <Decimal
      value={state}
      onChange={handleChange}
      onBlur={handleBlur}
      {...getCommonTextboxArgsWithSpecialCharacters(args)}
    />
  );
};
DecimalStory.storyName = "Default";
DecimalStory.args = commonArgs;

type Locale = {
  options: string[];
  control: { type: string };
};

export const Locale: StoryFn<CommonTextboxArgs & { locale: Locale }> =
  DecimalStory.bind({});
Locale.storyName = "Locale";
Locale.args = { ...commonArgs, locale: undefined };
Locale.argTypes = {
  locale: {
    options: ["en", "fr", "no", "es-ES", "pt-PT", "it"],
    control: { type: "select" },
  },
};

export const PostStory = ({
  action: actionArg,
  ...args
}: CommonTextboxArgs & { action: string }) => {
  const [state, setState] = useState("0.00");
  const handleChange = (ev: CustomEvent) => {
    action("onChange")(ev.target.value);
    setState(ev.target.value.rawValue);
  };
  const handleBlur = (event: CustomEvent) => {
    action("onBlur")(event.target.value);
  };
  return (
    <form method="POST" action={actionArg} target="_blank">
      <p>
        To test the hidden input go to{" "}
        <a href="https://webhook.site">https://webhook.site</a> and generate a
        new URL. Use this value for the <code>action</code> knob.
      </p>
      <Decimal
        value={state}
        onChange={handleChange}
        onBlur={handleBlur}
        {...getCommonTextboxArgsWithSpecialCharacters(args)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
PostStory.storyName = "Post";
PostStory.args = { ...commonArgs, action: "" };

export const Validation = () => {
  const [state, setState] = useState("0.01");
  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };

  return (
    <>
      <Decimal
        label="Decimal"
        error="Error Message"
        value={state}
        onChange={setValue}
        mb={2}
      />
      <Decimal
        label="Decimal"
        warning="Warning Message"
        value={state}
        onChange={setValue}
        mb={2}
      />
      <Decimal
        validationMessagePositionTop={false}
        label="Decimal"
        error="Error Message"
        value={state}
        onChange={setValue}
        mb={2}
      />
      <Decimal
        validationMessagePositionTop={false}
        label="Decimal"
        warning="Warning Message"
        value={state}
        onChange={setValue}
      />
    </>
  );
};
Validation.storyName = "Validation";
Validation.parameters = {
  chromatic: { disableSnapshot: false },
  themeProvider: { chromatic: { theme: "sage" } },
};

export const DecimalCustomOnChangeStory = (args: CommonTextboxArgs) => {
  const [state, setState] = useState("0.01");
  const handleChange = (e: CustomEvent) => {
    let newValue = e.target.value.rawValue;
    if (newValue.startsWith("22.22")) newValue = "22.22";
    action("onChange")(e.target.value, newValue);
    setState(newValue);
  };
  const handleBlur = (event: CustomEvent) => {
    action("onBlur")(event.target.value);
  };
  return (
    <div>
      If you try to type `22.222`, the onChange should block the last `2` from
      being entered and you should see `22.22` in the textbox. The recommended
      approach for manipulating input values is to use validation. However, it
      is also possible to manipulate this via the onChange function like so:
      <Decimal
        mt={2}
        value={state}
        onChange={handleChange}
        onBlur={handleBlur}
        {...getCommonTextboxArgsWithSpecialCharacters(args)}
      />
    </div>
  );
};
DecimalCustomOnChangeStory.storyName = "Custom onChange";
DecimalCustomOnChangeStory.args = commonArgs;

export const PopoverContainerWithSizes = () => {
  const sizes = ["small", "medium", "large"] as const;
  const [values, setValues] = useState<Record<string, string>>({
    small: "0.01",
    medium: "0.01",
    large: "0.01",
  });
  const [selectValues, setSelectValues] = useState<Record<string, string>>({
    small: "1",
    medium: "1",
    large: "1",
  });

  return (
    <>
      {sizes.map((size) => (
        <Decimal
          key={size}
          label={`Decimal - ${size}`}
          size={size}
          value={values[size]}
          onChange={(e: CustomEvent) =>
            setValues((prev) => ({
              ...prev,
              [size]: e.target.value.rawValue,
            }))
          }
          popoverContainerContent={
            <Box m="24px">
              <Select
                name={`select-${size}`}
                id={`select-${size}`}
                label="Select a colour"
                value={selectValues[size]}
                onChange={(ev) =>
                  setSelectValues((prev) => ({
                    ...prev,
                    [size]: ev.target.value,
                  }))
                }
              >
                <Option text="Amber" value="1" />
                <Option text="Black" value="2" />
                <Option text="Blue" value="3" />
                <Option text="Green" value="4" />
                <Option text="Red" value="5" />
              </Select>
            </Box>
          }
          mb={2}
        />
      ))}
    </>
  );
};
PopoverContainerWithSizes.storyName = "Popover Container With Sizes";

export const PopoverContainerSizeControlled: StoryFn<
  Pick<DecimalProps, "size">
> = ({ size }: Pick<DecimalProps, "size">) => {
  const [value, setValue] = useState("0.01");
  const [selectValue, setSelectValue] = useState("1");

  return (
    <Decimal
      label="Decimal"
      size={size}
      value={value}
      onChange={(e: CustomEvent) => setValue(e.target.value.rawValue)}
      popoverContainerContent={
        <Box m="24px">
          <Select
            name="simple"
            id="simple"
            label="Select a colour"
            value={selectValue}
            onChange={(ev) => setSelectValue(ev.target.value)}
          >
            <Option text="Amber" value="1" />
            <Option text="Black" value="2" />
            <Option text="Blue" value="3" />
            <Option text="Green" value="4" />
            <Option text="Red" value="5" />
          </Select>
        </Box>
      }
      maxWidth="40%"
    />
  );
};
PopoverContainerSizeControlled.storyName = "Popover Container Size Controlled";
PopoverContainerSizeControlled.args = { size: "medium" };
PopoverContainerSizeControlled.argTypes = {
  size: {
    options: ["small", "medium", "large"],
    control: { type: "select" },
  },
};

type Story = StoryObj<typeof Decimal>;

// Documentation regression stories moved from the public docs.

/* TODO: we really need a better of having a reusable default story that can show state
 * I've checked how it used to be and you couldn't see the state setting at that point either
 * I've put a message on the Storybook Discord but it's been ignored so will need to chase or ask on git */
export const DefaultStory: Story = {
  render: (args: DecimalProps) => {
    const [state, setState] = useState("0.01");
    const setValue = ({ target }: CustomEvent) => {
      setState(target.value.rawValue);
    };
    return <Decimal {...args} value={state} onChange={setValue} />;
  },
  args: { label: "Decimal", required: true },
  name: "Default",
};

export const Sizes: Story = () => {
  const [state, setState] = useState({
    small: "0.01",
    medium: "0.01",
    large: "0.01",
  });

  const handleChange = (size: DecimalProps["size"]) => (e: CustomEvent) => {
    setState({ ...state, [size || "small"]: e.target.value.rawValue });
  };

  return (["small", "medium", "large"] as const).map((size) => (
    <Decimal
      key={`Decimal - ${size}`}
      label={`Decimal - ${size}`}
      value={state[size]}
      onChange={handleChange(size)}
      size={size}
      mb={2}
    />
  ));
};
Sizes.storyName = "Sizes";

export const Disabled: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, disabled: true },
  name: "Disabled",
};

export const Prefix: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, prefix: "£", maxWidth: "20%" },
  name: "Prefix",
};

export const Suffix: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, suffix: "kg", maxWidth: "20%" },
  name: "Suffix",
};

export const WithPopoverPosition: Story = {
  render: (args: DecimalProps) => {
    const [state, setState] = useState("0.01");
    const [selectValue, setSelectValue] = useState("1");
    const setValue = ({ target }: CustomEvent) => {
      setState(target.value.rawValue);
    };
    return (
      <Decimal
        {...args}
        value={state}
        onChange={setValue}
        popoverContainerContent={
          <Box m="24px">
            <Select
              name="simple"
              id="simple"
              label="Select a colour"
              value={selectValue}
              onChange={(ev) => setSelectValue(ev.target.value)}
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
          </Box>
        }
      />
    );
  },
  args: { label: "Decimal", maxWidth: "40%", popoverPosition: "left" },
  argTypes: {
    popoverPosition: {
      options: ["left", "right", "center"],
      control: { type: "select" },
    },
  },
  name: "With Popover Position",
};

export const ReadOnly: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, readOnly: true },
  name: "Read Only",
};

export const Empty: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, allowEmptyValue: true },
  name: "Empty",
};
Empty.parameters = {
  chromatic: { disableSnapshot: true },
};

export const WithCustomPrecision: Story = () => {
  const [state, setState] = useState("0.0001");
  const setValue = ({ target }: CustomEvent) => {
    setState(target.value.rawValue);
  };
  return (
    <Decimal label="Decimal" value={state} onChange={setValue} precision={4} />
  );
};
WithCustomPrecision.storyName = "With Custom Precision";

export const LabelInline: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, labelInline: true },
  parameters: { chromatic: { disableSnapshot: true } },
  name: "Label Inline",
};

export const WithCustomMaxWidth: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, maxWidth: "50%" },
  name: "With Custom Max Width",
};

export const WithFieldHelp: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, fieldHelp: "Help" },
  name: "With Field Help",
};

export const WithInputHint: Story = {
  ...DefaultStory,
  args: {
    ...DefaultStory.args,
    inputHint: "Hint text (optional).",
    helpAriaLabel: "Help",
  },
  name: "With Input Hint",
};

export const Required: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, required: true, helpAriaLabel: "Help" },
  name: "Required",
};
Required.parameters = {
  chromatic: { disableSnapshot: true },
};

export const LeftAligned: Story = {
  ...DefaultStory,
  args: { ...DefaultStory.args, required: true, align: "left" },
  name: "Left Aligned",
};

DefaultStory.parameters = { chromatic: { disableSnapshot: false } };
Sizes.parameters = { chromatic: { disableSnapshot: false } };
Disabled.parameters = { chromatic: { disableSnapshot: false } };
Prefix.parameters = { chromatic: { disableSnapshot: false } };
Suffix.parameters = { chromatic: { disableSnapshot: false } };
WithPopoverPosition.parameters = { chromatic: { disableSnapshot: false } };
ReadOnly.parameters = { chromatic: { disableSnapshot: false } };
WithCustomPrecision.parameters = { chromatic: { disableSnapshot: false } };
WithCustomMaxWidth.parameters = { chromatic: { disableSnapshot: false } };
WithFieldHelp.parameters = { chromatic: { disableSnapshot: false } };
WithInputHint.parameters = { chromatic: { disableSnapshot: false } };
LeftAligned.parameters = { chromatic: { disableSnapshot: false } };
