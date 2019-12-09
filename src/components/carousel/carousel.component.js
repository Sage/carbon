import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';
import { compact, assign } from 'lodash';
import { withTheme } from 'styled-components';
import tagComponent from '../../utils/helpers/tags/tags';
import Slide from './slide/slide.component';
import {
  CarouselPreviousButtonWrapperStyle,
  CarouselNextButtonWrapperStyle,
  CarouselButtonStyle,
  CarouselStyledIconRight,
  CarouselStyledIconLeft,
  CarouselSelectorWrapperStyle,
  CarouselSelectorInputWrapperStyle,
  CarouselSelectorInputStyle,
  CarouselSelectorLabelStyle,
  CarouselWrapperStyle,
  CarouselSliderWrapper
} from './carousel.style';
import { isClassic } from '../../utils/helpers/style-helper';
import baseTheme from '../../style/themes/base';

const NEXT = 'next';
const PREVIOUS = 'previous';
const TRANSITION_TIME = 750;

class BaseCarousel extends React.Component {
  constructor(...args) {
    super(...args);

    /** Direction of animation */
    this.transitionDirection = NEXT;

    this.onPreviousClick = this.onPreviousClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onSlideSelection = this.onSlideSelection.bind(this);
    this.enableButtonsAfterTimeout = this.enableButtonsAfterTimeout.bind(this);
    this.previousButtonProps = this.previousButtonProps.bind(this);
    this.nextButtonProps = this.nextButtonProps.bind(this);
    this.numOfSlides = this.numOfSlides.bind(this);
    this.slideSelector = this.slideSelector.bind(this);
  }

  state = {
    // Currently selected slide
    selectedSlideIndex: Number(this.props.slideIndex) || Number(this.props.initialSlideIndex),
    disabled: false // Next/Previous buttons disabled state
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

    this.handleSlideChange(newIndex);
  }

  /** Handles clicking on the previous button */
  onPreviousClick() {
    let newIndex = this.state.selectedSlideIndex - 1;
    if (newIndex < 0) {
      newIndex = this.numOfSlides() - 1;
    }
    this.transitionDirection = PREVIOUS;
    this.handleSlideChange(newIndex);
  }

  /** Handles clicking on the next button */
  onNextClick() {
    const newIndex = (this.state.selectedSlideIndex + 1) % this.numOfSlides();
    this.transitionDirection = NEXT;
    this.handleSlideChange(newIndex);
  }

