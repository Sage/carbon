import React from 'react';
import PropTypes from 'prop-types';
import InputContainer from './input-container.component.js';

class Input extends React.Component {
  static contextTypes = {
    form: PropTypes.object
  }

  isInForm() {
    return this.context.form
      && (typeof this.context.form !== 'undefined');
  }

  handleOnChangeDeferred(ev) {
    clearTimeout(this.deferredTimeout);
    this.deferredTimeout = setTimeout(() => {
      this.props.onChangeDeferred(ev, this.props);
    }, (this.props.deferTimeout || 750));
  }

  handleOnChange = (ev) => {
    // If input is in a form, set the form to dirty
    if (this.isInForm()) this.context.form.setIsDirty();
    // we also send the props so more information
    // can be extracted by the action
    if (this.props.onChange) this.props.onChange(ev, this.props);
    if (this.props.onChangeDeferred) this.handleOnChangeDeferred(ev);
  }

  render() {
    return (
      <input
        { ...this.props }
        className='carbon-input'
        onChange={ this.handleOnChange }
        autoComplete='off'
        data-element='input'
        type='input'
      />
    );
  }
}

export { Input, InputContainer };
