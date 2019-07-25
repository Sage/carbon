import styled, { css } from 'styled-components';

const SlideStyle = styled.div`
${props => console.log(props)}
  box-sizing: border-box;
  display: inline-block;
  
  /* width: 100%; //legacy */
  z-index: 10;
  //DLS
  transition: .5s;
  min-width: 80%;
  transform: scale(.9);
  opacity: 0.3;
  margin: 30px 0;
  ${({ id, selectedIndex }) => id === selectedIndex && css`
    transform: scale(1);
    opacity: 1;
  `}


  ${({ isPadded }) => isPadded && css`
    padding: 0 60px;
  `}
`;

// eslint-disable-next-line import/prefer-default-export
export { SlideStyle };
