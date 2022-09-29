import { css } from "styled-components";

const animationStyle = "all 500ms cubic-bezier(.23,1.10,.69,1.01)";
const slideAnimation = css`
  // NEXT
  .slide-next-enter {
    opacity: 0;
    left: 100%;
    position: absolute;
  }

  .slide-next-enter.slide-next-enter-active {
    opacity: 1;
    left: 0;
    transition: ${animationStyle};
  }

  .slide-next-exit {
    opacity: 1;
    left: 0;
    position: relative;
  }

  .slide-next-exit.slide-next-exit-active {
    opacity: 0;
    left: -100%;
    transition: ${animationStyle};
  }

  // PREVIOUS
  .slide-previous-enter {
    opacity: 0;
    left: -100%;
    position: absolute;
  }

  .slide-previous-enter.slide-previous-enter-active {
    opacity: 1;
    left: 0;
    transition: ${animationStyle};
  }

  .slide-previous-exit {
    opacity: 1;
    left: 0;
    position: relative;
  }

  .slide-previous-exit.slide-previous-exit-active {
    opacity: 0;
    left: 100%;
    transition: ${animationStyle};
  }
`;

const fadeAnimation = css`
  // FADE
  .carousel-transition-fade-enter {
    opacity: 0;
    position: absolute;
  }

  .carousel-transition-fade-enter.carousel-transition-fade-enter-active {
    opacity: 1;
    transition: ${animationStyle};
  }

  .carousel-transition-fade-exit {
    opacity: 1;
    position: relative;
  }

  .carousel-transition-fade-exit.carousel-transition-fade-exit-active {
    opacity: 0;
    transition: ${animationStyle};
  }

  .carbon-carousel__transition {
    height: 100%;
  }
`;

export { slideAnimation, fadeAnimation };
