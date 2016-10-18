import React from 'react';

class StaticSidebar extends React.Component {
  render() {
    return (
      <div className='carbon-static-sidebar'>
        { this.props.children }
      </div>
    );
  }
}

export default StaticSidebar
