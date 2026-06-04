```tsx
export const WithTooltipPosition: Story = () => {
  return (
    <>
      {(["right", "left", "top", "bottom"] as const).map((position) => (
        <Box my={64} mx={300} key={position}>
          <Help tooltipPosition={position} isFocused>
            {`This tooltip is positioned ${position}`}
          </Help>
        </Box>
      ))}
    </>
  );
};
```