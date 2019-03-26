import styled from 'styled-components';
import Navbar from './navbar';

const StyledNavbar = styled(Navbar)`
&.DayPicker-NavBar {
  display: flexbox;
  justify-content: space-between;
  padding: 0;
  top: 0;
}
`;

export default StyledNavbar;
