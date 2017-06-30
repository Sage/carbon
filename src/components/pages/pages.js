import React from 'react';
import classNames from 'classnames';
import tagComponent from './../../utils/helpers/tags';
import { Carousel } from './../carousel';
import Page from './page';

const Pages = (props) => {
  const classes = classNames('carbon-pages', props.className);

  return (
    <Carousel
      className={ classes }
      enableSlideSelector={ false }
      enablePreviousButton={ false }
      enableNextButton={ false }
      { ...tagComponent('pages', props) }
      { ...props }
    >
      { props.children }
    </Carousel>
  );
};

export { Pages, Page };
