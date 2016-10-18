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
     * Aligns the content (left, center or right).
     *
     * @property align
     * @type {String}
     * @default left
     */
    align: React.PropTypes.string,

    /**
     * Sets a custom width for the title element.
     *
     * @property titleWidth
     * @type {String}
     */
    titleWidth: React.PropTypes.string,

    /**
     * Over-rides the calculation of body width based on titleWidth
     * Sometimes we need the body to be full width while keeping a title width similar to other widths
     *
     * @property bodyFullWidth
     * @type {Boolean}
     * @default false
     */
    bodyFullWidth: React.PropTypes.bool
  }

  static defaultProps = {
    align: "left",
    as: "primary",
    bodyFullWidth: false,
    inline: false
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
      `carbon-content--${this.props.as}`,
      `carbon-content--align-${this.props.align}`, {
        "carbon-content--inline": this.props.inline,
        "carbon-content--body-full-width": this.props.bodyFullWidth
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
      style.width = `calc(${this.props.titleWidth}% - 30px)`;
    }

    return style;
  }

  /**
   * Returns styling for the body element.
   *
   * @method bodyStyle
   * @return {Object}
   */
  get bodyStyle() {
    let style = {};

    if (this.props.titleWidth) {
      style.width = `${100 - Number(this.props.titleWidth)}%`;
    }

    if (this.props.bodyFullWidth) {
      style.width = "100%";
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

        <div className="carbon-content__body" style={ this.bodyStyle }>
          { this.props.children }
        </div>
      </div>
    ) : null;
  }
}

export default Content;
