import styled, { css } from "styled-components";
import menuConfigVariants from "../menu.config";

const StyledTitle = styled.div`
  ${({ menuType, variant }) => css`
    padding: 16px 16px 8px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    line-height: 12px;
    cursor: default;
    color: ${menuConfigVariants[menuType].title};
    ${variant === "alternate" &&
    `background-color: ${menuConfigVariants[menuType].alternate};`};
  `}
`;

export default StyledTitle;
