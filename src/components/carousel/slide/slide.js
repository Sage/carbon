import React from 'react';
import tagComponent from '../../../utils/helpers/tags';

const Slide = (props) => {
  return (
    <div { ...props } { ...tagComponent('slide', props) } />
  );
};

export default Slide;
