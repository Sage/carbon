import React from 'react';
import PropTypes from 'prop-types';
import StyledWeekday from './weekday.style';
import StyledAbbr from './abbr.style';

const Weekday = ({
  className, title, children, ...props
}) => (
  <StyledWeekday
    className={ className } role='columnheader'
    { ...props }
  >
    <StyledAbbr title={ title }>{children}</StyledAbbr>
  </StyledWeekday>
);

Weekday.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
};

export default Weekday;
