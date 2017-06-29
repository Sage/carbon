import React from 'react';

class FullScreenHeading extends React.Component {
  render() {
    return (
      <div className="carbon-full-screen-heading">
        { this.props.children }
      </div>
    );
  }
}

export default FullScreenHeading;
