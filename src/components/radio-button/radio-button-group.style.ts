import styled, { css } from "styled-components";

export const StyledHintText = styled.div`
  margin-top: -4px;
  margin-bottom: 8px;
  color: var(--colorsUtilityYin055);
  font-size: 14px;
`;

const RadioButtonGroupStyle = styled.div<{
  inline?: boolean;
  legendInline?: boolean;
}>`
  ${({ inline, legendInline }) => css`
    display: flex;
    flex-direction: column;
    ${inline && "flex-direction: row;"}
    ${legendInline && "margin-top: 4px;"}
  `};
`;

export default RadioButtonGroupStyle;
