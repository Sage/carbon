import styled, { css } from "styled-components";

import { ContentEditorProps } from "./content-editor.component";
import { getPaddingForSize } from "../Toolbar/toolbar.style";
import addFocusStyling from "../../../../../style/utils/add-focus-styling";

const DEFAULT_EDITOR_HEIGHT = 210;
const FIXED_LINE_HEIGHT = 21;

interface StyledContentEditableProps extends ContentEditorProps {
  readOnly?: boolean;
  size?: "small" | "medium" | "large";
  showBorders?: boolean;
}

const StyledContentEditable = styled.div<StyledContentEditableProps>`
  ${({ namespace, rows, readOnly, size }) => css`

  ${
    readOnly &&
    css`
      padding: ${getPaddingForSize(size || "medium")};
      background-color: #f3f3f3;

      p:first-of-type {
        margin: 0;
      }
    `
  }

    .${namespace}-editable {
      min-height: ${
        rows && rows > 2 ? rows * FIXED_LINE_HEIGHT : DEFAULT_EDITOR_HEIGHT
      }px;
      background-color: var(--colorsUtilityYang100);

      ${
        readOnly
          ? css`
              border-top-left-radius: var(--borderRadius100);
              border-top-right-radius: var(--borderRadius100);
            `
          : css`
              border-top: 1px solid var(--colorsUtilityMajor200);
            `
      }


      margin-bottom: -4px;
      padding: ${getPaddingForSize(size || "medium")};

      border-bottom-right-radius: var(--borderRadius100);
      border-bottom-left-radius: var(--borderRadius100);

      &:focus {
        ${addFocusStyling(true)}
      }

      & > p:first-of-type {
        margin: 0;
      }
  `}
`;

export default StyledContentEditable;
