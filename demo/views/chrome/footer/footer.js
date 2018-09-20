import React from 'react';
import I18n from 'i18n-js';
import './footer.scss';

// Carbon
import Icon from 'components/icon';

// Demo
import Wrapper from './../../common/wrapper';

class Footer extends React.Component {
  render () {
    return (
      <div className='demo-footer__background'>
        <Wrapper>
          <div className='demo-footer'>
            <div className='demo-footer__section demo-footer__social'>
              <a
                href='https://twitter.com/sagegroupplc'
                target='_blank'
                className='demo-footer__link'
                rel='noopener noreferrer'
              >
                <Icon type='twitter' />
              </a>
              <a
                href='https://dribbble.com/sageuxdesign'
                target='_blank'
                rel='noopener noreferrer'
                className='demo-footer__link'
              >
                <Icon type='dribbble' />
              </a>
              <a
                href='https://github.com/Sage/carbon'
                target='_blank'
                rel='noopener noreferrer'
                className='demo-footer__link'
              >
                <Icon type='github' />
              </a>
            </div>
            <div className='demo-footer__section demo-footer__corporate'>
              <span className='demo-footer__sage-icon' />
              <span className='demo-footer__legal'>
                { I18n.t('footer.legal') }
              </span>
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default Footer;
