import React from 'react';
import Button from 'components/button';
import Pod from 'components/pod';

class GetStarted extends React.Component {
  render () {
    return (
      <div className='get-started'>
        <Pod className='get-started__actions-pod'>
          <span className='get-started__text'>Ready to Get Started?</span>
          <span className='get-started__checkout-text'>Checkout the Github repository or download Carbon</span>
          <Button
            as='primary'
            className='get-started__github-button'
            href='https://github.com/Sage/carbon'
          >
            View on Github
          </Button>
          <Button
            className='get-started__download-button'
            href='https://github.com/Sage/carbon/releases/tag/v0.27.0'
          >
            Download Carbon
          </Button>
        </Pod>
      </div>
    );
  }
}

export default GetStarted;
