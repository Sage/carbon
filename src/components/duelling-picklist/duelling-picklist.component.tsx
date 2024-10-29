import React, { useState } from "react";
import { MarginProps } from "styled-system";

import { filterStyledSystemMarginProps } from "../../style/utils";
import {
  StyledDuellingPicklistOverlay,
  StyledDuellingPicklist,
  StyledLabelContainer,
  StyledLabel,
  StyledControlsContainer,
  StyledControl,
} from "./duelling-picklist.style";
import { Picklist, PicklistProps } from "./picklist/picklist.component";
import FocusContext, {
  FocusContextType,
} from "./__internal__/duelling-picklist.context";

export interface DuellingPicklistProps extends MarginProps {
  /**
   * Content of the component, should contain two Picklist children
   * and a PicklistDivider
   */
  children?: React.ReactNode;
  /** Indicate if component is disabled */
  disabled?: boolean;
  /** Place for components like Search or Filter placed above the left list */
  leftControls?: React.ReactNode;
  /** Left list label */
  leftLabel?: string;
  /** Place for components like Search or Filter placed above the right list */
  rightControls?: React.ReactNode;
  /** Right list label */
  rightLabel?: string;
}

export const DuellingPicklist = ({
  children,
  disabled,
  leftControls,
  rightControls,
  leftLabel,
  rightLabel,
  ...rest
}: DuellingPicklistProps) => {
  const shouldDisplayLabels = leftLabel || rightLabel;
  const shouldDisplayControls = leftControls || rightControls;
  const [elementToFocus, setElementToFocus] = useState<
    FocusContextType["elementToFocus"]
  >({});
  let pickListIndex = 0;

  const addElementToFocus = (
    itemIndex?: number,
    listIndex?: number,
    groupIndex?: number,
  ) => {
    setElementToFocus({ itemIndex, listIndex, groupIndex });
  };

  const getIndex = () => {
    const index = pickListIndex;
    pickListIndex += 1;
    return index;
  };

  const clonedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement<PicklistProps>(child) && child.type === Picklist) {
      return React.cloneElement(child, {
        index: getIndex(),
      });
    }
    return child;
  });

  return (
    <StyledDuellingPicklistOverlay
      disabled={disabled}
      data-component="duelling-picklist"
      data-role="duelling-picklist-overlay"
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
          <StyledControl data-element="picklist-right-control">
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

export default DuellingPicklist;
