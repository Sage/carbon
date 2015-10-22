import React from 'react';
import Input from './../../utils/input';
import InputValidation from './../../utils/input/validation';

class CheckboxComponent extends React.Component {

  static defaultProps = { 
    value: false
  }

  handleClick = (ev) => {
    this.props.onClick({ target: { value: ev.target.checked }}, this.props);
  }

  customInputProps = () => {
    var { onChange, ...props } = this.props.input.inputProps();

    props.onClick = this.handleClick;

    return props;
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
          ref="hidden"
          type="hidden"
          value='0'
          name={ this.props.input.inputProps().name }
          readOnly
        />

        <input
          className={ inputClasses }
          type="checkbox" 
          checked={ this.props.value }
          { ...this.customInputProps() }
        />

        { this.props.validation.errorMessageHTML() }
      </div>
    );
  }
};

export default InputValidation(Input(CheckboxComponent))
