import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import BaseTheme from '../../../style/themes/base';
import tabHeaderClassicStyle from './tab-header-classic.style';
import OptionsHelper from '../../../utils/helpers/options-helper';

const StyledTabHeader = styled.li`
background-color: transparent;
border-bottom: 2px solid ${({ theme }) => theme.disabled.button};
color: ${({ theme }) => theme.disabled.disabled};
display: inline-block;
font-weight: bold;
height: 100%;
margin-left: 2px;
padding: 11px 15px 10px;

&:first-child {
  margin-left: 0;
}

&:focus,
&:hover {
  background: transparent;
  border-bottom-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.text.color};
  outline: none;
}

&:focus {
  outline: none;
}

${({ isTabSelected }) => isTabSelected
  && css`
    color: ${({ theme }) => theme.text.color};
    background-color: transparent;
    border-bottom-color: ${({ theme }) => theme.colors.primary};

    &:hover {
      background: transparent;
      border-bottom-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.text.color};
    }
  `}

  ${({ position }) => position === 'vertical'
    && css`
      background-color: transparent;
      border-bottom: 0px;
      border-right: 2px solid ${({ theme }) => theme.disabled.button};
      display: block;
      height: auto;
      margin-left: 0px;
      margin-top: 2px;

      &:first-child {
        margin-top: 0;
      }

      &:hover {
        background: transparent;
        border-right-color: ${({ theme }) => theme.colors.secondary};
      }

      ${({ isTabSelected }) => isTabSelected
        && css`
          border-right-color: ${({ theme }) => theme.colors.primary};
          background-color: transparent;

          &:hover {
            border-right-color: ${({ theme }) => theme.colors.primary};
            background-color: transparent;
          }
        `}
    `}
  ${tabHeaderClassicStyle}
`;

StyledTabHeader.propTypes = {
  position: PropTypes.oneOf(OptionsHelper.orientation)
};

StyledTabHeader.defaultProps = {
  theme: BaseTheme,
  position: 'horizontal'
};

export default StyledTabHeader;
