import styled, { css } from 'styled-components';
import baseTheme from '../../../style/themes/base';

const StyledFlatTableRowHeader = styled.th`
  ${({ align, theme }) => css`
    background-color: #fff;
    border: 1px solid ${theme.table.secondary};
    border-top: none;
    box-sizing: border-box;
    left: 0;
    font-weight: normal;
    padding: 10px 24px;
    position: sticky;
    text-align: ${align};
    top: auto;
    vertical-align: middle;
    white-space: nowrap;
  `}
`;

StyledFlatTableRowHeader.defaultProps = {
  theme: baseTheme
};

export default StyledFlatTableRowHeader;
