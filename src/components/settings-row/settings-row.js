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
     * @type      {String, Node}
     */
    description: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),

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
   * Render settings page row
   *
   * @method  render
   * @return  {Object}  JSX
   */
  render() {
    return (
      <div className={ this.classes }>
        <div className='carbon-settings-row__header'>
          <Heading
            title={ this.props.title }
            subheader={ this.props.description }
            separator={ true }
            divider={ false }
          />
        </div>
        <div className='carbon-settings-row__input'>{ this.props.children }</div>
      </div>
    );
  }
}

export default SettingsRow;
