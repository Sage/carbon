import React from 'react';

// Carbon
import Pod from 'components/pod';

// Demo
import GetCodeButtons from '../../components/get-code-buttons';
import Wrapper from '../../chrome/wrapper';

class GetStarted extends React.Component {
  render () {
    return (
      <div className='get-started'>
        <Wrapper>
          <Pod className='get-started__actions-pod'>
            <span className='get-started__text'>Ready to Get Started?</span>
            <span className='get-started__checkout-text'>Checkout the Github repository or download Carbon</span>
            { GetCodeButtons.pair() }
          </Pod>
        </Wrapper>
      </div>
    );
  }
}

export default GetStarted;
