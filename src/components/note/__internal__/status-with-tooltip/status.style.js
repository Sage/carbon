import styled from "styled-components";

const StyledStatusIconWrapper = styled.div`
  :before {
    content: "";
    margin-right: -6px;

    @-moz-document url-prefix() {
      margin-right: 1px;
    }
  }

  list-style: disc;
  display: list-item;
  left: -4px;
  position: relative;
  text-transform: uppercase;
`;

export default StyledStatusIconWrapper;
