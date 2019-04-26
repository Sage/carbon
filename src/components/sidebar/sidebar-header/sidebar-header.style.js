import styled from 'styled-components';
import sidebarHeaderClassicStyle from './sidebar-header-classic.style';
import baseTheme from '../../../style/themes/base';

const SidebarHeaderStyle = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  font-size: 20px;
  font-weight: 600;
  box-sizing: content-box;
  margin-left: -20px;
  padding: 27px 32px 32px 32px;
  position: relative;
  top: -20px;
  width: 100%;
  box-shadow: inset 0 -1px 0 0 ${({ theme }) => theme.disabled.border};
  color: ${({ theme }) => theme.text.color};

  ${sidebarHeaderClassicStyle}
`;

SidebarHeaderStyle.defaultProps = {
  theme: baseTheme
};

export default SidebarHeaderStyle;
