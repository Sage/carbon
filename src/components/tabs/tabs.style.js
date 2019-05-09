import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledTabs = styled.div`
  ${({ position }) => position === 'top'
    && css`
      margin-top: 15px;
    `}

  ${({ position }) => position === 'left'
    && css`
      display: flex;
      width: 100%;
    `}
`;

StyledTabs.defaultProps = {
  position: 'top'
};

StyledTabs.propTypes = {
  position: PropTypes.oneOf(['top', 'left'])
};

export default StyledTabs;
