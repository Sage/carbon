import React from 'react';
import PropTypes from 'prop-types';
import guid from '../guid';

const withUniqueName = (WrappedComponent) => {
  class WithUniqueName extends React.Component {
    name = guid();

    static propTypes = {
      forwardedRef: PropTypes.object
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

  const Component = React.forwardRef((props, ref) => {
    return <WithUniqueName { ...props } forwardedRef={ ref } />;
  });

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'WithUniqueName(Unknown)';
  Component.displayName = displayName.replace(/^Base/, '');

  return Component;
};

export default withUniqueName;
