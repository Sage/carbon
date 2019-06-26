import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../style/themes/base';
import OptionsHelper from '../../utils/helpers/options-helper';
import CloseIconClassicStyling from './dismiss-button-classic.style';
import Link from '../link';
import { THEMES } from '../../style/themes';

const DismissButtonStyle = styled.div`
  border: none;
  margin-top: -10px;
  position: absolute;
  right: 16px;
  top: 50%;

  .icon-close {
    &:before {
      color: ${({ theme }) => theme.colors.border};
    }

    &:hover:before{
      color: ${({ theme }) => theme.colors.focusedIcon};
    }
  }

  ${CloseIconClassicStyling}
`;

const LinkStyle = styled(Link)`
  ${({ theme }) => theme.name !== THEMES.classic && css`
    &:focus {
      outline: none;
      background-color: transparent;
      span span {
        &:before {
          outline: 2px solid ${theme.colors.focus};
          outline-offset: 3px;
        }
      }
    }
`}

  .carbon-link__content {
    display: none;
  }

  .carbon-link__icon {
    margin-right: 0;
  }
`;

DismissButtonStyle.defaultProps = {
  variant: 'info',
  roundedCorners: true,
  theme: BaseTheme,
  transparent: false
};

DismissButtonStyle.propTypes = {
  variant: PropTypes.oneOf(OptionsHelper.colors),
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

LinkStyle.defaultProps = {
  theme: BaseTheme
};

export { DismissButtonStyle, LinkStyle };
