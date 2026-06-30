import React from "react";
import Search, { SearchProps } from "../..";
import Box from "../../../box";
import MenuContext from "../../../menu/__internal__/menu.context";

const MenuContextProvider = ({ children }: { children: React.ReactNode }) => (
  <MenuContext.Provider value={{ inMenu: true }}>
    {children}
  </MenuContext.Provider>
);

export const SearchComponent = (
  props: Partial<SearchProps> & { value?: string },
) => {
  const [internalValue, setInternalValue] = React.useState(props.value ?? "");
  return (
    <MenuContextProvider>
      <Search
        placeholder="Search..."
        onChange={(e) => setInternalValue(e.target.value)}
        value={internalValue}
        {...props}
      />
    </MenuContextProvider>
  );
};

export const SearchComponentDarkBackground = (
  props: Omit<SearchProps, "onChange" | "value">,
) => {
  const [value, setValue] = React.useState("foo");
  return (
    <Box width="700px" height="108px" bg="#003349">
      <MenuContextProvider>
        <Search
          placeholder="Search..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
          variant="dark"
          {...props}
        />
      </MenuContextProvider>
    </Box>
  );
};
