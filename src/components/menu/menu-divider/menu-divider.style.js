import styled, { css } from "styled-components";
import menuConfigVariants from "../menu.config";

const StyledDivider = styled.div`
  cursor: default;
  ${({ menuType, size }) => css`
    margin: 0px ${size === "large" ? "" : "16px"};
    height: ${size === "large" ? "4px" : "1px"};
    background-color: ${menuConfigVariants[menuType].divider};
  `}
`;

export default StyledDivider;
