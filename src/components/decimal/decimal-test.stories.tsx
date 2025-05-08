import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { StoryFn } from "@storybook/react";

import Decimal, { CustomEvent } from "./decimal.component";
import {
  CommonTextboxArgs,
  commonTextboxArgTypes,
  getCommonTextboxArgs,
  getCommonTextboxArgsWithSpecialCharacters,
} from "../textbox/textbox-test.stories";
import CarbonProvider from "../carbon-provider/carbon-provider.component";

export default {
  title: "Decimal Input/Test",
  parameters: {
    info: { disable: true },
    layout: "fullscreen",
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
DecimalStory.storyName = "default";
DecimalStory.args = commonArgs;

export const UncontrolledDecimalStory = (args: CommonTextboxArgs) => {
  const handleChange = (ev: CustomEvent) => {
    action("onChange")(ev.target.value);
  };

  const handleBlur = (event: CustomEvent) => {
    action("onBlur")(event.target.value);
  };
  return (
    <Decimal
      defaultValue="0.03"
      onChange={handleChange}
      onBlur={handleBlur}
      {...getCommonTextboxArgsWithSpecialCharacters(args)}
    />
  );
};
UncontrolledDecimalStory.storyName = "uncontrolled default";
UncontrolledDecimalStory.args = commonArgs;

type Locale = {
  options: string[];
  control: { type: string };
};

export const Locale: StoryFn<CommonTextboxArgs & { locale: Locale }> =
  DecimalStory.bind({});
Locale.storyName = "locale";
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
PostStory.storyName = "post";
PostStory.args = { ...commonArgs, action: "" };

export const NewValidationStory = (args: CommonTextboxArgs) => {
  const [state, setState] = useState("0.05");
  const handleChange = (ev: CustomEvent) => {
    action("onChange")(ev.target.value);
    setState(ev.target.value.rawValue);
  };
  const handleBlur = (event: CustomEvent) => {
    action("onBlur")(event.target.value);
  };
  return (
    <CarbonProvider validationRedesignOptIn>
      <Decimal
        value={state}
        m={2}
        onChange={handleChange}
        onBlur={handleBlur}
        {...getCommonTextboxArgsWithSpecialCharacters(args)}
      />
    </CarbonProvider>
  );
};
NewValidationStory.storyName = "new validation";
NewValidationStory.args = commonArgs;

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
DecimalCustomOnChangeStory.storyName = "custom onChange";
DecimalCustomOnChangeStory.args = commonArgs;
