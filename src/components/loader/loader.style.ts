import styled from "styled-components";
import { margin } from "styled-system";
import { baseTheme } from "../../style/themes";

const StyledLoader = styled.div`
  ${margin}
  text-align: center;
  white-space: nowrap;
`;

StyledLoader.defaultProps = {
  theme: baseTheme,
};

export default StyledLoader;
