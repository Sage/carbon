import React from 'react';

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
        heading='The building blocks of '
        headingSuffix='awesome UI'
        text='Powerful components, flexible configurations, easy code, and amazing user experience - all together building your incredible web application.'
        align='center'
      />
      <img className='component-showcase__image' src='/assets/images/components.png' />
    </Wrapper>
  </div>
);
