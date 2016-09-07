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
    title: React.PropTypes.string,

    /**
     * Applies a theme to the Content
     * Value: primary, secondary
     *
     * @property as
     * @type {String}
     * @default primary
     */
    as: React.PropTypes.string
  }

  static defaultProps = {
    as: "primary"
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    let classes = classNames("carbon-content", this.props.className, `carbon-content--${this.props.as}`);

    return this.props.children ? (
      <div className={ classes }>
        <div className="carbon-content__title">{ this.props.title }</div>
        <div className="carbon-content__body">{ this.props.children }</div>
      </div>
    ) : null;
  }
}

export default Content;
