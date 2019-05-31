import styled, { keyframes } from 'styled-components';
import baseTheme from '../../style/themes/base';

const shimmer = keyframes`
  0% { opacity:0.1 }
  70% { opacity:0.6 }
  100% { opacity:0.1 }
`;

const PreviewStyle = styled.span`
  animation: ${shimmer} 2s ease infinite;
  background: ${({ theme }) => theme.colors.previewBackground};
  display: block;
  height: 15px;
  opacity: 0.6;
  width: 100%;

  & + & {
    margin-top: 3px;
}
`;

PreviewStyle.defaultProps = {
  theme: baseTheme
};

export default PreviewStyle;
