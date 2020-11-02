/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import PropTypes from "prop-types";
/**
 * TextEditor component is composed with divs and spans.
 * We have to manually trigger focus on TextEditor by clicking on label component.
 * This wrapper allows us to trigger focus on TextEditor
 */
const LabelWrapper = ({ onClick, children }) => {
  return <span onClick={onClick}> {children} </span>;
};

LabelWrapper.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default LabelWrapper;
