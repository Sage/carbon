import React from 'react';

const FlexContainer = (props) => {
  return (
    <div className='demo-flex-container'>
      { props.children }
    </div>
  );
}

export default FlexContainer;
