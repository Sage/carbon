import styled from 'styled-components';
import BaseTheme from 'style/themes/base';

const FieldHelpStyle = styled.span`
  color: ${({ theme }) => theme.colors.text.body};
  display: block;
  line-height: 20px;
  margin-left: 6px;
  margin-top: 5px;
  padding-left: 6px;
  white-space: pre-wrap;
  ${({ labelInline, inputWidth }) => labelInline && `
    align-self: center;
    margin-left: ${inputWidth}%;
    padding-left: 0;
  `}
`;

FieldHelpStyle.defaultProps = {
  theme: BaseTheme,
  inputWidth: 30
};

export default FieldHelpStyle;
