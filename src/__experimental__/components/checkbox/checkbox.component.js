import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { validProps } from '../../../utils/ether';
import FormField from '../form-field';
import CheckboxStyle from './checkbox.style';

class Checkbox extends React.Component {
  get checkboxStyleProps() {
    return {
      checked: this.props.checked,
      disabled: this.props.disabled,
      error: this.props.error,
      fieldHelpInline: this.props.fieldHelpInline,
      inputWidth: this.props.inputWidth,
      labelAlign: this.props.labelAlign,
      labelWidth: this.props.labelWidth,
      reverse: this.props.reverse,
      size: this.props.size
    };
  }

  get formFieldProps() {
    const { ...props } = validProps(this, ['fieldHelpInline']);

    props.reverse = !this.props.reverse;

    return props;
  }

  get inputProps() {
    const { ...props } = validProps(this, ['disabled', 'onChange']);
    // React uses checked instead of value to define the state of a checkbox
    props.className = this.inputClasses;
    props.type = 'checkbox';
    delete props.children;
    delete props.fieldHelp;
    delete props.labelHelp;
    return props;
  }

  get checkboxSprite() {
    return (
      <svg
        width='12' height='10'
        viewBox='0 0 12 10'
      >
        <path
          d={ 'M.237 6.477A.752.752 0 0 1 .155 5.47l.851-1.092a.63.63 0 0 1 .934-.088l2.697 1.964, '
            + '4.674-6a.63.63 0 0 1 .933-.088l1.015.917c.28.254.317.703.081 1.005L6.353 8.492a.725.725, '
            + '0 0 1-.095.16l-.85 1.093a.637.637 0 0 1-.626.244.638.638 0 0 1-.335-.16L.237 6.476z' }
          className='checkbox-check'
          fill='#FFFFFF'
          fillRule='evenodd'
        />
      </svg>
    );
  }

  render() {
    return (
      <CheckboxStyle
        { ...tagComponent('checkbox', this.props) }
        { ...this.checkboxStyleProps }
      >
        <FormField
          labelHelpIcon='info'
          { ...this.formFieldProps }
        >
          <div className='carbon-checkbox__input'>
            <input
              aria-checked={ this.props.checked }
              role='checkbox'
              { ...this.inputProps }
            />
            {this.checkboxSprite}
          </div>
        </FormField>
      </CheckboxStyle>
    );
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fieldHelpInline: PropTypes.bool,
  inputWidth: PropTypes.number,
  labelAlign: PropTypes.string,
  labelWidth: PropTypes.number,
  onChange: PropTypes.func,
  reverse: PropTypes.bool,
  size: PropTypes.string
};

Checkbox.defaultProps = {
  reverse: false
};

export default Checkbox;
