```tsx
export const Virtualised: Story = () => {
  const [value, setValue] = useState("");
  return (
    <Box height={220}>
      <Select
        name="virtualised"
        id="virtualised"
        label="choose an option"
        labelInline
        enableVirtualScroll
        virtualScrollOverscan={20}
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
      >
        {Array(10000)
          .fill(undefined)
          .map((_, index) => (
            <Option
              key={`option-${index + 1}`}
              value={`${index}`}
              text={`Option ${index + 1}`}
            />
          ))}
      </Select>
    </Box>
  );
};
```