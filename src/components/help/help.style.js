import styled, { css } from 'styled-components';
import baseTheme from '../../style/themes/base';
import { isClassic } from '../../utils/helpers/style-helper';

const StyledHelp = styled.button`
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
  top: 2px;

  ${({ href }) => href && css`
    cursor: pointer;
  `}

  &:focus,
  &:hover {
    color: ${({ theme }) => theme.help.hover};
    text-decoration: none;
  }

  ${({ theme }) => isClassic(theme) && css`
    color: rgb(128, 153, 164);

    &:focus,
    &:hover {
      color: rgb(128, 153, 164);
    }
  `}
`;

StyledHelp.defaultProps = {
  theme: baseTheme
};

export default StyledHelp;
