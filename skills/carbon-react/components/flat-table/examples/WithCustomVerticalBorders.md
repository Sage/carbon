```tsx
export const WithCustomVerticalBorders: Story = () => {
  return (
    <FlatTable title="Table for Custom Vertical Borders">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader verticalBorder="small" verticalBorderColor="#335CDC">
            Name
          </FlatTableHeader>
          <FlatTableHeader
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            Location
          </FlatTableHeader>
          <FlatTableHeader verticalBorder="large">
            Relationship Status
          </FlatTableHeader>
          <FlatTableHeader>Dependents</FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell
            verticalBorder="small"
            verticalBorderColor="--colorsUtilityYin090"
          >
            John Doe
          </FlatTableCell>
          <FlatTableCell
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            London
          </FlatTableCell>
          <FlatTableCell verticalBorder="large">Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell
            verticalBorder="small"
            verticalBorderColor="--colorsUtilityYin090"
          >
            Jane Doe
          </FlatTableCell>
          <FlatTableCell
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            York
          </FlatTableCell>
          <FlatTableCell verticalBorder="large">Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell
            verticalBorder="small"
            verticalBorderColor="--colorsUtilityYin090"
          >
            John Smith
          </FlatTableCell>
          <FlatTableCell
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            Edinburgh
          </FlatTableCell>
          <FlatTableCell verticalBorder="large">Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell
            verticalBorder="small"
            verticalBorderColor="--colorsUtilityYin090"
          >
            Jane Smith
          </FlatTableCell>
          <FlatTableCell
            verticalBorder="medium"
            verticalBorderColor="goldTint10"
          >
            Newcastle
          </FlatTableCell>
          <FlatTableCell verticalBorder="large">Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  );
};
```