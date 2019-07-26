import styled, { css } from 'styled-components';
import { isClassic } from '../../../utils/helpers/style-helper';

const SlideStyle = styled.div`
  box-sizing: border-box;
  display: inline-block;
  
  width: 100%;
  z-index: 10;

  ${({ theme }) => !isClassic(theme) && css`
    transition: .5s;
    min-width: 80%;
    transform: scale(.9);
    opacity: 0.3;
    margin: 30px 0;

    ${({ id, selectedIndex }) => id === selectedIndex && css`
      transform: scale(1);
      opacity: 1;

      ${({ onClick }) => onClick && css`
        :hover{
          transition: all 0.2s ease-in;
          transform: scale(1.02);
          cursor: pointer;
        }
      `}
    `}
  `}

  ${({ isPadded }) => isPadded && css`
    padding: 0 60px;
  `}
`;

// eslint-disable-next-line import/prefer-default-export
export { SlideStyle };
