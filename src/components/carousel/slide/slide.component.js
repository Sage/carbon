/* eslint-disable react/prop-types */
import React from 'react';
import { CSSTransition } from 'react-transition-group';
import tagComponent from '../../../utils/helpers/tags/tags';
import { SlideStyle } from './slide.style';
import { isClassic } from '../../../utils/helpers/style-helper';
import baseTheme from '../../../style/themes/base';

const Slide = (props) => {
  if (isClassic(props.theme)) {
    return (
      <CSSTransition
        className='carbon-carouse__transition'
        classNames={ props.transitionName() }
        timeout={ props.timeout }
        { ...props }
      >
        <SlideStyle
          { ...props.slideProps } { ...tagComponent('slide', props) }
        />
      </CSSTransition>
    );
  }

  return (
    <SlideStyle
      { ...props } { ...tagComponent('slide', props) }
    />
  );
};

Slide.defaultProps = {
  theme: baseTheme
};

export default Slide;
