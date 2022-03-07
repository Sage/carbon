import styled, { keyframes } from "styled-components";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";

const shimmer = keyframes`
  0% { opacity:0.1 }
  70% { opacity:0.6 }
  100% { opacity:0.1 }
`;

const PreviewStyle = styled.span`
  animation: ${shimmer} 2s ease infinite;
  background: var(--colorsUtilityMajor150);
  display: block;
  height: 15px;
  opacity: 0.6;
  width: 100%;

  & + & {
    margin-top: 3px;
  }
`;

export const StyledPreview = styled.div`
  ${margin}
`;

StyledPreview.defaultProps = {
  theme: baseTheme,
};

export default PreviewStyle;
