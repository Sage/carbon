import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputPresentation } from '../input';

// This component is a working example of what a Textbox might look like
// using only the new input componentry. It is still under development with
// subject to change as we continue to remove the decorator classes.

const Textbox = ({ children, leftChildren, ...props }) => (
  <InputPresentation { ...props }>
    { leftChildren }
    <Input { ...props } />
    { children }
  </InputPresentation>
);

Textbox.propTypes = {
  children: PropTypes.node,
  leftChildren: PropTypes.node
};

export default Textbox;
