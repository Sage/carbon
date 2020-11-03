import React from "react";
import { text, select } from "@storybook/addon-knobs";
import StepSequenceItem from "./step-sequence-item.component";
import OptionsHelper from "../../../utils/helpers/options-helper/options-helper";

export default {
  title: "Step Sequence/Test",
  component: StepSequenceItem,
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

export const stepSequenceItem = () => {
  const indicator = text("indicator", "1");
  const status = select(
    "status",
    OptionsHelper.steps,
    StepSequenceItem.defaultProps.status
  );
  const hiddenCompleteLabel = text("hiddenCompleteLabel");
  const hiddenCurrentLabel = text("hiddenCurrentLabel");
  const ariaLabel = text("ariaLabel", "Step 1 of 5");
  const children = text("children", "Step Label");

  return (
    <StepSequenceItem
      aria-label={ariaLabel}
      indicator={indicator}
      status={status}
      hiddenCompleteLabel={hiddenCompleteLabel}
      hiddenCurrentLabel={hiddenCurrentLabel}
    >
      {children}
    </StepSequenceItem>
  );
};
