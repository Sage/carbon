import styled, { keyframes } from "styled-components";

export interface StyledPreviewPlaceholderProps {
  /** A custom height to be applied to the component. */
  height?: string;
  /** A custom width */
  width?: string;
}

const shimmer = keyframes`
  0% { opacity:0.1 }
  70% { opacity:0.6 }
  100% { opacity:0.1 }
`;

export const StyledPreviewPlaceholder = styled.span<StyledPreviewPlaceholderProps>`
  animation: ${shimmer} 2s ease infinite;
  background: var(--colorsUtilityMajor150);
  display: block;
  height: ${({ height }) => height || "15px"};
  opacity: 0.6;
  width: ${({ width }) => width || "100%"};
  border-radius: var(--borderRadius050);

  & + & {
    margin-top: 3px;
  }
`;
