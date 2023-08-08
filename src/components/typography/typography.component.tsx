import React from "react";
import { SpaceProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";
import {
  filterStyledSystemMarginProps,
  filterStyledSystemPaddingProps,
} from "../../style/utils";
import StyledTypography from "./typography.style";

const VARIANT_TYPES = [
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
export type VariantTypes = typeof VARIANT_TYPES[number];
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
  /** Override the word-wrap */
  wordWrap?: string;
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
  /** @private @ignore */
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
  wordWrap,
  textOverflow,
  truncate,
  color = "blackOpacity90",
  backgroundColor,
  bg,
  opacity,
  children,
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
      textOverflow={textOverflow}
      truncate={truncate}
      color={color}
      backgroundColor={backgroundColor}
      bg={bg}
      opacity={opacity}
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
