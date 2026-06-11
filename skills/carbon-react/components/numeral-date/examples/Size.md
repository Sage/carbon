```tsx
export const Size: Story = () => {
  const dateDefault = {
    dd: "",
    mm: "",
    yyyy: "",
  };
  const [value, setValue] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value2, setValue2] = useState<NumeralDateProps["value"]>(dateDefault);
  const [value3, setValue3] = useState<NumeralDateProps["value"]>(dateDefault);

  return (
    <>
      <NumeralDate
        label="Date of Birth"
        dateFormat={["dd", "mm", "yyyy"]}
        size="small"
        mb={2}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <NumeralDate
        label="Date of Birth"
        dateFormat={["dd", "mm", "yyyy"]}
        size="medium"
        mb={2}
        value={value2}
        onChange={(e) => setValue2(e.target.value)}
      />
      <NumeralDate
        label="Date of Birth"
        dateFormat={["dd", "mm", "yyyy"]}
        size="large"
        value={value3}
        onChange={(e) => setValue3(e.target.value)}
      />
    </>
  );
};
```