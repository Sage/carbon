import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import BaseTheme from "../../style/themes/base";

const FieldHelpStyle = styled.span`
  display: block;
  flex: 1;
  margin-top: 8px;
  white-space: pre-wrap;

  ${({ labelInline, labelWidth }) =>
    labelInline &&
    css`
      margin-left: ${labelWidth}%;
      padding-left: 0;
    `}
`;

FieldHelpStyle.defaultProps = {
  labelWidth: 30,
  theme: BaseTheme,
};

FieldHelpStyle.propTypes = {
  labelWidth: PropTypes.number,
  labelInline: PropTypes.bool,
};

export default FieldHelpStyle;
