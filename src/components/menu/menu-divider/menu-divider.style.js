import styled, { css } from 'styled-components';
import { baseTheme } from '../../../style/themes';

const StyledDivider = styled.div`
  ${({ menuType, theme }) => css`
    height: 1px;
    margin: 8px 16px;
    background: ${menuType !== 'dark' ? theme.menu.light.divider : theme.menu.dark.divider};
  `}
`;

StyledDivider.defaultProps = {
  theme: baseTheme
};

export default StyledDivider;
