import { css } from 'styled-components';
import { isClassic } from '../../../utils/helpers/style-helper';

export default ({
  checked, isLoading, theme
}) => isClassic(theme) && css`
  background-color: #003349;
  border-radius: 24px;
  height: 28px;
  width: 55px;

  &::before {
    border-radius: 50%;
    box-shadow: 0 2px 3px 0 rgba(0,0,0,.3);
    height: 23px;
    top: 2px;
    transition: transform .25s ease;
    width: 23px;
  }

  ${checked && `
    background-color: ${theme.colors.baseBlue};

    &::before {
        transform: translateX(28px);
      }
  `}

  ${isLoading && `
    opacity: 0.6;
  `}
`;
