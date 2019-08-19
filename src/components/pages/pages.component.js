import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import classNames from 'classnames';
import tagComponent from '../../utils/helpers/tags';
import Page from './page/page.component';
import StyledPagesCarousel from './pages.style';
import { Carousel } from './carousel/carousel.component';

const Pages = ({
  className,
  initialSlideIndex,
  slideIndex,
  transition,
  children,
  ...props
}) => {
  return (
    <StyledPagesCarousel>
      <Carousel
        className={ classNames('carbon-pages', className) }
        initialSlideIndex={ initialSlideIndex }
        slideIndex={ slideIndex }
        transition={ transition }
        { ...tagComponent('pages', props) }
      >
        { children }
      </Carousel>
    </StyledPagesCarousel>
  );
};

Pages.propTypes = {
  /**
   * A custom class name for the component.
   */
  className: PropTypes.string,

  /**
   * This component supports children.
   */
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  initialSlideIndex: PropTypes.number,
  slideIndex: PropTypes.number,
  transition: PropTypes.string
};

Pages.defaultProps = {
  initialSlideIndex: 0,
  slideIndex: 0,
  transition: 'slide'
};

const PagesWithHOC = withTheme(Pages);

export default Pages;

export { PagesWithHOC as Pages, Page };
