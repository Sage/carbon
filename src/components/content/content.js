import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import tagComponent from '../../utils/helpers/tags';
import './content.scss';

class Content extends React.Component {
  static propTypes = {
    /**
     * The body of the content component.
     */
    children: PropTypes.node,

    /**
     * Custom className
     */
    className: PropTypes.string,

    /**
     * The title of the content component.
     */
    title: PropTypes.string,

    /**
     * Applies a theme to the Content
     * Value: primary, secondary
     */
    as: PropTypes.string,

    /**
     * Displays the content inline with it's title.
     */
    inline: PropTypes.bool,

    /**
     * Aligns the content (left, center or right).
     */
    align: PropTypes.string,

    /**
     * Sets a custom width for the title element.
     */
    titleWidth: PropTypes.string,

    /**
     * Over-rides the calculation of body width based on titleWidth
     * Sometimes we need the body to be full width while keeping a title width similar to other widths
     */
    bodyFullWidth: PropTypes.bool
  }

  static defaultProps = {
    align: 'left',
    as: 'primary',
    bodyFullWidth: false,
    inline: false
  }

  constructor(args) {
    super(args);

    this.titleStyle = this.titleStyle.bind(this);
    this.bodyStyle = this.bodyStyle.bind(this);
    this.classes = this.classes.bind(this);
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
        'carbon-content--inline': this.props.inline,
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

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    if (this.props.children) {
      return (
        <div className={ this.classes() } { ...tagComponent('content', this.props) }>
          <div
            className='carbon-content__title'
            data-element='title'
            style={ this.titleStyle() }
          >
            { this.props.title }
          </div>

          <div
            className='carbon-content__body'
            data-element='body'
            style={ this.bodyStyle() }
          >
            { this.props.children }
          </div>
        </div>
      );
    }
    return null;
  }
}

export default Content;
