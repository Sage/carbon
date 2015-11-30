import React from 'react';
import { connect } from 'utils/flux';
import Button from 'components/button';
import FinancesStore from './../../stores/finances';

class InAndOut extends React.Component {

  render() {
    return (
      <div className='view-in_and_out'>
        This is just a blank page for now
      </div>
    );
  }
}

export default connect(InAndOut, FinancesStore);
