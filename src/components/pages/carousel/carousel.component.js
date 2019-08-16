import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import { compact, assign } from 'lodash';
import { withTheme } from 'styled-components';
import tagComponent from '../../../utils/helpers/tags/tags';
import Slide from './slide/slide.component';
import {
  CarouselWrapperStyle,
  CarouselSliderWrapper
} from './carousel.style';
import { isClassic } from '../../../utils/helpers/style-helper';
import baseTheme from '../../../style/themes/base';

const NEXT = 'next';
const PREVIOUS = 'previous';
const TRANSITION_TIME = 750;

class Carousel extends React.Component {
  constructor(...args) {
    super(...args);

    /** Direction of animation */
    this.transitionDirection = NEXT;

    this.numOfSlides = this.numOfSlides.bind(this);
    this.visibleSlide = this.visibleSlide.bind(this);
    this.transitionName = this.transitionName.bind(this);
  }

  state = {
    selectedSlideIndex: Number(this.props.slideIndex) || Number(this.props.initialSlideIndex), // Currently selected slide
  };

  /** A lifecycle method that is called before re-render. */
  componentDidUpdate(prevProps) {
    if (this.props.slideIndex === prevProps.slideIndex) return;

    if (typeof this.props.slideIndex === 'undefined') return;

    const newIndex = this.verifyNewIndex(this.props.slideIndex);
    const currentIndex = this.state.selectedSlideIndex;

    if (newIndex === currentIndex) return;

    if (newIndex > currentIndex) {
      this.transitionDirection = NEXT;
    } else {
      this.transitionDirection = PREVIOUS;
    }

    this.setState({
      selectedSlideIndex: newIndex
    });
  }

  /** Verifies the new index and corrects it if necessary */
  verifyNewIndex(newIndex) {
    if (newIndex < 0) {
      // If the new index is negative, select the last slide
      return this.numOfSlides() - 1;
    }

    if (newIndex > this.numOfSlides() - 1) {
      // If the new index is bigger than the number of slides, select the first slide
      return 0;
    }

    return newIndex;
  }

  /** Gets the number of slides */
  numOfSlides() {
    return Array.isArray(this.props.children) ? compact(this.props.children).length : 1;
  }

  /** Gets the currently visible slide */
  visibleSlide() {
    let index = this.state.selectedSlideIndex;

    const visibleSlide = compact(React.Children.toArray(this.props.children))[index];
    index = visibleSlide.props.id || index;

    const additionalProps = {
      className: visibleSlide.props.className,
      isPadded: true,
      'data-element': 'visible-slide',
      key: `carbon-slide-${index}`
    };

    return React.cloneElement(visibleSlide, assign({}, visibleSlide.props, additionalProps));
  }

  visibleSlides() {
    const arrayWithKeys = this.props.children.map((element, key) => {
      return React.cloneElement(element, {
        key: `slide-${key}`, id: key, selectedIndex: this.state.selectedSlideIndex, ...element.props
      });
    });

    return arrayWithKeys;
  }

  /** Returns the current transition name */
  transitionName() {
    if (this.props.transition === 'slide') {
      return `slide-${this.transitionDirection}`;
    }

    return `carousel-transition-${this.props.transition}`;
  }

  /** Renders the Slide Component */
  render() {
    if (isClassic(this.props.theme)) {
      return (
        <CarouselWrapperStyle className={ this.props.className } { ...tagComponent('carousel', this.props) }>
          {/** carbon-carousel__content is related to pages.scss */}
          <div className='carbon-carousel__content'>
            <CSSTransitionGroup
              component='div'
              className='carbon-carousel__transition'
              transitionName={ this.transitionName() }
              transitionEnterTimeout={ TRANSITION_TIME }
              transitionLeaveTimeout={ TRANSITION_TIME }
            >
              { this.visibleSlide() }
            </CSSTransitionGroup>
          </div>
        </CarouselWrapperStyle>
      );
    }

    return (
      <CarouselWrapperStyle className={ this.props.className } { ...tagComponent('carousel', this.props) }>
        <div className='carbon-carousel__content'>
          <CarouselSliderWrapper elementIndex={ this.state.selectedSlideIndex }>
            {this.visibleSlides()}
          </CarouselSliderWrapper>
        </div>
      </CarouselWrapperStyle>
    );
  }
}

Carousel.propTypes = {
  /** [legacy] Custom className */
  className: PropTypes.string,
  /** The selected tab on page load */
  initialSlideIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  /** The selected slide */
  slideIndex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  /** Individual tabs */
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  /** Controls which transition to use. */
  transition: PropTypes.string,
  /** theme is used only to support legacy code */
  theme: PropTypes.object
};

Carousel.defaultProps = {
  initialSlideIndex: 0,
  transition: 'slide',
  theme: baseTheme
};

const CarouselWithHOC = withTheme(Carousel);

export default Carousel;

export { CarouselWithHOC as Carousel, Slide };
