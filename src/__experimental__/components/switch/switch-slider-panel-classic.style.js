import { css } from 'styled-components';
import { isClassic } from '../../../utils/helpers/style-helper';
import { StyledIcon } from '../../../components/icon/icon.style';

export default ({ loading, theme }) => isClassic(theme) && css`
  margin-top: 5px;

  ${StyledIcon} {
    color: ${theme.colors.white};
  }

  &[type='off'] {
    margin-right: 9px;
    color: ${theme.colors.white};

    ${loading && css`
      margin-right: 3px;
    `}
  }
`;
