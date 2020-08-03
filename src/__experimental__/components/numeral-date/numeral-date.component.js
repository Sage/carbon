import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Events from '../../../utils/helpers/events';
import { StyledNumeralDate, StyledDateField } from './numeral-date.style';
import Textbox from '../textbox';
import guid from '../../../utils/helpers/guid';
import FormField from '../form-field';

const NumeralDate = ({
  dateFormat = ['dd', 'mm', 'yyyy'],
  defaultValue,
  error,
  info,
  warning,
  id,
  name,
  onBlur,
  onChange,
  value,
  validationOnLabel = false,
  label,
  labelInline,
  labelWidth,
  labelAlign,
  labelHelp,
  fieldHelp
}) => {
  const { current: uniqueId } = useRef(id || guid());
  const isControlled = value !== undefined;
  const initialValue = isControlled ? value : defaultValue;

  const [dateValue, setDateValue] = useState({
    ...initialValue
  });

  const onKeyPress = (ev) => {
    const isValidKey = Events.isNumberKey(ev) || Events.isDeletingKey(ev) || Events.isTabKey(ev);

    if (!isValidKey) {
      ev.preventDefault();
    }
  };

  const handleChange = (e, datePart) => {
    if (onChange) {
      onChange(e);
    }
    if (e.target.value !== dateValue[datePart] && e.target.value.length <= datePart.length) {
      setDateValue({ ...dateValue, [datePart]: e.target.value });
    }
  };

  const handleBlur = (ev) => {
    const targetObject = {
      name: ev.target.name,
      id: ev.target.id,
      value: { ...dateValue }
    };

    if (onBlur) {
      onBlur(targetObject);
    }
  };

  return (
    <FormField
      label={ label }
      useValidationIcon={ validationOnLabel }
      id={ uniqueId }
      error={ error }
      warning={ warning }
      info={ info }
      labelInline={ labelInline }
      labelWidth={ labelWidth }
      labelAlign={ labelAlign }
      labelHelp={ labelHelp }
      fieldHelp={ fieldHelp }
    >
      <StyledNumeralDate
        name={ name }
        onBlur={ handleBlur }
        onKeyPress={ onKeyPress }
        data-component='numeral-date'
      >
        {
          dateFormat.map((datePart, index) => {
            const isEnd = index === dateFormat.length - 1;
            const isMiddle = index === 1;

            return (
              <StyledDateField
                key={ datePart }
                isYearInput={ datePart.length === 4 }
                isMiddle={ isMiddle }
                isEnd={ isEnd }
                hasValidationIcon={ typeof (error || warning || info) === 'string' }
              >
                <Textbox
                  placeholder={ datePart }
                  value={ dateValue[datePart] }
                  onChange={ e => handleChange(e, datePart) }
                  onBlur={ handleBlur }
                  error={ !!error }
                  warning={ !!warning }
                  info={ !!info }
                  {
                  ...(isEnd && !validationOnLabel && {
                    error,
                    warning,
                    info
                  })
                  }
                />
              </StyledDateField>
            );
          })
        }
      </StyledNumeralDate>
    </FormField>
  );
};

NumeralDate.propTypes = {
  /** Array of strings to define custom input layout. I.e ['dd', 'mm'] */
  dateFormat: PropTypes.arrayOf(PropTypes.string),
  /** Default value for use in 'uncontrolled` mode  */
  defaultValue: PropTypes.object,
  /**  Value for use in 'controlled` mode  */
  value: PropTypes.object,
  /** Indicate that error has occurred
  Pass string to display icon, tooltip and red border
  Pass true boolean to only display red border */
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate that warning has occurred
  Pass string to display icon, tooltip and orange border
  Pass true boolean to only display orange border */
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Indicate additional information
  Pass string to display icon, tooltip and blue border
  Pass true boolean to only display blue border */
  info: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /** Blur event handler  */
  onBlur: PropTypes.func,
  /** Change event handler */
  onChange: PropTypes.func,
  /** `id` for events */
  id: PropTypes.string,
  /** `name` for events */
  name: PropTypes.string,
  /** When true, validation icon will be placed on label instead of being placed on the input */
  validationOnLabel: PropTypes.bool,
  /** Label */
  label: PropTypes.string,
  /** Text applied to label help tooltip */
  labelHelp: PropTypes.string,
  /** When true, label is placed in line with an input */
  labelInline: PropTypes.bool,
  /** Label alignment. Works only when labelInline is true */
  labelAlign: PropTypes.oneOf(['left', 'right']),
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth: PropTypes.number,
  /** Help content to be displayed under an input */
  fieldHelp: PropTypes.node
};

export default NumeralDate;
