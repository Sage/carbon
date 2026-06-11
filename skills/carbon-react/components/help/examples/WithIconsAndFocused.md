```tsx
export const WithIconsAndFocused: Story = () => {
  return (
    <>
      {(["error", "add", "minus", "settings"] as const).map((icon) => (
        <Box m={65} key={icon}>
          <Help type={`${icon}`} data-role="target">
            {`This is the Help component with the ${icon} icon`}
          </Help>
        </Box>
      ))}
    </>
  );
};
```