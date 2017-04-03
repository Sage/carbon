import React from 'react';
import { tagComponent } from '../../../utils/helpers/tags';

export default (props) => {
  return (
    <div { ...props } { ...tagComponent('slide', props) } />
  );
};
