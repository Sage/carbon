import React, { useState } from 'react';
import PropTypes from 'prop-types';
import invariant from 'invariant';
import Events from '../../../utils/helpers/events';
import { StyledNumeralDate, StyledDateField } from './numeral-date.style';
import Textbox from '../textbox';
import { InputGroupBehaviour } from '../../../__internal__/input-behaviour';

const NumeralDate = ({
  dateFormat,
  defaultValue,
  error,
  info,
  warning,
  id,
  name,
  onBlur,
  onChange,
  value
}) => {
  const isControlled = value !== undefined;
  const initialValue = isControlled ? value : defaultValue;
  invariant(
    initialValue !== undefined,
    'This component has no initial value'
  );

  const [isActive, setIsActive] = useState();
  const [dateValue, setDateValue] = useState({
    ...initialValue
  });

  const onKeyPress = (ev) => {
    const isValidKey = Events.isNumberKey(ev) || Events.isDeletingKey(ev) || Events.isTabKey(ev);

    if (!isValidKey) {
      ev.preventDefault();
    }
  };

  const handleChange = (e, itemId) => {
    if (onChange) {
      onChange(e);
    }
    if (e.target.value !== dateValue[itemId] && e.target.value.length <= itemId.length) {
      setDateValue({ ...dateValue, [itemId]: e.target.value });
    }
  };

  const handleOnFocus = () => {
    setIsActive(true);
  };

  const handleBlur = (ev) => {
    const targetObject = {
      name: ev.target.name,
      id: ev.target.id,
      value: { ...dateValue }
    };

    setIsActive(false);

    if (onBlur) {
      onBlur(targetObject);
    }
  };

  return (
    <InputGroupBehaviour>
      <StyledNumeralDate
        name={ name }
        id={ id }
        isActive={ isActive }
        onBlur={ handleBlur }
        onKeyPress={ onKeyPress }
        onFocus={ handleOnFocus }
        data-component='numeral-date'
      >
        {
          dateFormat.map((datePart, textboxNumber) => {
            const isEnd = textboxNumber === dateFormat.length - 1;
            return (
              <StyledDateField
                key={ datePart }
                isYearInput={ datePart.length === 4 }
                isMiddle={ textboxNumber === 1 }
                isEnd={ isEnd }
                hasValidationIcon={ error || warning || info }
                twoPartDate={ textboxNumber <= 1 }
                dateFormatLength={ dateFormat.length }
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
                  ...(isEnd && {
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
    </InputGroupBehaviour>
  );
};

NumeralDate.propTypes = {
  /** Prop array string to define custom layout. Use a comma to seperate values. */
  dateFormat: PropTypes.arrayOf(PropTypes.string),
  /** Prop for `uncontrolled` use */
  defaultValue: PropTypes.object,
  /** Prop for `controlled` use */
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
  /** Prop for `onBlur` events */
  onBlur: PropTypes.func,
  /** Prop for `onChange` events */
  onChange: PropTypes.func,
  /** Prop for `id` events */
  id: PropTypes.string,
  /** Prop for `inputIcon` events */
  inputIcon: PropTypes.string,
  /** Prop for `tooltipMessage` events */
  tooltipMessage: PropTypes.string,
  /** Prop for `name` events */
  name: PropTypes.string,
  /** Prop for placeholder */
  // eslint-disable-next-line react/no-unused-prop-types
  placeholder: PropTypes.string
};

NumeralDate.defaultProps = { dateFormat: ['dd', 'mm', 'yyyy'] };

export default NumeralDate;
