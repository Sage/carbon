import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';

const FieldHelpStyle = styled.span`
  color: ${({ theme }) => theme.input.fieldHelp.color};
  display: block;
  margin-left: ${({ theme }) => theme.input.fieldHelp.marginSide};
  margin-right: ${({ theme }) => theme.input.fieldHelp.marginSide};
  margin-top: ${({ theme }) => theme.input.fieldHelp.marginTop};
  white-space: pre-wrap;
  width: 100%;

  ${({ labelInline, inputWidth, theme }) => labelInline && `
    align-self: center;
    margin-left: calc(${inputWidth}% + ${theme.input.fieldHelp.marginSide} + ${theme.input.fieldHelp.marginSide});
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
