import styled, { css } from "styled-components";
import { DividerProps } from "./divider.component";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { margin, space } from "styled-system";

type ColorMapProps = {
  variant: DividerProps["variant"];
  inverse: DividerProps["inverse"];
};

type ColorMap = ({ variant, inverse }: ColorMapProps) => string;

const colorMap: ColorMap = ({ variant, inverse }) => {
  if (variant === "prominent") {
    if (inverse) {
      return "#777777";
    }

    return "#4B4B4B";
  }

  if (inverse) {
    return "#4B4B4B";
  }
  return "#E8E8E8";
};

const StyledVerticalDividerWrapper = styled.div.attrs(
  applyBaseTheme,
)<DividerProps>`
  ${space}
  ${({ height }) =>
    height &&
    css`
      height: ${typeof height === "string" ? `${height}` : `${height}px`};
    `}
  ${({ displayInline }) => (displayInline ? "display: inline;" : "")}
`;

const StyledVerticalDivider = styled.div.attrs(applyBaseTheme)<
  Pick<DividerProps, "variant" | "inverse">
>`
  height: 100%;
  border-left: 1px solid
    ${({ variant, inverse }) => colorMap({ variant, inverse })};
  display: inherit;
`;

const StyledHorizontalDivider = styled.hr.attrs(applyBaseTheme)<DividerProps>`
  ${margin}
  width: 100%;
  border: 0;
  height: 1px;
  background-color: ${({ variant, inverse }) => colorMap({ variant, inverse })};
`;

export {
  StyledVerticalDividerWrapper,
  StyledVerticalDivider,
  StyledHorizontalDivider,
};
