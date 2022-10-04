import styled from "styled-components";
import { margin } from "styled-system";
import baseTheme from "../../style/themes/base";

const StyledPreview = styled.div`
  ${margin}
`;

StyledPreview.defaultProps = {
  theme: baseTheme,
};

// eslint-disable-next-line import/prefer-default-export
export { StyledPreview };
