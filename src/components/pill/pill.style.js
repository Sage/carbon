import styled from 'styled-components';
import PropTypes from 'prop-types';
import baseTheme from '../../style/themes/base';
import classicThemeForPill from './pill-classic.style';
import modernThemeForPill from './pill-modern.style';
import { THEMES } from '../../style/themes';
import OptionsHelper from '../../utils/helpers/options-helper';

const PillStyle = styled.span`
  ${props => (isClassic(props) ? classicThemeForPill : modernThemeForPill)}
`;

function isClassic({ theme, styledAs }) {
  // handles incorrect default activeTheme in StoryBook AppWrapper
  if (OptionsHelper.pillColours.includes(styledAs)) {
    theme.name = (theme.name !== THEMES.classic) ? theme.name : THEMES.small;
    return false;
  }
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
