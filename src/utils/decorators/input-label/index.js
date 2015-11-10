import React from 'react';
import { generateInputName } from './../../helpers/forms';

var InputLabel = (ComposedComponent) => class Component extends ComposedComponent {

  constructor() {
    super();
  }

  static contextTypes = Object.assign({}, ComposedComponent.contextTypes, {
    form: React.PropTypes.object
  })

  get labelHTML() {
    if (this.props.label === false) { return; }

    var labelText = this.props.label || this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);

    if (this.props.validations) {
      labelText += "*";
    }

    return (
      <label className="base-input__label" htmlFor={ generateInputName(this.props.name, this.context.form) }>{ labelText }</label>
    );
  }

  get inputProps() {
    var inputProps = (super.inputProps) ? super.inputProps : {};

    // set id so label will work correctly
    inputProps.id = generateInputName(this.props.name, this.context.form);

    return inputProps;
  }

};

export default InputLabel;
