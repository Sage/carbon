import styled from 'styled-components';
import ClassicFullScreenHeading from './full-screen-heading-classic.style';
import baseTheme from '../../../style/themes/base';

const StyledFullScreenHeading = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.disabled.border};

  & > .div {
    position: relative;
  }

  .carbon-heading {
    height: 106px;

    .carbon-heading__header {
      background-color: transparent;
      align-items: center;
      box-sizing: content-box;
      display: flex;
      height: 106px;
      margin-bottom: 0;
      padding-bottom: 0;
      width: 100%;

      .icon-chevron_left:before {
        font-size: 24px;
      }

      .carbon-heading__back {
        margin-top: -8px;
        margin-left: -5px;
      }

      .carbon-dialog-full-screen & {
        background-color: ${({ theme }) => theme.disabled.background};
      }
    }
  }

  ${ClassicFullScreenHeading}
`;

StyledFullScreenHeading.defaultProps = {
  theme: baseTheme
};

export default StyledFullScreenHeading;
