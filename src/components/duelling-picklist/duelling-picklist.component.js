import React, { useState } from "react";
import PropTypes from "prop-types";
import styledSystemPropTypes from "@styled-system/prop-types";
import { filterStyledSystemMarginProps } from "../../style/utils";
import {
  StyledDuellingPicklistOverlay,
  StyledDuellingPicklist,
  StyledLabelContainer,
  StyledLabel,
  StyledControlsContainer,
  StyledControl,
} from "./duelling-picklist.style";
import { Picklist } from "./picklist/picklist.component";
import FocusContext from "./duelling-picklist.context";

const marginPropTypes = filterStyledSystemMarginProps(
  styledSystemPropTypes.space
);

const DuellingPicklist = ({
  children,
  disabled,
  leftControls,
  rightControls,
  leftLabel,
  rightLabel,
  ...rest
}) => {
  const shouldDisplayLabels = leftLabel || rightLabel;
  const shouldDisplayControls = leftControls || rightControls;
  const [elementToFocus, setElementToFocus] = useState({});
  let pickListIndex = 0;

  const addElementToFocus = (itemIndex, listIndex, groupIndex) => {
    setElementToFocus({ itemIndex, listIndex, groupIndex });
  };

  const getIndex = () => {
    const index = pickListIndex;
    pickListIndex += 1;
    return index;
  };

  const clonedChildren = React.Children.map(
    children,
    (child) =>
      child &&
      React.cloneElement(child, {
        index: child.type === Picklist ? getIndex() : undefined,
      })
  );

  return (
    <StyledDuellingPicklistOverlay
      disabled={disabled}
      data-component="duelling-picklist"
      {...filterStyledSystemMarginProps(rest)}
    >
      {shouldDisplayLabels && (
        <StyledLabelContainer>
          <StyledLabel data-element="picklist-left-label">
            {leftLabel}
          </StyledLabel>
          <StyledLabel data-element="picklist-right-label">
            {rightLabel}
          </StyledLabel>
        </StyledLabelContainer>
      )}
      {shouldDisplayControls && (
        <StyledControlsContainer>
          <StyledControl data-element="picklist-left-control">
            {leftControls}
          </StyledControl>
          <StyledControl data-element="picklist-right-label">
            {rightControls}
          </StyledControl>
        </StyledControlsContainer>
      )}
      <FocusContext.Provider
        value={{
          setElementToFocus: addElementToFocus,
          elementToFocus,
        }}
      >
        <StyledDuellingPicklist>{clonedChildren}</StyledDuellingPicklist>
      </FocusContext.Provider>
    </StyledDuellingPicklistOverlay>
  );
};

DuellingPicklist.propTypes = {
  ...marginPropTypes,
  children: (props, propName) => {
    const prop = props[propName];
    let error;

    if (
      !prop ||
      !Array.isArray(prop) ||
      prop.filter((el) => el.type === Picklist).length !== 2
    ) {
      error = new Error(
        `\`${propName}\` must have two \`${Picklist.displayName}\`s`
      );
    }

    return error;
  },
  /** Indicate if component is disabled */
  disabled: PropTypes.bool,
  /** Place for components like Search or Filter placed above the left list */
  leftControls: PropTypes.node,
  /** Place for components like Search or Filter placed above the right list */
  rightControls: PropTypes.node,
  /** Left list label */
  leftLabel: PropTypes.string,
  /** Right list label */
  rightLabel: PropTypes.string,
};

export default DuellingPicklist;
