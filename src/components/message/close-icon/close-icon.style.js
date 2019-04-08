import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import OptionsHelper from '../../../utils/helpers/options-helper';
import CloseIconClassicStyling from './close-icon-classic.style';

const CloseIconStyle = styled.button`
  align-items: center;
  display: flex;
  margin-left: auto;
  justify-content: center;
  text-align: center;
  padding: 0 15px;
  width: 45px;
  border: none;
  color: ${({ messageType, theme }) => theme.colors[messageType]}};
  span {
    cursor: pointer;
    &:before {
      font-size: 16px;
      display: block;
    }
  }

  &:focus {
    outline: none;
    span {
      &:before {
        padding: 5px;
        border: 2px solid ${({ theme }) => theme.colors.focus};
      }
    }
  }

  ${CloseIconClassicStyling}
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

export default CloseIconStyle;
