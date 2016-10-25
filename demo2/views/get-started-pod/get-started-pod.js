import React from 'react';
import Pod from 'components/pod';
import CommonButtons from './../components/common-buttons';

class GetStarted extends React.Component {
  render () {
    return (
      <div className='get-started'>
        <Pod className='get-started__actions-pod'>
          <span className='get-started__text'>Ready to Get Started?</span>
          <span className='get-started__checkout-text'>Checkout the Github repository or download Carbon</span>
          { CommonButtons.github('get-started__github-button') }
          { CommonButtons.download() }
        </Pod>
      </div>
    );
  }
}

export default GetStarted;
