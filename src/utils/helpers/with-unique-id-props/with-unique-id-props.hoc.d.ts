import * as React from "react";

declare function withUniqueIdProps<T, P>(
  WrappedComponent: React.ComponentType<T & React.RefAttributes<P>>
): JSX.Element;

export default withUniqueIdProps;
