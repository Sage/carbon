import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Help from '../help';
import Link from '../link';
import Icon from '../icon';
import tagComponent from '../../utils/helpers/tags';
import './heading.scss';

class Heading extends React.Component {
  static propTypes = {
    /**
     * Children elements
     */
    children: PropTypes.node,

    /**
     * Custom className
     */
    className: PropTypes.string,

    /**
     * Defines the title for the heading.
     */
    title: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    /**
     * Defines the title id for the heading.
     */
    titleId: PropTypes.string,

    /**
     * Defines the subheader for the heading.
     */
    subheader: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),

    /**
     * Defines the subtitle id for the heading.
     */
    subtitleId: PropTypes.string,

    /**
     * Defines the help text for the heading.
     */
    help: PropTypes.string,

    /**
     * Defines the help link for the heading.
     */
    helpLink: PropTypes.string,

    /**
     * Defines the a href for the back link.
     */
    backLink: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func
    ]),

    /**
     * Adds a divider below the heading and the content.
     */
    divider: PropTypes.bool,

    /**
     * Adds a separator between the title and the subheader.
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
