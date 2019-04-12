import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';
import CloseIconClassicStyling from './close-icon-classic.style';
import Link from '../../link';

const CloseIconStyle = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
  margin-right: 15px;
  justify-content: center;
  text-align: center;
  border: none;
  color: ${({ messageType, theme }) => theme.colors[messageType]}};

  ${CloseIconClassicStyling}
`;

const LinkStyle = styled(Link)`
  .carbon-link__content {
    display: none;
  }
  .carbon-link__icon {
    margin-right: 0;
  }

  &:focus {
    outline: none;
    span span {
      &:before {
        outline: 2px solid ${({ theme }) => theme.colors.focus};
        outline-offset: 3px;
      }
    }
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

LinkStyle.defaultProps = {
  theme: BaseTheme
};

export { CloseIconStyle, LinkStyle };
