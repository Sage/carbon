import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import notes from './documentation';
import { Carousel, Slide } from './carousel.js';

storiesOf('Carousel', module)
  .addParameters({
    info: {
      propTablesExclude: [Slide]
    }
  })
  .add('default', () => {
    const indexConfig = [0, 1, 2, 3, 4];
    const transitionConfig = ['slide', 'fade'];

    const initialSlideIndex = select('initialSlideIndex', indexConfig, Carousel.defaultProps.initialSlideIndex);
    const slideIndex = select('slideIndex', indexConfig, indexConfig[0]);
    const enableSlideSelector = boolean('enableSlideSelector', Carousel.defaultProps.enableSlideSelector);
    const enablePreviousButton = boolean('enablePreviousButton', Carousel.defaultProps.enablePreviousButton);
    const enableNextButton = boolean('enableNextButton', Carousel.defaultProps.enableNextButton);
    const transition = select(
      'transition',
      transitionConfig,
      Carousel.defaultProps.transition
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