  /** Handles clicking slide selector */
  onSlideSelection(ev) {
    const newSlideSelection = Number(ev.target.value);
    this.transitionDirection = newSlideSelection > this.state.selectedSlideIndex ? NEXT : PREVIOUS;
    this.handleSlideChange(newSlideSelection);
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

  /** Handle the slide change to the newIndex */
  handleSlideChange(newIndex) {
    if (isClassic(this.props.theme)) {
      this.setState({ disabled: true, selectedSlideIndex: newIndex });
    } else {
      this.setState({ selectedSlideIndex: newIndex });
    }

    this.enableButtonsAfterTimeout();

    if (this.props.onSlideChange) {
      this.props.onSlideChange(newIndex, this.transitionDirection);
    }
  }

  /** Re-enables the next and previous buttons after timeout */
  enableButtonsAfterTimeout() {
    if (isClassic(this.props.theme)) {
      setTimeout(() => {
        this.setState({ disabled: false });
      }, TRANSITION_TIME);
    }
  }

  /** Gets the props for the previous button */
  previousButtonProps() {
    return !this.state.disabled ? { onClick: this.onPreviousClick } : {};
  }

  /** Gets the props for the next button */
  nextButtonProps() {
    return !this.state.disabled ? { onClick: this.onNextClick } : {};
  }

  /** Gets the number of slides */
  numOfSlides() {
    return Array.isArray(this.props.children) ? compact(this.props.children).length : 1;
  }

  /** Gets the currently visible slide */
  visibleSlide = () => {
    let index = this.state.selectedSlideIndex;

    const visibleSlide = compact(React.Children.toArray(this.props.children))[index];

    index = visibleSlide.props.id || index;

    const additionalProps = {
      transitionName: this.transitionName,
      timeout: TRANSITION_TIME,
      theme: this.props.theme,
      slideProps: {
        className: visibleSlide.props.className,
        isPadded: this.props.enablePreviousButton || this.props.enableNextButton,
        'data-element': 'visible-slide',
        key: `carbon-slide-${index}`,
        ...visibleSlide.props
      }
    };

    return React.cloneElement(visibleSlide, assign({}, visibleSlide.props, additionalProps));
  }

  visibleSlides() {
    const arrayWithKeys = this.props.children.map((element, key) => {
      return React.cloneElement(element, {
        key: `slide-${key}`,
        id: key,
        selectedIndex: this.state.selectedSlideIndex,
        theme: this.props.theme,
        ...element.props
      });
    });

    return arrayWithKeys;
  }

  /** Renders the slideSelector footer */
  slideSelector() {
    if (!this.props.enableSlideSelector) return null;

    const buttons = [];

    for (let i = 0; i < this.numOfSlides(); i++) {
      buttons.push(
        <CarouselSelectorInputWrapperStyle
          key={ i }
          data-element='selector-inputs'
        >
          <CarouselSelectorInputStyle
            disabled={ this.state.disabled }
            data-element='selector-input'
            name='carousel-slide'
            id={ `carousel-slide-${i}` }
            type='radio' value={ i }
            onChange={ this.onSlideSelection }
            checked={ this.state.selectedSlideIndex === i }
          />
          <CarouselSelectorLabelStyle
            data-element='selector-label'
            htmlFor={ `carousel-slide-${i}` }
          />
        </CarouselSelectorInputWrapperStyle>
      );
    }

    return (
      <CarouselSelectorWrapperStyle data-element='slide-selector'>
        {buttons}
      </CarouselSelectorWrapperStyle>
    );
  }

  /** Renders the previous button */
  previousButton() {
    if (!this.props.enablePreviousButton) return null;
    const isDisabled = this.state.selectedSlideIndex === 0;

    return (
      <CarouselPreviousButtonWrapperStyle>
        <CarouselButtonStyle
          { ...this.previousButtonProps() }
          data-element='previous'
          aria-label='previous'
          type='button'
          disabled={ isClassic(this.props.theme) ? null : isDisabled }
        >
          <CarouselStyledIconLeft type={ isClassic(this.props.theme) ? 'dropdown' : 'chevron_down' } />
        </CarouselButtonStyle>
      </CarouselPreviousButtonWrapperStyle>
    );
  }

  /** Renders the next button */
  nextButton() {
    if (!this.props.enableNextButton) return null;
    const numberOfChildren = this.props.children.length;
    const isDisabled = numberOfChildren === this.state.selectedSlideIndex + 1;

    return (
      <CarouselNextButtonWrapperStyle>
        <CarouselButtonStyle
          { ...this.nextButtonProps() }
          data-element='next'
          aria-label='next'
          type='button'
          disabled={ isClassic(this.props.theme) ? null : isDisabled }
        >
          <CarouselStyledIconRight type={ isClassic(this.props.theme) ? 'dropdown' : 'chevron_down' } />
        </CarouselButtonStyle>
      </CarouselNextButtonWrapperStyle>
    );
  }

  /** Returns the current transition name */
  transitionName = () => {
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
            {this.previousButton()}
            <TransitionGroup>
              {this.visibleSlide()}
            </TransitionGroup>
            {this.nextButton()}
          </div>
          {this.slideSelector()}
        </CarouselWrapperStyle>
      );
    }

    return (
      <CarouselWrapperStyle className={ this.props.className } { ...tagComponent('carousel', this.props) }>
        <div className='carbon-carousel__content'>
          {this.previousButton()}
          <CarouselSliderWrapper elementIndex={ this.state.selectedSlideIndex }>
            {this.visibleSlides()}
          </CarouselSliderWrapper>
          {this.nextButton()}
        </div>
        {this.slideSelector()}
      </CarouselWrapperStyle>
    );
  }
}

BaseCarousel.propTypes = {
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
  /** Enables the slide selector */
  enableSlideSelector: PropTypes.bool,
  /** Enables the previous button */
  enablePreviousButton: PropTypes.bool,
  /** Enables the next button */
  enableNextButton: PropTypes.bool,
  /** Action to be called on slide change */
  onSlideChange: PropTypes.func,
  /** Controls which transition to use. */
  transition: PropTypes.string,
  /** theme is used only to support legacy code */
  theme: PropTypes.object
};

BaseCarousel.defaultProps = {
  initialSlideIndex: 0,
  enableSlideSelector: true,
  enablePreviousButton: true,
  enableNextButton: true,
  transition: 'slide',
  theme: baseTheme
};

const Carousel = withTheme(BaseCarousel);
Carousel.displayName = 'Carousel';

export default BaseCarousel;

export { Carousel, Slide };
