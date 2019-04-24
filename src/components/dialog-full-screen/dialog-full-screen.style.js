import styled from 'styled-components';
import classicDialogFullScreenStyle from './dialog-full-screen-classic.style';
import baseTheme from '../../style/themes/base';

const StyledDialogFullScreen = styled.div`
  background-color: ${({ theme }) => theme.disabled.input};
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  ${classicDialogFullScreenStyle}
`;

StyledDialogFullScreen.defaultProps = {
  theme: baseTheme
};


export default StyledDialogFullScreen;
