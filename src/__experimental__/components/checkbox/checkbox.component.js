import React from 'react';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';
import { validProps } from '../../../utils/ether';
import FormField from '../form-field';
import CheckboxStyle from './checkbox.style';

const Checkbox = (props) => {
  const formFieldProps = () => {
    const { ...validFormFieldProps } = validProps(
      { propTypes: Checkbox.propTypes, safeProps: ['fieldHelpInline'], props }
    );

    validFormFieldProps.reverse = !props.reverse;

    return validFormFieldProps;
  };

  const inputProps = () => {
    const { ...validInputProps } = validProps(
      { propTypes: Checkbox.propTypes, safeProps: ['disabled', 'onChange'], props }
    );

    validInputProps.type = 'checkbox';
    delete validInputProps.children;
    delete validInputProps.fieldHelp;
    delete validInputProps.labelHelp;
    return validInputProps;
  };

  const checkboxSprite = () => {
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
  };

  return (
    <CheckboxStyle
      { ...tagComponent('checkbox', props) }
      { ...props }
    >
      <FormField
        labelHelpIcon='info'
        { ...formFieldProps() }
      >
        <div className='carbon-checkbox__input'>
          <input
            aria-checked={ props.checked }
            role='checkbox'
            { ...inputProps() }
          />
          {checkboxSprite()}
        </div>
      </FormField>
    </CheckboxStyle>
  );
};

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
