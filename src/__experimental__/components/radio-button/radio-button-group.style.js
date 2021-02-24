import styled, { css } from "styled-components";

const RadioButtonGroupStyle = styled.div`
  ${({ inline, legendInline, styleOverride }) => css`
    ${inline && "display: flex;"}
    ${legendInline && "margin-top: 4px;"}
    ${styleOverride};
  `};
`;

export default RadioButtonGroupStyle;
