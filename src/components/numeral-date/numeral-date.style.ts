import styled from "styled-components";
import Fieldset from "../../__internal__/fieldset";

export const StyledNumeralDate = styled.div<{ name?: string }>`
  display: inline-flex;
  gap: var(--spacing150);
`;

export const StyledFieldset = styled(Fieldset)`
  width: min-content;
`;
