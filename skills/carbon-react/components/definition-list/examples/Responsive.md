```tsx
export const Responsive: Story = () => {
  const smallScreen = useMediaQuery("(max-width: 700px)");
  return (
    <Dl
      ddTextAlign={smallScreen ? "left" : undefined}
      dtTextAlign={smallScreen ? "left" : "right"}
      asSingleColumn={smallScreen}
    >
      <Dt>First</Dt>
      <Dd>Description</Dd>
      <Dt>Second</Dt>
      <Dd>
        <Box display="inline-flex" alignItems="center">
          <Box mr={1}>Details example</Box>
          <Icon type="tick" />
        </Box>
      </Dd>
      <Dt>Third</Dt>
      <Dd>Description</Dd>
    </Dl>
  );
};
```