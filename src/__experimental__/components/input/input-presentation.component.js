import React from 'react';
import PropTypes from 'prop-types';
import InputPresentationStyle from './input-presentation.style';
// import './input-presentation.style.scss';

const InputPresentationContext = React.createContext();

// This is a component in progress to incrementally remove the reliance
// on the input decorators. For now we still rely on fieldProps being
// fed into this component from the decorated parent component and a div
// wrapping the carbon-input-presentation that handles the fieldProps if you want
// to use the full supported feature set of a Carbon component. Over time we
// will add additional supported on the decorated features without the need
// for the decorators themselves.

const InputPresentation = (props) => {
  const { children } = props;

  return (
    <InputPresentationStyle
      { ...props }
      role='presentation'
    >
      { children }
    </InputPresentationStyle>
  );
};

InputPresentation.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export { InputPresentationContext, InputPresentation };
