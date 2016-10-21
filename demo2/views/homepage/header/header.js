import React from 'react';
import Buttons from './../../components/common-buttons';
import Row from 'components/row';
import InfoTile from './../../components/info-tile';

class Header extends React.Component {
  render() {
    return (
      <div className='carbon-homepage__header'>
        <div className='carbon-homepage__titles'>

          <h1 className='carbon-homepage__heading1'>
            Carbon is a library of React components for building great web applications.
          </h1>

          <h2 className='carbon-homepage__heading2'>
            Carbon is open source. It’s hosted, developed, and maintained on Github.
          </h2>

          <div className='carbon-homepage__buttons'>
            { Buttons.githubButton('get-started__github-button') }
            { Buttons.downloadButton() }
          </div>

          <div className='carbon-homepage__version'>
            Currently: v1.0.0
          </div>

          <h2 className='carbon-homepage__heading2'>
            Building web applications got a whole lot faster
          </h2>
        </div>

        <div className='carbon-homepage__header__tiles'>
          <Row>
            <InfoTile classnName='carbon-homepage__header__tile' />
            <InfoTile classnName='carbon-homepage__header__tile' />
            <InfoTile classnName='carbon-homepage__header__tile' />
          </Row>
        </div>
      </div>
    );
  }
}

export default Header;
