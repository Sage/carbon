/* eslint-disable react/no-multi-comp */
import React from 'react';
import InputDecorator from '../../../utils/decorators/input';
import InputLabel from '../../../utils/decorators/input-label';
import InputValidation from '../../../utils/decorators/input-validation';
import tagComponent from '../../../utils/helpers/tags';
import { validProps } from '../../../utils/ether';
import Textbox from '../textbox';

// We use this class as a temporary bridge between the new approach and the decorators,
// we need it as a class to support refs. We can eventually replace this with the new
// Textbox component that is under development.
// eslint-disable-next-line react/prefer-stateless-function
class TextboxBridge extends React.Component {
  render() {
    return <Textbox { ...this.props } />;
  }
}

const Select = InputDecorator(InputLabel(InputValidation(class Select extends React.Component {
  get inputProps() {
    return validProps(this);
  }

  render() {
    return (
      <div
        className={ this.mainClasses }
        ref={ (comp) => { this._target = comp; } }
        { ...tagComponent('select', this.props) }
      >
        { this.labelHTML }
        <div { ...this.fieldProps }>
          <TextboxBridge { ...this.inputProps } />
        </div>
        { this.validationHTML }
        { this.fieldHelpHTML }
      </div>
    );
  }
})));

export default Select;
