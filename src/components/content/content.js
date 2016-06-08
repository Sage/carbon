import React from 'react';
import classNames from 'classnames';

/**
 * Renders content with a title and body text.
 *
 * @class Content
 * @constructor
 */
class Content extends React.Component {
  static propTypes = {
    /**
     * The body of the content component.
     *
     * @property children
     * @type {Object}
     */
    children: React.PropTypes.node,

    /**
     * The title of the content component.
     *
     * @property title
     * @type {String}
     */
    title: React.PropTypes.string
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    let classes = classNames("ui-content", this.props.className);

    return this.props.children ? (
      <div className={ classes }>
        <div className="ui-content__title">{ this.props.title }</div>
        <div className="ui-content__body">{ this.props.children }</div>
      </div>
    ) : null;
  }
}

export default Content;
