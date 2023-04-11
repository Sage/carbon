import React from "react";
import { action } from "@storybook/addon-actions";

import ButtonToggle from ".";

export default {
  title: "Button Toggle/Test",
  includeStories: ["DefaultStory"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const DefaultStory = () => (
  <div>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-1"
      onChange={() => action("onChange")("foo")}
      onFocus={() => action("onFocus")("foo")}
      onBlur={() => action("onBlur")("foo")}
    >
      Foo
    </ButtonToggle>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-2"
      onChange={() => action("onChange")("bar")}
      onFocus={() => action("onFocus")("bar")}
      onBlur={() => action("onBlur")("bar")}
    >
      Bar
    </ButtonToggle>
    <ButtonToggle
      name="new-button-toggle"
      key="button-toggle-3"
      onChange={() => action("onChange")("baz")}
      onFocus={() => action("onFocus")("baz")}
      onBlur={() => action("onBlur")("baz")}
    >
      Baz
    </ButtonToggle>
  </div>
);

DefaultStory.storyName = "default";

export const ButtonToggleComponent = ({
  // eslint-disable-next-line react/prop-types
  children = "This is an example of an alert",
  ...props
}) => {
  return (
    <div>
      <ButtonToggle
        name="button-toggle-one"
        onBlur={function noRefCheck() {
          ("");
        }}
        onChange={function noRefCheck() {
          ("");
        }}
        onFocus={function noRefCheck() {
          ("");
        }}
        {...props}
      >
        {children}
      </ButtonToggle>
      <ButtonToggle
        name="button-toggle-two"
        onBlur={function noRefCheck() {
          ("");
        }}
        onChange={function noRefCheck() {
          ("");
        }}
        onFocus={function noRefCheck() {
          ("");
        }}
        {...props}
      >
        Second
      </ButtonToggle>
      <ButtonToggle
        name="button-toggle-three"
        onBlur={function noRefCheck() {
          ("");
        }}
        onChange={function noRefCheck() {
          ("");
        }}
        onFocus={function noRefCheck() {
          ("");
        }}
        {...props}
      >
        Third
      </ButtonToggle>
    </div>
  );
};
