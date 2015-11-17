import React from 'react';
import _ from 'lodash';
import { generateInputName } from './../../helpers/forms';

var Input = (ComposedComponent) => class Component extends ComposedComponent {

  constructor(...args) {
    super(...args);
  }

  static propTypes = _.assign({}, ComposedComponent.propTypes, {
    name: React.PropTypes.string.isRequired
  })

  static contextTypes = _.assign({}, ComposedComponent.contextTypes, {
    form: React.PropTypes.object
  })

  shouldComponentUpdate(nextProps, nextState) {
    let changeDetected = super.shouldComponentUpdate ?
      super.shouldComponentUpdate(nextProps, nextState) :
      false;

    if (changeDetected ||
        !_.isEqual(this.props, nextProps) ||
        !_.isEqual(this.state, nextState)) {
      return true;
    }

    return false;
  }

  _handleOnChange = (ev) => {
    if (this.props.onChange) {
      this.props.onChange(ev, this.props);
    }
  }

  get mainClasses() {
    let classes = super.mainClasses || "";
    return `${classes} base-input`;
  }

  get inputClasses() {
    let classes = super.inputClasses || "";
    return `${classes} base-input__input`;
  }

  get inputProps() {
    var inputProps = (super.inputProps) ? super.inputProps : {};

    inputProps.name = generateInputName(this.props.name, this.context.form);

    if (this.props.onChange === inputProps.onChange) {
      inputProps.onChange = this._handleOnChange;
    }

    return inputProps;
  }

};

export default Input;
