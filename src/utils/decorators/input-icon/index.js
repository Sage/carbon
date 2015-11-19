import React from 'react';
import Icon from './../../../components/icon';

let InputIcon = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  inputIconHTML = (icon) => {
    return (
      <label htmlFor={ this.inputProps.id }>
        <Icon type={ icon } className="ui-input-icon" />
      </label>
    );
  }

};

export default InputIcon;
