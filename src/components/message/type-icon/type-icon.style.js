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
  width: 30px;
  text-align: center;
  border-radius: ${({ roundedCorners }) => (roundedCorners ? '3px 0 0 3px' : '0')};
  background-color: ${({ theme, type, transparent }) => (transparent ? theme.colors.white : theme.colors[type])};
  span {
    &:before {
      color: ${({ theme, transparent, type }) => (transparent ? theme.colors[type] : theme.colors.white)};
    }
  }
  ${({ theme }) => (theme.name === THEMES.classic ? typeIconClassicStyle : null)}
`;

TypeIconStyle.defaultProps = {
  as: 'info',
  roundedCorners: true,
  theme: BaseTheme,
  transparent: false
};

TypeIconStyle.propTypes = {
  as: PropTypes.oneOf(OptionsHelper.messages),
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default TypeIconStyle;
