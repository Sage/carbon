import React from 'react';
import Input from './../../utils/decorators/input';
import InputLabel from './../../utils/decorators/input-label';
import InputValidation from './../../utils/decorators/input-validation';

@Input
@InputLabel
@InputValidation
class CheckboxComponent extends React.Component {

  static defaultProps = {
    /* React suggests using checked rather than value for checked box.
       Need to pass checked as boolean from view. */
    defaultChecked: false
  }

  handleOnChange = (ev) => {
    this._handleOnChange({ target: { value: ev.target.checked }});
  }

  get mainClasses() {
    return 'ui-checkbox';
  }

  get inputClasses() {
    return 'ui-checkbox__input';
  }

  get inputProps() {
    var { ...props } = this.props;
    props.className = this.inputClasses;
    props.type = "checkbox";
    props.checked = this.props.checked || this.props.value;
    props.value = "1";
    props.onChange = this.handleOnChange;
    return props;
  }

  get hiddenInputProps() {
    var props = {
      type: "hidden",
      value: "0",
      name: this.inputProps.name,
      readOnly: true
    };

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
