import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Toast from '../toast';
import FlashLegacy from './flash-legacy.component';
import baseTheme from '../../style/themes/base';
import { isClassic } from '../../utils/helpers/style-helper';

const Flash = (props) => {
  let timer = null;

  const stopTimeout = () => {
    clearTimeout(timer);
  };

  useEffect(() => {
    stopTimeout();

    if (!props.timeout || !props.open) {
      return;
    }

    timer = setTimeout(() => props.onDismiss(), props.timeout);
  }, timer);

  if (isClassic(props.theme)) {
    return (
      <FlashLegacy { ...props } />
    );
  }

  return (
    <Toast
      isCenter={ props.isCenter }
      open={ props.open }
      variant={ props.variant || props.as }
      onDismiss={ props.timeout ? null : props.onDismiss }
      id={ props.id }
      data-component='flash'
    >
      {props.message}
    </Toast>
  );
};

Flash.propTypes = {
  /** A custom close event handler. If the `onDismiss` is false then dismiss button isn't visible */
  onDismiss: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]).isRequired,
  /** Sets the open state of the flash. */
  open: PropTypes.bool.isRequired,
  /** Type of notification. Legacy standard (see the 'iconColorSets' for possible values) */
  as: PropTypes.string,
  /** An identifier passed to the component root element */
  id: PropTypes.string,
  /** Type of notification with new DLS standard */
  variant: PropTypes.string,
  /** Contents of message. */
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  /** Time for flash to remain on screen */
  timeout: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** supporting legacy components. Theme help us pick up a right component */
  theme: PropTypes.object,
  /** allow to center keep flash component centered */
  isCenter: PropTypes.bool
};

Flash.defaultProps = {
  as: 'success',
  timeout: 0,
  isCenter: true,
  theme: baseTheme
};
export { Flash as FlashWithoutHOC };
export default withTheme(Flash);
