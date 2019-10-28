import React from 'react';
import PropTypes from 'prop-types';
import guid from '../guid';

const withUniqueProp = (WrappedComponent) => {
  class WithUniqueProp extends React.Component {
    id = guid();

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
          id={ this.id }
          name={ this.name }
          ref={ forwardedRef }
          { ...props }
        />
      );
    }
  }

  const Component = React.forwardRef((props, ref) => {
    return <WithUniqueProp { ...props } forwardedRef={ ref } />;
  });

  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'WithUniqueProp(Unknown)';
  Component.displayName = displayName.replace(/^Base/, '');

  return Component;
};

export default withUniqueProp;
