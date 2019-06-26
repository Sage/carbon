import React from 'react';
import guid from '../guid';

const withUniqueName = (WrappedComponent) => {
  class WithUniqueName extends React.Component {
    name = guid()

    render() {
      return (
        <WrappedComponent name={ this.name } { ...this.props } />
      );
    }
  }
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithUniqueName.displayName = `WithUniqueName(${displayName})`;

  return WithUniqueName;
};

export default withUniqueName;
