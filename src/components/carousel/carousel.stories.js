import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean } from '@storybook/addon-knobs';
import notes from './notes.md';
import { Carousel, Slide } from './carousel.js';

storiesOf('Carousel', module)
  .addParameters({
    info: {
      propTablesExclude: [Slide]
    }
  })
  .add('default', () => {
    const initialSlideIndex = select('initialSlideIndex', [0, 1, 2, 3, 4], 0);
    const slideIndex = select('slideIndex', [0, 1, 2, 3, 4], 0);
    const enableSlideSelector = boolean('enableSlideSelector', true);
    const enablePreviousButton = boolean('enablePreviousButton', true);
    const enableNextButton = boolean('enableNextButton', true);
    const transition = select('transition', ['slide', 'fade'], 'slide');
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
