import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import tagComponent from './../../utils/helpers/tags';
import { Carousel } from './../carousel';
import Page from './page';

const pagesClasses = (props) => {
  return classNames('carbon-pages', props.className);
};

const Pages = props =>
  <Carousel
    className={ pagesClasses(props) }
    enableSlideSelector={ false }
    enablePreviousButton={ false }
    enableNextButton={ false }
    { ...tagComponent('pages', props) }
    { ...props }
  >
    { props.children }
  </Carousel>
;

Pages.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
};

export { Pages, Page };
