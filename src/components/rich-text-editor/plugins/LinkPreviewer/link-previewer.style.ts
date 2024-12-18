import styled, { css } from "styled-components";

import { LinkPreviewerProps } from "./link-previewer.component";

interface StyledLinkPreviewerProps extends LinkPreviewerProps {
  readOnly?: boolean;
}

const StyledLinkPreviewer = styled.div<StyledLinkPreviewerProps>`
  ${({ error, readOnly, warning }) => css`
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    background-color: var(--colorsUtilityYang100);
    border-bottom: 1px solid var(--colorsUtilityMajor200);
    border-left: 1px solid var(--colorsUtilityMajor200);
    border-right: 1px solid var(--colorsUtilityMajor200);
    margin: 0;
    padding: 2px 8px;

    ${(error || warning) &&
    css`
      border-left: none;
      border-right: none;
      border-bottom: none;
    `}

    ${readOnly &&
    css`
      border-bottom-left-radius: var(--borderWidth600);
      border-bottom-right-radius: var(--borderWidth600);
    `}
  `}
`;
export default StyledLinkPreviewer;
