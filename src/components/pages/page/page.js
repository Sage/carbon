import React from 'react';
import classNames from 'classnames';
import tagComponent from './../../../utils/helpers/tags';
import FullScreenHeading from './../../dialog-full-screen/full-screen-heading';

export default (props) => {
  const classes = classNames("carbon-page", props.className);

  return (
    <div className={ classes } { ...tagComponent('page', props) }>
      <FullScreenHeading>
        { props.title }
      </FullScreenHeading>

      <div className="carbon-page__content">
        { props.children }
      </div>
    </div>
  );
};
