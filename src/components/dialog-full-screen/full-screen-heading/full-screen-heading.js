import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';

const fullScreenHeadingClasses = (props) => {
  return classNames('carbon-full-screen-heading', props.className);
};

const FullScreenHeading = props =>
  <div { ...props } className={ fullScreenHeadingClasses(props) } { ...tagComponent('full-screen-heading', props) } />
;

FullScreenHeading.propTypes = {
  className: PropTypes.string
};

export default FullScreenHeading;
