import React from 'react';
import I18n from 'i18n-js';
import { Wrapper, GetStartedWrapper, Text, CheckoutText} from './get-started.style';
import Button from '../../../src/components/button';

const GetStarted = () => (
  <Wrapper>
    <GetStartedWrapper>
      <Text>{ I18n.t('homepage.get_started.ready') }</Text>
      <CheckoutText>{ I18n.t('homepage.get_started.checkout') }</CheckoutText>
      <Button 
        buttonType='darkBackground'
        href="https://github.com/Sage/carbon"
        size='large'
        target='_blank'
      >
        { I18n.t('navigation.github.view') }
      </Button>
      <Button
        buttonType='primary'
        href="https://github.com/Sage/carbon/blob/master/docs/getting-started.stories.mdx"
        size='large'
        target='_blank'
      >
        { I18n.t('navigation.github.download') }
      </Button>
    </GetStartedWrapper>
  </Wrapper>
);

export default GetStarted;
