import React from 'react';

/**
 * Renders content with a title and body text.
 *
 * @class Content
 * @constructor
 */
class Content extends React.Component {
  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className="ui-content">
        <div className="ui-content__title">{ this.props.title }</div>
        <div className="ui-content__body">{ this.props.children }</div>
      </div>
    );
  }
}

export default Content;
