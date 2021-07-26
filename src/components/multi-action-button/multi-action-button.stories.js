import React from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import MultiActionButton from "./multi-action-button.component";
import Button from "../button";
import {
  MULTI_ACTION_BUTTON_ALIGNMENTS,
  MULTI_ACTION_BUTTON_SIZES,
  MULTI_ACTION_BUTTON_THEMES,
} from "./multi-action-button.config";

export default {
  title: "Multi Action Button/Test",
  component: MultiActionButton,
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

const getKnobs = () => {
  return {
    align: select(
      "align",
      MULTI_ACTION_BUTTON_ALIGNMENTS,
      MULTI_ACTION_BUTTON_ALIGNMENTS[0]
    ),
    buttonType: select(
      "buttonType",
      MULTI_ACTION_BUTTON_THEMES,
      Button.defaultProps.as
    ),
    disabled: boolean("disabled", Button.defaultProps.disabled),
    onClick: (ev) => action("click")(ev),
    size: select("size", MULTI_ACTION_BUTTON_SIZES, Button.defaultProps.size),
    subtext: text("subtext", Button.defaultProps.subtext),
    textContent: text("text", "Example Multi Action Button"),
  };
};

export const Default = () => {
  const knobs = getKnobs();
  const { buttonType, textContent, subtext, ...menuButtonProps } = knobs;

  return (
    <MultiActionButton
      buttonType={buttonType}
      text={textContent}
      subtext={subtext}
      {...menuButtonProps}
    >
      <Button {...menuButtonProps}>Example Button</Button>
      <Button {...menuButtonProps}>Example Button with long text</Button>
      <Button {...menuButtonProps}>Short</Button>
    </MultiActionButton>
  );
};

Default.story = {
  name: "default",
};
