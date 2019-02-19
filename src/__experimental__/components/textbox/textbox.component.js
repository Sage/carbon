import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputPresentation } from '../input';
import Spinner from '../../../components/spinner';

// This component is a working example of what a Textbox might look like
// using only the new input componentry. It is still under development with
// subject to change as we continue to remove the decorator classes.

const renderLoading = () => (
  <div style={ { padding: '3px 0px 0 0', marginLeft: 'auto' } }>
    <Spinner size='small' />
  </div>
);

const Textbox = ({
  children, leftChildren, loading, ...props
}) => (
  <InputPresentation>
    { leftChildren }
    <Input { ...props } />
    { children }
    { loading && renderLoading() }
  </InputPresentation>
);

Textbox.propTypes = {
  children: PropTypes.node,
  leftChildren: PropTypes.node,
  loading: PropTypes.bool
};

export default Textbox;
