import styled from "styled-components";

import Button from "../../button";

interface StyledButtonProps {
  active?: boolean;
}

const StyledButton = styled(Button)<StyledButtonProps>`
  border-radius: 0;
  background-color: var(
    ${({ active }) =>
      active ? "--colorsActionMinorGray700" : "--colorsUtilityYin100"}
  );

  [data-component="icon"] {
    color: var(--colorsUtilityYang100);
  }
`;

const StyledGlobalVerticalMenuWrapper = styled.div`
  position: relative;
  width: fit-content;
`;

export { StyledButton, StyledGlobalVerticalMenuWrapper };
