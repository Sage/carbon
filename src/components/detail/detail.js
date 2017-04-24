import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from './../icon';

class Detail extends React.Component {
  static propTypes = {
    /**
     * The type of icon to use.
     *
     * @property icon
     * @type {Object}
     */
    icon: PropTypes.string,

    /**
     * A small detail to display under the main content.
     *
     * @property footnote
     * @type {String}
     */
    footnote: PropTypes.string,

    /**
     * The rendered children of the component.
     *
     * @property children
     * @type {Node}
     */
    children: PropTypes.node
  }

  /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      "carbon-detail",
      this.props.className, {
        "carbon-detail--has-icon": this.props.icon
      }
    );
  }

  /**
   * Returns the markup for the icon if one if specified.
   *
   * @method icon
   * @return {Object} JSX
   */
  icon = () => {
    if (!this.props.icon) { return null; }

    return (
      <Icon className="carbon-detail__icon" type={ this.props.icon } />
    );
  }

  /**
   * Returns the markup for the footnote if one if specified.
   *
   * @method footnote
   * @return {Object} JSX
   */
  footnote = () => {
    if (!this.props.footnote) { return null; }

    return (
      <div className="carbon-detail__footnote">
        { this.props.footnote }
      </div>
    );
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    return (
      <div className={ this.classes }>
        { this.icon() }

        <div className="carbon-detail__content">
          { this.props.children }
        </div>

        { this.footnote() }
      </div>
    );
  }
}

export default Detail;
