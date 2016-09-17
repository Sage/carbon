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
    as: React.PropTypes.string,

    /**
     * Displays the content inline with it's title.
     *
     * @property inline
     * @type {Boolean}
     * @default false
     */
    inline: React.PropTypes.bool,

    /**
     * Displays the content inline with it's title and centers it.
     *
     * @property centerInline
     * @type {Boolean}
     * @default false
     */
    centerInline: React.PropTypes.bool,

    /**
     * Sets a custom width for the title element.
     *
     * @property titleWidth
     * @type {String}
     */
    titleWidth: React.PropTypes.string
  }

  static defaultProps = {
    as: "primary"
  }

  /**
   * Returns the HTML classes for the component.
   *
   * @method
   * @return {String}
   */
  get classes() {
    return classNames(
      "carbon-content",
      this.props.className,
      `carbon-content--${this.props.as}`, {
        "carbon-content--inline": this.props.inline || this.props.centerInline,
        "carbon-content--inline-and-center": this.props.centerInline
      }
    );
  }

  /**
   * Returns styling for the title element.
   *
   * @method titleStyle
   * @return {Object}
   */
  get titleStyle() {
    let style = {};

    if (this.props.titleWidth) {
      style.width = this.props.titleWidth;
    }

    return style;
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    return this.props.children ? (
      <div className={ this.classes }>
        <div className="carbon-content__title" style={ this.titleStyle }>
          { this.props.title }
        </div>

        <div className="carbon-content__body">
          { this.props.children }
        </div>
      </div>
    ) : null;
  }
}

export default Content;
