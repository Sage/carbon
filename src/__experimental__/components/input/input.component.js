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

class Input extends React.Component {
  _input = React.createRef();

  // Switch the old class for the new one until we refactor out
  // the input decorators
  classNamesForInput(className) {
    return className ? className.replace('common-input__input', 'carbon-input') : 'carbon-input';
  }

  handleFocus(context, onFocus) {
    return (ev) => {
      if (onFocus) onFocus(ev);
      if (context && context.onFocus) context.onFocus(ev);
      this._input.setSelectionRange(0, this._input.value.length);
    };
  }

  handleBlur(context, onBlur) {
    return (ev) => {
      if (onBlur) onBlur(ev);
      if (context && context.onBlur) context.onBlur(ev);
    };
  }

  render() {
    const {
      className,
      onBlur,
      onFocus,
      ...props
    } = this.props;

    return (
      <InputPresentationContext.Consumer>
        {
          context => (
            <input
              ref={ (c) => { this._input = c; } }
              className={ this.classNamesForInput(className) }
              onFocus={ this.handleFocus(context, onFocus) }
              onBlur={ this.handleBlur(context, onBlur) }
              { ...props }
            />
          )
        }
      </InputPresentationContext.Consumer>
    );
  }
}

Input.propTypes = {
  className: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

export default Input;
