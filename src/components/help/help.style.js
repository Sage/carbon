import styled, { css } from 'styled-components';
import baseTheme from '../../style/themes/base';
import StyledIcon from '../icon/icon.style';
import { isClassic } from '../../utils/helpers/style-helper';

const StyledHelp = styled.div`
  background: none;
  color: ${({ theme }) => theme.help.color};
  cursor: default;
  border: none;
  outline: none;
  display: inline-block;
  font-size: 14px;
  padding: 0;
  position: relative;
  margin-bottom: 0;
  margin-left: 8px;
  margin-top: 0;
  padding: 1px;

  ${({ href }) => href && css`
    cursor: pointer;
  `}

  &:focus,
  &:hover {
    color: ${({ theme }) => theme.help.hover};
    text-decoration: none;
  }

  &:focus ${StyledIcon} {
    outline: ${({ theme }) => `2px solid ${theme.colors.focus}`};
  }

  ${({ theme }) => isClassic(theme) && css`
    color: rgb(128, 153, 164);

    &:focus,
    &:hover {
      color: rgb(128, 153, 164);
    }

    &:focus ${StyledIcon} {
      outline: none;
    }
  `}
`;

StyledHelp.defaultProps = {
  theme: baseTheme
};

export default StyledHelp;
