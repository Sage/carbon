import styled from 'styled-components';
import Navbar from './navbar';

const StyledNavbar = styled(Navbar)`
  display: flexbox;
  justify-content: space-between;

  &.DayPicker-NavBar {
    top: 0;
  }
`;

export default StyledNavbar;
