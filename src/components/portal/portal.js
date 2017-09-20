import React from 'react';
import ReactPortal from 'react-portal';
import PropTypes from 'prop-types';

const Portal = ({ open, children }) => (
  <ReactPortal isOpened={ open }>
    { children }
  </ReactPortal>
);

Portal.propTypes = {
  open: PropTypes.bool,
  children: PropTypes.node
};

export default Portal;
