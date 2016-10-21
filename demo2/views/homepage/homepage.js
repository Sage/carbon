import React from 'react';
import Header from './header';

class Homepage extends React.Component {
  /**
   * @method render
   */
  render() {
    return (
      <div className="carbon-homepage">
        <Header />
        <div style={ { height: '300px', background: 'grey' } }/>
      </div>
    );
  }
}

export default Homepage;
