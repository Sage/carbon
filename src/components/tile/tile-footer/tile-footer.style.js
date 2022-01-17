import styled, { css } from "styled-components";
import { padding } from "styled-system";
import { baseTheme } from "../../../style/themes";

const StyledTileFooter = styled.div`
  ${padding}

  ${({ variant }) => css`
    background: ${variant === "transparent"
      ? "transparent"
      : "var(--colorsUtilityMajor025)"};
    border-top: 1px solid var(--colorsUtilityMajor100);
  `}
`;

StyledTileFooter.defaultProps = {
  theme: baseTheme,
};

export default StyledTileFooter;
