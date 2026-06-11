```tsx
export const Tag: Story = () => {
  const noop = () => {};
  return (
    <>
      <Box mb={1}>
        <Pill size="S" mr={1}>
          tag
        </Pill>
        <Pill size="S" fill mr={1}>
          tag
        </Pill>
        <Pill size="S" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill size="S" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill mr={1}>tag</Pill>
        <Pill fill mr={1}>
          tag
        </Pill>
        <Pill onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box mb={1}>
        <Pill size="L" mr={1}>
          tag
        </Pill>
        <Pill size="L" fill mr={1}>
          tag
        </Pill>
        <Pill size="L" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill size="L" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
      <Box>
        <Pill size="XL" mr={1}>
          tag
        </Pill>
        <Pill size="XL" fill mr={1}>
          tag
        </Pill>
        <Pill size="XL" onDelete={noop} mr={1}>
          tag
        </Pill>
        <Pill size="XL" onDelete={noop} fill>
          tag
        </Pill>
      </Box>
    </>
  );
};
```