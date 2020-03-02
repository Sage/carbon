import React from 'react';
import I18n from 'i18n-js';
import Heading from '../components-demo/component-heading';
import { Wrapper, LovesCarbonWrapper, Image } from './loves-carbon.style';
import devices from './devices.png';
import Link from '../../../src/components/link';

const LovesCarbon = () => (
  <LovesCarbonWrapper>
    <Wrapper>
      <div>
        <Heading
          title={ I18n.t('homepage.sage_loves_carbon.heading') }
          titleSuffix={ I18n.t('homepage.sage_loves_carbon.heading_suffix') }
          divider
          text={ I18n.t('homepage.sage_loves_carbon.text') }
          />
        <Link href={ I18n.t('sage_href') } icon='arrow' iconAlign='right'>
          { I18n.t('homepage.sage_loves_carbon.learn_more') }
        </Link>
      </div>
      <Image src={ devices } />
    </Wrapper>
  </LovesCarbonWrapper>
);

export default LovesCarbon;
