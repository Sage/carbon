import React from 'react';
import Header from './header';
import GetStartedPod from './../get-started-pod';

class Homepage extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div className="carbon-homepage">
        <Header />
        <div style={ { height: '300px', background: 'grey' } }/>
        <GetStartedPod />
      </div>
    );
  }
}

export default Homepage;
