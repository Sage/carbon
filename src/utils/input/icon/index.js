import React from 'react';
import Icon from './../../icon';

var InputIcon = (ComposedComponent) => class extends React.Component {
  inputIconHTML = (icon, inputID) => {
    return (
      <label htmlFor={ inputID }>
        <Icon type={ icon } className="ui-input-icon" />
      </label>
    );
  }

  exposedMethods = () => {
    return {
      inputIconHTML: this.inputIconHTML
    };
  }

  render() {
    return (
      <ComposedComponent icon={this.exposedMethods()} {...this.props} />
    );
  }

}

export default InputIcon;
