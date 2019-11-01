import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const StyledTabs = styled.div`
  margin-top: 15px;
  
  ${({ position }) => position === 'left' && css`
    display: flex;
    width: 100%;
    margin-top: 0;
  `}
`;

StyledTabs.defaultProps = {
  position: 'top'
};

StyledTabs.propTypes = {
  position: PropTypes.oneOf(['top', 'left'])
};

export default StyledTabs;
