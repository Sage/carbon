import React from 'react';
import PropTypes from 'prop-types';
import InputDecoratorBridge from '../input-decorator-bridge';

const Number = (props) => {
  let formField, selectionStart, selectionEnd, deferredTimeout;

  return (
    <InputDecoratorBridge
      { ...props }
      formFieldRef={ assignForm }
      onChange={ handleOnChange }
      onKeyDown={ handleKeyDown }
    />
  );

  function assignForm(passedFormField) {
    formField = passedFormField;
  }

  function handleOnChange(event) {
    if (isValidNumber(event.target.value)) {
      formField.current.updateForm(event);

      if (props.onChange) props.onChange(event, props);

      //handleOnChangeDeferred(event);
    } else {
      // reset the value
      event.target.value = props.value || null;
      // reset the selection range
      event.target.setSelectionRange(selectionStart, selectionEnd);
    }
  }

  function handleOnChangeDeferred(event) {
    if (props.onChangeDeferred) {
      clearTimeout(deferredTimeout);
      deferredTimeout = setTimeout(() => {
        props.onChangeDeferred(event);
      }, props.deferTimeout);
    }
  }

  function handleKeyDown(ev) {
    // track the selection start and end
    selectionStart = ev.target.selectionStart;
    selectionEnd = ev.target.selectionEnd;

    if (props.onKeyDown) {
      // we also send the props so more information can be extracted by the action
      props.onKeyDown(ev, props);
    }
  }
};

function isValidNumber(value) {
  const regex = new RegExp('^[-]?[0-9]*$');
  const result = regex.test(value);

  return result;
}

Number.defaultProps = {
  deferTimeout: 750
};

Number.propTypes = {
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  value: PropTypes.string,
  onChangeDeferred: PropTypes.func,
  deferTimeout: PropTypes.number
};

export default Number;
