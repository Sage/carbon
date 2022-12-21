import React from "react";
import partialAction from "../../../__internal__/utils/storybook/partial-action";

import { FilterableSelect, Option } from "..";

export default {
  component: FilterableSelect,
  title: "Select/Filterable/Test",
  parameters: {
    info: { disable: true },
    chromatic: {
      disable: true,
    },
  },
};

export const DefaultStory = () => (
  <FilterableSelect
    name="simple"
    id="simple"
    label="color"
    labelInline
    onOpen={partialAction("onOpen")}
    onChange={partialAction("onChange")}
    onClick={partialAction("onClick")}
    onFilterChange={partialAction("onFilterChange")}
    onFocus={partialAction("onFocus")}
    onBlur={partialAction("onBlur")}
    onKeyDown={partialAction("onKeyDown")}
  >
    <Option text="Amber" value="1" />
    <Option text="Black" value="2" />
    <Option text="Blue" value="3" />
    <Option text="Brown" value="4" />
    <Option text="Green" value="5" />
    <Option text="Orange" value="6" />
    <Option text="Pink" value="7" />
    <Option text="Purple" value="8" />
    <Option text="Red" value="9" />
    <Option text="White" value="10" />
    <Option text="Yellow" value="11" />
  </FilterableSelect>
);

DefaultStory.storyName = "default";
