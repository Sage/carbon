import React from 'react';
import Input from './../../utils/input';
import InputValidation from './../../utils/input/validation';

class CheckboxComponent extends React.Component {

  static defaultProps = { 
    value: false
  }

  render() {

    var mainClasses = 'ui-checkbox ' + 
          this.props.input.mainClasses() + 
          this.props.validation.mainClasses();

    var inputClasses = 'ui-checkbox__input ' + 
          this.props.input.inputClasses() + 
          this.props.validation.inputClasses();

    return(
      <div className={ mainClasses }>

        { this.props.input.labelHTML() }

        <input 
          className={ inputClasses }
          type="checkbox" 
          checked={ this.props.value }
          { ...this.props.input.inputProps() }
        />

        { this.props.validation.errorMessageHTML() }
      </div>
    );
  }
};

export default InputValidation(Input(CheckboxComponent))
