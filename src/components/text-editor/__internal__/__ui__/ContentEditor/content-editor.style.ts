import styled, { css } from "styled-components";
import addFocusStyling from "../../../../../style/utils/add-focus-styling";
import { ContentEditorProps } from "../../__utils__/interfaces.types";

const DEFAULT_EDITOR_HEIGHT = 210;
const FIXED_LINE_HEIGHT = 21;

const sizeMap = {
  small: {
    padding: "var(--global-space-comp-s)",
  },
  medium: {
    padding: "var(--global-space-comp-m)",
  },
  large: {
    padding: "var(--global-space-comp-l)",
  },
};

interface StyledContentEditableProps extends ContentEditorProps {
  readOnly?: boolean;
  size: "small" | "medium" | "large";
  showBorders?: boolean;
  hasFooter?: boolean;
}

const StyledContentEditable = styled.div<StyledContentEditableProps>`
  ${({ error, namespace, rows, readOnly, size, hasFooter }) => css`
    ${readOnly &&
    css`
      padding: ${sizeMap[size].padding};

      p:first-of-type {
        margin: 0;
      }
    `}

    .${namespace}-editable {
      min-height: ${rows && rows > 2
        ? rows * FIXED_LINE_HEIGHT
        : DEFAULT_EDITOR_HEIGHT}px;

      ${readOnly &&
      css`
        border-radius: var(--global-radius-container-m);
      `}

      padding: ${sizeMap[size].padding};

      ${!hasFooter &&
      css`
        border-bottom-right-radius: var(--global-radius-container-m);
        border-bottom-left-radius: var(--global-radius-container-m);
      `}

      ${error &&
      css`
        border: var(--global-borderwidth-s) solid
          var(--input-validation-border-error);
      `}

      &:focus {
        ${addFocusStyling()}
      }

      & > p:first-of-type {
        margin: 0;
      }

      & > p {
        line-height: 150%;
      }
    }
  `}
`;

export default StyledContentEditable;
