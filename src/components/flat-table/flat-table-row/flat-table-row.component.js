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
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func
};

export default FlatTableRow;
