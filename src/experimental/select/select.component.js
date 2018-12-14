import React from 'react';
import { Input, InputBox } from './../input';
import InputDecorator from '../../utils/decorators/input';
import InputLabel from '../../utils/decorators/input-label';
import InputValidation from '../../utils/decorators/input-validation';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';

const Select = InputDecorator(InputLabel(InputValidation(class Select extends React.Component {
  get mainClasses() {
    return 'carbon-select';
  }

  get inputClasses() {
    return 'carbon-select__input';
  }

  get inputProps() {
    const { ...props } = validProps(this);
    props.className = this.inputClasses;
    return props;
  }

  render() {
    return (
      <div
        className={ this.mainClasses }
        ref={ (comp) => { this._target = comp; } }
        { ...tagComponent('select', this.props) }
      >
        { this.labelHTML }
        <InputBox { ...this.fieldProps }>
          <Input { ...this.inputProps } />
        </InputBox>
        { this.validationHTML }
        { this.fieldHelpHTML }
      </div>
    );
  }
})));

export default Select;
