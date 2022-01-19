import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCardColumn = styled.div`
  flex-grow: 1;
  text-align: ${({ align }) => align};
`;

StyledCardColumn.propTypes = {
  align: PropTypes.oneOf(["center", "left", "right"]),
};

StyledCardColumn.defaultProps = {
  align: "center",
};

export default StyledCardColumn;
