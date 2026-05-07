import styled, { css } from "styled-components";

import StyledFormField from "../../__internal__/form-field/form-field.style";
import StyledInputPresentation from "../../__internal__/input/input-presentation.style";
import applyBaseTheme from "../../style/themes/apply-base-theme";
import { SearchProps } from "./search.component";
import Textbox from "../textbox";
import Button from "../button/__next__";

interface StyledSearchProps {
  name?: string;
  searchWidth?: string;
  maxWidth?: string;
}

export const StyledSearchInput = styled(Textbox).attrs({
  type: "search",
})<SearchProps>``;

// replace 0s with a suitable design token for 0px related to border radius/width

export const StyledSearchButton = styled(Button)`
  align-self: end;
  border-color: var(--input-typical-border-default);
  border-top-left-radius: 0;
  border-top-right-radius: var(--global-radius-action-m);
  border-bottom-right-radius: var(--global-radius-action-m);
  border-bottom-left-radius: 0;
  border-width: var(--global-borderwidth-xs);
  border-top-width: var(--global-borderwidth-xs);
  border-right-width: var(--global-borderwidth-xs);
  border-bottom-width: var(--global-borderwidth-xs);
  border-left-width: 0;

  &:hover {
    border-color: var(--input-typical-border-default);
    border-width: var(--global-borderwidth-xs);
    border-top-width: var(--global-borderwidth-xs);
    border-right-width: var(--global-borderwidth-xs);
    border-bottom-width: var(--global-borderwidth-xs);
    border-left-width: 0;
  }
`;

const StyledSearch = styled.div.attrs(applyBaseTheme)<StyledSearchProps>`
  ${({ searchWidth, maxWidth }) => css`
    display: flex;
    flex-direction: row;
    width: ${searchWidth ? `${searchWidth}` : "100%"};
    max-width: ${maxWidth ? `${maxWidth}` : "100%"};

    ${StyledFormField} {
      flex: 1;
    }

    ${StyledInputPresentation} {
      border-color: var(--input-typical-border-default);
      border-top-left-radius: var(--global-radius-action-m);
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: var(--global-radius-action-m);
      border-width: var(--global-borderwidth-xs);
      border-top-width: var(--global-borderwidth-xs);
      border-right-width: 0;
      border-bottom-width: var(--global-borderwidth-xs);
      border-left-width: var(--global-borderwidth-xs);

      &::after {
        content: "";
        height: calc(100% - var(--global-space-comp-s) * 2);
        align-self: center;
        display: block;
        width: var(--global-borderwidth-xs);
        background-color: var(--container-standard-border-default);
      }
    }
  `}
`;

export default StyledSearch;
