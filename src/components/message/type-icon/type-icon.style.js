/* eslint-disable max-len */
import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import { THEMES } from '../../../style/themes';
import OptionsHelper from '../../../utils/helpers/options-helper';
import typeIconClassicStyle from './type-icon-classic.style';

const TypeIconStyle = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  text-align: center;
  padding: 0 7px;
  ${({ theme, transparent, messageType }) => (theme.name !== THEMES.classic ? getBackgroundAndIconColor(transparent, theme, messageType) : null)}
  ${({ theme }) => (theme.name === THEMES.classic ? typeIconClassicStyle : null)}
`;

function getBackgroundAndIconColor(transparent, theme, messageType) {
  return `
    background-color: ${transparent ? theme.colors.white : theme.status[messageType]};
    span {
      &:before {
        color: ${transparent ? theme.status[messageType] : theme.colors.white};
      }
    }
  `;
}

TypeIconStyle.defaultProps = {
  messageType: 'info',
  roundedCorners: true,
  theme: BaseTheme,
  transparent: false
};

TypeIconStyle.propTypes = {
  messageType: PropTypes.oneOf(OptionsHelper.messages),
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default TypeIconStyle;
