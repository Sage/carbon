```tsx
export const HeadingWithPills: StoryObj = () => (
  <>
    <Box display="flex" alignItems="center">
      <Typography variant="h1" marginRight="var(--spacing200)">
        This is a basic Heading with Pills
      </Typography>
      <Box line-height="32px" display="inline-block" verticalAlign="top">
        <Pill mr="var(--spacing110)">Pill 1</Pill>
        <Pill size="L" mr="var(--spacing110)">
          Pill 2
        </Pill>
        <Pill size="XL">Pill 3</Pill>
      </Box>
    </Box>
    <Divider type="horizontal" />
  </>
);
```