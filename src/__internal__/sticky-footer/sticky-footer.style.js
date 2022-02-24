import styled, { css, keyframes } from "styled-components";

const FormButtonAnimation = keyframes`
  0%   { transform: translateY(50px); }
  100% { transform: translateY(0px); }
`;

const StyledStickyFooter = styled.div`
  padding: var(--spacing200) var(--spacing400);
  box-sizing: border-box;
  width: 100%;
  ${({ sticky }) =>
    sticky &&
    css`
      animation: ${FormButtonAnimation} 0.25s ease;
      position: sticky;
      bottom: 0;
      left: 0;
      background-color: var(--colorsComponentsNavigationYang100);
      box-shadow: var(--boxShadow150);
      z-index: 1000;
    `}
`;

export default StyledStickyFooter;
