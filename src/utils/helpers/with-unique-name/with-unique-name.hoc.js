import React from 'react';
import PropTypes from 'prop-types';
import guid from '../guid';

const withUniqueName = (WrappedComponent) => {
  class WithUniqueName extends React.Component {
    name = guid();

    static propTypes = {
      forwardedRef: PropTypes.func
    };

    render() {
      const {
        forwardedRef,
        ...props
      } = this.props;
      return (
        <WrappedComponent
          name={ this.name }
          ref={ forwardedRef }
          { ...props }
        />
      );
    }
  }
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
  WithUniqueName.displayName = `WithUniqueName(${displayName})`;

  return React.forwardRef((props, ref) => {
    return <WithUniqueName { ...props } forwardedRef={ ref } />;
  });
};

export default withUniqueName;
