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
  value: PropTypes.string,
  /** Event handler for the change event */
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  onChange: PropTypes.func,
  /** Event handler for the keyDown event */
  onKeyDown: PropTypes.func,
  /** Defered callback called after the onChange event */
  onChangeDeferred: PropTypes.func,
  /** Integer to determine timeout for defered callback */
  deferTimeout: PropTypes.number,
  /** Label */
  label: PropTypes.string,
  /** Text applied to label help tooltip */
  labelHelp: PropTypes.string,
  /** Help content to be displayed under an input */
  fieldHelp: PropTypes.node,
  /** When true, label is placed in line an input */
  labelInline: PropTypes.bool,
  /** Width of a label in percentage. Works only when labelInline is true */
  labelWidth: PropTypes.number,
  /** Width of an input in percentage. Works only when labelInline is true */
  inputWidth: PropTypes.number
};

export default Number;
