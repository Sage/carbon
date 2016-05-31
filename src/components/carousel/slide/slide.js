import React from 'react';
import Immutable from 'immutable';
import { compact } from 'lodash';
import classNames from 'classnames';

class Slide extends React.Component {

  render() {
    return(
      <div { ...this.props } />
    );
  }
}

export default Slide;
