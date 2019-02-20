import React from 'react';
import guid from '../../../utils/helpers/guid/guid';

const withUniqueName = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <WrappedComponent name={ guid() } { ...this.props } />
      );
    }
  };
};

export default withUniqueName;
