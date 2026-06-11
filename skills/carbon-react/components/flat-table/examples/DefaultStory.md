```tsx
export const DefaultStory: Story = {
  name: "Default",
  render: (args) => (
    <FlatTable {...args} title="Table for Default Story">
      <FlatTableHead>
        <FlatTableRow>
          <FlatTableHeader>
            <Box
              justifyContent="space-between"
              alignItems="center"
              display="flex"
            >
              Name <Icon type="individual" color="white" />
            </Box>
          </FlatTableHeader>
          <FlatTableHeader>
            <Box
              justifyContent="space-between"
              alignItems="center"
              display="flex"
            >
              Location <Icon type="location" color="white" />
            </Box>
          </FlatTableHeader>
          <FlatTableHeader>
            <Box
              justifyContent="space-between"
              alignItems="center"
              display="flex"
            >
              Relationship Status <Icon type="person_info" color="white" />
            </Box>
          </FlatTableHeader>
          <FlatTableHeader>
            <Box
              justifyContent="space-between"
              alignItems="center"
              display="flex"
            >
              Dependents <Icon type="people" color="white" />
            </Box>
          </FlatTableHeader>
        </FlatTableRow>
      </FlatTableHead>
      <FlatTableBody>
        <FlatTableRow>
          <FlatTableCell>John Doe</FlatTableCell>
          <FlatTableCell>London</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>0</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Doe</FlatTableCell>
          <FlatTableCell>York</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>2</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>John Smith</FlatTableCell>
          <FlatTableCell>Edinburgh</FlatTableCell>
          <FlatTableCell>Single</FlatTableCell>
          <FlatTableCell>1</FlatTableCell>
        </FlatTableRow>
        <FlatTableRow>
          <FlatTableCell>Jane Smith</FlatTableCell>
          <FlatTableCell>Newcastle</FlatTableCell>
          <FlatTableCell>Married</FlatTableCell>
          <FlatTableCell>5</FlatTableCell>
        </FlatTableRow>
      </FlatTableBody>
    </FlatTable>
  ),
};
```