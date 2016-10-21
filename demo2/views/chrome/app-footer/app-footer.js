import React, { PropTypes } from 'react';
import Icon from 'components/icon';
import Link from 'components/link';

class AppFooter extends React.Component {
  render () {
    return (
      <div className="app-footer">
        <div className="app-footer__icons">
          <Link href='#'><Icon type='twitter' /></Link>
          <Link href='#'><Icon type='dribbble' /></Link>
          <Link href='#'><Icon type='github' /></Link>
        </div>
        <div className="app-footer__legal">
          <span className='app-footer__sage-icon' />
          <span className='legal__text'>{ `\u00A9 Sage(UK) Ltd. ${new Date().getFullYear()}, All rights reserved. Last updated on October 20th 2016` }</span>
        </div>
      </div>
    );
  }
}

export default AppFooter;
