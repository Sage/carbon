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
    <span className='alert-banner__text'>A new design language system is coming.</span>
    <Button
      size="small"
      theme="white"
      href="/news/new-design-system"
    >
      Learn more
    </Button>
  </div>
);

