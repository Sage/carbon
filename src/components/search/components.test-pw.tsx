import React from "react";
import Search, { SearchProps } from ".";
import Box from "../box";

// eslint-disable-next-line import/prefer-default-export
export const SearchComponent = (props: SearchProps) => {
  const [value, setValue] = React.useState("");
  return (
    <Search
      placeholder="Search..."
      onChange={(e) => setValue(e.target.value)}
      value={value}
      {...props}
    />
  );
};

export const SearchComponentLightBackground = (props: SearchProps) => {
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

export const SearchComponentDarkBackground = (props: SearchProps) => {
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
