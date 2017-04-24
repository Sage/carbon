import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Heading from './../heading';

/**
 * UI for a settings page row
 *
 * SettingsRow implements our UX design for settings pages. It accepts a `title` string to be displayed at the top left
 * of the row. The `description` property accepts a string or JSX object to support flexible layout of elements
 * (e.g. Links, bolded text, paragraphs) in the header column under the title. The default divider line at the bottom
 * of the row may be disabled by setting `divider={ false }`. All children are rendered in the input column to the
 * right of the header column.
 *
 *
 * == How to use a SettingsRow in a component:
 *
 * In your file:
 *
 *    import SettingsRow from 'carbon/lib/components/settings-row';
 *
 * To render the SettingsRow:
 *
 *    <SettingsRow title='My Setting' description='My description'>
 *      <Checkbox label='Enable my setting' />
 *      <span>Other content to go with input</span>
 *    </SettingsRow>
 *
 * @class SettingsRow
 * @constructor
 */
class SettingsRow extends React.Component {
  static propTypes = {
    /**
     * Component children
     *
     * @property  children
     * @type      {Object}
     */
    children: PropTypes.node,

    /**
     * Heading title
     *
     * @property  title
     * @type      {String}
     */
    title: PropTypes.string,

    /**
     * Heading description
     *
     * @property  description
     * @type      {Node}
     */
    description: PropTypes.node,

    /**
     * Row divider
     *
     * @property  divider
     * @type      {Boolean}
     * @default   true
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
    return classNames('carbon-settings-row', { 'carbon-settings-row--has-divider': this.props.divider }, this.props.className);
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
      <div className={ this.classes }>
        <div className='carbon-settings-row__header'>{ this.heading }</div>
        <div className='carbon-settings-row__input'>{ this.props.children }</div>
      </div>
    );
  }
}

export default SettingsRow;
