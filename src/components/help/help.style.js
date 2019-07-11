import styled, { css } from 'styled-components';
import baseTheme from '../../style/themes/base';
import { THEMES } from '../../style/themes';

const StyledHelp = styled.span`
  color: ${({ theme }) => theme.help.color};
  cursor: default;
  display: inline-block;
  position: relative;
  margin-left: 8px;
  top: -1px;

  ${({ href }) => href && css`
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: $blue;
      text-decoration: underline;
    }
  `}

  ${({ theme }) => theme.name === THEMES.classic && css`
    color: rgba(0, 0, 0, 0.85)
  `}
`;

StyledHelp.defaultProps = {
  theme: baseTheme
};

export default StyledHelp;
