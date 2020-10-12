import styled from 'styled-components';
import baseTheme from '../../../style/themes/base';

const SidebarHeaderStyle = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: inset 0 -1px 0 0 ${({ theme }) => theme.disabled.border};
  box-sizing: content-box;
  position: relative;
  padding: 27px 32px 32px 32px;
  top: -27px;
  margin-left: -32px;
  width: 100%;
  color: ${({ theme }) => theme.text.color};
  transition: all 0.2s ease;
`;

SidebarHeaderStyle.defaultProps = {
  theme: baseTheme
};

export default SidebarHeaderStyle;
