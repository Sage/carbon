import { css } from 'styled-components';
import { THEMES } from '../../../style/themes';
import { StyledIcon } from '../../../components/icon/icon.style';

export default ({ loading, theme }) => theme.name === THEMES.classic && css`
  margin-top: 5px;

  ${StyledIcon} {
    color: ${theme.colors.white};
  }

  &[type='off'] {
    margin-right: 9px;
    color: ${theme.colors.white};

    ${loading && `
    margin-right: 3px;
  `}
  }
`;
