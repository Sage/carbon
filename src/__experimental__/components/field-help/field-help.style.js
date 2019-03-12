import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';

const FieldHelpStyle = styled.span`
  color: ${({ theme }) => theme.text.color};
  display: block;
  line-height: 20px;
  margin-left: 6px;
  margin-top: 5px;
  padding-left: 6px;
  white-space: pre-wrap;
  width: 100%;

  ${({ labelInline, inputWidth }) => labelInline && `
    align-self: center;
    margin-left: ${inputWidth}%;
    padding-left: 0;
  `}
`;

FieldHelpStyle.defaultProps = {
  inputWidth: 30,
  theme: BaseTheme
};

FieldHelpStyle.propTypes = {
  inputWidth: PropTypes.number,
  labelInline: PropTypes.bool
};

export default FieldHelpStyle;
