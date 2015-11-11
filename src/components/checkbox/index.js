import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

@Input
@InputLabel
@InputValidation
class CheckboxComponent extends React.Component {

  static defaultProps = {
  customInputProps = () => {
    let { onChange, ...props } = this.props.input.inputProps();
  get mainClasses() {
    return 'ui-checkbox';
  }

  get inputClasses() {
    return 'ui-checkbox__input';
  }

  get inputProps() {
    var { onChange, ...props } = this.props;
    props.className = this.inputClasses;
    props.type = "checkbox";
    props.checked = this.props.checked || this.props.value;
    props.value = "1";
    props.onChange = this.handleOnChange;
    return props;
  }

  get hiddenInputProps() {
    var props = {
      ref: "hidden",
      type: "hidden",
      value: "0",
      name: this.inputProps.name,
      readOnly: true
    }

    return props;
  }

  render() {
    return(
      <div className={ this.mainClasses }>

        { this.labelHTML }
        <input { ...this.inputProps } />
        <input { ...this.hiddenInputProps } />
        { this.validationHTML }

      </div>
    );
  }
}

export default CheckboxComponent;
