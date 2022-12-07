import { padding as paddingFn, PaddingProps } from "styled-system";

import {
  HORIZONTAL_PADDING,
  CONTENT_TOP_PADDING,
  CONTENT_BOTTOM_PADDING,
} from "../../components/dialog/dialog.config";
import {
  SIDEBAR_TOP_SPACING,
  SIDEBAR_BOTTOM_SPACING,
  SIDEBAR_LEFT_PADDING,
  SIDEBAR_RIGHT_PADDING,
} from "../../components/sidebar/sidebar.config";

interface PaddingValues {
  paddingTop: string;
  paddingBottom: string;
  paddingLeft: string;
  paddingRight: string;
  padding: string;
}

type ContainerComponent = "dialog" | "sidebar";

const parsePadding = (paddingString: string) => {
  const paddingValues = paddingString.split(/\s+/);
  let paddingTop, paddingBottom, paddingLeft, paddingRight;
  switch (paddingValues.length) {
    case 1: {
      const [value] = paddingValues;
      [paddingTop, paddingRight, paddingBottom, paddingLeft] = [
        value,
        value,
        value,
        value,
      ];
      break;
    }
    case 2: {
      const [vertical, horizontal] = paddingValues;
      [paddingTop, paddingRight, paddingBottom, paddingLeft] = [
        vertical,
        horizontal,
        vertical,
        horizontal,
      ];
      break;
    }
    case 3: {
      const [top, horizontal, bottom] = paddingValues;
      [paddingTop, paddingRight, paddingBottom, paddingLeft] = [
        top,
        horizontal,
        bottom,
        horizontal,
      ];
      break;
    }
    case 4: {
      [paddingTop, paddingRight, paddingBottom, paddingLeft] = paddingValues;
      break;
    }
    /* istanbul ignore next */
    default:
      break;
  }
  return { paddingTop, paddingBottom, paddingLeft, paddingRight };
};

const calculatePadding = (props: PaddingProps): Partial<PaddingValues> => {
  const {
    padding,
    ...individualPaddingProperties
  }: Partial<PaddingValues> = paddingFn(props);
  const result = padding ? parsePadding(padding) : {};
  Object.assign(result, individualPaddingProperties);
  return result;
};

export const calculateWidthValue = (props: PaddingProps) => {
  const { paddingLeft, paddingRight } = calculatePadding(props);
  const paddingValue = `(${paddingLeft ?? `${HORIZONTAL_PADDING}px`} + ${
    paddingRight ?? `${HORIZONTAL_PADDING}px`
  })`;

  return `width: calc(100% + ${paddingValue});`;
};

export const calculateFormSpacingValues = (
  props: PaddingProps,
  isFormContent: boolean,
  containerComponent: ContainerComponent = "dialog"
) => {
  const {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  } = calculatePadding(props);

  const isSidebar = containerComponent === "sidebar";

  const spacingTopValue =
    paddingTop ??
    (isSidebar ? SIDEBAR_TOP_SPACING : `${CONTENT_TOP_PADDING}px`);
  const spacingRightValue = paddingRight ?? `${HORIZONTAL_PADDING}px`;
  const spacingBottomValue =
    paddingBottom ??
    (isSidebar ? SIDEBAR_BOTTOM_SPACING : `${CONTENT_BOTTOM_PADDING}px`);
  const spacingLeftValue = paddingLeft ?? `${HORIZONTAL_PADDING}px`;

  const setNegativeValue = (value: string) => `calc(-1 * ${value})`;

  return {
    "margin-left": setNegativeValue(spacingLeftValue),
    "margin-right": setNegativeValue(spacingRightValue),

    ...(isFormContent
      ? {
          "margin-top": setNegativeValue(spacingTopValue),
          "padding-top": spacingTopValue,
          "padding-bottom": isSidebar ? undefined : spacingBottomValue,
          "padding-left": spacingLeftValue,
          "padding-right": spacingRightValue,
        }
      : {
          "margin-bottom": setNegativeValue(spacingBottomValue),
          ...(isSidebar && {
            // if footer already has custom padding do not set
            ":not(.padded)": {
              "padding-left": SIDEBAR_LEFT_PADDING,
              "padding-right": SIDEBAR_RIGHT_PADDING,
            },
          }),
        }),
  };
};
