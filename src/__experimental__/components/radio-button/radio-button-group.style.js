import styled from "styled-components";

const RadioButtonGroupStyle = styled.div`
  ${({ inline }) => inline && "display: flex;"}

  ${({ styleOverride }) => styleOverride};
`;

export default RadioButtonGroupStyle;
