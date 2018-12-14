import React from 'react';
import PropTypes from 'prop-types';
import { InputBoxContext } from './';
import './input.style.scss';

// This is a component in progress to incrementally remove the reliance
// on the input decorators. For now we still rely on inputProps being
// fed into this component from the decorated parent component.

const classNamesForInput = className => (
  // switch the old class for the new one until we refactor out
  // the input decorators
  className.replace('common-input__input', 'carbon-input')
);

const handleFocus = (context, props) => ev => {
  if (props.onFocus) props.onFocus(ev);
  if (context.onFocus) context.onFocus(ev);
};

const handleBlur = (context, props) => ev => {
  if (props.onBlur) props.onBlur(ev);
  if (context.onBlur) context.onBlur(ev);
};

class Input extends React.Component {
  render() {
    const { className, ...props } = this.props;

    return (
      <InputBoxContext.Consumer>
        {
          context => (
            <input
              className={ classNamesForInput(className) }
              { ...props }
              onFocus={ handleFocus(context, props) }
              onBlur={ handleBlur(context, props) }
            />
          )
        }
      </InputBoxContext.Consumer>
    );
  }
};

export default Input;
