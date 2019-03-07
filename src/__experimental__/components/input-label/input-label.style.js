import styled from 'styled-components';
import BaseTheme from 'style/themes/base';

const LabelStyle = styled.label`
  color: ${({ theme }) => theme.colors.text.body};
  cursor: pointer;
  font-weight: bold;
  padding: 6px;
  width: 100%;
  margin-bottom: 8px;
  ${({ labelInline, labelWidth, labelAlign }) => labelInline && `
    box-sizing: border-box;
    width: ${labelWidth}%;
    text-align: ${labelAlign};
  `}
`;

LabelStyle.defaultProps = {
  theme: BaseTheme,
  labelWidth: 30,
  labelAlign: 'left'
};

export default LabelStyle;
