import React from 'react';
import PropTypes from 'prop-types';

const FlatTableBody = ({ children }) => {
  return (
    <tbody>
      { children }
    </tbody>
  );
};

FlatTableBody.propTypes = {
  children: PropTypes.node.isRequired
};

export default FlatTableBody;
