import React from "react";
import Search, { SearchProps } from ".";

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
