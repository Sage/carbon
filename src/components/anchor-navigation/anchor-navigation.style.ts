import styled from "styled-components";
import addFocusStyling from "../../style/utils/add-focus-styling";

const StyledAnchorNavigation = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
`;

const StyledNavigation = styled.ul`
  position: sticky;
  top: 32px;
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 240px;
`;

const StyledContent = styled.div`
  flex: 1;
  margin-left: 32px;

  [data-carbon-anchornav-ref="true"]:focus {
    outline: none;
  }
`;

export { StyledAnchorNavigation, StyledNavigation, StyledContent };
