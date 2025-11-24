import styled, { css } from "styled-components";

import { getPaddingForSize } from "../Toolbar/toolbar.style";
import addFocusStyling from "../../../../../style/utils/add-focus-styling";
import { ContentEditorProps } from "../../__utils__/interfaces.types";

const DEFAULT_EDITOR_HEIGHT = 210;
const FIXED_LINE_HEIGHT = 21;

interface StyledContentEditableProps extends ContentEditorProps {
  readOnly?: boolean;
  size: "small" | "medium" | "large";
  showBorders?: boolean;
  useBackgroundColor?: boolean;
}

const StyledContentEditable = styled.div<StyledContentEditableProps>`
  ${({ useBackgroundColor, error, namespace, rows, readOnly, size }) => css`

  ${
    readOnly &&
    css`
      padding: ${getPaddingForSize(size)};
      ${useBackgroundColor &&
      css`
        background-color: #f3f3f3;
      `}
      border-radius: 8px;

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
        readOnly &&
        css`
          border-top-left-radius: var(--borderRadius100);
          border-top-right-radius: var(--borderRadius100);
        `
      }


      margin-bottom: -4px;
      padding: ${getPaddingForSize(size)};

      border-bottom-right-radius: var(--borderRadius100);
      border-bottom-left-radius: var(--borderRadius100);

      ${
        error &&
        css`
          box-shadow: inset 0 0 0 2px var(--colorsSemanticNegative500);
          border-bottom-left-radius: var(--borderRadius100);
          border-bottom-right-radius: var(--borderRadius100);
          border-top-left-radius: 0;
          border-top-right-radius: 0;
        `
      }

      &:focus {
        ${addFocusStyling(false)}
      }

      & > p:first-of-type {
        margin: 0;
      }

      & > p {
        line-height: var(--lineHeights500);
      }
  `}
`;

export default StyledContentEditable;
