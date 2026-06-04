```tsx
export const MinimalDesign = () => {
  return (
    <FlatTable
      colorTheme="transparent-white"
      hasOuterVerticalBorders={false}
      bottomBorderRadius="borderRadius000"
    >
      <FlatTableHead>
        <FlatTableRow horizontalBorderSize="medium">
          <FlatTableHeader px="0">Header a</FlatTableHeader>
          <FlatTableHeader px="0">Header b</FlatTableHeader>
          <FlatTableHeader px="0">Header c</FlatTableHeader>
          <FlatTableHeader px="0">Header d</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow horizontalBorderColor="--colorsUtilityMajor050">
          <FlatTableCell px="0">Cell a</FlatTableCell>
          <FlatTableCell px="0">Cell b</FlatTableCell>
          <FlatTableCell px="0">Cell c</FlatTableCell>
          <FlatTableCell px="0">Cell d</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow horizontalBorderColor="--colorsUtilityMajor050">
          <FlatTableCell px="0">Cell a</FlatTableCell>
          <FlatTableCell px="0">Cell b</FlatTableCell>
          <FlatTableCell px="0">Cell c</FlatTableCell>
          <FlatTableCell px="0">Cell d</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow horizontalBorderColor="--colorsUtilityMajor050">
          <FlatTableCell px="0">Cell a</FlatTableCell>
          <FlatTableCell px="0">Cell b</FlatTableCell>
          <FlatTableCell px="0">Cell c</FlatTableCell>
          <FlatTableCell px="0">Cell d</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow horizontalBorderColor="--colorsUtilityMajor050">
          <FlatTableCell px="0">Cell a</FlatTableCell>
          <FlatTableCell px="0">Cell b</FlatTableCell>
          <FlatTableCell px="0">Cell c</FlatTableCell>
          <FlatTableCell px="0">Cell d</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
```