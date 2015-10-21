import React from 'react';

class Pod extends React.Component {

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <div className="ui-pod">
        { this.props.children }
      </div>
    );
  }

};

export default Pod;
