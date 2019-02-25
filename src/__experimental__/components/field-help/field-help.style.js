import styled from 'styled-components';
import Colors from 'style/themes/base';

const { colors } = Colors;

const FieldHelpWrapper = styled.span`
  color: ${colors.text.body};
  display: block;
  line-height: 20px;
  margin-left: 6px;
  margin-top: 5px;
  white-space: pre-wrap;
  ${props => props.isInline && `
    margin-left: 30%;
  `}
`;

export default FieldHelpWrapper;