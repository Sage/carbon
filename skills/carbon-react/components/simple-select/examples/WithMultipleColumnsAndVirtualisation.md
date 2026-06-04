```tsx
export const WithMultipleColumnsAndVirtualisation: Story = () => {
  const [value, setValue] = useState("2");
  return (
    <Box height={250}>
      <Select
        name="withMultipleColumnsAndVirtualisation"
        id="withMultipleColumnsAndVirtualisation"
        label="choose an option"
        multiColumn
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        enableVirtualScroll
        tableHeader={
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Occupation</th>
          </tr>
        }
      >
        {Array(500)
          .fill(undefined)
          .map((_, index) => (
            <OptionRow
              key={`option-${index + 1}`}
              id={`option-row-${index}`}
              value={`${index}`}
              text={`Option ${index + 1}`}
            >
              <td>{`John ${index + 1}`}</td>
              <td>{`Doe ${index + 1}`}</td>
              <td>{`Welder ${index + 1}`}</td>
            </OptionRow>
          ))}
      </Select>
    </Box>
  );
};
```