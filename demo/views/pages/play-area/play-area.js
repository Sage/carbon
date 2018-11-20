import PropTypes from 'prop-types';
import React from 'react';
import WizardWrapperStub from './wizard-wrapper-stub';

import './play-area.scss';

const PlayArea = props => (
  <div className='carbon-play-area'>
    <WizardWrapperStub />
  </div>
);

PlayArea.propTypes = {};

export default PlayArea;
