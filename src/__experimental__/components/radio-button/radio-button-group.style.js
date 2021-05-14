import styled, { css } from "styled-components";

const RadioButtonGroupStyle = styled.div`
  ${({ inline, legendInline }) => css`
    ${inline && "display: flex;"}
    ${legendInline && "margin-top: 4px;"}
  `};
`;

export default RadioButtonGroupStyle;
