import React from 'react';
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
     * Defines the subheading for the heading.
     *
     * @property subheading
     * @type {String}
     */
    subheading: React.PropTypes.string,

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
     * @property backLinkHref
     * @type {String}
     */
    backLinkHref: React.PropTypes.string,

    /**
     * Defines the a react router link for the back link.
     *
     * @property backLinkTo
     * @type {String}
     */
    backLinkTo: React.PropTypes.string
  }

  /**
   * Returns the help component.
   *
   * @method help
   * @return {Object} JSX
   */
  get help() {
    if (!this.props.help) { return null; }

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
    if (!this.props.backLinkHref && !this.props.backLinkTo) { return null; }

    return (
      <Link
        className="ui-heading__back"
        href={ this.props.backLinkHref }
        to={ this.props.backLinkTo }
      >
        <Icon type="chevron" />
      </Link>
    );
  }

  /**
   * Returns the subheading.
   *
   * @method subheading
   * @return {Object} JSX
   */
  get subheading() {
    if (!this.props.subheading) { return null; }

    return (
      <p className="ui-heading__subheading">{ this.props.subheading }</p>
    );
  }

  /**
   * @method render
   * @return {Object} JSX
   */
  render() {
    if (!this.props.title) { return null; }

    return (
      <div className="ui-heading">
        <div className="ui-heading__header">
          { this.back }

          <h1 className="ui-heading__title">
            { this.props.title }
          </h1>

          { this.help }
        </div>

        { this.subheading }
      </div>
    );
  }
}

export default Heading;
