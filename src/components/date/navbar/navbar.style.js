import styled from 'styled-components';
import baseTheme from '../../../style/themes/base';
import Navbar from './navbar';

const StyledNavbar = styled(Navbar)`
  display: flexbox;
  justify-content: space-between;

  &.DayPicker-NavBar {
    top: 0;
  }
`;

StyledNavbar.defaultProps = {
  theme: baseTheme
};

export default StyledNavbar;
