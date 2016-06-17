import React from 'react';

class Slide extends React.Component {

  render() {
    return(
      <div { ...this.props } />
    );
  }
}

export default Slide;
