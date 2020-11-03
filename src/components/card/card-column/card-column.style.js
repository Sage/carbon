import styled from "styled-components";
import PropTypes from "prop-types";
import BaseTheme from "../../../style/themes/base";
import OptionsHelper from "../../../utils/helpers/options-helper";

const StyledCardColumn = styled.div`
  flex-grow: 1;
  text-align: ${({ align }) => align};
`;

StyledCardColumn.propTypes = {
  align: PropTypes.oneOf(OptionsHelper.alignFull),
  theme: PropTypes.object,
};

StyledCardColumn.defaultProps = {
  align: "center",
  theme: BaseTheme,
};

export default StyledCardColumn;
