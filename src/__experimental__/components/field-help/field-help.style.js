import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';

const FieldHelpStyle = styled.span`
  display: block;
  margin-top: 8px;
  white-space: pre-wrap;
  width: 100%;

  ${({ labelInline, inputWidth }) => labelInline && css`
    align-self: center;
    margin-left: ${inputWidth}%;
    padding-left: 0;
  `}

  ${({ labelInline, inputWidth, theme }) => theme.name === 'classic' && css`
    color: #335c6d;
    margin-left: 6px;
    margin-right: 6px;
    margin-top: 5px;

    ${labelInline && css`
      margin-left: calc(${inputWidth}% + 6px);
    `}
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
