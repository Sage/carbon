import React from 'react';

import Link from 'components/link';

import ComplexHeading from '../../components/complex-heading';
import Wrapper from '../../chrome/wrapper';

/**
 * Shows off some of the components
 *
 * @param {object} props
 * @return {SageLovesCarbon}
 */
export default props => (
  <div className='sage-loves-carbon'>
    <Wrapper>
      <div className='sage-loves-carbon__text'>
        <ComplexHeading
          heading='Sage Loves '
          headingSuffix='Carbon'
          text='Carbon is the heart of global Sage products for hundreds of thousands
                of users worldwide. Designers and developers at Sage and beyond help
                Carbon to constantly evolve. Carbon is loaded with knowledge, keeping
                you ahead in cutting-edge user experience.'
        />
        <Link href='http://www.sage.com' icon='arrow' iconAlign='right'>
          Learn more about Sage
        </Link>
      </div>
      <img className='sage-loves-carbon__image' src='/assets/images/devices.png' />
    </Wrapper>
  </div>
);
