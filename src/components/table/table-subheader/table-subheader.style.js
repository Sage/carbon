import styled, { css } from 'styled-components';
import StyledTableHeader from '../table-header/table-header.style';
import baseTheme from '../../../style/themes/base';

const StyledTableSubheader = styled(StyledTableHeader)`
  ${({ theme }) => css`
    background-color: #001E2B;
    color: ${theme.colors.white};
    font-weight: bold;
  `}
`;

StyledTableSubheader.defaultProps = {
  theme: baseTheme
};

export default StyledTableSubheader;
