import React from 'react';
import PropTypes from 'prop-types';

const Weekday = ({
  className, title, children, ...props
}) => (
  <div
    className={ className } role='columnheader'
    { ...props }
  >
    <abbr title={ title }>{children}</abbr>
  </div>
);

Weekday.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
};

export default Weekday;
