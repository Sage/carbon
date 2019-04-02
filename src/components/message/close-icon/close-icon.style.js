import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import { THEMES } from '../../../style/themes';
import OptionsHelper from '../../../utils/helpers/options-helper';
import classicConfig from '../message-classic-config.style';

const CloseIconStyle = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
  justify-content: center;
  text-align: center;
  width: 45px;
  color: ${({ type, theme }) => (theme.name === THEMES.classic ? classicConfig[type].color : theme.colors[type])};
  span {
    cursor: pointer;
    &:before {
      font-size: 16px;
      display: block;
    }
  }
`;

CloseIconStyle.defaultProps = {
  as: 'info',
  roundedCorners: true,
  theme: BaseTheme,
  transparent: false
};

CloseIconStyle.propTypes = {
  as: PropTypes.oneOf(OptionsHelper.messages),
  border: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  transparent: PropTypes.bool
};

export default CloseIconStyle;
