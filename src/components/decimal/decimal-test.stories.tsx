import React, { useState } from "react";
import { action } from "storybook/actions";
import { StoryFn } from "@storybook/react-vite";

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
