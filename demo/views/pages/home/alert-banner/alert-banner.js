import React from 'react';
import I18n from 'i18n-js';

import './alert-banner.scss';

/**
 * Shows off some of the components
 *
 * @param {object} props
 * @return {AlertBanner}
 */
export default props => (
  <div className='alert-banner'>
    <span className='alert-banner__text'>Coming Soon - The Sage Design System</span>
    <Button
      size="small"
      theme="white"
      to="/news/sage-design-system"
    >
      Learn more
    </Button>
  </div>
);

