import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Heading from '../heading';
import tagComponent from '../../utils/helpers/tags';
import './settings-row.scss';

class SettingsRow extends React.Component {
  static propTypes = {
    /**
     * This component supports children.
     */
    children: PropTypes.node,

    /**
     * The CSS classes to apply to the component.
     */
    className: PropTypes.string,

    /**
     * A title for this group of settings.
     */
    title: PropTypes.string,

    /**
     * A string or JSX object that provides a short description about the group of settings.
     */
    description: PropTypes.node,

    /**
     * Shows a divider below the component.
     */
    divider: PropTypes.bool
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
    return classNames(
      'carbon-settings-row',
      { 'carbon-settings-row--has-divider': this.props.divider },
      this.props.className
    );
  }

  /**
   * Return heading
   *
   * @method  heading
   * @return  {Object}  JSX
   */
  get heading() {
    if (!this.props.title) return null;

    return (
      <Heading
        title={ this.props.title }
        subheader={ this.props.description }
        separator={ this.props.description !== undefined }
        divider={ false }
      />
    );
  }

  /**
   * Render settings page row
   *
   * @method  render
   * @return  {Object}  JSX
   */
  render() {
    return (
      <div className={ this.classes } { ...tagComponent('settings-row', this.props) }>
        <div className='carbon-settings-row__header'>{ this.heading }</div>
        <div className='carbon-settings-row__input'>{ this.props.children }</div>
      </div>
    );
  }
}

export default SettingsRow;
