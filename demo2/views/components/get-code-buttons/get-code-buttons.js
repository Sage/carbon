import React from 'react';
import CommonButtons from '../common-buttons';

class GetCodeButtons extends React.Component {
  render() {
    return (
      <div className='get-code-buttons'>
        { CommonButtons.github() }
        { CommonButtons.download('white') }
      </div>
    );
  }
}

export default GetCodeButtons;
