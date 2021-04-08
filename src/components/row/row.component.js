import React from "react";
import PropTypes from "prop-types";

import StyledRow from "./row.style";
import Logger from "../../utils/logger/logger";

let deprecatedWarnTriggered = false;

const Row = ({
  columns,
  children,
  columnClasses,
  columnDivide,
  gutter,
  className,
}) => {
  const columnsCount = columns || React.Children.toArray(children).length;

  if (!deprecatedWarnTriggered) {
    deprecatedWarnTriggered = true;
    // eslint-disable-next-line max-len
    Logger.deprecate("`Row` component is deprecated and will soon be removed.");
  }

  const buildColumns = () =>
    React.Children.toArray(children).map((child) =>
      React.cloneElement(
        child,
        {
          columnClasses,
          columns: columnsCount,
        },
        child.props.children
      )
    );

  return (
    <StyledRow
      data-component="row"
      columnDivide={columnDivide}
      gutter={gutter}
      className={className}
      columns={columns || React.Children.toArray(children).length}
    >
      {buildColumns()}
    </StyledRow>
  );
};

Row.propTypes = {
  /** This component supports children of type Column. */
  children: PropTypes.node.isRequired,
  /** Classes to apply to the component. */
  className: PropTypes.string,
  /** Define how wide the gutter between the rows and columns should be. */
  gutter: PropTypes.oneOf([
    "extra-small",
    "small",
    "medium-small",
    "medium",
    "medium-large",
    "large",
    "extra-large",
  ]),
  /** Enable a divider between each column. */
  columnDivide: PropTypes.bool,
  /** Define a certain amount of columns, instead of basing it on the number of children. */
  columns: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** Classes to apply to all column children. */
  columnClasses: PropTypes.string,
};

Row.defaultProps = {
  gutter: "medium",
};

export default Row;
