import * as React from "react";
import Slide from "./slide";

export interface CarouselProps {
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
  /** theme is used only to support legacy code */
  theme?: object;
}

declare class Carousel extends React.Component<CarouselProps> {}

export default Carousel;
export { Carousel, Slide };
