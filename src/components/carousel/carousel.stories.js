import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import notes from './documentation';
import CarouselWithoutHOC, { Carousel, Slide } from './carousel.component';

storiesOf('Carousel', module)
  .addParameters({
    info: {
      propTablesExclude: [Slide]
    }
  })
  .add('default', () => {
    const indexConfig = [0, 1, 2, 3, 4];
    const transitionConfig = ['slide', 'fade'];

    const initialSlideIndex = select('initialSlideIndex', indexConfig, CarouselWithoutHOC.defaultProps.initialSlideIndex);
    const slideIndex = select('slideIndex', indexConfig, indexConfig[0]);
    const enableSlideSelector = boolean('enableSlideSelector', CarouselWithoutHOC.defaultProps.enableSlideSelector);
    const enablePreviousButton = boolean('enablePreviousButton', CarouselWithoutHOC.defaultProps.enablePreviousButton);
    const enableNextButton = boolean('enableNextButton', CarouselWithoutHOC.defaultProps.enableNextButton);
    const transition = select(
      'transition',
      transitionConfig,
      CarouselWithoutHOC.defaultProps.transition
    );

    return (
      <Carousel
        initialSlideIndex={ initialSlideIndex }
        slideIndex={ slideIndex }
        enableSlideSelector={ enableSlideSelector }
        enablePreviousButton={ enablePreviousButton }
        enableNextButton={ enableNextButton }
        transition={ transition }
      >
        <Slide>
          <h1 style={ { textAlign: 'center' } }>Slide One</h1>
        </Slide>
        <Slide>
          <h1 style={ { textAlign: 'center' } }>Slide Two</h1>
        </Slide>
        <Slide>
          <h1 style={ { textAlign: 'center' } }>Slide Three</h1>
        </Slide>
        <Slide>
          <h1 style={ { textAlign: 'center' } }>Slide Four</h1>
        </Slide>
        <Slide>
          <h1 style={ { textAlign: 'center' } }>Slide Five</h1>
        </Slide>
      </Carousel>
    );
  }, {
    notes: { markdown: notes }
  });
