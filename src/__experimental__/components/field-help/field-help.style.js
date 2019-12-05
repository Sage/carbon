import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import { isClassic } from '../../../utils/helpers/style-helper';

const FieldHelpStyle = styled.span`
  display: block;
  margin-top: 8px;
  white-space: pre-wrap;
  width: 100%;

  ${({ labelInline, labelWidth }) => labelInline && css`
    margin-left: ${labelWidth}%;
    padding-left: 0;
  `}

  ${({ labelInline, labelWidth, theme }) => isClassic(theme) && css`
    color: #335c6d;
    margin-left: 6px;
    margin-right: 6px;
    margin-top: 5px;

    ${labelInline && css`
      margin-left: calc(${labelWidth}% + 6px);
    `}
  `}
`;

FieldHelpStyle.defaultProps = {
  labelWidth: 30,
  theme: BaseTheme
};

FieldHelpStyle.propTypes = {
  labelWidth: PropTypes.number,
  labelInline: PropTypes.bool
};

export default FieldHelpStyle;
