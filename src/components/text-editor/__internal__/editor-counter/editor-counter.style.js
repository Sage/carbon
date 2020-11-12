import styled from "styled-components";
import baseTheme from "../../../../style/themes/base";

const StyledCounter = styled.span`
  color: ${({ theme, hasError }) =>
    hasError ? `${theme.colors.error};` : `${theme.editor.counter};`}
  width: 100%;
`;

const StyledCounterWrapper = styled.div`
  margin: 16px 16px 0px 4px;
  min-width: 40px;
  height: 21px;
  font-size: 14px;
  display: flex;
  float: right;
  text-align: right;
  align-items: center;
`;

StyledCounter.defaultProps = {
  theme: baseTheme,
};

export { StyledCounter, StyledCounterWrapper };
