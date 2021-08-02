import styled, { css } from "styled-components";

const RadioButtonGroupStyle = styled.div`
  ${({ inline, legendInline }) => css`
    display: flex;
    flex-direction: column;
    ${inline && "flex-direction: row;"}
    ${legendInline && "margin-top: 4px;"}
  `};
`;

export default RadioButtonGroupStyle;
