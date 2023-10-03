import { PaddingProps } from "styled-system";
import {
  paddingNames,
  paddingLeftPropertyNames,
  paddingRightPropertyNames,
  paddingBottomPropertyNames,
  paddingTopPropertyNames,
  paddingXPropertyNames,
  paddingYPropertyNames,
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
const CONTENT_PADDING_TOP_KEYS = [
  ...paddingTopPropertyNames,
  ...paddingYPropertyNames,
  ...paddingNames,
];
const CONTENT_PADDING_BOTTOM_KEYS = [
  ...paddingBottomPropertyNames,
  ...paddingYPropertyNames,
  ...paddingNames,
];

export default (paddingProps: PaddingProps, isHorizontal: boolean) => {
  const getPaddingProps = (paddingKeys: (keyof PaddingProps)[]) => {
    const key = paddingKeys.find((propName) => paddingProps[propName]);

    /* istanbul ignore if */
    if (!key) {
      return key;
    }

    return paddingProps[key];
  };

  return isHorizontal
    ? {
        pr: getPaddingProps(CONTENT_PADDING_LEFT_KEYS),
        pl: getPaddingProps(CONTENT_PADDING_RIGHT_KEYS),
      }
    : {
        pt: getPaddingProps(CONTENT_PADDING_TOP_KEYS),
        pb: getPaddingProps(CONTENT_PADDING_BOTTOM_KEYS),
      };
};
