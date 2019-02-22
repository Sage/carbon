import styled from 'styled-components';
import Colors from 'style/themes/base';

const { colors } = Colors;
const borderColor = '#668592';

const Label = styled.label`
  background-color: ${props => (props.isHovered ? colors.tertiary : colors.primary)};
  color: ${props => (props.isHovered ? colors.white : colors.text.body)};
  border-left: 1px solid ${borderColor};
  cursor: pointer;
  padding: 6px;
  margin: -2px -6px; /*correction for parent element padding*/
`;

export default Label;
