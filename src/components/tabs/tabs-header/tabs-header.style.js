import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import tabsHeaderClassicStyle from './tabs-header-classic.style';
import OptionsHelper from '../../../utils/helpers/options-helper';
import baseTheme from '../../../style/themes/base';

const StyledTabHeaders = styled.ul`
  display: flex;
  box-shadow: inset 0px -2px 0px 0px ${({ theme }) => theme.disabled.background};
  cursor: pointer;
  list-style: none;
  margin: 0 0 10px;
  padding: 0;

  ${({ align }) => align === 'right' && css`
    justify-content: flex-end;
    text-align: right;
  `}

  ${({ position }) => position === 'left' && css`
    flex-direction: column;
    box-shadow: inset -2px 0px 0px 0px ${({ theme }) => theme.disabled.background};
    width: 20%;
    margin: 0 10px 0;
  `}
  
  ${tabsHeaderClassicStyle}
`;

StyledTabHeaders.defaultProps = {
  align: 'left',
  position: 'top',
  theme: baseTheme
};

StyledTabHeaders.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignBinary),
  position: PropTypes.oneOf(['top', 'left'])
};

export default StyledTabHeaders;
