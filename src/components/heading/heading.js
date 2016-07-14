import React from 'react';
import classNames from 'classnames';
import Help from './../help';
import Link from './../link';
import Icon from './../icon';

/**
 * UI for a heading header.
 */
class Heading extends React.Component {
  static propTypes = {
    /**
     * Defines the title for the heading.
     *
     * @property title
     * @type {String}
     */
    title: React.PropTypes.string,

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
    backLink: React.PropTypes.string
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
        className="ui-heading__help"
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
        className="ui-heading__back"
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
      <div className="ui-heading__subheader">
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
      "ui-heading", this.props.className, {
        ["ui-heading--has-subheader"]: this.props.subheader,
        ["ui-heading--has-back"]: this.props.backLink
      }
    );
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    if (!this.props.title) { return null; }

    return (
      <div className={ this.classes }>
        <div className="ui-heading__header">
          { this.back }

          <div className="ui-heading__headers">
            <div className="ui-heading__main-header">
              <h1 className="ui-heading__title">
                { this.props.title }
              </h1>

              { this.help }
            </div>

            { this.subheader }
          </div>
        </div>

        { this.props.children }
      </div>
    );
  }
}

export default Heading;
