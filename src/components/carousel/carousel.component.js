import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { compact } from "lodash";
import { withTheme } from "styled-components";
import tagComponent from "../../__internal__/utils/helpers/tags/tags";
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
import guid from "../../__internal__/utils/helpers/guid";
import baseTheme from "../../style/themes/base";

const NEXT = "next";
const PREVIOUS = "previous";

const BaseCarousel = ({
  children,
  className,
  enableSlideSelector = true,
  enablePreviousButton = true,
  enableNextButton = true,
  initialSlideIndex = 0,
  onSlideChange,
  slideIndex,
  theme = baseTheme,
  ...props
}) => {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(
    Number(slideIndex) || Number(initialSlideIndex)
  );
  const transitionDirection = useRef(NEXT);
  const lastSlideIndexProp = useRef(props.slideIndex);
  const id = guid();

  const numOfSlides = useMemo(() => {
    return Array.isArray(children) ? compact(children).length : 1;
  }, [children]);

  const handleSlideChange = useCallback(
    (newIndex) => {
      setSelectedSlideIndex(newIndex);

      if (onSlideChange) {
        onSlideChange(newIndex, transitionDirection.current);
      }
    },
    [onSlideChange]
  );

  useEffect(() => {
    const newIndex = slideIndex;
    const isNewIndexUndefined = typeof newIndex === "undefined";
    const isTheSameIndex =
      newIndex === lastSlideIndexProp.current ||
      newIndex === selectedSlideIndex;

    if (isNewIndexUndefined || isTheSameIndex) return;

    if (newIndex > selectedSlideIndex) {
      transitionDirection.current = NEXT;
    } else {
      transitionDirection.current = PREVIOUS;
    }

    lastSlideIndexProp.current = newIndex;
    handleSlideChange(newIndex);
  }, [handleSlideChange, slideIndex, selectedSlideIndex]);

  function onPreviousClick() {
    const newIndex = selectedSlideIndex - 1;
    transitionDirection.current = PREVIOUS;
    handleSlideChange(newIndex);
  }

  function onNextClick() {
    const newIndex = selectedSlideIndex + 1;
    transitionDirection.current = NEXT;
    handleSlideChange(newIndex);
  }

  function onSlideSelection(ev) {
    const newSlideSelection = Number(ev.target.value);
    transitionDirection.current =
      newSlideSelection > selectedSlideIndex ? NEXT : PREVIOUS;
    handleSlideChange(newSlideSelection);
  }

  function visibleSlides() {
    const arrayWithKeys = React.Children.map(children, (element, key) => {
      return React.cloneElement(element, {
        key: `slide-${guid()}`,
        id: key,
        selectedIndex: selectedSlideIndex,
        theme,
        ...element.props,
      });
    });

    return arrayWithKeys;
  }

  function slideSelector() {
    if (!enableSlideSelector) return null;

    const buttons = [];

    for (let i = 0; i < numOfSlides; i++) {
      buttons.push(
        <CarouselSelectorInputWrapperStyle
          key={i}
          data-element="selector-inputs"
        >
          <CarouselSelectorInputStyle
            data-element="selector-input"
            name={`carousel-slide-${id}`}
            id={`carousel-slide-${i}-${id}`}
            type="radio"
            value={i}
            onChange={onSlideSelection}
            checked={selectedSlideIndex === i}
          />
          <CarouselSelectorLabelStyle
            data-element="selector-label"
            htmlFor={`carousel-slide-${i}-${id}`}
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

  function previousButton() {
    if (!enablePreviousButton) return null;
    const isDisabled = selectedSlideIndex === 0;

    return (
      <CarouselPreviousButtonWrapperStyle>
        <CarouselButtonStyle
          onClick={onPreviousClick}
          data-element="previous"
          aria-label="previous"
          disabled={isDisabled}
        >
          <CarouselStyledIconLeft type="chevron_down" />
        </CarouselButtonStyle>
      </CarouselPreviousButtonWrapperStyle>
    );
  }

  function nextButton() {
    if (!enableNextButton) return null;
    const isDisabled = numOfSlides === selectedSlideIndex + 1;

    return (
      <CarouselNextButtonWrapperStyle>
        <CarouselButtonStyle
          onClick={onNextClick}
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
  return (
    <CarouselWrapperStyle
      className={className}
      {...tagComponent("carousel", props)}
    >
      <div className="carbon-carousel__content">
        {previousButton()}
        <CarouselSliderWrapper elementIndex={selectedSlideIndex}>
          {visibleSlides()}
        </CarouselSliderWrapper>
        {nextButton()}
      </div>
      {slideSelector()}
    </CarouselWrapperStyle>
  );
};

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

const Carousel = withTheme(BaseCarousel);
Carousel.displayName = "Carousel";

export default BaseCarousel;

export { Carousel, Slide };
