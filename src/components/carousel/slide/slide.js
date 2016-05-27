import React from 'react';
import Immutable from 'immutable';
import { compact } from 'lodash';
import classNames from 'classnames';

class Slide extends React.Component {

  render() {
    return(
      <div className={ this.props.className }>
        { this.props.children }
      </div>
    );
  }
}

export default Slide;
