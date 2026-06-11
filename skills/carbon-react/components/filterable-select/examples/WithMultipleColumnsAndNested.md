```tsx
export const WithMultipleColumnsAndNested: Story = () => {
  const [value, setValue] = useState("2");
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <Box height={300}>
      <FilterableSelect
        name="withMultipleColumns"
        id="withMultipleColumns"
        label="clients"
        value={value}
        onChange={onChangeHandler}
        multiColumn
        openOnFocus
        tableHeader={
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Occupation</th>
          </tr>
        }
        listActionButton={
          <Button iconType="add" iconPosition="after">
            Add a New Element
          </Button>
        }
        onListAction={action("onListAction")}
      >
        <OptionRow id="1" value="1" text="John Doe">
          <td>John</td>
          <td>Doe</td>
          <td>
            <b>test</b>
          </td>
        </OptionRow>
        <OptionRow id="2" value="2" text="Joe Vick">
          <td>Joe</td>
          <td>Vick</td>
          <td>
            <b>Accountant</b>
          </td>
        </OptionRow>
        <OptionRow id="3" value="3" text="Jane Poe">
          <td>Jane</td>
          <td>Poe</td>
          <td>
            <b>Accountant</b>
          </td>
        </OptionRow>
        <OptionRow id="4" value="4" text="Jill Moe">
          <td>Jill</td>
          <td>Moe</td>
          <td>
            <b>Engineer</b>
          </td>
        </OptionRow>
        <OptionRow id="5" value="5" text="Bill Zoe">
          <td>Bill</td>
          <td>Zoe</td>
          <td>
            <b>Astronaut</b>
          </td>
        </OptionRow>
      </FilterableSelect>
    </Box>
  );
};
```