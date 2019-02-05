import devices from './devices.png';

import React from 'react';
import I18n from 'i18n-js';

import Link from 'components/link/link';

import ComplexHeading from './../../../../components/complex-heading';
import Wrapper from './../../../common/wrapper';
import './sage-loves-carbon.scss';

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
          heading={ I18n.t('homepage.sage_loves_carbon.heading') }
          headingSuffix={ I18n.t('homepage.sage_loves_carbon.heading_suffix') }
          text={ I18n.t('homepage.sage_loves_carbon.text') }
        />
        <Link href={ I18n.t('sage_href') } icon='arrow' iconAlign='right'>
          { I18n.t('homepage.sage_loves_carbon.learn_more') }
        </Link>
      </div>
      <img className='sage-loves-carbon__image' src={ devices } />
    </Wrapper>
  </div>
);
