import React from 'react';
import I18n from 'i18n-js';
import Button from '../../../src/components/button';
import {
  Wrapper
} from '../common.style';
import {
  HeadingBackgroundWrapper,
  HeadingContentWrapper,
  CodeButtonWrapper,
  GitHubLinkWrapper
} from './header.style';

const Header = () => (
  <HeadingBackgroundWrapper>
    <Wrapper>
      <HeadingContentWrapper>
        <div>
          <h1>{ I18n.t('homepage.page_header_large.heading1') }</h1>
          <h2>{ I18n.t('homepage.page_header_large.heading2') }</h2>
        </div>
        <CodeButtonWrapper>
          <Button 
            buttonType='darkBackground'
            target="_blank"
            href="https://github.com/Sage/carbon"
            size='large'
            target='_blank'
          >
              { I18n.t('navigation.github.view') }
          </Button>
          <Button
            buttonType='primary'
            target="_blank"
            href="https://github.com/Sage/carbon/releases"
            size='large'
            target='_blank'
          >
            { I18n.t('navigation.github.download') }
          </Button>
        </CodeButtonWrapper>
        <GitHubLinkWrapper>
          <div data-component="link">
            <a tabIndex="0" href="https://www.npmjs.com/package/carbon-react">
              <span>
                <img src="https://img.shields.io/npm/v/carbon-react.svg" alt="npm" />
              </span>
            </a>
          </div>
        </GitHubLinkWrapper>
      </HeadingContentWrapper>
    </Wrapper>
  </HeadingBackgroundWrapper>
);

export default Header;
