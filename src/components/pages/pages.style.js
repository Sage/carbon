import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { isClassic } from '../../utils/helpers/style-helper';
import BaseTheme from '../../style/themes/base';
import OptionsHelper from '../../utils/helpers/options-helper';

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
