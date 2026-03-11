import styled from "styled-components";

const StyledNavbar = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  width: 92%;
  z-index: 1;
  top: -10px;

  &.rdp-nav {
    display: flex;
    justify-content: space-between;
    padding: 0;
    top: 0;
    height: var(--sizing500);
  }
`;

export default StyledNavbar;
