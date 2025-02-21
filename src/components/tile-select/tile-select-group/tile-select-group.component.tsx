import React from "react";
import { MarginProps } from "styled-system";

import tagComponent, {
  TagProps,
} from "../../../__internal__/utils/helpers/tags/tags";
import RadioButtonMapper from "../../../__internal__/radio-button-mapper/radio-button-mapper.component";
import {
  StyledTileSelectFieldset,
  StyledGroupDescription,
} from "../tile-select.style";
import { filterStyledSystemMarginProps } from "../../../style/utils";
import { TileSelectDeselectEvent } from "../tile-select.component";

export interface TileSelectGroupProps extends MarginProps, TagProps {
  /** The TileSelect components to be rendered in the group */
  children: React.ReactNode;
  /** The content for the TileSelectGroup Legend */
  legend?: string;
  /** Description to be rendered below the legend */
  description?: string;
  /** The currently selected value - only for single select mode. */
  value?: string | null;
  /** The name to apply to the input - only for single select mode. */
  name: string;
  /** A callback triggered when one of tiles is selected - only for single select mode. */
  onChange?: (
    ev: React.ChangeEvent<HTMLInputElement> | TileSelectDeselectEvent,
  ) => void;
  /** A callback triggered when one of tiles is blurred - only for single select mode. */
  onBlur?: (ev: React.FocusEvent<HTMLInputElement>) => void;
  /** When passed as true TileSelectGroup serves only visual purpose */
  /** It wraps TileSelects in fieldset element and renders the legend and description props content */
  /** onChange, onBlur, value, checked and name props are meant to be passed individually on each of the TileSelects */
  multiSelect?: boolean;
}

export const TileSelectGroup = ({
  children,
  name,
  legend,
  description,
  onChange,
  onBlur,
  value,
  multiSelect = false,
  ...rest
}: TileSelectGroupProps) => {
  let tiles;

  if (multiSelect) {
    tiles = children;
  } else {
    tiles = (
      <RadioButtonMapper
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        data-role="tile-select-group-radio-button-mapper"
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement, {
              type: "radio",
            });
          }
          return child;
        })}
      </RadioButtonMapper>
    );
  }

  return (
    <StyledTileSelectFieldset
      legend={legend}
      {...tagComponent("tile-select-group", rest)}
      multiSelect={multiSelect}
      {...filterStyledSystemMarginProps(rest)}
    >
      {description && (
        <StyledGroupDescription data-element="tile-select-group-description">
          {description}
        </StyledGroupDescription>
      )}
      {tiles}
    </StyledTileSelectFieldset>
  );
};

export default TileSelectGroup;
