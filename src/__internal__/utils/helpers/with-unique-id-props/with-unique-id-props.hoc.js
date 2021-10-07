import React from "react";
import PropTypes from "prop-types";
import guid from "../guid";

const withUniqueIdProps = (WrappedComponent) => {
  class WithUniqueIdProps extends React.Component {
    id = guid();

    name = guid();

    render() {
      const { forwardedRef, id, ...props } = this.props;

      return (
        <WrappedComponent
          id={id || this.id}
          name={this.name}
          ref={forwardedRef}
          {...props}
        />
      );
    }
  }

  WithUniqueIdProps.propTypes = {
    forwardedRef: PropTypes.object,
    id: PropTypes.string,
  };

  const Component = React.forwardRef((props, ref) => {
    return <WithUniqueIdProps {...props} forwardedRef={ref} />;
  });

  const displayName =
    WrappedComponent.displayName ||
    WrappedComponent.name ||
    "WithUniqueIdProps(Unknown)";
  Component.displayName = displayName.replace(/^Base/, "");

  return Component;
};

export default withUniqueIdProps;
