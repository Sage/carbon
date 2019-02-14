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
*/
class Pill extends React.Component {
  static propTypes = {
    as: PropTypes.string, // this is used to apply supported themes (eg. warning, error, etc)
    children: PropTypes.string.isRequired,
    className: PropTypes.string,
    fill: PropTypes.bool,
    onClick: PropTypes.func,
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

  mainClasses() {
    return classNames(
      'carbon-pill',
      this.props.className,
      `carbon-pill--${this.props.as}${(this.props.fill ? '--fill' : '--empty')}`,
      {
        'carbon-pill--link': this.props.onClick,
        'carbon-pill--is-deletable': this.props.onDelete
      }
    );
  }

  renderCloseIcon() {
    if (!this.props.onDelete) return null;
    return (
      <button
        className='carbon-pill__delete-icon'
        type='button'
        onClick={ this.props.onDelete }
        data-element='close'
      >
        <Icon type='cross' bgSize='small' />
      </button>
    );
  }

  render() {
    return (
      <span
        { ...validProps(this) }
        className={ this.mainClasses() }
        { ...tagComponent('pill', this.props) }
      >
        { this.props.children }
        { this.renderCloseIcon() }
      </span>
    );
  }
}

export default Pill;
