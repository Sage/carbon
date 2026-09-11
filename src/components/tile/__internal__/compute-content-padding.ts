import { PaddingProps } from "styled-system";
import {
  paddingNames,
  paddingLeftPropertyNames,
  paddingRightPropertyNames,
  paddingXPropertyNames,
} from "../../../style/utils/filter-styled-system-padding-props";

const CONTENT_PADDING_LEFT_KEYS = [
  ...paddingLeftPropertyNames,
  ...paddingXPropertyNames,
  ...paddingNames,
];
const CONTENT_PADDING_RIGHT_KEYS = [
  ...paddingRightPropertyNames,
  ...paddingXPropertyNames,
  ...paddingNames,
];

export default (paddingProps: PaddingProps) => {
  const getPaddingProps = (paddingKeys: (keyof PaddingProps)[]) => {
    const key = paddingKeys.find((propName) => paddingProps[propName]);

    /* istanbul ignore if */
    if (!key) {
      return key;
    }

    return paddingProps[key];
  };

  return {
    pr: getPaddingProps(CONTENT_PADDING_LEFT_KEYS),
    pl: getPaddingProps(CONTENT_PADDING_RIGHT_KEYS),
  };
};
