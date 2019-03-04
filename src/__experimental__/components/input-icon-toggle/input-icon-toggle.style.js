import styled from 'styled-components';
import BaseTheme from 'style/themes/base';

const InputIconToggleStyle = styled.label`
  color: ${getColor};
  border-left: 1px solid #668592;
  cursor: pointer;
  padding: 6px;
  margin: -2px -6px; /*correction for parent element padding*/
`;

InputIconToggleStyle.defaultProps = {
  theme: BaseTheme
};

function getColor({ theme, isHovered }) {
  const { colors } = theme;

  if (isHovered) {
    return colors.white;
  }

  return colors.text.body;
}

export default InputIconToggleStyle;
