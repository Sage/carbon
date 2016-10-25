import React from 'react';
import GetStartedPod from './../get-started-pod';

class Homepage extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div className="carbon-homepage">
        Carbon
        <div className="carbon-homepage__content">
        </div>
        <GetStartedPod />
      </div>
    );
  }
}

export default Homepage;
