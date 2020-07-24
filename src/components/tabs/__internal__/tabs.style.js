import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';

const StyledTabs = styled.div`
  margin-top: 15px;
  color: ${({ theme }) => `${theme.text.color};`}
  
  ${({ position }) => position === 'left' && css`
    display: flex;
    width: 100%;
    margin-top: 0;
  `}
`;

StyledTabs.defaultProps = {
  position: 'top',
  theme: BaseTheme
};

StyledTabs.propTypes = {
  position: PropTypes.oneOf(['top', 'left'])
};

export default StyledTabs;
