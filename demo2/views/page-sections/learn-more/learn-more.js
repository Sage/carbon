import React from 'react';
import I18n from 'i18n-js';
import SimpleContent from '../../components/simple-content';
import FlexContainer from '../../chrome/flex-container';
import Wrapper from '../../chrome/wrapper';

class LearnMore extends React.Component {
  render() {
    return (
        <div className='learn-more'>
          <Wrapper>
            <FlexContainer>
              <SimpleContent
                className='learn-more__cell'
                title={ I18n.t('homepage.learn_more.global_scale.title') }
                footerContent={ I18n.t('homepage.learn_more.global_scale.footer_content') }
                footerHref={ I18n.t('sage_href') }
              >
                { I18n.t('homepage.learn_more.global_scale.text') }
              </SimpleContent>
              <SimpleContent
                className='learn-more__cell'
                title={ I18n.t('homepage.learn_more.constantly_improving.title') }
                footerContent={ I18n.t('homepage.learn_more.constantly_improving.footer_content') }
              >
                { I18n.t('homepage.learn_more.constantly_improving.text') }
              </SimpleContent>
            </FlexContainer>
          </Wrapper>
        </div>
    );
  }
}

export default LearnMore;
