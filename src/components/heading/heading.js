import React from 'react';
import classNames from 'classnames';
import Help from './../help';
import Link from './../link';
import Icon from './../icon';
import { tagComponent } from '../../utils/helpers/tags';

/**
 * UI for a heading header.
 */
class Heading extends React.Component {
  static propTypes = {
    /**
     * Defines the title for the heading.
     *
     * @property title
     * @type {String|Object}
     */
    title: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),

    /**
     * Defines the subheader for the heading.
     *
     * @property subheader
     * @type {String|Object}
     */
    subheader: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.object
    ]),

    /**
     * Defines the help text for the heading.
     *
     * @property help
     * @type {String}
     */
    help: React.PropTypes.string,

    /**
     * Defines the help link for the heading.
     *
     * @property helpLink
     * @type {String}
     */
    helpLink: React.PropTypes.string,

    /**
     * Defines the a href for the back link.
     *
     * @property backLink
     * @type {String}
     */
    backLink: React.PropTypes.string,

    /**
     * Adds a divider below the heading and the content.
     *
     * @property divider
     * @type {Boolean}
     * @default true
     */
    divider: React.PropTypes.bool,

    /**
     * Adds a separator between the title and the subheader.
     *
     * @property separator
     * @type {Boolean}
     * @default false
     */
    separator: React.PropTypes.bool
  }

  static defaultProps = {
    divider: true,
    separator: false
  }

  /**
   * Returns the help component.
   *
   * @method help
   * @return {Object} JSX
   */
  get help() {
    if (!this.props.help && !this.props.helpLink) { return null; }

    return (
      <Help
        className="carbon-heading__help"
        data-element='help'
        tooltipAlign="left"
        href={ this.props.helpLink }
      >
        { this.props.help }
      </Help>
    );
  }

  /**
   * Returns the back button.
   *
   * @method back
   * @return {Object} JSX
   */
  get back() {
    if (!this.props.backLink) { return null; }

    return (
      <Link
        className="carbon-heading__back"
        data-element='back'
        href={ this.props.backLink }
      >
        <Icon type="chevron" />
      </Link>
    );
  }

  /**
   * Returns the subheader.
   *
   * @method subheader
   * @return {Object} JSX
   */
  get subheader() {
    if (!this.props.subheader) { return null; }

    return (
      <div className="carbon-heading__subheader" data-element='subtitle'>
        { this.props.subheader }
      </div>
    );
  }

  /**
   * Returns the classes for the component.
   *
   * @method classes
   * @return {String}
   */
  get classes() {
    return classNames(
      "carbon-heading", this.props.className, {
        ["carbon-heading--has-subheader"]: this.props.subheader,
        ["carbon-heading--has-back"]: this.props.backLink,
        ["carbon-heading--has-divider"]: this.props.divider
      }
    );
  }

  /**
   * Returns the separator if enabled and needed.
   *
   * @method separator
   * @return {Object} JSX
   */
  get separator() {
    return this.props.separator ? <hr className='carbon-heading__separator' /> : null;
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    if (!this.props.title) { return null; }

    return (
      <div className={ this.classes } { ...tagComponent('heading', this.props) }>
        <div className="carbon-heading__header">
          { this.back }

          <div className="carbon-heading__headers">
            <div className="carbon-heading__main-header">
              <h1 className="carbon-heading__title" data-element='title'>
                { this.props.title }
              </h1>

              { this.help }
            </div>

            { this.separator }
            { this.subheader }
          </div>
        </div>

        { this.props.children }
      </div>
    );
  }
}

export default Heading;
