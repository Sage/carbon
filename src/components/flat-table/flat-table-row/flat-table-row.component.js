import React from 'react';
import PropTypes from 'prop-types';
import Event from '../../../utils/helpers/events';
import StyledFlatTableRow from './flat-table-row.style';

const FlatTableRow = React.forwardRef(({
  children, onClick, selected
}, ref) => {
  let interactiveRowProps = {};

  function onKeyDown(ev) {
    const isEnterOrSpaceKey = Event.isEnterKey(ev) || Event.isSpaceKey(ev);

    if (isEnterOrSpaceKey && onClick) {
      onClick(ev);
    }
  }

  if (onClick) {
    interactiveRowProps = {
      isRowInteractive: true,
      tabIndex: 0,
      onClick,
      onKeyDown
    };
  }

  return (
    <StyledFlatTableRow
      data-element='flat-table-row'
      selected={ selected }
      ref={ ref }
      { ...interactiveRowProps }
    >
      { children }
    </StyledFlatTableRow>
  );
});

FlatTableRow.propTypes = {
  /** Array of FlatTableHeader or FlatTableCell. FlatTableRowHeader could also be passed. */
  children: PropTypes.node.isRequired,
  /** Function to handle click event. If provided the Component could be focused with tab key. */
  onClick: PropTypes.func,
  /** Allows developers to manually control selected state for the row. */
  selected: PropTypes.bool
};

export default FlatTableRow;
