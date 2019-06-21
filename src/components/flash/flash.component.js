import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { THEMES } from '../../style/themes';
import Toast from '../toast';
import FlashLegacy from './flash-legacy.component';
import baseTheme from '../../style/themes/base';

const Flash = (props) => {
  if (props.theme.name === THEMES.classic) {
    return (
      <FlashLegacy { ...props } />
    );
  }

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

  return (
    <Toast
      isCenter={ props.isCenter }
      open={ props.open }
      variant={ props.variant || props.as }
      onDismiss={ props.timeout ? null : props.onDismiss }
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
