import { css } from 'styled-components';

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
  transition: all 500ms cubic-bezier(.23,1.10,.69,1.01);
}

.slide-next-leave {
  opacity: 1;
  left: 0;
  position: relative;
}

.slide-next-leave.slide-next-leave-active {
  opacity: 0;
  left: -100%;
  transition: all 500ms cubic-bezier(.23,1.10,.69,1.01);
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
  transition: all 500ms cubic-bezier(.23,1.10,.69,1.01);
}

.slide-previous-leave {
  opacity: 1;
  left: 0;
  position: relative;
}

.slide-previous-leave.slide-previous-leave-active {
  opacity: 0;
  left: 100%;
  transition: all 500ms cubic-bezier(.23,1.10,.69,1.01);
}`;

const fadeAnimation = css`

// FADE
.carousel-transition-fade-enter {
  opacity: 0;
  position: absolute;
}

.carousel-transition-fade-enter.carousel-transition-fade-enter-active {
  opacity: 1;
  transition: all 500ms cubic-bezier(.23,1.10,.69,1.01);
}

.carousel-transition-fade-leave {
  opacity: 1;
  position: relative;
}

.carousel-transition-fade-leave.carousel-transition-fade-leave-active {
  opacity: 0;
  transition: all 500ms cubic-bezier(.23,1.10,.69,1.01);
}

.carbon-carousel__transition{
  height: 100%;
}`;

export { slideAnimation, fadeAnimation };
