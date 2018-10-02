import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import AppWrapper from '../../app-wrapper';
import tagComponent from '../../../utils/helpers/tags';

const fullScreenHeadingClasses = (props) => {
  return classNames('carbon-full-screen-heading', props.className);
};

const FullScreenHeading = (props) => {
  const { children, ...otherProps } = props;

  return (
    <div
      { ...otherProps }
      className={ fullScreenHeadingClasses(props) }
      { ...tagComponent('full-screen-heading', props) }
    >
      <AppWrapper>
        { children }
      </AppWrapper>
    </div>
  );
};

FullScreenHeading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default FullScreenHeading;
