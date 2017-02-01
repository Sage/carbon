import React from 'react';
import I18n from 'i18n-js';

import ComplexHeading from '../../components/complex-heading';
import Wrapper from '../../chrome/wrapper';

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
      <picture className='component-showcase__image-wrapper'>
        <source
          media="(max-width: 540px)"
          srcSet="/assets/images/components-extra-small.png 1x, /assets/images/components-extra-small-2x.png 2x, /assets/images/components-extra-small-3x.png 3x"
        />
        <source
          media="(max-width: 720px)"
          srcSet="/assets/images/components-small.png 1x, /assets/images/components-small-2x.png 2x, /assets/images/components-small-3x.png 3x"
        />
        <source
          media="(max-width: 1360px)"
          srcSet="/assets/images/components-medium.png 1x, /assets/images/components-medium-2x.png 2x, /assets/images/components-medium-3x.png 3x"
        />
        <img
          className='component-showcase__image'
          src="/assets/images/components-large.png"
          srcSet="/assets/images/components-large-2x.png 2x, /assets/images/components-large-3x.png 3x"
        />
      </picture>
    </Wrapper>
  </div>
);

