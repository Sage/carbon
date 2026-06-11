```tsx
export const MultiSelect: Story = () => {
  const [value1, setValue1] = useState(false);
  const [value2, setValue2] = useState(false);
  const [value3, setValue3] = useState(false);
  const [value4, setValue4] = useState(false);

  return (
    <TileSelectGroup
      legend="Tile Select"
      description="Pick any number of available options"
      multiSelect
      name="Tile Select"
    >
      <TileSelect
        value="1"
        name="multi-1"
        id="multi-1"
        aria-label="multi-1"
        title="Title"
        subtitle="Subtitle"
        description="Short and descriptive description"
        checked={value1}
        onChange={(e) => setValue1(e.target.checked)}
      />
      <TileSelect
        value="2"
        name="multi-2"
        id="multi-2"
        aria-label="multi-2"
        subtitle="Subtitle"
        titleAdornment={<Pill>Message</Pill>}
        description="Short and descriptive description"
        checked={value2}
        onChange={(e) => setValue2(e.target.checked)}
      />
      <TileSelect
        value="3"
        name="multi-3"
        id="multi-3"
        aria-label="multi-3"
        disabled
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
            tooltipVisible={false}
            disabled
          />
        }
        description="Short and descriptive description"
        checked={value3}
        onChange={(e) => setValue3(e.target.checked)}
      />
      <TileSelect
        value="4"
        name="multi-4"
        id="multi-4"
        aria-label="multi-4"
        title="Title"
        subtitle="Subtitle"
        titleAdornment={
          <Icon
            type="info"
            tooltipMessage="Short and non descriptive message"
          />
        }
        description="Short and descriptive description"
        checked={value4}
        onChange={(e) => setValue4(e.target.checked)}
      />
    </TileSelectGroup>
  );
};
```