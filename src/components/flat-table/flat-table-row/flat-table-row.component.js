import React from 'react';
import PropTypes from 'prop-types';
import Event from '../../../utils/helpers/events';
import StyledFlatTableRow from './flat-table-row.style';

const FlatTableRow = ({ children, onClick }) => {
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
      { ...interactiveRowProps }
    >
      { children }
    </StyledFlatTableRow>
  );
};

FlatTableRow.propTypes = {
  /** Array of FlatTableHeader or FlatTableCell. FlatTableRowHeader could also be passed. */
  children: PropTypes.node.isRequired,
  /** Function to handle click event. If provided the Component could be focused with tab key. */
  onClick: PropTypes.func
};

export default FlatTableRow;
