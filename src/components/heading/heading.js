import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Help from '../help';
import Link from '../link';
import Icon from '../icon';
import tagComponent from '../../utils/helpers/tags';
import './heading.scss';

/**
 * UI for a heading header.
 */
class Heading extends React.Component {
  static propTypes = {
    /**
     * Children elements
     *
     * @property children
     * @type {Node}
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
     * Defines the title for the heading.
     *
     * @property title
     * @type {String|Object}
     */
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    /**
     * Defines the title id for the heading.
     *
     * @property titleId
     * @type {String}
     */
    titleId: PropTypes.string,

    /**
     * Defines the subheader for the heading.
     *
     * @property subheader
     * @type {String|Object}
     */
    subheader: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    /**
     * Defines the subtitle id for the heading.
     *
     * @property subtitleId
     * @type {String}
     */
    subtitleId: PropTypes.string,

    /**
     * Defines the help text for the heading.
     *
     * @property help
     * @type {String}
     */
    help: PropTypes.string,

    /**
     * Defines the help link for the heading.
     *
     * @property helpLink
     * @type {String}
     */
    helpLink: PropTypes.string,

    /**
     * Defines the a href for the back link.
     *
     * @property backLink
     * @type {String}
     */
    backLink: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),

    /**
     * Adds a divider below the heading and the content.
     *
     * @property divider
     * @type {Boolean}
     * @default true
     */
    divider: PropTypes.bool,

    /**
     * Adds a separator between the title and the subheader.
     *
     * @property separator
     * @type {Boolean}
     * @default false
     */
    separator: PropTypes.bool
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
        className='carbon-heading__help'
        data-element='help'
        tooltipAlign='center'
        tooltipPosition='right'
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

    let props;

    if (typeof this.props.backLink === 'string') {
      props = { href: this.props.backLink };
    } else {
      props = { onClick: this.props.backLink };
    }

    return (
      <Link
        className='carbon-heading__back'
        data-element='back'
        { ...props }
      >
        <Icon type='chevron_left' />
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
      <div
        className='carbon-heading__subheader' data-element='subtitle'
        id={ this.props.subtitleId }
      >
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
    return classNames('carbon-heading', this.props.className, {
      'carbon-heading--has-subheader': this.props.subheader,
      'carbon-heading--has-back': this.props.backLink,
      'carbon-heading--has-divider': this.props.divider
    });
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
        <div className='carbon-heading__header'>
          { this.back }

          <div className='carbon-heading__headers'>
            <div className='carbon-heading__main-header'>
              <h1
                className='carbon-heading__title' data-element='title'
                id={ this.props.titleId }
              >
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
