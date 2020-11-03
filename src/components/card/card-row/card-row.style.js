import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import OptionsHelper from "../../../utils/helpers/options-helper/options-helper";
import BaseTheme from "../../../style/themes/base";

const { sizesRestricted } = OptionsHelper;

const marginSizes = {
  small: "16px 0",
  medium: "24px 0",
  large: "32px 0",
};

const StyledCardRow = styled.div`
  display: flex;

  ${({ spacing }) => css`
    margin: ${marginSizes[spacing]};
  `}
`;

StyledCardRow.propTypes = {
  spacing: PropTypes.oneOf(sizesRestricted),
};

StyledCardRow.defaultProps = {
  spacing: "medium",
  theme: BaseTheme,
};

export default StyledCardRow;
