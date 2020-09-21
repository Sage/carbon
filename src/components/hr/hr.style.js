import styled from 'styled-components';
import baseTheme from '../../style/themes/base';

const StyledHr = styled.hr`
  width: inherit;
  border: 0;
  height: 1px;
  background: ${({ theme }) => theme.hr.background};
  margin-top: ${({ mt, theme }) => mt * theme.spacing}px;
  margin-bottom: ${({ mb, theme }) => mb * theme.spacing}px;
  margin-left: ${({ ml }) => ml};
  margin-right: ${({ mr }) => mr};
`;

StyledHr.defaultProps = {
  theme: baseTheme
};

export default StyledHr;
