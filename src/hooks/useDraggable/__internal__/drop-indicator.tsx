import React from 'react';

const DropIndicator = ({ position = 'top', width = undefined, indicatorColor = undefined }) => {
    return (
      <div style={{ 
        position: 'absolute', 
        display: 'flex',
        justifyContent: 'center',
        left: '0', 
        right: '0',
        ...(position === 'top' ? { top: '-1px' } : { bottom: '-1px' })
      }}>
        <div style={{
          height: '5px',
          ...(indicatorColor ? { backgroundColor: indicatorColor } : { backgroundColor: '#15803d' }),
          position: 'relative',
          ...(position === 'top' ? { top: '-4px' } : { bottom: '-4px' }),
          ...(width ? { width: `${width}px`} : { width : '100%' })
        }}>
          <div style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            border: `2px solid ${indicatorColor ? indicatorColor : '#15803d'}`,
            borderRadius: '50%',
            background: 'white',
            top: '-3px',
            left: '0',
            transform: 'translateX(-50%)'
          }} />
          <div style={{
            position: 'absolute',
            width: '8px',
            height: '8px',
            border: `2px solid ${indicatorColor ? indicatorColor : '#15803d'}`,
            borderRadius: '50%',
            background: 'white',
            top: '-3px',
            right: '0',
            transform: 'translateX(50%)'
          }} />
        </div>
      </div>
    );
  };

  export default DropIndicator;