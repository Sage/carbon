import React from "react";
import { text, boolean, select } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

import SplitButton from "./split-button.component";
import OptionsHelper from "../../utils/helpers/options-helper";
import Button from "../button";
import Box from "../box";

export default {
  title: "Split Button/Test",
  component: SplitButton,
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

const getIconKnobs = () => {
  const defaultPosition = Button.defaultProps.iconPosition;
  const hasIcon = boolean("has icon", false);

  return {
    iconType: hasIcon
      ? select("iconType", [...OptionsHelper.icons, ""], "")
      : undefined,
    iconPosition: hasIcon
      ? select(
          "iconPosition",
          [...OptionsHelper.buttonIconPositions],
          defaultPosition
        )
      : undefined,
  };
};

const getKnobs = () => {
  return {
    buttonType: select(
      "buttonType",
      OptionsHelper.themesBinary,
      Button.defaultProps.as
    ),
    dataElement: text("data-element"),
    dataRole: text("data-role"),
    disabled: boolean("disabled", Button.defaultProps.disabled),
    onClick: (ev) => action("click")(ev),
    size: select(
      "size",
      OptionsHelper.sizesRestricted,
      Button.defaultProps.size
    ),
    align: select(
      "align",
      OptionsHelper.alignBinary,
      SplitButton.defaultProps.align
    ),
    textContent: text("text", "Example Split Button"),
    subtext: text("subtext", Button.defaultProps.subtext),
  };
};

export const Default = () => {
  const knobs = getKnobs();
  const {
    buttonType,
    dataElement,
    dataRole,
    textContent,
    subtext,
    ...menuButtonProps
  } = knobs;
  return (
    <Box height={400} mt={100} ml={100}>
      <SplitButton
        buttonType={buttonType}
        data-element={dataElement}
        data-role={dataRole}
        text={textContent}
        subtext={subtext}
        {...getIconKnobs()}
        {...menuButtonProps}
      >
        <Button {...menuButtonProps}>Example Button</Button>
        <Button {...menuButtonProps}>Example Button with long text</Button>
        <Button {...menuButtonProps}>Short</Button>
      </SplitButton>
    </Box>
  );
};

Default.story = {
  name: "default",
};
