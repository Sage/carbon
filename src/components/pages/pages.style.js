import styled from 'styled-components';
import BaseTheme from '../../style/themes/base';

const StyledPagesCarousel = styled.label`
  .carbon-pages {
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;

    .carbon-carousel__content {
      height: 100%;
    }
  }
`;

StyledPagesCarousel.defaultProps = {
  theme: BaseTheme
};

export default StyledPagesCarousel;
