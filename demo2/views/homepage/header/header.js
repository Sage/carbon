import React from 'react';
import GetCodeButtons from '../../components/get-code-buttons';
import InfoTile from './../../components/info-tile';

class Header extends React.Component {
  render() {
    return (
      <div className='carbon-homepage__header'>
        <div className='carbon-homepage__titles'>

          <h1 className='carbon-homepage__h1'>
            Carbon is a library of React components for building great web applications.
          </h1>

          <h2 className='carbon-homepage__h2'>
            Carbon is open source. It’s hosted, developed, and maintained on Github.
          </h2>

          <GetCodeButtons />

          <div className='carbon-homepage__version'>
            Currently: v1.0.0
          </div>

          <h2 className='carbon-homepage__h2 carbon-homepage__heading-divider'>
            Building web applications got a whole lot faster
          </h2>
        </div>

        <div className='carbon-homepage__header-tiles'>
          <InfoTile
            className='carbon-homepage__header-tile'
            title='Ridiculously Quick'
            description='Carbon helps developers take applications from concept to completion as quickly as possible.'
          />
          <InfoTile
            className='carbon-homepage__header-tile'
            title='Fully Featured'
            description='With Carbon you get an extensive and beautiful documentation for common web components.'
          />
          <InfoTile
            className='carbon-homepage__header-tile'
            title='Ridiculously Quick'
            description='Carbon helps developers take applications from concept to completion as quickly as possible.'
          />
        </div>
      </div>
    );
  }
}

export default Header;
