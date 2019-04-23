import styled from 'styled-components';
import ClassicDialogFullScreenStyle from './classic-dialog-full-screen.style';

const StyledDialogFullScreenHeading = styled.div`
  background-color: ${({ theme }) => theme.disabled.input};
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  
  .carbon-dialog-full-screen--open & {
    overflow: hidden;
  }
  

  ${ClassicDialogFullScreenStyle}
`;

export default StyledDialogFullScreenHeading;
