import styled from 'styled-components';
import BaseTheme from '../../../style/themes/base';

const StyledPage = styled.article`
  .carbon-page {
    width: 100%;
    height: 100%;
  }

  .carbon-page__content {
    box-sizing: content-box;
    padding: 30px 0;
    width: 100%;
    height: calc(100% - (106px + 60px));
    overflow-y: auto;
  }
`;

StyledPage.defaultProps = {
  theme: BaseTheme
};

export default StyledPage;
