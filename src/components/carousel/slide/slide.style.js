import styled, { css } from 'styled-components';

const SlideStyle = styled.div`
  box-sizing: border-box;
  display: inline-block;
  /* width: 100%; //legacy */
  z-index: 10;
  //DLS
  min-width: 680px;
  max-width: 680px;
  height: 400px;
  box-shadow:0 10px 30px 0 rgba(0,20,29,0.1), 0 30px 60px 0 rgba(0,20,29,0.1);
  transform: scale(.9);


  ${({ isPadded }) => isPadded && css`
    padding: 0 60px;
  `}
`;

// eslint-disable-next-line import/prefer-default-export
export { SlideStyle };
