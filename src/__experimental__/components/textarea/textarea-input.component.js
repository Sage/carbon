import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputPresentationContext } from '../input/input-presentation.component';
import StyledTextareaInput from './textarea-input.style';

class TextareaInput extends Component {
  static propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    inputRef: PropTypes.func, // a callback to retrieve the input reference
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func
  }

  static contextType = InputPresentationContext

  input = React.createRef()

  componentDidMount() {
    if (this.props.inputRef) this.props.inputRef(this.input);
    if (this.context && this.context.inputRef) this.context.inputRef(this.input);
  }

  handleClick = (ev) => {
    if (this.props.onClick) this.props.onClick(ev);
    this.input.current.focus();
  }

  handleFocus = (ev) => {
    if (this.props.onFocus) this.props.onFocus(ev);
    if (this.context && this.context.onFocus) this.context.onFocus(ev);
    selectTextOnFocus(this.input);
  };

  handleBlur = (ev) => {
    if (this.props.onBlur) this.props.onBlur(ev);
    if (this.context && this.context.onBlur) this.context.onBlur(ev);
  };

  render() {
    const {
      size,
      ...props
    } = this.props;

    return (
      <StyledTextareaInput
        size={ size }
        ref={ this.input }
        onFocus={ this.handleFocus }
        onBlur={ this.handleBlur }
        onClick={ this.handleClick }
        { ...props }
      />
    );
  }
}

TextareaInput.defaultProps = {
  size: 'small'
};

function selectTextOnFocus(input) {
  // setTimeout is required so the dom has a chance to place the cursor in the input
  setTimeout(() => {
    const { length } = input.current.value;
    const cursorStart = input.current.selectionStart;
    const cursorEnd = input.current.selectionEnd;
    // only select text if cursor is at the very end or the very start of the value
    if ((cursorStart === 0 && cursorEnd === 0) || (cursorStart === length && cursorEnd === length)) {
      input.current.setSelectionRange(0, length);
    }
  });
}

export default TextareaInput;
