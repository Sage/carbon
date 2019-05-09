import React from 'react';
import PropTypes from 'prop-types';
import Input from '../input/input.component';
import StyledTextarea from './textarea.style';

class TextareaInput extends Input {
  static propTypes = {
    maxLength: PropTypes.string
  }

  render() {
    const {
      inputRef,
      ...props
    } = this.props;

    return (
      <StyledTextarea
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
