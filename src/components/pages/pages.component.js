import React from 'react';
import PropTypes from 'prop-types';
import { Carousel } from './carousel/carousel.component';
import { withTheme } from 'styled-components';
import baseTheme from '../../style/themes/base';
import classNames from 'classnames';
import tagComponent from '../../utils/helpers/tags';
import Page from './page/page.component';
import StyledPagesCarousel from './pages.style';

const pagesClasses = (props) => {
  return classNames('carbon-pages', props.className);
};

class Pages extends React.Component {
  render() {
    return(
      <StyledPagesCarousel>
        <Carousel
          className={ pagesClasses(this.props) }
          initialSlideIndex={ this.props.initialSlideIndex }
          slideIndex={ this.props.slideIndex }
          transition={ this.props.transition }
          { ...tagComponent('pages', this.props) }
        >
          { this.props.children }
        </Carousel>
      </StyledPagesCarousel>
    );
  }
}

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
  ])
};

Pages.defaultProps = {
  initialSlideIndex: 0,
  slideIndex: 0,
  transition: 'slide',
  theme: baseTheme
};

const PagesWithHOC = withTheme(Pages);

export default Pages;

export { PagesWithHOC as Pages, Page };