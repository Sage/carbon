import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputPresentation } from '../input';

// We use this class as a temporary bridge between the new approach and the decorators,
// we need it as a class to support refs. We can eventually replace this with the new
// Textbox component that is under development.
// eslint-disable-next-line react/prefer-stateless-function
class Textbox extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    children: PropTypes.node
  }

  render() {
    const { children, value, ...props } = this.props;
    return (
      <InputPresentation>
        <Input value={ value } { ...props } />
        { children }
      </InputPresentation>
    );
  }
}
export default Textbox;
