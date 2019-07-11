import styled, { css } from 'styled-components';
import baseTheme from '../../style/themes/base';

const StyledHelp = styled.span`
  color: $grey-dark-blue-50;
  cursor: default;
  display: inline-block;
  position: relative;
  margin-left: 8px;
  top: -1px;

  ${({ hasLink }) => hasLink && css`
    cursor: pointer;
    text-decoration: none;

    &:hover {
      color: $blue;
      text-decoration: underline;
    }
  `}
`;

StyledHelp.defaultProps = {
  theme: baseTheme
};

export default StyledHelp;
