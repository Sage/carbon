import React from 'react';
import Pod from 'components/pod';
import GetCodeButtons from '../components/get-code-buttons';

class GetStarted extends React.Component {
  render () {
    return (
      <div className='get-started'>
        <Pod className='get-started__actions-pod'>
          <span className='get-started__text'>Ready to Get Started?</span>
          <span className='get-started__checkout-text'>Checkout the Github repository or download Carbon</span>
          <GetCodeButtons />
        </Pod>
      </div>
    );
  }
}

export default GetStarted;
