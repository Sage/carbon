```tsx
export const Variants: Story = () => {
  const availableVariants: { value: PortraitVariant; label: string }[] = [
    { value: "black", label: "Black (default)" },
    { value: "blue", label: "Blue" },
    { value: "teal", label: "Teal" },
    { value: "green", label: "Green" },
    { value: "lime", label: "Lime" },
    { value: "orange", label: "Orange" },
    { value: "red", label: "Red" },
    { value: "pink", label: "Pink" },
    { value: "purple", label: "Purple" },
    { value: "slate", label: "Slate" },
    { value: "gray", label: "Gray" },
  ];
  const [variant, setVariant] = useState<PortraitVariant>(
    availableVariants[0].value,
  );

  return (
    <>
      <Box display="flex" flexDirection="column" gap={2} mb={1}>
        <Select
          name="foreground-color"
          id="foreground-color"
          label="Foreground Color"
          labelInline
          onChange={(e) => setVariant(e.target.value as PortraitVariant)}
          value={variant}
        >
          {availableVariants.map(({ label, value }) => (
            <Option text={label} value={value} />
          ))}
        </Select>
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait size="XS" variant={variant} />
        <Portrait initials="MK" size="XS" variant={variant} />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait variant={variant} />
        <Portrait initials="MK" variant={variant} />
      </Box>
      <Box display="flex" mb={1} gap={1}>
        <Portrait size="L" variant={variant} />
        <Portrait initials="MK" size="L" variant={variant} />
      </Box>
    </>
  );
};
```