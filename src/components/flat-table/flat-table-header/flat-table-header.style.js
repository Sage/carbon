import styled, { css } from 'styled-components';
import baseTheme from '../../../style/themes/base';

const StyledFlatTableHeader = styled.th`
  ${({ align, theme }) => css`
    background-color: transparent;
    border-width: 0;
    border-bottom: 1px solid ${theme.table.secondary};
    box-sizing: border-box;
    font-weight: 700;
    left: auto;
    padding: 8px 24px;
    text-align: ${align};
    top: 0;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
  `}
`;

StyledFlatTableHeader.defaultProps = {
  theme: baseTheme
};

export default StyledFlatTableHeader;
