import { StyledComponentProps } from "styled-components";
import { SpacingProps, ColorProps } from "../../utils/helpers/options-helper";

export interface TypographyProps extends SpacingProps, ColorProps {
  /** Override the variant component */
  as?: string;
  /** The visual style to apply to the component */
  variant?:
    | "h1-large"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "segment-header"
    | "segment-header-small"
    | "segment-subheader"
    | "segment-subheader-alt"
    | "p"
    | "small"
    | "big"
    | "sup"
    | "sub"
    | "strong"
    | "b"
    | "em";
  /** Override the variant font-size */
  fontsize?: string;
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
}

declare function Typography(attrs: StyledComponentProps<"div", {}, TypographyProps, "">): JSX.Element;

export default Typography;
