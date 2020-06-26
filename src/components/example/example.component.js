/* eslint-disable import/prefer-default-export */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button';

export const Example = ({ children, onClick, enableSuperPower }) => {
  return <Button buttonType={ enableSuperPower ? 'secondary' : 'primary' } onClick={ onClick }>{children}</Button>;
};

Example.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  /**
   * Apply the super power button styling
   */
  enableSuperPower: PropTypes.bool
};

Example.defaultProps = {
  enableSuperPower: false
};
