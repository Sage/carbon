import React from "react";
import { SpaceProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
} from "../../style/utils";
import StyledTypography from "./typography.style";

export const VARIANT_TYPES = [
  "h1-large",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "segment-header",
  "segment-header-small",
  "segment-subheader",
  "segment-subheader-alt",
  "p",
  "span",
  "small",
  "big",
  "sup",
  "sub",
  "strong",
  "b",
  "em",
  "ul",
  "ol",
] as const;

export type VariantTypes = (typeof VARIANT_TYPES)[number];

export interface TypographyProps extends SpaceProps, TagProps {
  /** Override the variant component */
  as?: React.ElementType;
  /** Set the ID attribute of the Typography component */
  id?: string;
  /** Content to be rendered inside the Typography component */
  children?: React.ReactNode;
  /** The visual style to apply to the component */
  variant?: VariantTypes;
  /** Override the variant font-size */
  fontSize?: string;
  /** Override the variant font-weight */
  fontWeight?: string;
  /** Override the variant line-height */
  lineHeight?: string;
  /** Override the variant text-transform */
  textTransform?: string;
  /** Override the variant text-decoration */
  textDecoration?: string;
  /** Override the variant display */
  display?: string;
  /** Override the list-style-type */
  listStyleType?: string;
  /** Override the white-space */
  whiteSpace?: string;
  /** Override the word-break */
  wordBreak?: string;
  /** Override the word-wrap */
  wordWrap?: string;
  /** Override the text-align */
  textAlign?: string;
  /** Override the text-overflow */
  textOverflow?: string;
  /** Apply truncation */
  truncate?: boolean;
  /** Override the color style */
  color?: string;
  /** Override the backgroundColor style */
  backgroundColor?: string;
  /** Override the bg value shorthand for backgroundColor */
  bg?: string;
  /** Override the opacity value */
  opacity?: string | number;
  /** Set whether it will be visually hidden
   * NOTE: This is for screen readers only and will make a lot of the other props redundant */
  screenReaderOnly?: boolean;
  /**
   * @private
   * @ignore
   * Override the default color of the rendered element to match disabled styling
   * */
  isDisabled?: boolean;
  /** @private @ignore Set whether the component should be recognised by assistive technologies */
  "aria-hidden"?: "true" | "false";
  /**
   * @private
   * @internal
   * @ignore
   * Sets className for component. INTERNAL USE ONLY. */
  className?: string;
}

export const Typography = ({
  "data-component": dataComponent,
  variant = "p",
  as,
  id,
  fontSize,
  fontWeight,
  textTransform,
  lineHeight,
  textDecoration,
  display,
  listStyleType,
  whiteSpace,
  wordBreak,
  wordWrap,
  textAlign,
  textOverflow,
  truncate,
  color = "blackOpacity90",
  backgroundColor,
  bg,
  opacity,
  children,
  screenReaderOnly,
  isDisabled,
  "aria-hidden": ariaHidden,
  className,
  ...rest
}: TypographyProps) => {
  return (
    <StyledTypography
      variant={variant}
      as={as}
      id={id}
      fontSize={fontSize}
      fontWeight={fontWeight}
      textTransform={textTransform}
      lineHeight={lineHeight}
      textDecoration={textDecoration}
      display={display}
      listStyleType={listStyleType}
      whiteSpace={whiteSpace}
      wordWrap={wordWrap}
      wordBreak={wordBreak}
      textAlign={textAlign}
      textOverflow={textOverflow}
      truncate={truncate}
      color={color}
      backgroundColor={backgroundColor}
      bg={bg}
      opacity={opacity}
      screenReaderOnly={screenReaderOnly}
      isDisabled={isDisabled}
      aria-hidden={ariaHidden}
      className={className}
      {...tagComponent(dataComponent, rest)}
      {...filterStyledSystemMarginProps(rest)}
      {...filterStyledSystemPaddingProps(rest)}
    >
      {children}
    </StyledTypography>
  );
};

Typography.displayName = "Typography";

export default Typography;
