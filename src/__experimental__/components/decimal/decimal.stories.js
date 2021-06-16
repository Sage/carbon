import React, { useState } from "react";
import { number, select, boolean, text } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import Decimal from "./decimal.component";
import { getCommonTextboxProps } from "../textbox/textbox.stories";
import OptionsHelper from "../../../utils/helpers/options-helper";
import guid from "../../../utils/helpers/guid";

export default {
  title: "Experimental/Decimal Input/Test",
  component: Decimal,
  parameters: {
    info: {
      disable: true,
    },
    chromatic: {
      disable: true,
    },
    knobs: { escapeHTML: false },
  },
};

const previous = {
  key: guid(),
  allowEmptyValue: false,
};

const commonProps = () => {
  const precisionRange = {
    range: true,
    min: 0,
    max: 15,
    step: 1,
  };
  const align = select(
    "align",
    OptionsHelper.alignBinary,
    Decimal.defaultProps.align
  );
  const precision = number(
    "precision",
    Decimal.defaultProps.precision,
    precisionRange
  );
  const autoFocus = boolean("autoFocus", false);
  const allowEmptyValue = boolean("allowEmptyValue", false);

  // When the allowEmptyValue knob changes we want to force the component to re-create
  // allowEmptyValue is only used in the constructor and it is not currently supported to change during the lifetime
  // of the component
  if (previous.allowEmptyValue !== allowEmptyValue) {
    previous.key = guid();
  }
  previous.allowEmptyValue = allowEmptyValue;
  const { key } = previous;

  return {
    key,
    align,
    precision,
    autoFocus,
    allowEmptyValue,
  };
};

export const Default = () => {
  const [state, setState] = useState("0.00");

  const setValue = (ev) => {
    action("onChange")(ev);
    setState(ev.target.value.rawValue);
  };
  const { precision, ...props } = commonProps();
  return (
    <Decimal
      key={precision} // Don't do this in production, testing purposes only
      {...props}
      precision={precision}
      {...getCommonTextboxProps()}
      value={state}
      onChange={setValue}
      onBlur={action("onBlur")}
    />
  );
};

export const Locale = () => {
  const [state, setState] = useState("0.00");

  const locale = select("locale", ["en", "fr", "no", "es-ES", "pt-PT"]);

  const setValue = (ev) => {
    action("onChange")(ev);
    setState(ev.target.value.rawValue);
  };
  const { precision, ...props } = commonProps();
  return (
    <Decimal
      key={precision} // Don't do this in production, testing purposes only
      {...props}
      precision={precision}
      locale={locale}
      {...getCommonTextboxProps()}
      value={state}
      onChange={setValue}
      onBlur={action("onBlur")}
    />
  );
};

export const Post = () => {
  const [state, setState] = useState("0.00");
  const setValue = (ev) => {
    action("onChange")(ev);
    setState(ev.target.value.rawValue);
  };
  return (
    <form method="POST" action={text("action", "")} target="_blank">
      <p>
        To test the hidden input go to{" "}
        <a href="https://webhook.site">https://webhook.site</a> and generate a
        new URL. Use this value for the <code>action</code> knob.
      </p>
      <Decimal
        {...commonProps()}
        {...getCommonTextboxProps()}
        name={text("name", "my-decimal")}
        value={state}
        onChange={setValue}
        onBlur={action("onBlur")}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

Default.story = {
  name: "default",
};

Locale.story = {
  name: "locale",
};

Post.story = {
  name: "post",
};
