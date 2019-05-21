import styled from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';
import classicThemeForPill from './pill-classic.style';
import modernThemeForPill from './pill-modern.style';
import { THEMES } from '../../style/themes';

const PillStyle = styled.span`
  ${isClassic ? classicThemeForPill : modernThemeForPill}
`;

function isClassic({ theme }) {
  return theme.name === THEMES.classic;
}

PillStyle.defaultProps = {
  inFill: false,
  styledAs: 'default',
  isDeletable: false,
  theme: baseTheme
};

PillStyle.propTypes = {
  inFill: PropTypes.bool,
  styledAs: PropTypes.string,
  isDeletable: PropTypes.func
};

export default PillStyle;
