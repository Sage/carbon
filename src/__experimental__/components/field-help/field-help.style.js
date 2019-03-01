import styled from 'styled-components';

const FieldHelpStyle = styled.span`
  color: #335c6d;
  display: block;
  line-height: 20px;
  margin-left: 6px;
  margin-top: 5px;
  padding-left: 6px;
  white-space: pre-wrap;
  ${({ labelInline, inputWidth }) => labelInline && `
    align-self: center;
    margin-left: ${inputWidth ? `${inputWidth}%` : '30%'};
    padding-left: 0;
  `}
`;

export default FieldHelpStyle;
