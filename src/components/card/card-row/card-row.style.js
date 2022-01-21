import styled from "styled-components";
import { padding } from "styled-system";
import PropTypes from "prop-types";
import BaseTheme from "../../../style/themes/base";

const StyledCardRow = styled.div`
  ${padding}
  display: flex;
`;

StyledCardRow.propTypes = {
  theme: PropTypes.object,
};

StyledCardRow.defaultProps = {
  theme: BaseTheme,
};

export default StyledCardRow;
