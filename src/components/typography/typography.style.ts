import styled, { css } from "styled-components";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { TypographyProps } from "./typography.component";
import Typography from "./__internal__/__next__";

const StyledTypography = styled(Typography).attrs(({ className, ...rest }) => {
  return applyBaseTheme(rest);
})<TypographyProps>`
  ${({ fontSize, fontWeight, lineHeight }) => {
    return css`
      ${fontSize && `font-size: ${fontSize};`}
      ${fontWeight && `font-weight: ${fontWeight};`}
      ${lineHeight && `line-height: ${lineHeight};`}
    `;
  }}
`;

StyledTypography.displayName = "Typography";

export default StyledTypography;
