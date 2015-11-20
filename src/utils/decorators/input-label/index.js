import React from 'react';
import { generateInputName } from './../../helpers/forms';
import _ from 'lodash';

let InputLabel = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  static contextTypes = _.assign({}, ComposedComponent.contextTypes, {
    form: React.PropTypes.object
  })

  get labelHTML() {
    if (this.props.label === false) { return; }

    let labelText = this.props.label || this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1);

    if (this.props.validations) {
      labelText += "*";
    }

    return (
      <label className="base-input__label" htmlFor={ generateInputName(this.props.name, this.context.form) }>{ labelText }</label>
    );
  }

  get inputProps() {
    let inputProps = (super.inputProps) ? super.inputProps : {};

    // set id so label will work correctly
    inputProps.id = generateInputName(this.props.name, this.context.form);

    return inputProps;
  }

};

export default InputLabel;
