import styled from "styled-components";
import { padding } from "styled-system";
import PropTypes from "prop-types";
import BaseTheme from "../../../style/themes/base";
import { CARD_SIZES } from "../card.config";

const StyledCardRow = styled.div`
  ${padding}
  display: flex;
`;

StyledCardRow.propTypes = {
  spacing: PropTypes.oneOf(CARD_SIZES),
};

StyledCardRow.defaultProps = {
  theme: BaseTheme,
};

export default StyledCardRow;
