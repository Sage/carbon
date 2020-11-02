import styled, { css } from "styled-components";
import baseTheme from "../../../style/themes/base";

const SlideStyle = styled.div`
  ${({ theme, onClick, id, selectedIndex }) => css`
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    z-index: 10;

    ${theme &&
    css`
      transition: 0.5s;
      min-width: 80%;
      transform: scale(0.9);
      opacity: 0.3;
      margin: 30px 0;
      box-shadow: ${theme.shadows.depth2};

      ${id === selectedIndex &&
      css`
        transform: scale(1);
        opacity: 1;

        ${onClick &&
        css`
          :hover {
            transition: all 0.2s ease-in;
            transform: scale(1.02);
            cursor: pointer;
          }
        `}
      `}
    `}
  `}
`;

SlideStyle.defaultProps = {
  theme: baseTheme,
};

// eslint-disable-next-line import/prefer-default-export
export { SlideStyle };
