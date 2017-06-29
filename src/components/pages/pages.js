import React from 'react';
import { Carousel } from './../carousel';
import Page from './page';

class Pages extends React.Component {
  render() {
    return (
      <Carousel
        className="carbon-pages"
        enableSlideSelector={ false }
        enablePreviousButton={ false }
        enableNextButton={ false }
        { ...this.props }
      >
        { this.props.children }
      </Carousel>
    );
  }
}

export { Pages, Page };
