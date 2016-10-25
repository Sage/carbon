import React from 'react';
import Header from './header';
import LearnMore from './learn-more';

class Homepage extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div className="carbon-homepage">
        <Header />
        <LearnMore />
      </div>
    );
  }
}

export default Homepage;
