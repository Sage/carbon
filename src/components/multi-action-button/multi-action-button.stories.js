import React from "react";
import { storiesOf } from "@storybook/react";
import { text, select, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import MultiActionButton from "./multi-action-button.component";
import Button from "../button";
import OptionsHelper from "../../utils/helpers/options-helper";
import { notes, info } from "./documentation";
import getDocGenInfo from "../../utils/helpers/docgen-info";

MultiActionButton.__docgenInfo = getDocGenInfo(
  require("./docgenInfo.json"),
  /multi-action-button\.component(?!spec)/
);

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

storiesOf("Multi Action Button", module).add(
  "default",
  () => {
    const props = getKnobs();
    const { buttonType, textContent, subtext, ...menuButtonProps } = props;

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
  },
  {
    info: { text: info, propTablesExclude: [Button] },
    notes: { markdown: notes },
    knobs: { escapeHTML: false },
  }
);
