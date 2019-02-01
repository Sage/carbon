import React from 'react';
import { Input, InputPresentation } from '../input';

// This component is a working example of what a Textbox might look like
// using only the new input componentry. It is still under development with
// subject to change as we continue to remove the decorator classes.
const Textbox = props => (
  <InputPresentation>
    <Input { ...props } />
  </InputPresentation>
);

export default Textbox;
