import React from "react";
import I18n from "i18n-js";
import PropTypes from "prop-types";
import {
  StyledBatchSelection,
  StyledSelectionCount,
} from "./batch-selection.style";

const BatchSelection = ({
  disabled,
  children,
  colorTheme,
  selectedCount,
  hidden,
}) => {
  const getTextForCount = (count) =>
    I18n.t("batch_selection.selected", {
      count: Number(count),
      defaultValue: "selected",
    });

  return (
    <StyledBatchSelection
      colorTheme={colorTheme}
      data-component="batch-selection"
      disabled={disabled}
      hidden={hidden}
    >
      <StyledSelectionCount data-element="selection-count">
        <span>{selectedCount}</span> {getTextForCount(selectedCount)}
      </StyledSelectionCount>
      {children}
    </StyledBatchSelection>
  );
};

BatchSelection.propTypes = {
  /** Content to be rendered after selected count */
  children: PropTypes.node.isRequired,
  /** Number of selected elements */
  selectedCount: PropTypes.number.isRequired,
  /** Color of the background, transparent if not defined */
  colorTheme: PropTypes.oneOf(["dark", "light", "white", "transparent"]),
  /** If true disables all user interaction */
  disabled: PropTypes.bool,
  /** Hidden if true */
  hidden: PropTypes.bool,
};

BatchSelection.defaultProps = {
  colorTheme: "transparent",
};

export default BatchSelection;
