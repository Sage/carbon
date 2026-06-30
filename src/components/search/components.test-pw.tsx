import React, { useState } from "react";
import Search, { SearchProps, SearchListGroup } from ".";
import Box from "../box";

export const SearchComponentWithLabelHintAndError = () => {
  return (
    <Search
      label="Search"
      value="Default with label, hint and error"
      onChange={() => {}}
      inputHint="Hint text"
      error="Error message"
    />
  );
};

export const SearchComponentInverseWithLabelHintAndError = () => (
  <Box width="700px" height="140px" backgroundColor="#000000">
    <Search
      label="Search"
      inputHint="Hint text"
      value="Inverse with label, hint and error"
      onChange={() => {}}
      inverse
      error="Error message"
    />
  </Box>
);

export const SearchComponent = (props: Partial<SearchProps>) => {
  const [value, setValue] = useState("");
  return (
    <Search
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...props}
    />
  );
};

const dropdownListData: SearchListGroup[] = [
  {
    heading: "Results",
    items: [
      { value: "term-1", label: "term 1" },
      { value: "term-2", label: "term 2" },
      { value: "term-3", label: "term 3" },
    ],
  },
];

export const SearchComponentWithDropdown = () => {
  const [value, setValue] = useState("te");
  const [isOpen, setIsOpen] = useState(true);

  const handleChange: SearchProps["onChange"] = (e) => {
    const nextValue = e.target.value;
    setValue(nextValue);
    setIsOpen(nextValue.length > 0);
  };

  return (
    <Box height="300px" width="400px">
      <Search
        aria-label="Search"
        value={value}
        onChange={handleChange}
        open={isOpen}
        listData={dropdownListData}
        onListItemSelect={(val) => setValue(val)}
        onClose={() => setIsOpen(false)}
      />
    </Box>
  );
};
