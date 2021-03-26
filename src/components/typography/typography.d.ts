import { StyledComponentProps } from "styled-components";
import { SpacingProps, ColorProps } from "../../utils/helpers/options-helper";

export interface TypographyProps extends SpacingProps, ColorProps {
  as?: string;
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
  fontsize?: string;
  fontWeight?: string;
  lineHeight?: string;
  textTransform?: string;
  textDecoration?: string;
  display?: string;
  listStyleType?: string;
}

declare function Typography(attrs: StyledComponentProps<"div", {}, TypographyProps, "">): JSX.Element;

export default Typography;
