import styled from "styled-components";

const StyledAppWrapper = styled.div`
  box-sizing: border-box;
  max-width: 1600px;
  min-width: 958px;
  margin: 0 auto;
  padding: 0 40px;

  @media only screen and (max-width: 1366px) {
    padding: 0 30px;
  }

  @media only screen and (max-width: 1024px) {
    padding: 0 25px;
  }
`;

export default StyledAppWrapper;
