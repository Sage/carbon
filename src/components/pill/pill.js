import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon/icon';
import { validProps } from '../../utils/ether';
import tagComponent from '../../utils/helpers/tags';
import './pill.scss';

/**
* A Pill widget.
*
* == How to use a Pill in a component:
*
* In your file:
*
*   import Pill from 'carbon-react/lib/components/pill'
*
* To render the Pill:
*
*   <Pill as='warning'>My warning text</Pill>
*
* Additionally you can pass optional props to the Pill component
*
*   as: Customizes the appearence of the pill changing the colour.
*       (see the 'iconColorSets' for possible values).
*
* @class Pill
* @constructor
*/
class Pill extends React.Component {
  static propTypes = {

    /**
     * Customizes the appearance through colour
     * (see the 'iconColorSets' for possible values)
     *
     * @property as
     * @type {String}
     * @default 'info'
     */
    as: PropTypes.string,

    /**
     * The text to display on the Pill
     *
     * @property children
     * @type {String}
     */
    children: PropTypes.string.isRequired,

    /**
     * Custom className
     *
     * @property className
     * @type {String}
     */
    className: PropTypes.string,

    /**
     * Fills the pill with colour when true
     *
     * @property type
     * @type {Boolean}
     * @default false
     */
    fill: PropTypes.bool,

    /**
     * Callback for when the pill is clicked
     *
     * @property onClick
     * @type {Function}
     */
    onClick: PropTypes.func,

    /**
     * Callback for when the icon in pill is clicked to delete it
     * If defined a 'close' icon is rendered in the component
     *
     * @property onDelete
     * @type {Function}
     */
    onDelete: PropTypes.func
  }

  static defaultProps = {
    as: 'default',
    className: '',
    fill: false,
    onClick: null,
    onDelete: null
  }

  static safeProps = ['onClick']

  mainClasses = () => {
    return classNames(
      'carbon-pill',
      this.props.className,
      `carbon-pill--${this.props.as}${(this.props.fill ? '--fill' : '--empty')}`,
      { 'carbon-pill--link': this.props.onClick }
    );
  }

  get closeIcon() {
    if (this.props.onDelete) {
      return (
        <Icon
          className='carbon-pill__delete-icon'
          data-element='close'
          onClick={ this.props.onDelete }
          type='close'
          onBlur={ this.onCloseIconBlur }
          bgSize='small'
        />
      );
    }
    return null;
  }

  /**
   * Renders the component.
   *
   * @method render
   */
  render() {
    return (
      <span
        { ...validProps(this) }
        className={ this.mainClasses() }
        { ...tagComponent('pill', this.props) }
      >
        { this.props.children }
        { this.closeIcon }
      </span>
    );
  }
}

export default Pill;
