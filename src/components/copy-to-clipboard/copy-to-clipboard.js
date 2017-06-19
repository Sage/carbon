import React from 'react';

let CopyToClipboard = props => {
  return (
    <div className='carbon-copy-to-clipboard' onClick={ () => { console.log(props.copyData) } }>
      <div className='carbon-copy-to-clipboard__flag'><span>Click to copy</span></div>
      { props.children }
    </div>
  );
};

export default CopyToClipboard;
