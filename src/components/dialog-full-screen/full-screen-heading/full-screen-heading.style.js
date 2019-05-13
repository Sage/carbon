import styled from 'styled-components';
import fullScreenHeadingClassic from './full-screen-heading-classic.style';
import baseTheme from '../../../style/themes/base';

const StyledFullScreenHeading = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.disabled.border};

  .carbon-app-wrapper {
    position: relative;
    max-width: none;
    padding: 32px;
  }

  .carbon-heading {
    .carbon-heading__header {
      background-color: transparent;
      align-items: center;
      box-sizing: content-box;
      display: flex;
      margin-bottom: 0;
      padding-bottom: 0;
      width: 100%;
      border: none;

      .icon-chevron_left:before {
        font-size: 24px;
      }

      .carbon-heading__back {
        margin-top: -8px;
        margin-left: -5px;
      }
    }
  }

  ${fullScreenHeadingClassic}
`;

StyledFullScreenHeading.defaultProps = {
  theme: baseTheme
};

export default StyledFullScreenHeading;
