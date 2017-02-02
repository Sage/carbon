import React from 'react';
import I18n from 'i18n-js';

// Demo Site
import GetCodeButtons from './../../../components/get-code-buttons';
import InfoTile from './../../../components/info-tile';
import Wrapper from './../wrapper';

class PageHeaderLarge extends React.Component {
  render() {
    return (
      <div className='page-header-large__background'>
        <Wrapper>
          <div className='page-header-large'>
            <div className='page-header-large__titles'>

              <h1 className='page-header-large__title'>
                { I18n.t('homepage.page_header_large.heading1') }
              </h1>

              <h2 className='page-header-large__subtitle'>
                { I18n.t('homepage.page_header_large.heading2') }
              </h2>

              { GetCodeButtons.pair() }

              <div className='page-header-large__version'>
                { I18n.t('homepage.page_header_large.version') }
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default PageHeaderLarge;
