import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/input.component';
import StyledInput from '../input/input.style';

class TextareaInput extends Input {
  static propTypes = {
    maxLength: PropTypes.string
  }

  render() {
    const {
      inputRef,
      onBlur,
      ...props
    } = this.props;

    return (
      <StyledInput
        aria-invalid={ props.hasError }
        as='textarea'
        ref={ this.input }
        onFocus={ this.handleFocus }
        onBlur={ this.handleBlur }
        onClick={ this.handleClick }
        { ...props }
      />
    );
  }
}

export default TextareaInput;
