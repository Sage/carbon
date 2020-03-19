import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledBadgeWrapper, StyledIconButton, StyledCrossIcon, StyledCounter
} from './badge.style';

const Badge = ({ children, counter, onClick }) => {
  return (
    <StyledBadgeWrapper>
      {counter > 0 && (
        <StyledIconButton
          data-element='badge-component'
          buttonType='secondary'
          onAction={ onClick }
        >
          <StyledCrossIcon
            data-element='badge-cross-icon'
            type='cross'
          />
          <StyledCounter data-element='badge-counter'>
            {counter > 99 ? 99 : counter}
          </StyledCounter>
        </StyledIconButton>
      )}
      {children}
    </StyledBadgeWrapper>
  );
};

Badge.propTypes = {
  /** The badge will be added to this element */
  children: PropTypes.node.isRequired,
  /** The number rendered in the badge component */
  counter: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  /** Callback fired when badge is clicked */
  onClick: PropTypes.func
};

export default Badge;
