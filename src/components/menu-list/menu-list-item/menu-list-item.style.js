import styled, { css } from "styled-components";
import { baseTheme } from "../../../style/themes";

const StyledMenuListItem = styled.li`
  ${({ theme }) => css`
    font-size: 16px;
    font-weight: 700;
    line-height: 40px;

    .carbon-link__content {
      color: ${theme.colors.slate};
    }

    .common-input__input-icon {
      line-height: 23px;
    }
  `}
`;

StyledMenuListItem.defaultProps = {
  theme: baseTheme,
};

export default StyledMenuListItem;
