import React from 'react';
import './options-container.style.scss'
import { InputBoxContext } from './../input';

const OptionsContainer = props => (
  <InputBoxContext.Consumer>
    {
      context => (
        <div className='carbon-options-container'>{ props.children }</div>
      )
    }
  </InputBoxContext.Consumer>
);

export default OptionsContainer;
