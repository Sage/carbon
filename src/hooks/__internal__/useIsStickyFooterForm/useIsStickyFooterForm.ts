import React, { useMemo } from "react";
import Form from "../../../components/form/form.component";

export default (children?: React.ReactNode) => {
  const isStickyFooterForm = useMemo(
    () =>
      React.Children.toArray(children).some(
        (child) =>
          React.isValidElement(child) &&
          (child.type as React.FunctionComponent)?.displayName ===
            Form.displayName &&
          child.props.stickyFooter
      ),
    [children]
  );

  return isStickyFooterForm;
};
