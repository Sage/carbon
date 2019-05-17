import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../style/themes/base';
import OptionsHelper from '../../utils/helpers/options-helper';
import CloseIconClassicStyling from './dismiss-button-classic.style';
import Link from '../link';
import { THEMES } from '../../style/themes';

const DismissButtonStyle = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
  margin-right: 15px;
  justify-content: center;
  text-align: center;
  border: none;

  .icon-close {
    &:before {
      color: ${({ variant, theme }) => theme.colors[variant]};
    }
  }

  ${({ theme }) => theme.name !== THEMES.classic && css`
    .message__close-icon {
      &:focus {
        outline: none;
        background-color: ${theme.colors.white};
        span span {
          &:before {
            outline: 2px solid ${theme.colors.focus};
            outline-offset: 3px;
          }
        }
      }
    }
  `}

  ${CloseIconClassicStyling}
`;

const LinkStyle = styled(Link)`
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
  variant: PropTypes.oneOf(OptionsHelper.messages),
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export { DismissButtonStyle, LinkStyle };
