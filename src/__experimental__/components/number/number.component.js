import React from 'react';
import PropTypes from 'prop-types';
import InputDecoratorBridge from '../input-decorator-bridge';
import Textbox from '../textbox';

class Number extends React.Component {
  render() {
    return (
      <InputDecoratorBridge
        { ...this.props }
        onChange={ this.handleOnChange }
        onKeyDown={ this.handleKeyDown }
      />
    );
  }

  handleOnChange = (event) => {
    if (isValidNumber(event.target.value) && this.props.onChange) {
      this.props.onChange(event, this.props);
    } else {
      event.target.value = this.props.value || null;
      event.target.setSelectionRange(this.selectionStart, this.selectionEnd);
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

Number.propTypes = {
  ...Textbox.propTypes
};

export default Number;
