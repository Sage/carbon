import styled from 'styled-components';
import sidebarHeaderClassicStyle from './sidebar-header-classic.style';
import baseTheme from '../../../style/themes/base';

const SidebarHeaderStyle = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: inset 0 -1px 0 0 ${({ theme }) => theme.disabled.border};
  box-sizing: content-box;
  padding: 27px 32px 32px 32px;
  position: relative;
  color: ${({ theme }) => theme.text.color};
  transition: all 0.2s ease;

  ${sidebarHeaderClassicStyle}
`;

SidebarHeaderStyle.defaultProps = {
  theme: baseTheme
};

export default SidebarHeaderStyle;
