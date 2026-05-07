import styled, { css } from "styled-components";
import { space } from "styled-system";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { TypographyProps } from "./typography.component";
import Typography from "./__internal__/__next__";
import visuallyHidden from "../../style/utils/visually-hidden";

const StyledTypography = styled(Typography).attrs(
  applyBaseTheme,
)<TypographyProps>`
  ${({ fontSize, fontWeight, lineHeight, variant, screenReaderOnly }) => {
    const defaultMargin =
      variant === "p" ? "0 0 var(--global-space-comp-l)" : "0";
    return css`
      ${fontSize && `font-size: ${fontSize};`}
      ${fontWeight && `font-weight: ${fontWeight};`}
      ${lineHeight && `line-height: ${lineHeight};`}
      margin: ${defaultMargin};
      ${screenReaderOnly && visuallyHidden}
    `;
  }}
  ${space}
`;

StyledTypography.displayName = "Typography";

export default StyledTypography;
