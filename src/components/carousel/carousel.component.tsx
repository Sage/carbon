import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import tagComponent, {
  TagProps,
} from "../../__internal__/utils/helpers/tags/tags";
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

export interface CarouselProps extends TagProps {
  /** Individual tabs */
  children?: React.ReactNode;
  /** [legacy] Custom className */
  className?: string;
  /** Enables the next button */
  enableNextButton?: boolean;
  /** Enables the previous button */
  enablePreviousButton?: boolean;
  /** Enables the slide selector */
  enableSlideSelector?: boolean;
  /** The selected tab on page load */
  initialSlideIndex?: number | string;
  /** Action to be called on slide change */
  onSlideChange?: (index: number, transitionDirection: string) => void;
  /** The selected slide */
  slideIndex?: number | string;
}

const NEXT = "next";
const PREVIOUS = "previous";

export const Carousel = ({
  children,
  className,
  enableSlideSelector = true,
  enablePreviousButton = true,
  enableNextButton = true,
  initialSlideIndex = 0,
  onSlideChange,
  slideIndex,
  ...props
}: CarouselProps) => {
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(
    Number(slideIndex) || Number(initialSlideIndex)
  );
  const transitionDirection = useRef(NEXT);
  const lastSlideIndexProp = useRef(slideIndex);
  const id = useMemo(() => guid(), []);

  const numOfSlides = useMemo(() => {
    return React.Children.toArray(children).filter((child) =>
      React.isValidElement(child)
    ).length;
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

    if (Number(newIndex) > Number(selectedSlideIndex)) {
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

  function onSlideSelection(ev: React.ChangeEvent<HTMLInputElement>) {
    const newSlideSelection = Number(ev.target.value);
    transitionDirection.current =
      newSlideSelection > selectedSlideIndex ? NEXT : PREVIOUS;
    handleSlideChange(newSlideSelection);
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
          {children}
        </CarouselSliderWrapper>
        {nextButton()}
      </div>
      {slideSelector()}
    </CarouselWrapperStyle>
  );
};

Carousel.displayName = "Carousel";

export default Carousel;
