import styled, { css } from 'styled-components';
import propTypes from 'prop-types';

const StyledTab = styled.div`
  display: none;

  ${({ isTabSelected, position, hasCustomTarget }) => isTabSelected && !hasCustomTarget && css`
    display: block;

    ${position === 'left' && css`
      width: 80%;
    `}
  `}
`;

StyledTab.defaultProps = {
  position: 'top'
};

StyledTab.propTypes = {
  position: propTypes.oneOf(['top', 'left'])
};

export default StyledTab;
