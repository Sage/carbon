import React from 'react';
import PropTypes from 'prop-types';
import { InputPresentationContext } from './input-presentation.component';
import StyledInput from './input.style';

// This is a component in progress to incrementally remove the reliance
// on the input decorators. For now we still rely on inputProps being
// fed into this component from the decorated parent component if you want
// to use the full supported feature set of a Carbon component. Over time we
// will add additional supported on the decorated features without the need
// for the decorators themselves.

class Input extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string,
    inputRef: PropTypes.func, // a callback to retrieve the input reference
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    type: PropTypes.string
  };

  static contextType = InputPresentationContext;

  input = React.createRef();

  componentDidMount() {
    if (this.props.inputRef) this.props.inputRef(this.input);
    if (this.context && this.context.inputRef) this.context.inputRef(this.input);
  }

  handleClick = (ev) => {
    if (this.props.onClick) this.props.onClick(ev);
    this.input.current.focus();
  };

  handleFocus = (ev) => {
    if (this.props.onFocus) this.props.onFocus(ev);
    if (this.context && this.context.onFocus) this.context.onFocus(ev);
    if (this.props.type === 'text') selectTextOnFocus(this.input);
  };

  handleBlur = (ev) => {
    if (this.props.onBlur) this.props.onBlur(ev);
    if (this.context && this.context.onBlur) this.context.onBlur(ev);
  };

  render() {
    const {
      inputRef,
      ...props
    } = this.props;

    return (
      <StyledInput
        { ...props }
        id={ this.props.id || this.props.name }
        ref={ this.input }
        onFocus={ this.handleFocus }
        onBlur={ this.handleBlur }
        onClick={ this.handleClick }
        data-element='input'
      />
    );
  }
}

Input.defaultProps = {
  type: 'text'
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

export default Input;
