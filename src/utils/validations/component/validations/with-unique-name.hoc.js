import React from 'react';
import guid from '../../../helpers/guid/guid';

const withUniqueName = WrappedComponent => props => (
  <WrappedComponent name={ guid() } { ...props } />
);

export default withUniqueName;
