import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputPresentation } from '../input';

// This component is a working example of what a Textbox might look like
// using only the new input componentry. It is never meant to be used as
// a replacement for the existing Textbox component, but just as a means
// of testing the implementation as it evolves.

/* istanbul ignore next */
const Textbox = ({ value, children }) => (
  <InputPresentation>
    <Input value={ value } />
    { children }
  </InputPresentation>
);

Textbox.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string
};

export default Textbox;
