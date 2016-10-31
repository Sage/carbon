import React from 'react';

// Demo Site
import GetCodeButtons from '../../components/get-code-buttons';
import InfoTile from '../../components/info-tile';
import Wrapper from '../../chrome/wrapper';

class PageHeaderLarge extends React.Component {
  render() {
    return (
      <div className='page-header-large__background'>
        <div className='page-header-large__background-angled' />
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

              <h2 className='h2 heading-divider'>
                Building web applications got a whole lot faster
              </h2>
            </div>

            <div className='page-header-large__tiles'>
              <InfoTile
                title='Ridiculously Quick'
                description='Carbon helps developers take applications from concept to completion as quickly as possible.'
              />
              <InfoTile
                title='Fully Featured'
                description='With Carbon you get an extensive and beautiful documentation for common web components.'
              />
              <InfoTile
                title='Ridiculously Quick'
                description='Carbon helps developers take applications from concept to completion as quickly as possible.'
              />
            </div>
          </div>
        </Wrapper>
      </div>
    );
  }
}

export default PageHeaderLarge;
