import React from 'react';
import PropTypes from 'prop-types';
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
    children: PropTypes.node,

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * The title of the content component.
     *
     * @property title
     * @type {String}
     */
    title: PropTypes.string,

    /**
     * Applies a theme to the Content
     * Value: primary, secondary
     *
     * @property as
     * @type {String}
     * @default primary
     */
    as: PropTypes.string,

    /**
     * Displays the content inline with it's title.
     *
     * @property inline
     * @type {Boolean}
     * @default false
     */
    inline: PropTypes.bool,

    /**
     * Aligns the content (left, center or right).
     *
     * @property align
     * @type {String}
     * @default left
     */
    align: PropTypes.string,

    /**
     * Sets a custom width for the title element.
     *
     * @property titleWidth
     * @type {String}
     */
    titleWidth: PropTypes.string,

    /**
     * Over-rides the calculation of body width based on titleWidth
     * Sometimes we need the body to be full width while keeping a title width similar to other widths
     *
     * @property bodyFullWidth
     * @type {Boolean}
     * @default false
     */
    bodyFullWidth: PropTypes.bool
  }

  static defaultProps = {
    align:         'left',
    as:            'primary',
    bodyFullWidth: false,
    inline:        false
  }

  constructor(...args) {
    super(...args);

    this.titleStyle = this.titleStyle.bind(this);
    this.bodyStyle = this.bodyStyle.bind(this);
    this.classes = this.classes.bind(this);
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    if (this.props.children) {
      return (
        <div className={ this.classes() }>
          <div className='carbon-content__title' style={ this.titleStyle() }>
            { this.props.title }
          </div>

          <div className='carbon-content__body' style={ this.bodyStyle() }>
            { this.props.children }
          </div>
        </div>
      );
    }
    return null;
  }

  /**
   * Returns the HTML classes for the component.
   *
   * @method
   * @return {String}
   */
  classes() {
    return classNames(
      'carbon-content',
      this.props.className,
      `carbon-content--${this.props.as}`,
      `carbon-content--align-${this.props.align}`, {
        'carbon-content--inline':          this.props.inline,
        'carbon-content--body-full-width': this.props.bodyFullWidth
      }
    );
  }

  /**
   * Returns styling for the title element.
   *
   * @method titleStyle
   * @return {Object}
   */
  titleStyle() {
    const style = {};

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
  bodyStyle() {
    const style = {};

    if (this.props.titleWidth) {
      style.width = `${100 - Number(this.props.titleWidth)}%`;
    }

    if (this.props.bodyFullWidth) {
      style.width = '100%';
    }

    return style;
  }
}

export default Content;
