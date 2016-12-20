import React from 'react';

// Demo Site
import FlexContainer from '../../chrome/flex-container';
import GetCodeButtons from '../../components/get-code-buttons';
import InfoTile from '../../components/info-tile';
import Wrapper from '../../chrome/wrapper';

class PageHeaderLarge extends React.Component {
  render() {
    return (
      <div className='page-header-large__background'>
        <Wrapper>
          <div className='page-header-large'>
            <div className='page-header-large__titles'>

              <h1 className='page-header-large__title'>
                Carbon is a library of React components for building great web applications.
              </h1>

              <h2 className='page-header-large__subtitle'>
                Carbon is open source. It’s hosted, developed, and maintained on Github.
              </h2>

              { GetCodeButtons.pair() }

              <div className='page-header-large__version'>
                Currently: v1.0.0
              </div>
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default PageHeaderLarge;
