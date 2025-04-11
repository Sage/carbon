import styled, { css } from "styled-components";

import { ContentEditorProps } from "./content-editor.component";

const DEFAULT_EDITOR_HEIGHT = 210;
const FIXED_LINE_HEIGHT = 21;

interface StyledContentEditableProps extends ContentEditorProps {
  showBorders?: boolean;
  readOnly?: boolean;
}

const StyledContentEditable = styled.div<StyledContentEditableProps>`
  ${({ namespace, rows, readOnly }) => css`
    .${namespace}-editable {
      min-height: ${rows && rows > 2
        ? rows * FIXED_LINE_HEIGHT
        : DEFAULT_EDITOR_HEIGHT}px;
      background-color: var(--colorsUtilityYang100);
      ${!readOnly && "border-top: 1px solid var(--colorsUtilityMajor200);"}
      ${readOnly &&
      `
      border-top-left-radius: var(--borderRadius100);
      border-top-right-radius: var(--borderRadius100);      
      `}
      margin: 0;
      padding: 2px 8px;
      border-bottom-right-radius: var(--borderRadius100);
      border-bottom-left-radius: var(--borderRadius100);
      :focus {
        outline: none;
      }
    }
  `}
`;

export default StyledContentEditable;
