import React from "react";
import Search, { SearchProps } from ".";
import Box from "../box";

export const SearchComponent = (
  props: Partial<SearchProps> & { value?: string },
) => {
  const [internalValue, setInternalValue] = React.useState(props.value ?? "");
  return (
    <Search
      placeholder="Search..."
      onChange={(e) => setInternalValue(e.target.value)}
      value={internalValue}
      {...props}
    />
  );
};

export const SearchComponentLightBackground = (
  props: Omit<SearchProps, "onChange" | "value">,
) => {
  const [value, setValue] = React.useState("");
  return (
    <Box width="700px" height="108px" bg="#FFFFFF">
      <Search
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        searchButton
        {...props}
      />
    </Box>
  );
};

export const SearchComponentDarkBackground = (
  props: Omit<SearchProps, "onChange" | "value">,
) => {
  const [value, setValue] = React.useState("");
  return (
    <Box width="700px" height="108px" bg="#003349">
      <Search
        placeholder="Search..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
        variant="dark"
        searchButton
        {...props}
      />
    </Box>
  );
};
