import React from 'react';

const Wrapper = (props) => {
  return (
    <div className='demo-wrapper'>
      { props.children }
    </div>
  );
}

export default Wrapper;
