import React, { PropTypes } from 'react';

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
              <span className='demo-footer__legal'>{ `\u00A9 Sage(UK) Ltd. ${new Date().getFullYear()}, All rights reserved. Last updated on October 20th 2016` }</span>
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default Footer;
