import React from "react";
import Button from "../button";
import {
  BUTTON_BAR_ICON_POSITIONS,
  BUTTON_BAR_SIZES,
} from "./button-bar.config";
import ButtonBar from ".";

export default {
  component: ButtonBar,
  title: "Design System/Button Bar/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: false,
    },
    knobs: { escapeHTML: false },
  },
};

export const generateButtonBarsWithDifferentIconPositionsAndSizes = () => {
  return (
    <>
      {BUTTON_BAR_ICON_POSITIONS.map((iconPosition) => (
        <React.Fragment key={iconPosition}>
          {BUTTON_BAR_SIZES.map((size) => (
            <ButtonBar
              key={size}
              iconPosition={iconPosition}
              size={size}
              ml={2}
              mt={2}
            >
              <Button iconType="pdf">{iconPosition}</Button>
              <Button iconType="csv">{iconPosition}</Button>
            </ButtonBar>
          ))}
        </React.Fragment>
      ))}
    </>
  );
};
