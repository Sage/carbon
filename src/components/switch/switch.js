import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import Checkbox from '../checkbox';
import Icon from '../icon';

const switchClasses = (props) => {
  const loadingClass = props.loading ? ' carbon-switch__loading' : '',
      reverseClass = props.reverse ? ' carbon-switch__reverse' : '';

  return classNames('carbon-switch', props.className, loadingClass, reverseClass);
};

/**
 * A Switch widget.
 *
 * This widget extends Checkbox and adds a switch styling over the top.
 *
 * == How to use a Switch component:
 *
 * In your file:
 *
 *   import Switch from 'carbon/lib/components/switch';
 *   <Switch label='My switch component.' />
 */
const Switch = props => (
  <Checkbox
    disabled={ props.loading }
    { ...propsForCheckbox(props) }
  >
    <div className={ `carbon-switch__switch${props.loading ? ' carbon-switch__switch__loading' : ''}` }>
      <span className='carbon-switch__slider' />
      <div className='carbon-switch__on'>
        { renderIcon('tick', props.loading)}
      </div>
      <div className='carbon-switch__off'>
        { renderIcon('cross', props.loading)}
      </div>
    </div>
  </Checkbox>
);

Switch.propTypes = {
  ...Checkbox.propTypes,
  loading: PropTypes.bool // Display loading dots in place of icon and disable component during load.
};

Switch.defaultProps = {
  ...Checkbox.defaultProps,
  reverse: true
};

function propsForCheckbox(props) {
  const { loading, ...checkboxProps } = props;
  if (loading) { checkboxProps.readOnly = true; }
  checkboxProps.className = switchClasses(props);
  return checkboxProps;
}

function renderIcon(icon, loading) {
  if (loading) {
    return (
      <div className='carbon-loading-dots'>
        <div className='carbon-loading-dots' />
        <div className='carbon-loading-dots__bounce carbon-loading-dots__bounce2' />
        <div className='carbon-loading-dots__bounce carbon-loading-dots__bounce3' />
      </div>
    );
  }
  return <Icon type={ icon } />;
}

export default Switch;
