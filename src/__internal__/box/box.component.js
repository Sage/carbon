import React from 'react';
import PropTypes from 'prop-types';

const Box = ({ children, ...rest }) => {
  return (
    <>
      { React.cloneElement(children, { ...rest })}
    </>
  );
};

Box.propTypes = {
  /** Box content */
  children: PropTypes.node.isRequired,
  /** Margin, integer mulitplied by base spacing constant (8) */
  m: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Margin top, integer mulitplied by base spacing constant (8) */
  mt: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Margin bottom, integer mulitplied by base spacing constant (8) */
  mb: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Margin right, integer mulitplied by base spacing constant (8) */
  mr: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Margin left, integer mulitplied by base spacing constant (8) */
  ml: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Margin right and left, integer mulitplied by base spacing constant (8) */
  mx: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Margin top and bottom, integer mulitplied by base spacing constant (8) */
  my: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Padding, integer mulitplied by base spacing constant (8) */
  p: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Padding top, integer mulitplied by base spacing constant (8) */
  pt: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Padding bottom, integer mulitplied by base spacing constant (8) */
  pb: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Padding right, integer mulitplied by base spacing constant (8) */
  pr: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Padding left, integer mulitplied by base spacing constant (8) */
  pl: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Padding right and left, integer mulitplied by base spacing constant (8) */
  px: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]),
  /** Padding top and bottom, integer mulitplied by base spacing constant (8) */
  py: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7])
};

export default Box;
