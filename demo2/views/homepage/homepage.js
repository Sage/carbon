import React from 'react';
import Header from './header';
import LearnMore from './learn-more';
import GetStartedPod from './../get-started-pod';

class Homepage extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div className="carbon-homepage">
        <Header />
        <LearnMore />
        <GetStartedPod />
      </div>
    );
  }
}

export default Homepage;
