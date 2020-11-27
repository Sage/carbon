import styled, { css } from "styled-components";
import BaseTheme from "../../../style/themes/base";

const FormFieldStyle = styled.div`
  & + & {
    margin-top: 16px;
  }

  &&& {
    ${({ mb, theme }) =>
      (mb || mb === 0) &&
      css`
        margin-bottom: ${mb * theme.spacing}px;
      `};
  }

  ${({ styleOverride }) => styleOverride};
`;

FormFieldStyle.defaultProps = {
  theme: BaseTheme,
};

const FieldLineStyle = styled.div`
  ${({ inline }) => {
    if (inline) {
      return `
        display: flex;
      `;
    }

    return "display: block;";
  }}
`;

export { FieldLineStyle };
export default FormFieldStyle;
