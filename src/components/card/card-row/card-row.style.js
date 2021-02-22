import styled from "styled-components";
import { padding } from "styled-system";
import PropTypes from "prop-types";
import OptionsHelper from "../../../utils/helpers/options-helper/options-helper";
import BaseTheme from "../../../style/themes/base";

const { sizesRestricted } = OptionsHelper;

const StyledCardRow = styled.div`
  ${padding}
  display: flex;
`;

StyledCardRow.propTypes = {
  spacing: PropTypes.oneOf(sizesRestricted),
};

StyledCardRow.defaultProps = {
  theme: BaseTheme,
};

export default StyledCardRow;
