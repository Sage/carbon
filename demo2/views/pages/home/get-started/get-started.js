import React from 'react';
import I18n from 'i18n-js';

// Demo
import GetCodeButtons from './../../../../components/get-code-buttons';
import Wrapper from './../../../common/wrapper';

class GetStarted extends React.Component {
  render () {
    return (
      <div className='get-started'>
        <Wrapper>
          <span className='get-started__text'>{ I18n.t('homepage.get_started.ready') }</span>
          <span className='get-started__checkout-text'>{ I18n.t('homepage.get_started.checkout') }</span>
          { GetCodeButtons.pair() }
        </Wrapper>
      </div>
    );
  }
}

export default GetStarted;
