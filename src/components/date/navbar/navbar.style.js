import styled from 'styled-components';
import baseTheme from '../../../style/themes/base';

const StyledNavbar = styled.div`
&.DayPicker-NavBar {
  display: flex;
  justify-content: space-between;
  padding: 0;
  top: 0;
  height: 40px;
}
`;

StyledNavbar.defaultProps = {
  theme: baseTheme
};

export default StyledNavbar;
