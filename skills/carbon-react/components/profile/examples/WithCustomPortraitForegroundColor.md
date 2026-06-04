```tsx
export const WithCustomPortraitForegroundColor: Story = () => {
  return (
    <Box display="flex" gap={2} flexDirection="column">
      <Profile
        email="john@thefamilydoe.com"
        initials="JD"
        name="John Doe"
        text="+33 657 22 34 71"
        backgroundColor="#AA00FF"
        foregroundColor="#FFFF99"
      />
      <Profile
        email="jane@thefamilydoe.com"
        initials="JD"
        name="Jane Doe"
        text="+33 657 22 34 72"
        backgroundColor="#0000FF"
        foregroundColor="#FFBB00"
      />
    </Box>
  );
};
```