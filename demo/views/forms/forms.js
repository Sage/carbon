import React from 'react';
import TextboxDemo from './textbox-demo';
import DecimalDemo from './decimal-demo';
import NumberDemo from './number-demo';
import TextareaDemo from './textarea-demo';
import DropdownDemo from './dropdown-demo';
import DateDemo from './date-demo';
import CheckboxDemo from './checkbox-demo';
import RadioButtonDemo from './radio-button-demo';

class Forms extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div>
        <h1>Forms</h1>
        <CheckboxDemo />
        <RadioButtonDemo/>
        <TextboxDemo />
        <NumberDemo />
        <DecimalDemo />
        <DateDemo />
        <DropdownDemo />
        <TextareaDemo />
      </div>
    );
  }
}

export default Forms;
