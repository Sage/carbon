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

    const styleElement = {
      height: '400px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 10px 30px 0 rgba(0,20,29,0.1), 0 30px 60px 0 rgba(0,20,29,0.1)',
      margin: '0 auto'
    };

    const ExampleCustomElement = (props) => {
      return (
        <div style={ { ...styleElement, ...props.style } }>
          {props.children}
        </div>
      );
    };

    return (
      <Carousel
        initialSlideIndex={ initialSlideIndex }
        slideIndex={ slideIndex }
        enableSlideSelector={ enableSlideSelector }
        enablePreviousButton={ enablePreviousButton }
        enableNextButton={ enableNextButton }
        transition={ transition }
      >
        <Slide style={ { textAlign: 'center' } }>
          <ExampleCustomElement style={ { backgroundColor: '#003349' } }>
            <h1 style={ { textAlign: 'center', color: '#090' } }>Slide 1</h1>
          </ExampleCustomElement>
        </Slide>
        <Slide onClick={ () => console.log('test') }>
          <ExampleCustomElement style={ { backgroundColor: '#a85a00' } }>
            <h1 style={ { textAlign: 'center', color: '#fff' } }>Full clickable slide</h1>
          </ExampleCustomElement>
        </Slide>
        <Slide>
          <ExampleCustomElement style={ { backgroundColor: '#69418f' } }>
            <h1 style={ { color: '#fff' } }>Slide 3</h1>
          </ExampleCustomElement>
        </Slide>
        <Slide>
          <ExampleCustomElement style={ { backgroundColor: '#fcba03' } }>
            <h1 style={ { color: '#fff' } }>Slide 4</h1>
          </ExampleCustomElement>
        </Slide>
        <Slide>
          <ExampleCustomElement style={ { backgroundColor: '#02d1c0' } }>
            <h1 style={ { color: '#fff' } }>Slide 5</h1>
          </ExampleCustomElement>
        </Slide>
      </Carousel>
    );
  }, {
    notes: { markdown: notes }
  });
