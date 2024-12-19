import styled, { css } from "styled-components";

import { ContentEditorProps } from "./content-editor.component";

const DEFAULT_EDITOR_HEIGHT = 210;
const FIXED_LINE_HEIGHT = 21;

const StyledContentEditable = styled.div<ContentEditorProps>`
  ${({ rows }) => css`
    .carbon-rte-editable {
      border-radius: var(--borderRadius050);
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      min-height: ${rows && rows > 2
        ? rows * FIXED_LINE_HEIGHT
        : DEFAULT_EDITOR_HEIGHT}px;
      background-color: var(--colorsUtilityYang100);
      outline: 1px solid var(--colorsUtilityMajor200);
      margin: 0;
      padding: 2px 8px;
    }
  `}
`;

export default StyledContentEditable;
