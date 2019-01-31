import React from 'react';
import PropTypes from 'prop-types';
import { InputPresentationContext } from './input-presentation.component';
import './input.style.scss';

// This is a component in progress to incrementally remove the reliance
// on the input decorators. For now we still rely on inputProps being
// fed into this component from the decorated parent component if you want
// to use the full supported feature set of a Carbon component. Over time we
// will add additional supported on the decorated features without the need
// for the decorators themselves.

// Switch the old class for the new one until we refactor out the input decorators
const classNamesForInput = className => (
  className ? className.replace('common-input__input', 'carbon-input') : 'carbon-input'
);

const selectTextOnFocus = (input) => {
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
};

const handleFocus = (context, onFocus, input) => (ev) => {
  if (onFocus) onFocus(ev);
  if (context && context.onFocus) context.onFocus(ev);
  selectTextOnFocus(input);
};

const handleBlur = (context, onBlur) => (ev) => {
  if (onBlur) onBlur(ev);
  if (context && context.onBlur) context.onBlur(ev);
};

class Input extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    inputRef: PropTypes.func // a callback to retrieve the input reference
  }

  static contextType = InputPresentationContext

  input = React.createRef()

  componentDidMount() {
    if (this.props.inputRef) this.props.inputRef(this.input);
  }

  render() {
    const {
      className,
      onBlur,
      onFocus,
      inputRef,
      ...props
    } = this.props;

    return (
      <input
        ref={ this.input }
        className={ classNamesForInput(className) }
        onFocus={ handleFocus(this.context, onFocus, this.input) }
        onBlur={ handleBlur(this.context, onBlur) }
        { ...props }
      />
    );
  }
}

export default Input;
