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

// Switch the old class for the new one until we refactor out
// the input decorators
const classNamesForInput = className => (
  className ? className.replace('common-input__input', 'carbon-input') : 'carbon-input'
);

const handleFocus = (context, onFocus, input) => (ev) => {
  if (onFocus) onFocus(ev);
  if (context && context.onFocus) context.onFocus(ev);
  input.current.setSelectionRange(0, input.current.value.length);
};

const handleBlur = (context, onBlur) => (ev) => {
  if (onBlur) onBlur(ev);
  if (context && context.onBlur) context.onBlur(ev);
};

const Input = React.forwardRef(({
  className,
  onBlur,
  onFocus,
  ...props
}, ref) => (
  <InputPresentationContext.Consumer>
    {
      context => (
        <input
          ref={ ref }
          className={ classNamesForInput(className) }
          onFocus={ handleFocus(context, onFocus, ref) }
          onBlur={ handleBlur(context, onBlur) }
          { ...props }
        />
      )
    }
  </InputPresentationContext.Consumer>
));

Input.propTypes = {
  className: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

export default Input;
