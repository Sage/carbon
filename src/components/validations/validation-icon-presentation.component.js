import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ValidationIconContext = React.createContext();

const ValidationIconPresentation = (props) => {
  const [hasFocus, setHasFocus] = useState(false);
  const onFocus = () => setHasFocus(true);
  const onBlur = () => setHasFocus(false);
  const contextProps = {
    hasFocus,
    onFocus,
    onBlur
  };

  return (
    <ValidationIconContext.Provider value={ contextProps }>
      {props.children}
    </ValidationIconContext.Provider>
  );
};

ValidationIconPresentation.propTypes = {
  children: PropTypes.node
};

export { ValidationIconPresentation, ValidationIconContext };
