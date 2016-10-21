import React from 'react';
import GetStarted from './get-started';

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
        <GetStarted />
      </div>
    );
  }
}

export default Homepage;
