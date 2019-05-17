import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import StyledButton from '../button/button.style';
import BaseTheme from '../../style/themes/base';
import { THEMES } from '../../style/themes';

const StyledSplitButtonContainer = styled.div`
  display: inline-block;
  position: relative;
  ${({ theme }) => theme.name === THEMES.classic && css`
    ${StyledButton} {
      font-size: 14px;
      height: 31px;
      line-height: 16px;
      letter-spacing: 0;
      margin-left: 0;
      margin-right: 0;
      padding: 0 18px;
    }
  `}
`;

StyledSplitButtonContainer.defaultProps = {
  theme: BaseTheme,
  legacyColorVariant: 'blue'
};

StyledSplitButtonContainer.propTypes = {
  /** Function to handle mouse leave event */
  onMouseLeave: PropTypes.func
};
export default StyledSplitButtonContainer;
