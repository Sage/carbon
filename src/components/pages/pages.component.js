import React from 'react';
import PropTypes from 'prop-types';
import BaseCarousel, { Carousel, Slide } from '../carousel/carousel.component';
import { withTheme } from 'styled-components';
import { isClassic } from '../../utils/helpers/style-helper';
import baseTheme from '../../style/themes/base';
import tagComponent from '../../utils/helpers/tags';
import Page from './page';

class Pages extends React.Component {
  render() {
    return(
      <Carousel
        initialSlideIndex={ this.props.initialSlideIndex }
        slideIndex={ this.props.slideIndex }
        enableSlideSelector={ this.props.enableSlideSelector }
        enablePreviousButton={ this.props.enablePreviousButton }
        enableNextButton={ this.props.enableNextButton }
        transition={ this.props.transition }
        onNextClick={ this.props.onNextClickk }
        onPreviousClick={ this.props.onPreviousClick }
        { ...tagComponent('pages', this.props) }
      >
        { this.props.children }
      </Carousel>
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
  enableSlideSelector: false,
  enablePreviousButton: false,
  enableNextButton: false,
  transition: 'slide',
  theme: baseTheme
};

const PagesWithHOC = withTheme(Pages);

export default Pages;

export { PagesWithHOC as Pages, Slide as Page };