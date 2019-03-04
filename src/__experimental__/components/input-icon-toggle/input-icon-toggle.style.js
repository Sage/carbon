import styled from 'styled-components';
import BaseTheme from 'style/themes/base';

const InputIconToggleStyle = styled.label`
  color: ${getColor};
  background-color: ${getBackground};
  border-left: 1px solid #668592;
  cursor: pointer;
  padding: 6px;
  margin: -2px -6px; /*correction for parent element padding*/
`;

InputIconToggleStyle.defaultProps = {
  theme: BaseTheme
};

function getColor({ theme, isHovered, disabled }) {
  const { colors } = theme;

  if (disabled) {
    return colors.text.disabled;
  }

  if (isHovered) {
    return colors.text.white;
  }

  return colors.text.body;
}

function getBackground({ theme, isHovered, disabled }) {
  const { colors } = theme;

  if (disabled) {
    return colors.secondary;
  }

  if (isHovered) {
    return colors.tertiary;
  }

  return colors.primary;
}

export default InputIconToggleStyle;
