import React from 'react';
import I18n from 'i18n-js';

import ComplexHeading from './../../../components/complex-heading';
import Wrapper from './../../chrome/wrapper';

/**
 * Shows off some of the components
 *
 * @param {object} props
 * @return {ComponentShowcase}
 */
export default props => (
  <div className='component-showcase'>
    <Wrapper>
      <ComplexHeading
        heading={ I18n.t('homepage.component_showcase.heading') }
        headingSuffix={ I18n.t('homepage.component_showcase.heading_suffix') }
        text={ I18n.t('homepage.component_showcase.text') }
        align='center'
      />
      <img className='component-showcase__image' src='/assets/images/components.png' />
    </Wrapper>
  </div>
);
