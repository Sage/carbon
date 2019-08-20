import styled from 'styled-components';
import { slideAnimation, fadeAnimation } from './pages.config';

const PagesWrapperStyle = styled.div`
  .carbon-carousel__content {
    overflow: hidden;
    position: relative;

    .carbon-icon {
      margin-top: -9px;
    }
  }

  ${slideAnimation};
  ${fadeAnimation};
`;

export {
  PagesWrapperStyle
};
