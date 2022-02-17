import styled from "styled-components";
import baseTheme from "../../style/themes/base";

const StyledBackdrop = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.popover};
  background: transparent;
`;

StyledBackdrop.defaultProps = {
  theme: baseTheme,
};

export default StyledBackdrop;
