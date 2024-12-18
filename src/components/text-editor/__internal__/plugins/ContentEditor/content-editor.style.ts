import styled, { css } from "styled-components";

import { ContentEditorProps } from "./content-editor.component";

const DEFAULT_EDITOR_HEIGHT = 210;
const FIXED_LINE_HEIGHT = 21;

interface StyledContentEditableProps extends ContentEditorProps {
  showBorders?: boolean;
}

const StyledContentEditable = styled.div<StyledContentEditableProps>`
  ${({ error, namespace, rows, warning }) => css`
    .${namespace}-editable {
      min-height: ${rows && rows > 2
        ? rows * FIXED_LINE_HEIGHT
        : DEFAULT_EDITOR_HEIGHT}px;
      background-color: var(--colorsUtilityYang100);
      border-top: 1px solid var(--colorsUtilityMajor200);
      border-left: 1px solid var(--colorsUtilityMajor200);
      border-right: 1px solid var(--colorsUtilityMajor200);
      margin: 0;
      padding: 2px 8px;
      border-top-left-radius: var(--borderWidth600);
      border-top-right-radius: var(--borderWidth600);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;

      ${(error || warning) &&
      css`
        border: none;
      `}

      :focus {
        outline: none;
      }
    }
  `}
`;

export default StyledContentEditable;
