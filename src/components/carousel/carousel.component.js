import React from "react";
import PropTypes from "prop-types";
import { compact } from "lodash";
import { withTheme } from "styled-components";
import tagComponent from "../../utils/helpers/tags/tags";
import Slide from "./slide/slide.component";
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
  CarouselSliderWrapper,
} from "./carousel.style";
import guid from "../../utils/helpers/guid";
import baseTheme from "../../style/themes/base";

const NEXT = "next";
const PREVIOUS = "previous";

class BaseCarousel extends React.Component {
  constructor(...args) {
    super(...args);

    /** Direction of animation */
    this.transitionDirection = NEXT;

    this.onPreviousClick = this.onPreviousClick.bind(this);
    this.onNextClick = this.onNextClick.bind(this);
    this.onSlideSelection = this.onSlideSelection.bind(this);
    this.numOfSlides = this.numOfSlides.bind(this);
    this.slideSelector = this.slideSelector.bind(this);
    this.id = guid();
  }

  state = {
    // Currently selected slide
    selectedSlideIndex:
      Number(this.props.slideIndex) || Number(this.props.initialSlideIndex),
  };

  /** A lifecycle method that is called before re-render. */
  componentDidUpdate(prevProps) {
    if (this.props.slideIndex === prevProps.slideIndex) return;

    if (typeof this.props.slideIndex === "undefined") return;

    const newIndex = this.props.slideIndex;
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
    const newIndex = this.state.selectedSlideIndex - 1;
    this.transitionDirection = PREVIOUS;
    this.handleSlideChange(newIndex);
  }

  /** Handles clicking on the next button */
  onNextClick() {
    const newIndex = this.state.selectedSlideIndex + 1;
    this.transitionDirection = NEXT;
    this.handleSlideChange(newIndex);
  }

  /** Handles clicking slide selector */
  onSlideSelection(ev) {
    const newSlideSelection = Number(ev.target.value);
    this.transitionDirection =
      newSlideSelection > this.state.selectedSlideIndex ? NEXT : PREVIOUS;
    this.handleSlideChange(newSlideSelection);
  }

  /** Handle the slide change to the newIndex */
  handleSlideChange(newIndex) {
    this.setState({ selectedSlideIndex: newIndex });

    if (this.props.onSlideChange) {
      this.props.onSlideChange(newIndex, this.transitionDirection);
    }
  }

  /** Gets the number of slides */
  numOfSlides() {
    return Array.isArray(this.props.children)
      ? compact(this.props.children).length
      : 1;
  }

  visibleSlides() {
    const arrayWithKeys = React.Children.map(
      this.props.children,
      (element, key) => {
        return React.cloneElement(element, {
          key: `slide-${guid()}`,
          id: key,
          selectedIndex: this.state.selectedSlideIndex,
          theme: this.props.theme,
          ...element.props,
        });
      }
    );

    return arrayWithKeys;
  }

  /** Renders the slideSelector footer */
  slideSelector() {
    if (!this.props.enableSlideSelector) return null;

    const buttons = [];

    for (let i = 0; i < this.numOfSlides(); i++) {
      buttons.push(
        <CarouselSelectorInputWrapperStyle
          key={i}
          data-element="selector-inputs"
        >
          <CarouselSelectorInputStyle
            data-element="selector-input"
            name={`carousel-slide-${this.id}`}
            id={`carousel-slide-${i}-${this.id}`}
            type="radio"
            value={i}
            onChange={this.onSlideSelection}
            checked={this.state.selectedSlideIndex === i}
          />
          <CarouselSelectorLabelStyle
            data-element="selector-label"
            htmlFor={`carousel-slide-${i}-${this.id}`}
          />
        </CarouselSelectorInputWrapperStyle>
      );
    }

    return (
      <CarouselSelectorWrapperStyle data-element="slide-selector">
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
          onClick={this.onPreviousClick}
          data-element="previous"
          aria-label="previous"
          disabled={isDisabled}
        >
          <CarouselStyledIconLeft type="chevron_down" />
        </CarouselButtonStyle>
      </CarouselPreviousButtonWrapperStyle>
    );
  }

  /** Renders the next button */
  nextButton() {
    if (!this.props.enableNextButton) return null;
    const isDisabled = this.numOfSlides() === this.state.selectedSlideIndex + 1;

    return (
      <CarouselNextButtonWrapperStyle>
        <CarouselButtonStyle
          onClick={this.onNextClick}
          data-element="next"
          aria-label="next"
          type="button"
          disabled={isDisabled}
        >
          <CarouselStyledIconRight type="chevron_down" />
        </CarouselButtonStyle>
      </CarouselNextButtonWrapperStyle>
    );
  }

  /** Renders the Slide Component */
  render() {
    return (
      <CarouselWrapperStyle
        className={this.props.className}
        {...tagComponent("carousel", this.props)}
      >
        <div className="carbon-carousel__content">
          {this.previousButton()}
          <CarouselSliderWrapper elementIndex={this.state.selectedSlideIndex}>
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
  initialSlideIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The selected slide */
  slideIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Individual tabs */
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  /** Enables the slide selector */
  enableSlideSelector: PropTypes.bool,
  /** Enables the previous button */
  enablePreviousButton: PropTypes.bool,
  /** Enables the next button */
  enableNextButton: PropTypes.bool,
  /** Action to be called on slide change */
  onSlideChange: PropTypes.func,
  /** theme is used only to support legacy code */
  theme: PropTypes.object,
};

BaseCarousel.defaultProps = {
  initialSlideIndex: 0,
  enableSlideSelector: true,
  enablePreviousButton: true,
  enableNextButton: true,
  theme: baseTheme,
};

const Carousel = withTheme(BaseCarousel);
Carousel.displayName = "Carousel";

export default BaseCarousel;

export { Carousel, Slide };
