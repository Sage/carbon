import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import tagComponent from '../../../utils/helpers/tags';

const fullScrenHeadingClasses = (props) => {
  return classNames('carbon-full-screen-heading', props.className);
};

const FullScrenHeading = props =>
  <div { ...props } className={ fullScrenHeadingClasses(props) } { ...tagComponent('full-screen-heading', props) } />
;

FullScrenHeading.propTypes = {
  className: PropTypes.string
};

export default FullScrenHeading;
