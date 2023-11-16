import styled from "styled-components";
import { margin, MarginProps, position, PositionProps } from "styled-system";
import baseTheme from "../../style/themes/base";

const StyledHr = styled.hr<MarginProps & { width: string } & PositionProps>`
  ${margin}
  ${position}
  ${({ width }) => `width: ${width};`}
  border: 0;
  height: 1px;
  background: var(--colorsUtilityMajor100);
`;

StyledHr.defaultProps = {
  theme: baseTheme,
};

export default StyledHr;
