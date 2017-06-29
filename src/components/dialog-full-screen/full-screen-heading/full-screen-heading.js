import React from 'react';
import classNames from 'classnames';
import tagComponent from '../../../utils/helpers/tags';

export default (props) => {
  const classes = classNames("carbon-full-screen-heading", props.className);

  return (
    <div { ...props } className={ classes } { ...tagComponent('full-screen-heading', props) } />
  );
};
