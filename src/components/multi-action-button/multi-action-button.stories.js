import React from "react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import MultiActionButton from "./multi-action-button.component";
import Button from "../button";
import OptionsHelper from "../../utils/helpers/options-helper";

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
      OptionsHelper.alignBinary,
      OptionsHelper.alignBinary[0]
    ),
    buttonType: select(
      "buttonType",
      OptionsHelper.themesBinary,
      Button.defaultProps.as
    ),
    disabled: boolean("disabled", Button.defaultProps.disabled),
    onClick: (ev) => action("click")(ev),
    size: select(
      "size",
      OptionsHelper.sizesRestricted,
      Button.defaultProps.size
    ),
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
