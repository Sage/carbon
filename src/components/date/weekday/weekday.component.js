import React from 'react';
import PropTypes from 'prop-types';
import WeekdayStyle from './weekday.style';
import AbbrStyle from './abbr.style';

const Weekday = ({
  className, title, children, ...props
}) => (
  <WeekdayStyle
    className={ className } role='columnheader'
    { ...props }
  >
    <AbbrStyle title={ title }>{children}</AbbrStyle>
  </WeekdayStyle>
);

Weekday.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
};

export default Weekday;
