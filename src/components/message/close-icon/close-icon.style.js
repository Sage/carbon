import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import classicConfig from '../message-classic-config.style';
import BaseTheme from '../../../style/themes/base';
import { THEMES } from '../../../style/themes';
import OptionsHelper from '../../../utils/helpers/options-helper';

const CloseIconStyle = styled.div`
  align-items: center;
  display: flex;
  margin-left: auto;
  justify-content: center;
  text-align: center;
  width: 45px;
  ${addProperStyles}

  span {
    cursor: pointer;
    &:before {
      font-size: 16px;
      display: block;
    }
  }
`;

function addProperStyles(props) {
  const { theme, type } = props;
  if (theme.name === THEMES.classic) return stylingForClassic(type);
  return stylingForType(type, theme);
}

function stylingForClassic(type) {
  return css`
    color: ${classicConfig[type].color};
  `;
}

function stylingForType(type, theme) {
  return css`
    color: ${theme.colors[type]};
  `;
}

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
