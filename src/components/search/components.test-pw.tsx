import React from "react";
import Search from ".";
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
  <Box width="700px" height="108px" backgroundColor="#000000">
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
