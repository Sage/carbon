import React from "react";
import { withKnobs, boolean, select, number } from "@storybook/addon-knobs";
import OptionsHelper from "../../utils/helpers/options-helper/options-helper";
import BatchSelection from ".";
import IconButton from "../icon-button";
import Icon from "../icon";

export default {
  title: "Design System/Batch Selection/Test",
  component: BatchSelection,
  decorators: [withKnobs],
  parameters: {
    chromatic: {
      disable: true,
    },
  },
};

export const basic = () => {
  const props = {
    disabled: boolean("disabled", false),
    hidden: boolean("hidden", false),
    selectedCount: number("selectedCount", 0),
    colorTheme: select(
      "colorTheme",
      [...OptionsHelper.flatTableThemes],
      "transparent"
    ),
  };

  return (
    <BatchSelection {...props}>
      <IconButton onAction={() => {}}>
        <Icon type="csv" />
      </IconButton>
      <IconButton onAction={() => {}}>
        <Icon type="bin" />
      </IconButton>
      <IconButton onAction={() => {}}>
        <Icon type="pdf" />
      </IconButton>
    </BatchSelection>
  );
};

basic.story = {
  name: "Basic",
  parameters: {
    info: { disable: true },
    docs: {
      page: null,
    },
    chromatic: {
      disable: true,
    },
  },
};
