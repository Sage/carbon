import React, { useState } from "react";
import { action } from "@storybook/addon-actions";
import { ButtonToggle, ButtonToggleGroup, ButtonToggleProps } from ".";
import Box from "../box";

export default {
  title: "Button Toggle/Test",
  includeStories: ["DefaultStory", "WithoutGroup", "LargeIconWithLongText"],
  parameters: {
    info: { disable: true },
    chromatic: {
      disableSnapshot: true,
    },
  },
  argTypes: {
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    value: {
      control: {
        type: "text",
      },
    },
    allowDeselect: {
      control: {
        type: "boolean",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    size: {
      options: ["small", "medium", "large"],
      control: {
        type: "select",
      },
    },
    buttonIcon: {
      options: ["", "add", "edit", "delete"],
      control: {
        type: "select",
      },
    },
    buttonIconSize: {
      options: ["small", "large"],
      control: {
        type: "select",
      },
    },
  },
};

export const DefaultStory = ({
  children,
  size,
  buttonIcon,
  buttonIconSize,
  ...args
}: Partial<ButtonToggleProps>) => {
  const [value, setValue] = useState<string | undefined>("");
  function onChangeHandler(
    event: React.MouseEvent<HTMLButtonElement>,
    selectedButtonValue?: string,
  ) {
    setValue(selectedButtonValue);
    action("value set")(selectedButtonValue);
  }
  return (
    <ButtonToggleGroup
      id="button-toggle-group"
      label="Button Toggle Group test"
      inputHint="Hint Text"
      onChange={onChangeHandler}
      value={value}
      {...args}
    >
      <ButtonToggle
        value="foo"
        size={size}
        buttonIcon={buttonIcon}
        buttonIconSize={buttonIconSize}
      >
        {children}
      </ButtonToggle>
      <ButtonToggle
        value="bar"
        size={size}
        buttonIcon={buttonIcon}
        buttonIconSize={buttonIconSize}
      >
        Bar
      </ButtonToggle>
      <ButtonToggle
        value="baz"
        size={size}
        buttonIcon={buttonIcon}
        buttonIconSize={buttonIconSize}
      >
        Baz
      </ButtonToggle>
    </ButtonToggleGroup>
  );
};

DefaultStory.story = {
  args: {
    children: "Foo",
    size: "medium",
    buttonIcon: "",
    buttonIconSize: "",
  },
};

export const WithoutGroup = (args: Partial<ButtonToggleProps>) => (
  <div>
    <ButtonToggle
      key="button-toggle-1"
      onFocus={() => action("onFocus")("foo")}
      onBlur={() => action("onBlur")("foo")}
      {...args}
    >
      Foo
    </ButtonToggle>
    <ButtonToggle
      key="button-toggle-2"
      onFocus={() => action("onFocus")("bar")}
      onBlur={() => action("onBlur")("bar")}
      {...args}
    >
      Bar
    </ButtonToggle>
    <ButtonToggle
      key="button-toggle-3"
      onFocus={() => action("onFocus")("baz")}
      onBlur={() => action("onBlur")("baz")}
      {...args}
    >
      Baz
    </ButtonToggle>
  </div>
);

WithoutGroup.storyName = "without group";
WithoutGroup.argTypes = {
  fullWidth: {
    control: false,
  },
  value: {
    control: false,
  },
  allowDeselect: {
    control: false,
  },
  disabled: {
    control: false,
  },
};

export const LargeIconWithLongText = () => {
  return (
    <Box width="135px">
      <ButtonToggleGroup id="button-toggle-group" fullWidth>
        <ButtonToggle
          value="foo"
          size="large"
          buttonIcon="add"
          buttonIconSize="large"
        >
          First button with long text
        </ButtonToggle>
        <ButtonToggle
          value="bar"
          size="large"
          buttonIcon="add"
          buttonIconSize="large"
        >
          Bar
        </ButtonToggle>
        <ButtonToggle
          value="baz"
          size="large"
          buttonIcon="add"
          buttonIconSize="large"
        >
          Baz
        </ButtonToggle>
      </ButtonToggleGroup>
    </Box>
  );
};
LargeIconWithLongText.parameters = {
  chromatic: { disableSnapshot: false },
};
