import styled, { css, keyframes } from "styled-components";
import baseTheme from "../../style/themes/base";

const FormButtonAnimation = keyframes`
  0%   { transform: translateY(50px); }
  100% { transform: translateY(0px); }
`;

const StyledStickyFooter = styled.div`
  ${({ sticky, theme }) => css`
    ${sticky &&
    css`
      animation: ${FormButtonAnimation} 0.25s ease;
      position: sticky;
      width: 100%;
      bottom: 0;
      left: 0;
      background-color: ${theme.colors.white};
      box-shadow: 0 -4px 12px rgba(153, 173, 182, 0.05);
      z-index: 1000;
    `}
  `}
`;

StyledStickyFooter.defaultProps = {
  theme: baseTheme,
};

export default StyledStickyFooter;
