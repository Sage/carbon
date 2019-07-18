import styled, { css } from 'styled-components';

const SlideStyle = styled.div`
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
  z-index: 10;

  ${({ isPadded }) => isPadded && css`
    padding: 0 60px;
  `}
`;

// eslint-disable-next-line import/prefer-default-export
export { SlideStyle };
