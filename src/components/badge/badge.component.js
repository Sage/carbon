import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StyledBadgeWrapper, StyledButton, StyledCrossIcon } from './badge.style';

const Badge = ({ children, counter, onClick }) => {
  const [isHover, setHover] = useState(false);

  const showCounter = () => (counter > 99 ? 99 : counter);

  return (
    <StyledBadgeWrapper>
      {counter > 0 && (
        <StyledButton
          data-element='badge-component'
          buttonType='secondary'
          onMouseEnter={ () => setHover(true) }
          onMouseLeave={ () => setHover(false) }
          onClick={ onClick }
        >
          {isHover ? <StyledCrossIcon type='cross' /> : showCounter()}
        </StyledButton>
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
  /** Callback fired when badge clicked */
  onClick: PropTypes.func
};

export default Badge;
