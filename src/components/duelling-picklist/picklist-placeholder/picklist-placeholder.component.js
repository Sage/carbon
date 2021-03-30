import React from "react";
import PropTypes from "prop-types";

import { StyledPicklistPlaceholder } from "../duelling-picklist.style";

const PicklistPlaceholder = ({ text }) => (
  <StyledPicklistPlaceholder data-element="picklist-placeholder">
    {text}
  </StyledPicklistPlaceholder>
);

PicklistPlaceholder.propTypes = {
  /** Text to be displayed when list is empty */
  text: PropTypes.string.isRequired,
};

export default PicklistPlaceholder;
