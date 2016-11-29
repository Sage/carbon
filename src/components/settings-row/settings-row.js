import React from 'react';
import classNames from 'classnames';
import Heading from './../heading';

/**
 * UI for a settings page row
 */
class SettingsRow extends React.Component {
  static propTypes = {
    /**
     * Component children
     *
     * @property  children
     * @type      {Object}
     */
    children: React.PropTypes.node,

    /**
     * Heading title
     *
     * @property  title
     * @type      {String}
     */
    title: React.PropTypes.string.isRequired,

    /**
     * Heading description
     *
     * @property  description
     * @type      {String}
     */
    description: React.PropTypes.string,

    /**
     * Heading details
     *
     * @property  details
     * @type      {Object}
     */
    details: React.PropTypes.node,

    /**
     * Row divider
     *
     * @property  divider
     * @type      {Boolean}
     * @default   true
     */
    divider: React.PropTypes.bool
  };

  static defaultProps = {
    divider: true
  };

  /**
   * Return class names
   *
   * @method  classes
   * @return  {String}
   */
  get classes() {
    return classNames('carbon-settings-row', { 'carbon-settings-row--has-divider': this.props.divider }, this.props.className);
  }

  /**
   * Return subheader
   *
   * @method  subheader
   * @return  {Object}  JSX
   */
  get subheader() {
    return (
      <div>
        <hr className='carbon-settings-row__divider' />
        { this.props.description }
      </div>
    );
  }

  /**
   * Return details block
   *
   * @method  details
   * @return  {Object}  JSX
   */
  get details() {
    if (!this.props.details) return null;
    return <div className='carbon-settings-row__details'>{ this.props.details }</div>;
  }

  /**
   * Render settings page row
   *
   * @method  render
   * @return  {Object}  JSX
   */
  render() {
    if (!this.props.children) return null;

    return (
      <div className={ this.classes }>
        <div className='carbon-settings-row__header'>
          <Heading title={ this.props.title } subheader={ this.subheader } divider={ false } />
          { this.details }
        </div>
        <div className='carbon-settings-row__input'>{ this.props.children }</div>
      </div>
    );
  }
}

export default SettingsRow;
