import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';
import CloseIconClassicStyling from './close-icon-classic.style';
import Link from '../../link';
import { THEMES } from '../../../style/themes';

const CloseIconStyle = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
  margin-right: 15px;
  justify-content: center;
  text-align: center;
  border: none;

  .icon-close {
    &:before {
      color: ${({ messageType, theme }) => theme.colors[messageType]}};
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

CloseIconStyle.defaultProps = {
  messageType: 'info',
  roundedCorners: true,
  theme: BaseTheme,
  transparent: false
};

CloseIconStyle.propTypes = {
  messageType: PropTypes.oneOf(OptionsHelper.messages),
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export { CloseIconStyle, LinkStyle };
