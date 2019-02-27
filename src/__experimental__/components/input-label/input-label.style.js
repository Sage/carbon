import styled from 'styled-components';
import Colors from 'style/themes/base';

const { colors } = Colors;

const Label = styled.label`
  color: ${colors.text.body};
  cursor: pointer;
  font-weight: bold;
  padding: 6px;
  ${({ labelInline, labelWidth, labelAlignRight }) => labelInline && `
    box-sizing: border-box;
    width: ${labelWidth ? `${labelWidth}%` : '30%'};
    text-align: ${labelAlignRight ? 'right' : 'left'};
  `}
`;

export default Label;
