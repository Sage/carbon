import React from 'react';
import PropTypes from 'prop-types';
import InputDecoratorBridge from '../input-decorator-bridge';

class Number extends React.Component {
  inst = Math.random();

  render() {
    return (
      <InputDecoratorBridge
        { ...this.props }
        formFieldRef={ this.assignForm }
        onChange={ this.handleOnChange }
        onKeyDown={ this.handleKeyDown }
      />
    );
  }

  assignForm = (passedFormField) => {
    this.formField = passedFormField;
  };

  handleOnChange = (event) => {
    if (isValidNumber(event.target.value)) {
      this.formField.current.updateForm(event);

      if (this.props.onChange) {
        this.props.onChange(event, this.props);
      }

      this.handleOnChangeDeferred(event);
    } else {
      event.target.value = this.props.value || null;
      event.target.setSelectionRange(this.selectionStart, this.selectionEnd);
    }
  };

  handleOnChangeDeferred = (event) => {
    if (this.props.onChangeDeferred) {
      clearTimeout(this.deferredTimeout);

      this.deferredTimeout = setTimeout(() => {
        this.props.onChangeDeferred(event);
      }, this.props.deferTimeout);
    }
  };

  handleKeyDown = (ev) => {
    this.selectionStart = ev.target.selectionStart;
    this.selectionEnd = ev.target.selectionEnd;

    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev, this.props);
    }
  };
}

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
