import React, { PropTypes } from 'react';
import I18n from 'i18n-js';

// Carbon
import Icon from 'components/icon';
import Link from 'components/link';

// Demo
import FlexContainer from '../flex-container';
import Wrapper from '../wrapper';


class Footer extends React.Component {
  render () {
    return (
      <div className="demo-footer__background">
        <Wrapper>
          <div className='demo-footer'>
            <div className="demo-footer__section demo-footer__social">
              <Link href='#'><Icon type='twitter' /></Link>
              <Link href='#'><Icon type='dribbble' /></Link>
              <Link href='#'><Icon type='github' /></Link>
            </div>
            <div className="demo-footer__section demo-footer__corporate">
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
