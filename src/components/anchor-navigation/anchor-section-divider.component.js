import PropTypes from "prop-types";
import { StyledAnchorDivider } from "./anchor-navigation.style";

StyledAnchorDivider.displayName = "AnchorSectionDivider";

StyledAnchorDivider.propTypes = {
  styleOverride: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default StyledAnchorDivider;
