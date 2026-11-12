import styled, { css } from "styled-components";

export const StyledTabs = styled.div<{
  $orientation?: "horizontal" | "vertical";
}>`
  display: flex;
  ${({ $orientation }) => css`
    flex-direction: ${$orientation === "horizontal" ? "column" : "row"};
  `}
`;

export const StyledTabProvider = styled.div<{
  visible: boolean;
}>`
  ${({ visible }) => css`
    display: ${visible ? "block" : "none"};
  `}
`;
