import styled from 'styled-components';
import classicDialogFullScreenStyle from './dialog-full-screen-classic.style';
import baseTheme from '../../style/themes/base';
import StyledIconButton from '../icon-button/icon-button.style';

const StyledDialogFullScreen = styled.div`
  background-color: ${({ theme }) => theme.disabled.input};
  height: 100%;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.fullScreenModal};

  ${StyledIconButton} {
    position: absolute;
    right: 33px;
    top: 32px;
    z-index: 1;
  }

  ${classicDialogFullScreenStyle}
`;

StyledDialogFullScreen.defaultProps = {
  theme: baseTheme
};


export default StyledDialogFullScreen;
