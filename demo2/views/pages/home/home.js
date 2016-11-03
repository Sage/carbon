import React from 'react';

import PageHeaderLarge from '../../page-sections/page-header-large';
import LearnMore from '../../page-sections/learn-more';
import GetStarted from '../../page-sections/get-started';

class Home extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div className="home">
        <PageHeaderLarge />
        <LearnMore />
        <GetStarted />
      </div>
    );
  }
}

export default Home;
