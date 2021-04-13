import styled from "styled-components";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";

const StyledHr = styled.hr`
  ${margin}
  width: inherit;
  border: 0;
  height: 1px;
  background: ${({ theme }) => theme.hr.background};
`;

StyledHr.defaultProps = {
  theme: baseTheme,
};

export default StyledHr;
