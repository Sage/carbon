import React, { useState } from "react";
import { MarginProps } from "styled-system";
import tagComponent, { TagProps } from "../../__internal__/utils/helpers/tags";

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
import Logger from "../../__internal__/utils/logger";

export interface DuellingPicklistProps extends MarginProps, TagProps {
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

let deprecationWarningTriggered = false;

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

  if (!deprecationWarningTriggered) {
    Logger.deprecate(
      "The `DuellingPicklist` component is deprecated and will soon be removed.",
    );
    deprecationWarningTriggered = true;
  }

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
      {...filterStyledSystemMarginProps(rest)}
      {...tagComponent("duelling-picklist", rest)}
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
