import styled, { css } from "styled-components";

const SlideStyle = styled.div`
  ${({ onClick }) => css`
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    z-index: 10;
    border-radius: var(--borderRadius100);

    transition: 0.5s;
    min-width: 80%;
    transform: scale(0.9);
    opacity: 0.3;
    margin: 30px 0;
    box-shadow: var(--boxShadow200);
    background-color: var(--colorsUtilityYang100);

    ${onClick &&
    css`
      :hover {
        border-radius: 8px;
        transition: all 0.2s ease-in;
        transform: scale(1.02);
        cursor: pointer;
      }
    `}
  `}
`;

// eslint-disable-next-line import/prefer-default-export
export { SlideStyle };
