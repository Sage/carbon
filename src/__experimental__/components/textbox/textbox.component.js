import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputPresentation } from '../input';

// This component is a working example of what a Textbox might look like
// using only the new input componentry. It is still under development with
// subject to change as we continue to remove the decorator classes.
const Textbox = React.forwardRef(({
  children,
  value,
  ...props
}, ref) => (
  <InputPresentation>
    <Input
      { ...props }
      value={ value }
      ref={ ref }
    />
    { children }
  </InputPresentation>
));

Textbox.propTypes = {
  value: PropTypes.string,
  children: PropTypes.node
};

export default Textbox;
