import styled from 'styled-components';
import ClassicFullScreenHeading from './classic-full-screen-heading.style';

const StyledFullScreenHeading = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.disabled.border};

  .div {
    position: relative;
  }

  .carbon-heading {
    height: 87px;

    .carbon-heading__header {
      align-items: center;
      box-sizing: content-box;
      display: flex;
      height: 87px;
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

export default StyledFullScreenHeading;
